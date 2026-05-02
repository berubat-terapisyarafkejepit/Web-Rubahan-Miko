import { getProduk } from '@/lib/actions/produk'
import { ProdukTable } from '@/components/admin/produk-table'
import { ProdukDialog } from '@/components/admin/produk-dialog'

export default async function ProdukPage() {
  const produk = await getProduk()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Produk Herbal</h1>
          <p className="mt-1 text-gray-500">Kelola stok dan informasi produk herbal.</p>
        </div>
        <ProdukDialog mode="create" />
      </div>
      <ProdukTable data={produk} />
    </div>
  )
}
