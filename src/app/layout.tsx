import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const body = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const display = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'BERUBAT – Terapi Syaraf & Cedera Tanpa Operasi | Tangerang',
  description:
    'Panti Sehat BERUBAT, spesialisasi terapi manual untuk syaraf kejepit (HNP), cedera olahraga, dan masalah postur tubuh. Berizin resmi STPT, berlokasi di Tangerang.',
  keywords: 'terapi syaraf kejepit, HNP, bekam, pijat, cedera olahraga, tangerang, berubat',
  openGraph: {
    title: 'BERUBAT – Terapi Syaraf & Cedera Tanpa Operasi',
    description: 'Spesialisasi terapi manual alami. Tanpa operasi, berizin resmi.',
    url: 'https://berubat.id',
    siteName: 'BERUBAT',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  )
}
