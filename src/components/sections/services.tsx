import Image from 'next/image'
import { FadeUp, ScaleIn } from '@/components/motion-div'
import { CheckCircle2 } from 'lucide-react'

const layanan = [
  {
    title: 'Syaraf Kejepit / HNP',
    description:
      'Penanganan HNP (hernia nucleus pulposus) atau syaraf kejepit tanpa alat khusus: kombinasi peregangan, pelemasan, dan pijatan khusus untuk memperbaiki postur, melepaskan tekanan saraf, dan memulihkan jalur otot serta saraf tepi.',
    imageUrl: 'https://web-berubat.vercel.app/img/hnp-pinnggang.jpg',
    items: ['HNP Lumbar, Sacrum atau Cervical', 'Sciatica', 'Pemulihan Mobilitas'],
  },
  {
    title: 'Cedera Umum & Olahraga',
    description:
      'Penanganan cedera otot dan sendi baik akibat olahraga atau aktifitas sehari-hari dengan metode yang aman dan efektif.',
    imageUrl: 'https://web-berubat.vercel.app/img/scatia.jpg',
    items: ['Cedera Seluruh Sendi (engkel, bahu, lutut, dll)', 'Otot Yang Tertarik', 'Pemulihan Atlet atau Gym'],
  },
  {
    title: 'Masalah Postur Tubuh',
    description:
      'Menangani berbagai macam masalah postur tubuh akibat ketidakseimbangan otot dan rangka tubuh.',
    imageUrl: 'https://web-berubat.vercel.app/img/postur-sko.jpg',
    items: ['Bahu Tinggi Sebelah', 'Skoliosis', 'Kaki Panjang Sebelah'],
  },
]

const keunggulan = [
  { angka: 'Tanpa Operasi', desc: 'Metode alami tanpa tindakan medis invasif' },
  { angka: 'Aman & Legal', desc: 'Berizin resmi, terdaftar sebagai STPT' },
  { angka: 'Profesional', desc: 'Terapis berpengalaman dan terlatih khusus' },
  { angka: 'Hasil Nyata', desc: 'Pemulihan terukur dalam beberapa sesi' },
]

type ServicesSectionProps = {
  badge: string
  title: string
  description: string
  services: {
    title: string
    description: string
    imageUrl: string
    items: string[]
  }[]
  advantagesTitle: string
  advantages: {
    title: string
    description: string
  }[]
}

export function ServicesSection({
  badge,
  title,
  description,
  services = layanan,
  advantagesTitle,
  advantages = keunggulan.map((item) => ({
    title: item.angka,
    description: item.desc,
  })),
}: ServicesSectionProps) {
  return (
    <>
      {/* Layanan */}
      <section id="layanan" className="section-padding bg-white">
        <div className="container-wide">
          <FadeUp className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              {badge}
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-gray-500">{description}</p>
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                    <h3 className="font-display absolute bottom-4 left-4 right-4 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-5 flex-1 text-[16px] leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5">
                      {item.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[15px] text-gray-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#booking"
                      className="mt-6 block rounded-xl bg-brand-50 py-3 text-center font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                      Booking Sekarang →
                    </a>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="bg-pattern section-padding bg-brand-50">
        <div className="container-wide">
          <FadeUp className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              {advantagesTitle}
            </h2>
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((k, i) => (
              <FadeUp key={k.title} delay={i * 0.08}>
                <div className="flex flex-col items-center rounded-2xl bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
                    <CheckCircle2 className="h-7 w-7 text-brand-700" />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-bold text-gray-900">{k.title}</h3>
                  <p className="text-[15px] leading-relaxed text-gray-500">{k.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
