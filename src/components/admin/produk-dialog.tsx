'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Loader2 } from 'lucide-react'
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
import { createProduk, updateProduk } from '@/lib/actions/produk'

type Produk = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string | null
  isActive: boolean
}

type Props = { mode: 'create' } | { mode: 'edit'; produk: Produk }

export function ProdukDialog(props: Props) {
  const isEdit = props.mode === 'edit'
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    name: isEdit ? props.produk.name : '',
    description: isEdit ? props.produk.description : '',
    price: isEdit ? String(props.produk.price) : '',
    stock: isEdit ? String(props.produk.stock) : '',
    image: isEdit ? (props.produk.image ?? '') : '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const data = {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          image: form.image || undefined,
        }
        if (isEdit) {
          await updateProduk(props.produk.id, data)
          toast.success('Produk berhasil diperbarui.')
        } else {
          await createProduk(data)
          toast.success('Produk berhasil ditambahkan.')
        }
        setOpen(false)
      } catch {
        toast.error('Terjadi kesalahan, coba lagi.')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={
          isEdit
            ? 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100'
            : 'inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800'
        }
      >
        {isEdit ? (
          <>
            <Pencil className="h-4 w-4" /> Edit
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" /> Tambah Produk
          </>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Contoh: Minyak Herbal Sendi"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Deskripsi</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Deskripsi singkat produk..."
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="50000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stok</Label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                placeholder="10"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="image">URL Gambar (opsional)</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
              placeholder="https://..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending} className="bg-brand-700 hover:bg-brand-800">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
