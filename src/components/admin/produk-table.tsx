'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { deleteProduk, updateProduk } from '@/lib/actions/produk'
import { ProdukDialog } from './produk-dialog'

type Produk = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string | null
  isActive: boolean
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export function ProdukTable({ data }: { data: Produk[] }) {
  const [isPending, startTransition] = useTransition()

  const handleToggleActive = (id: string, current: boolean) => {
    startTransition(async () => {
      await updateProduk(id, { isActive: !current })
      toast.success(`Produk ${!current ? 'diaktifkan' : 'dinonaktifkan'}.`)
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteProduk(id)
      toast.success('Produk dihapus.')
    })
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
        Belum ada produk. Klik &ldquo;Tambah Produk&rdquo; untuk memulai.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Nama Produk</TableHead>
            <TableHead className="font-semibold">Harga</TableHead>
            <TableHead className="font-semibold">Stok</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-400 line-clamp-1">{p.description}</p>
                </div>
              </TableCell>
              <TableCell className="font-medium text-gray-700">{formatRupiah(p.price)}</TableCell>
              <TableCell>
                <span className={p.stock <= 5 ? 'font-semibold text-red-600' : 'text-gray-700'}>
                  {p.stock}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    p.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-100'
                  }
                >
                  {p.isActive ? 'Aktif' : 'Nonaktif'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <ProdukDialog mode="edit" produk={p} />
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleToggleActive(p.id, p.isActive)}
                    className="gap-1.5 text-gray-500"
                  >
                    {p.isActive ? (
                      <ToggleRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-4 w-4" />
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus produk ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Produk <strong>{p.name}</strong> akan dihapus permanen dan tidak bisa
                          dikembalikan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(p.id)}
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
  )
}
