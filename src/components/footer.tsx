import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#booking', label: 'Booking' },
]

type FooterProps = {
  siteName?: string
  logoUrl?: string
  footerDescription?: string
  stptLabel?: string
  navigation?: { href: string; label: string }[]
  whatsAppNumber?: string
  addressTitle?: string
  addressLine?: string
  operatingHours?: string
}

export function Footer({
  siteName = 'BERUBAT',
  logoUrl = 'https://web-berubat.vercel.app/img/LOGO-BERUBAT.png',
  footerDescription = 'Panti Sehat BERUBAT — pusat terapi alami untuk syaraf, otot, sendi dan tulang. Tanpa operasi, berizin resmi.',
  stptLabel = 'STPT 448.1/STPT.04/DPMPTSP/2024',
  navigation = navLinks,
  whatsAppNumber = '6285817807393',
  addressTitle = 'Jl. Proklamasi No. 8c',
  addressLine = 'Kel. Cimone, Kec. Karawaci, Kota Tangerang',
  operatingHours = 'Selasa – Minggu, 10:00 – 18:00 WIB',
}: FooterProps) {
  const whatsAppHref = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}`
  return (
    <footer className="bg-brand-900 text-white">
      <div className="container-wide px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={logoUrl}
                alt="BERUBAT"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              {/* <span className="font-display text-xl font-bold text-white">{siteName}</span> */}
            </div>
            <p className="mb-4 text-[15px] leading-relaxed text-white/70">
              {footerDescription}
            </p>
            <div className="inline-block rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
              {stptLabel}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="mb-5 font-semibold text-white">Navigasi</h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-5 font-semibold text-white">Kontak</h4>
            <ul className="space-y-3 text-[15px] text-white/70">
              <li>
                <a
                  href={whatsAppHref}
                  className="transition-colors hover:text-white"
                >
                  {whatsAppNumber.startsWith('62') ? `+${whatsAppNumber}` : whatsAppNumber}
                </a>
              </li>
              <li>{addressTitle}, {addressLine}</li>
              <li>{operatingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} BERUBAT. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
