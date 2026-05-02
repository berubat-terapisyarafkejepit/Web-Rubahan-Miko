'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { FadeUp, ScaleIn } from '@/components/motion-div'

const fasilitas = [
  {
    imageUrl: 'https://web-berubat.vercel.app/img/tempat-tidur.jpg',
    alt: 'Ruang Terapi Utama',
    label: 'Ruang Terapi Utama',
  },
  {
    imageUrl: 'https://web-berubat.vercel.app/img/ruang-konsul.jpg',
    alt: 'Ruang Konsultasi',
    label: 'Ruang Konsultasi',
  },
  {
    imageUrl: 'https://web-berubat.vercel.app/img/ruang-tunggu.jpg',
    alt: 'Area Tunggu Nyaman',
    label: 'Area Tunggu Nyaman',
  },
  {
    imageUrl: 'https://web-berubat.vercel.app/img/parkiran.jpg',
    alt: 'Area Parkir Luas',
    label: 'Area Parkir Luas',
  },
  {
    imageUrl: 'https://web-berubat.vercel.app/img/nyeri-belikat.jpg',
    alt: 'Terapi Nyeri Belikat',
    label: 'Sesi Terapi',
  },
  {
    imageUrl: 'https://web-berubat.vercel.app/img/sakit-pinggang.jpg',
    alt: 'Terapi Punggung',
    label: 'Terapi Punggung',
  },
]

type GallerySectionProps = {
  badge: string
  title: string
  description: string
  items?: {
    imageUrl: string
    alt: string
    label: string
  }[]
}

export function GallerySection({
  badge,
  title,
  description,
  items = fasilitas,
}: GallerySectionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section id="galeri" className="section-padding bg-white">
      <div className="container-wide">
        <FadeUp className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            {badge}
          </span>
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-gray-500">{description}</p>
        </FadeUp>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <ScaleIn key={item.alt} delay={i * 0.07}>
              <button
                onClick={() => setSelected(item.imageUrl)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
            </ScaleIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setSelected(null)}
            aria-label="Tutup"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Foto fasilitas"
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
