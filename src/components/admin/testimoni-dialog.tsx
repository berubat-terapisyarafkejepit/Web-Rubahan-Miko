'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createTestimoni } from '@/lib/actions/testimoni'

export function TestimoniDialog() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({ name: '', content: '', rating: '5', show: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createTestimoni({
          name: form.name,
          content: form.content,
          rating: Number(form.rating),
          show: form.show,
        })
        toast.success('Testimoni berhasil ditambahkan.')
        setOpen(false)
        setForm({ name: '', content: '', rating: '5', show: true })
      } catch {
        toast.error('Terjadi kesalahan, coba lagi.')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
        <Plus className="h-4 w-4" /> Tambah Testimoni
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Testimoni</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="tname">Nama Pasien</Label>
            <Input
              id="tname"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ka Rima (Tangerang)"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="content">Isi Testimoni</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              placeholder="Cerita pengalaman pasien..."
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="rating">Rating (1–5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tampilkan di Landing?</Label>
              <div className="flex items-center gap-3 pt-2">
                {[true, false].map((v) => (
                  <label key={String(v)} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={form.show === v}
                      onChange={() => setForm((p) => ({ ...p, show: v }))}
                      className="accent-brand-600"
                    />
                    {v ? 'Ya' : 'Tidak'}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending} className="bg-brand-700 hover:bg-brand-800">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
