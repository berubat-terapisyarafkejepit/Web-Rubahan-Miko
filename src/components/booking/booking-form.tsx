'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createBooking } from '@/lib/actions/booking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CalendarDays,
  Clock,
  User,
  Stethoscope,
} from 'lucide-react'

type Props = {
  layananList: string[]
  timeSlots: string[]
  availabilityDates: {
    key: string
    dateISO: string
    occupiedSlots: string[]
    occupiedCount: number
    totalSlots: number
    state: 'available' | 'partial' | 'full'
  }[]
  whatsAppNumber: string
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(d)
}

function formatDateShort(d: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(d)
}

type Step = 1 | 2 | 3 | 4 | 5

export function BookingForm({ layananList, timeSlots, availabilityDates, whatsAppNumber }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    layanan: '',
    tanggal: null as Date | null,
    jam: '',
    nama: '',
    phone: '',
  })

  const canNextStep1 = !!form.layanan
  const canNextStep2 = !!form.tanggal
  const canNextStep3 = !!form.jam
  const canSubmit = !!form.nama && !!form.phone
  const selectedDateKey = form.tanggal ? form.tanggal.toISOString().slice(0, 10) : ''
  const selectedDateAvailability = availabilityDates.find((item) => item.key === selectedDateKey)
  const occupiedSlots = new Set(selectedDateAvailability?.occupiedSlots || [])

  const handleSubmit = () => {
    if (!form.tanggal) return
    startTransition(async () => {
      try {
        await createBooking({
          patientName: form.nama,
          phone: form.phone,
          service: form.layanan,
          bookingDate: form.tanggal!,
          timeSlot: form.jam,
        })
        setStep(5)
      } catch (e) {
        console.error(e)
        alert('Terjadi kesalahan, coba lagi.')
      }
    })
  }

  const steps = [
    { label: 'Layanan', icon: Stethoscope },
    { label: 'Tanggal', icon: CalendarDays },
    { label: 'Jam', icon: Clock },
    { label: 'Data Diri', icon: User },
  ]

  if (step === 5) {
    return (
      <BookingSuccess
        form={form}
        onBack={() => router.push('/')}
        whatsAppNumber={whatsAppNumber}
      />
    )
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-lg overflow-hidden">
      {/* Step Indicator */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => {
            const n = (i + 1) as Step
            const done = step > n
            const active = step === n
            return (
              <div key={s.label} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all',
                    done
                      ? 'bg-brand-600 text-white'
                      : active
                        ? 'bg-brand-700 text-white ring-4 ring-brand-100'
                        : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : n}
                </div>
                <span
                  className={cn(
                    'hidden text-sm font-medium sm:block',
                    active ? 'text-brand-700' : done ? 'text-brand-500' : 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 mx-1" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Step 1 – Pilih Layanan */}
        {step === 1 && (
          <div>
            <h2 className="font-display mb-1 text-xl font-bold text-gray-900">
              Pilih Jenis Layanan
            </h2>
            <p className="mb-6 text-gray-500">Apa keluhan yang ingin Anda tangani?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {layananList.map((l) => (
                <button
                  key={l}
                  onClick={() => setForm((p) => ({ ...p, layanan: l }))}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border-2 p-4 text-left text-[15px] font-medium transition-all hover:border-brand-400',
                    form.layanan === l
                      ? 'border-brand-600 bg-brand-50 text-brand-800'
                      : 'border-gray-200 text-gray-700'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                      form.layanan === l ? 'border-brand-600 bg-brand-600' : 'border-gray-300'
                    )}
                  >
                    {form.layanan === l && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 – Pilih Tanggal */}
        {step === 2 && (
          <div>
            <h2 className="font-display mb-1 text-xl font-bold text-gray-900">Pilih Tanggal</h2>
            <p className="mb-6 text-gray-500">Tersedia 14 hari ke depan.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {availabilityDates.map((entry) => {
                const d = new Date(entry.dateISO)
                const selected = form.tanggal?.toDateString() === d.toDateString()
                return (
                  <button
                    key={entry.key}
                    onClick={() => setForm((p) => ({ ...p, tanggal: d }))}
                    className={cn(
                      'rounded-xl border-2 p-3 text-center text-sm transition-all hover:border-brand-400',
                      selected
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : entry.state === 'full'
                          ? 'border-red-300 bg-red-50 text-red-700 hover:border-red-400'
                          : entry.state === 'partial'
                            ? 'border-orange-300 bg-orange-50 text-orange-700 hover:border-orange-400'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <p className="font-semibold">{formatDateShort(d)}</p>
                    {entry.state === 'partial' ? (
                      <p className="mt-1 text-[11px] font-medium">Sebagian penuh</p>
                    ) : null}
                    {entry.state === 'full' ? (
                      <p className="mt-1 text-[11px] font-medium">Penuh</p>
                    ) : null}
                  </button>
                )
              })}
            </div>
            {form.tanggal && (
              <p className="mt-4 text-sm font-medium text-brand-700">
                ✓ Dipilih: {formatDate(form.tanggal)}
              </p>
            )}
          </div>
        )}

        {/* Step 3 – Pilih Jam */}
        {step === 3 && (
          <div>
            <h2 className="font-display mb-1 text-xl font-bold text-gray-900">Pilih Jam</h2>
            <p className="mb-6 text-gray-500">
              Pilih slot waktu yang tersedia untuk{' '}
              <strong>{form.tanggal ? formatDate(form.tanggal) : ''}</strong>.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {timeSlots.map((jam) => {
                const isOccupied = occupiedSlots.has(jam)
                return (
                  <button
                    key={jam}
                    onClick={() => {
                      if (!isOccupied) setForm((p) => ({ ...p, jam }))
                    }}
                    disabled={isOccupied}
                    className={cn(
                      'rounded-xl border-2 py-3 text-center text-base font-semibold transition-all hover:border-brand-400',
                      form.jam === jam
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : isOccupied
                          ? 'cursor-not-allowed border-red-300 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {jam}
                  </button>
                )
              })}
            </div>
            {selectedDateAvailability?.occupiedSlots.length ? (
              <p className="mt-4 text-sm text-gray-500">
                Slot merah sudah memiliki booking berstatus <strong>CONFIRMED</strong>.
              </p>
            ) : null}
          </div>
        )}

        {/* Step 4 – Data Diri */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display mb-1 text-xl font-bold text-gray-900">Data Diri</h2>
              <p className="text-gray-500">Isi nama dan nomor WhatsApp untuk konfirmasi.</p>
            </div>

            {/* Ringkasan */}
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-sm space-y-1">
              <p className="font-semibold text-brand-800 mb-2">Ringkasan Booking</p>
              <p className="text-brand-700">
                🩺 <strong>Layanan:</strong> {form.layanan}
              </p>
              <p className="text-brand-700">
                📅 <strong>Tanggal:</strong>{' '}
                {form.tanggal ? formatDate(form.tanggal) : ''}
              </p>
              <p className="text-brand-700">
                🕐 <strong>Jam:</strong> {form.jam} WIB
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nama" className="text-base font-semibold text-gray-700">
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                type="text"
                placeholder="Contoh: Bapak Ahmad"
                value={form.nama}
                onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
                className="h-12 text-base"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-base font-semibold text-gray-700">
                Nomor WhatsApp
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Contoh: 08123456789"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="h-12 text-base"
                required
              />
              <p className="text-xs text-gray-400">
                Konfirmasi jadwal akan dikirim ke nomor ini.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3 font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" /> Kembali
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={
                (step === 1 && !canNextStep1) ||
                (step === 2 && !canNextStep2) ||
                (step === 3 && !canNextStep3)
              }
              className="ml-auto flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Lanjut <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={() => setStep(4)}
              disabled={!canNextStep3}
              className="ml-auto flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Lanjut <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isPending}
              className="ml-auto flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3 font-bold text-white shadow-md transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Mengirim...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" /> Konfirmasi Booking
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function BookingSuccess({
  form,
  onBack,
  whatsAppNumber,
}: {
  form: { nama: string; layanan: string; tanggal: Date | null; jam: string; phone: string }
  onBack: () => void
  whatsAppNumber: string
}) {
  const tanggal = form.tanggal
    ? new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(form.tanggal)
    : ''

  const waLink = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Assalamu'alaikum, saya ${form.nama} sudah booking terapi ${form.layanan} pada ${tanggal} jam ${form.jam} WIB. Mohon konfirmasinya. Terima kasih.`
  )}`

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg text-center">
      <div className="mb-5 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
      </div>
      <h2 className="font-display mb-2 text-2xl font-bold text-gray-900">
        Booking Berhasil! 🎉
      </h2>
      <p className="mb-6 text-gray-500">
        Terima kasih, <strong>{form.nama}</strong>. Booking Anda sudah kami terima.
      </p>

      <div className="mb-8 rounded-2xl bg-brand-50 border border-brand-100 p-5 text-left space-y-2 text-[15px]">
        <p className="text-brand-700">🩺 <strong>Layanan:</strong> {form.layanan}</p>
        <p className="text-brand-700">📅 <strong>Tanggal:</strong> {tanggal}</p>
        <p className="text-brand-700">🕐 <strong>Jam:</strong> {form.jam} WIB</p>
        <p className="text-brand-700">📱 <strong>WA:</strong> {form.phone}</p>
      </div>

      <p className="mb-5 text-sm text-gray-500">
        Tim kami akan menghubungi Anda via WhatsApp untuk konfirmasi jadwal. Atau, Anda bisa langsung chat sekarang:
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white hover:bg-green-700"
        >
          Chat via WhatsApp →
        </a>
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border-2 border-gray-200 px-5 py-3.5 font-semibold text-gray-600 hover:bg-gray-50"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}
