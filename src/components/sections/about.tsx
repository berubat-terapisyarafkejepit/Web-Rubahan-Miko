import { FadeUp, FadeIn } from '@/components/motion-div'
import { Leaf, Heart, Clock } from 'lucide-react'

const iconMap = {
  leaf: Leaf,
  clock: Clock,
  heart: Heart,
}

type AboutSectionProps = {
  badge: string
  title: string
  paragraphOne: string
  paragraphTwo: string
  quote: string
  principles: { title: string; description: string; icon: string }[]
  conditionEyebrow: string
  conditionTitle: string
  conditionDescription: string
  symptoms: { label: string }[]
}

export function AboutSection({
  badge,
  title,
  paragraphOne,
  paragraphTwo,
  quote,
  principles,
  conditionEyebrow,
  conditionTitle,
  conditionDescription,
  symptoms,
}: AboutSectionProps) {
  return (
    <section id="tentang" className="bg-cream section-padding">
      <div className="container-wide">
        {/* Judul section */}
        <FadeUp className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            {badge}
          </span>
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h2>
        </FadeUp>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Teks tentang */}
          <div className="space-y-5">
            <FadeUp>
              <p className="text-lg leading-relaxed text-gray-700">
                {paragraphOne}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-lg leading-relaxed text-gray-700">
                {paragraphTwo}
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="rounded-xl border-l-4 border-brand-500 bg-brand-50 p-5 text-[17px] italic leading-relaxed text-brand-900">
                &ldquo;{quote}&rdquo;
              </p>
            </FadeUp>

            {/* Prinsip */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {principles.map((p, i) => {
                const Icon = iconMap[p.icon as keyof typeof iconMap] || Leaf
                return (
                  <FadeUp key={p.title} delay={i * 0.1}>
                    <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                        <Icon className="h-6 w-6 text-brand-700" />
                      </div>
                      <h4 className="mb-1 font-semibold text-gray-900">{p.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-500">{p.description}</p>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          </div>

          {/* Gejala Syaraf Kejepit */}
          <FadeIn delay={0.2}>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 p-8 text-white shadow-xl">
              <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-300">
                {conditionEyebrow}
              </div>
              <h3 className="font-display mb-5 text-2xl font-bold text-white md:text-3xl">
                {conditionTitle}
              </h3>
              <p className="mb-6 leading-relaxed text-white/80">
                {conditionDescription}
              </p>
              <div className="mb-6">
                <p className="mb-3 font-semibold text-green-300">Gejala yang dirasakan pasien:</p>
                <ul className="space-y-3">
                  {symptoms.map((g) => (
                    <li key={g.label} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 rounded-full bg-green-400/20 p-1">
                        <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L5 8.5 2 5.5l-1 1L5 10.5l6-7-1-0.5z" />
                        </svg>
                      </span>
                      <span className="text-white/85">{g.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 transition-all hover:bg-green-50"
              >
                Konsultasikan Sekarang →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
