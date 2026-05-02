'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Package,
  MessageSquareQuote,
  CalendarCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/produk', label: 'Produk Herbal', icon: Package },
  { href: '/admin/testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { href: '/admin/booking', label: 'Booking', icon: CalendarCheck },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
        <Image
          src="https://web-berubat.vercel.app/img/LOGO-BERUBAT.png"
          alt="BERUBAT"
          width={36}
          height={36}
          className="h-9 w-auto"
        />
        <div>
          <p className="font-display font-bold text-gray-900">BERUBAT</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all',
                active
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="flex items-center gap-3">
                <item.icon className={cn('h-5 w-5', active ? 'text-brand-600' : 'text-gray-400')} />
                {item.label}
              </span>
              {active && <ChevronRight className="h-4 w-4 text-brand-500" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-4">
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </Button>
      </div>
    </aside>
  )
}
