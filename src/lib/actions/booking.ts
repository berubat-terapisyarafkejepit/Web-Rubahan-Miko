'use server'
type AvailabilityState = 'available' | 'partial' | 'full'


import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { BOOKING_DAYS_AHEAD, BOOKING_TIME_SLOTS } from '@/lib/booking-config'

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'DONE' | 'CANCELLED'

function isMissingBookingTableError(error: unknown) {
  if (!error || typeof error !== 'object') return false

  const prismaError = error as {
    code?: string
    meta?: { table?: string }
    message?: string
  }

  return (
    prismaError.code === 'P2021' &&
    (
      (typeof prismaError.meta?.table === 'string' && prismaError.meta.table.includes('Booking')) ||
      (typeof prismaError.message === 'string' && prismaError.message.includes('public.Booking'))
    )
  )
}

export async function getBookings(status?: BookingStatus) {
  try {
    return await prisma.booking.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    if (isMissingBookingTableError(error)) {
      return []
    }

    throw error
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  if (status === 'CONFIRMED') {
    const current = await prisma.booking.findUnique({ where: { id } })

    if (!current) throw new Error('Booking tidak ditemukan.')

    const conflict = await prisma.booking.findFirst({
      where: {
        id: { not: id },
        status: 'CONFIRMED',
        bookingDate: current.bookingDate,
        timeSlot: current.timeSlot,
      },
    })

    if (conflict) {
      throw new Error('Slot ini sudah dikonfirmasi untuk pasien lain.')
    }
  }

  await prisma.booking.update({ where: { id }, data: { status } })
  revalidatePath('/admin/booking')
  revalidatePath('/booking')
  revalidatePath('/')
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({ where: { id } })
  revalidatePath('/admin/booking')
  revalidatePath('/booking')
  revalidatePath('/')
}

export async function createBooking(data: {
  patientName: string
  phone: string
  service: string
  bookingDate: Date
  timeSlot: string
}) {
  try {
    const conflict = await prisma.booking.findFirst({
      where: {
        status: 'CONFIRMED',
        bookingDate: data.bookingDate,
        timeSlot: data.timeSlot,
      },
    })

    if (conflict) {
      throw new Error('Maaf, slot yang Anda pilih sudah terkonfirmasi untuk pasien lain.')
    }

    const booking = await prisma.booking.create({ data })
    revalidatePath('/admin/booking')
    revalidatePath('/booking')
    revalidatePath('/')

    // Kirim notifikasi WA ke owner via Fonnte
    await sendWaNotification(booking)

    return booking
  } catch (error) {
    if (isMissingBookingTableError(error)) {
      throw new Error(
        'Fitur booking belum siap karena tabel database `Booking` belum dibuat. Jalankan migrasi Prisma terlebih dahulu.'
      )
    }

    throw error
  }
}

function startOfLocalDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function addDays(date: Date, amount: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}

function formatDateKey(date: Date) {
  return startOfLocalDay(date).toISOString().slice(0, 10)
}

export async function getConfirmedAvailability(daysAhead = BOOKING_DAYS_AHEAD) {
  const start = startOfLocalDay(new Date())
  const end = addDays(start, daysAhead + 1)

  let bookings: { bookingDate: Date; timeSlot: string }[] = []

  try {
    bookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
        bookingDate: {
          gte: start,
          lt: end,
        },
      },
      select: {
        bookingDate: true,
        timeSlot: true,
      },
    })
  } catch (error) {
    if (!isMissingBookingTableError(error)) {
      throw error
    }
  }

  const occupancyMap = bookings.reduce<Record<string, Set<string>>>((acc, booking) => {
    const key = formatDateKey(booking.bookingDate)
    if (!acc[key]) acc[key] = new Set<string>()
    acc[key].add(booking.timeSlot)
    return acc
  }, {})

  const dates = Array.from({ length: daysAhead }, (_, index) => {
    const date = addDays(start, index + 2)
    const key = formatDateKey(date)
    const occupiedSlots = Array.from(occupancyMap[key] || [])
    const occupiedCount = occupiedSlots.length

    return {
      key,
      dateISO: date.toISOString(),
      occupiedSlots,
      occupiedCount,
      totalSlots: BOOKING_TIME_SLOTS.length,
      state: (
        occupiedCount === 0
          ? 'available'
          : occupiedCount >= BOOKING_TIME_SLOTS.length
            ? 'full'
            : 'partial'
      ) as AvailabilityState,
    }
  }).filter((date) => {
    const day = new Date(`${date.key}T12:00:00Z`).getUTCDay()
    // 1 = Senin, 6 = Sabtu
    // const today = new Date().getUTCDay()
    // console.log('today', today)
    return day !== 0 && day !== 5
    // return day
  })

  return {
    dates,
    slotOptions: BOOKING_TIME_SLOTS,
  }
}

export async function buildBookingSuggestionWhatsAppLink(args: {
  bookingId: string
  suggestedDate: string
  suggestedTimeSlot: string
}) {
  const booking = await prisma.booking.findUnique({ where: { id: args.bookingId } })

  if (!booking) throw new Error('Booking tidak ditemukan.')

  const cleanPhone = booking.phone.replace(/\D/g, '')
  const suggestionDate = new Date(args.suggestedDate)
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(suggestionDate)

  const text = encodeURIComponent(
    `Assalamu'alaikum ${booking.patientName}, untuk booking ${booking.service} kami menyarankan jadwal ${formattedDate} jam ${args.suggestedTimeSlot} WIB. Jika cocok, silakan balas pesan ini agar kami bantu konfirmasi. Terima kasih.`
  )

  return `https://wa.me/${cleanPhone}?text=${text}`
}

async function sendWaNotification(booking: {
  patientName: string
  phone: string
  service: string
  bookingDate: Date
  timeSlot: string
}) {
  const token = process.env.WA_API_TOKEN
  const ownerNumber = process.env.WA_OWNER_NUMBER
  if (!token || !ownerNumber) return

  const tanggal = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(booking.bookingDate))

  const pesan =
    `🏥 *BOOKING BARU - BERUBAT*\n\n` +
    `👤 Nama: ${booking.patientName}\n` +
    `📱 WA: ${booking.phone}\n` +
    `💊 Layanan: ${booking.service}\n` +
    `📅 Tanggal: ${tanggal}\n` +
    `🕐 Jam: ${booking.timeSlot} WIB\n\n` +
    `Segera konfirmasi jadwal pasien via WhatsApp.`

  try {
    await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        TOKEN: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: ownerNumber,
        message: pesan,
        countryCode: '62',
      }),
    })
  } catch (err) {
    // Notifikasi gagal tidak boleh block booking
    console.error('[Fonnte] Gagal kirim notifikasi:', err)
  }
}
