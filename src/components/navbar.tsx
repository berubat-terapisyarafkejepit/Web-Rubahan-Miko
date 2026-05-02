'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#booking', label: 'Booking' },
]

type NavbarProps = {
  siteName?: string
  logoUrl?: string
  navigation?: { href: string; label: string }[]
  whatsAppNumber?: string
}

export function Navbar({
  siteName = 'BERUBAT',
  logoUrl = '/images/LOGO-BERUBAT.png',
  navigation = navLinks,
  whatsAppNumber = '6285817807393',
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const whatsAppHref = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}`

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container-wide flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoUrl}
            alt="Logo BERUBAT"
            width={44}
            height={44}
            className="h-11 w-auto"
          />
          {/* <span
            className={cn(
              'font-display text-xl font-bold tracking-tight transition-colors',
              scrolled ? 'text-brand-800' : 'text-white'
            )}
          >
            {siteName}
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[15px] font-medium transition-colors hover:text-brand-600',
                scrolled ? 'text-gray-700' : 'text-white/90'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-brand-800 hover:shadow-lg md:flex"
        >
          <Phone className="h-4 w-4" />
          Hubungi Kami
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          className={cn(
            'rounded-lg p-2 transition-colors md:hidden',
            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3.5 text-lg font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            Hubungi via WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
