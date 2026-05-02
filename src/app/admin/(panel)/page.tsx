import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MessageSquareQuote, CalendarCheck, Clock } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const [totalProduk, totalTestimoni, totalBooking, bookingPending, bookingTerbaru] =
    await Promise.all([
      prisma.herbalProduct.count({ where: { isActive: true } }),
      prisma.testimonial.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ])
  return { totalProduk, totalTestimoni, totalBooking, bookingPending, bookingTerbaru }
}

const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default async function AdminDashboard() {
  const session = await auth()
  const { totalProduk, totalTestimoni, totalBooking, bookingPending, bookingTerbaru } =
    await getStats()

  const stats = [
    {
      title: 'Produk Aktif',
      value: totalProduk,
      icon: Package,
      href: '/admin/produk',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Testimoni',
      value: totalTestimoni,
      icon: MessageSquareQuote,
      href: '/admin/testimoni',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Total Booking',
      value: totalBooking,
      icon: CalendarCheck,
      href: '/admin/booking',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Menunggu Konfirmasi',
      value: bookingPending,
      icon: Clock,
      href: '/admin/booking?status=PENDING',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Selamat datang, {session?.user?.name} 👋
        </h1>
        <p className="mt-1 text-gray-500">Berikut ringkasan data klinik BERUBAT hari ini.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.title} href={s.href}>
            <Card className="cursor-pointer border-gray-100 transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{s.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Booking Terbaru */}
      <Card className="border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Booking Terbaru</CardTitle>
          <Link
            href="/admin/booking"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Lihat semua →
          </Link>
        </CardHeader>
        <CardContent>
          {bookingTerbaru.length === 0 ? (
            <p className="py-8 text-center text-gray-400">Belum ada booking.</p>
          ) : (
            <div className="space-y-3">
              {bookingTerbaru.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{b.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {b.service} — {b.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(b.bookingDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      · {b.timeSlot}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[b.status] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
