import { getBookings } from '@/lib/actions/booking'
import { BookingTable } from '@/components/admin/booking-table'
import type { BookingStatus } from '@/lib/actions/booking'

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const validStatuses: BookingStatus[] = ['PENDING', 'CONFIRMED', 'DONE', 'CANCELLED']
  const activeStatus = validStatuses.includes(status as BookingStatus)
    ? (status as BookingStatus)
    : undefined

  const bookings = await getBookings(activeStatus)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Manajemen Booking</h1>
        <p className="mt-1 text-gray-500">
          Lihat dan kelola semua jadwal terapi yang masuk.
        </p>
      </div>
      <BookingTable data={bookings} activeStatus={activeStatus} />
    </div>
  )
}
