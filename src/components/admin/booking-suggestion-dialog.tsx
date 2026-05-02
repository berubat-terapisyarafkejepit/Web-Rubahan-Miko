'use client'

import { useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { MessageCircle, Loader2 } from 'lucide-react'
import { BOOKING_TIME_SLOTS } from '@/lib/booking-config'
import { buildBookingSuggestionWhatsAppLink } from '@/lib/actions/booking'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function getDateOptions() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index + 1)
    return date.toISOString().slice(0, 10)
  })
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function BookingSuggestionDialog({
  bookingId,
  patientName,
}: {
  bookingId: string
  patientName: string
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [suggestedDate, setSuggestedDate] = useState('')
  const [suggestedTimeSlot, setSuggestedTimeSlot] = useState('')
  const dateOptions = useMemo(() => getDateOptions(), [])

  const handleGenerate = () => {
    if (!suggestedDate || !suggestedTimeSlot) {
      toast.error('Pilih tanggal dan jam terlebih dahulu.')
      return
    }

    startTransition(async () => {
      try {
        const link = await buildBookingSuggestionWhatsAppLink({
          bookingId,
          suggestedDate,
          suggestedTimeSlot,
        })
        window.open(link, '_blank')
        toast.success('Link saran jadwal berhasil dibuat.')
        setOpen(false)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Gagal membuat link saran jadwal.')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center rounded-lg p-1.5 text-brand-600 hover:bg-brand-50">
        <MessageCircle className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sarankan Jadwal untuk {patientName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="suggest-date">Tanggal Saran</Label>
            <Select value={suggestedDate} onValueChange={(value) => setSuggestedDate(value || '')}>
              <SelectTrigger id="suggest-date">
                <SelectValue placeholder="Pilih tanggal" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="suggest-time">Jam Saran</Label>
            <Select
              value={suggestedTimeSlot}
              onValueChange={(value) => setSuggestedTimeSlot(value || '')}
            >
              <SelectTrigger id="suggest-time">
                <SelectValue placeholder="Pilih jam" />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isPending || !suggestedDate || !suggestedTimeSlot}
            className="w-full bg-brand-700 hover:bg-brand-800"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Kirim Saran via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
