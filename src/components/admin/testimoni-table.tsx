'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Star, Trash2, Eye, EyeOff } from 'lucide-react'
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
import { deleteTestimoni, updateTestimoniShow } from '@/lib/actions/testimoni'

type Testimoni = {
  id: string
  name: string
  content: string
  rating: number
  show: boolean
}

export function TestimoniTable({ data }: { data: Testimoni[] }) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      await updateTestimoniShow(id, !current)
      toast.success(current ? 'Testimoni disembunyikan.' : 'Testimoni ditampilkan.')
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTestimoni(id)
      toast.success('Testimoni dihapus.')
    })
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
        Belum ada testimoni.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Pasien</TableHead>
            <TableHead className="font-semibold">Isi Testimoni</TableHead>
            <TableHead className="font-semibold">Rating</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((t) => (
            <TableRow key={t.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900 whitespace-nowrap">{t.name}</TableCell>
              <TableCell className="max-w-xs">
                <p className="line-clamp-2 text-sm text-gray-600">{t.content}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    t.show
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-100'
                  }
                >
                  {t.show ? 'Tampil' : 'Tersembunyi'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleToggle(t.id, t.show)}
                    className="gap-1.5 text-gray-500"
                    title={t.show ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {t.show ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4 text-green-500" />
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="inline-flex items-center justify-center rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus testimoni ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Testimoni dari <strong>{t.name}</strong> akan dihapus permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(t.id)}
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
