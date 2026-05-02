import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Admin Dashboard – BERUBAT',
}

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
