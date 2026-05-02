'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2, Phone } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { updateBookingStatus, deleteBooking } from '@/lib/actions/booking'
import type { BookingStatus } from '@/lib/actions/booking'
import { BookingSuggestionDialog } from '@/components/admin/booking-suggestion-dialog'

type Booking = {
  id: string
  patientName: string
  phone: string
  service: string
  bookingDate: Date
  timeSlot: string
  status: string
  createdAt: Date
}

const filterTabs: { label: string; value: string }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Dikonfirmasi', value: 'CONFIRMED' },
  { label: 'Selesai', value: 'DONE' },
  { label: 'Dibatalkan', value: 'CANCELLED' },
]

export function BookingTable({
  data,
  activeStatus,
}: {
  data: Booking[]
  activeStatus?: BookingStatus
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleFilter = (val: string) => {
    const url = val === 'all' ? '/admin/booking' : `/admin/booking?status=${val}`
    router.push(url)
  }

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    startTransition(async () => {
      await updateBookingStatus(id, status)
      toast.success('Status booking diperbarui.')
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteBooking(id)
      toast.success('Booking dihapus.')
    })
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => {
          const active = (activeStatus ?? 'all') === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => handleFilter(tab.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
          Tidak ada booking dengan filter ini.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Pasien</TableHead>
                <TableHead className="font-semibold">Layanan</TableHead>
                <TableHead className="font-semibold">Jadwal</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((b) => (
                <TableRow key={b.id} className="hover:bg-gray-50">
                  <TableCell>
                    <p className="font-medium text-gray-900">{b.patientName}</p>
                    <a
                      href={`https://wa.me/${b.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {b.phone}
                    </a>
                  </TableCell>
                  <TableCell className="text-gray-700">{b.service}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(b.bookingDate).toLocaleDateString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-400">{b.timeSlot}</p>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={b.status}
                      onValueChange={(val) => handleUpdateStatus(b.id, val as BookingStatus)}
                      disabled={isPending}
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CONFIRMED">Dikonfirmasi</SelectItem>
                        <SelectItem value="DONE">Selesai</SelectItem>
                        <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <BookingSuggestionDialog bookingId={b.id} patientName={b.patientName} />
                      <AlertDialog>
                        <AlertDialogTrigger className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus booking ini?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Booking atas nama <strong>{b.patientName}</strong> akan dihapus
                            permanen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(b.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
