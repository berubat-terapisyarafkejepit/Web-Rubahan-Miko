import { FadeUp, ScaleIn } from '@/components/motion-div'
import { Star, Quote } from 'lucide-react'

type TestimoniSectionProps = {
  badge: string
  title: string
  description: string
  testimonials: {
    id: string
    name: string
    content: string
    rating: number
  }[]
}

export async function TestimoniSection({
  badge,
  title,
  description,
  testimonials,
}: TestimoniSectionProps) {

  return (
    <section id="testimoni" className="section-padding bg-gradient-to-br from-brand-900 to-brand-800">
      {/* Ornamen */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <FadeUp className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-green-300">
            {badge}
          </span>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-white/70">{description}</p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <ScaleIn key={t.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/15">
                <Quote className="mb-3 h-8 w-8 flex-shrink-0 text-green-300/60" />
                <p className="mb-5 flex-1 text-[15px] leading-relaxed text-white/85 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}
