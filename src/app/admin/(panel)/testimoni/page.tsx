import { getTestimoni } from '@/lib/actions/testimoni'
import { TestimoniTable } from '@/components/admin/testimoni-table'
import { TestimoniDialog } from '@/components/admin/testimoni-dialog'

export default async function TestimoniPage() {
  const data = await getTestimoni()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Testimoni</h1>
          <p className="mt-1 text-gray-500">
            Kelola dan approve testimoni yang tampil di landing page.
          </p>
        </div>
        <TestimoniDialog />
      </div>
      <TestimoniTable data={data} />
    </div>
  )
}
