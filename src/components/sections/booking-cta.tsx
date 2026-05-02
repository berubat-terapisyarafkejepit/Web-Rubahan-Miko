'use client'

import { FadeUp } from '@/components/motion-div'
import { CalendarDays, MoveUpLeft, MoveUpRight } from 'lucide-react'

type BookingCTASectionProps = {
  badge: string
  title: string
  description: string
  whatsAppNumber: string
  layananOptions: string[]
  availabilityDates: {
    key: string
    dateISO: string
    occupiedSlots: string[]
    occupiedCount: number
    totalSlots: number
    state: 'available' | 'partial' | 'full'
  }[]
}

export function BookingCTASection({
  badge,
  title,
  description,
  whatsAppNumber: _whatsAppNumber,
  layananOptions: _layananOptions,
  availabilityDates: _availabilityDates,
}: BookingCTASectionProps) {
  return (
    <section
      id="booking"
      className="section-padding relative overflow-hidden bg-cream"
    >
      {/* Ornamen lingkaran */}
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-100 opacity-60" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-brand-100 opacity-40" />

      <div className="container-wide relative z-10">
        <div className="mx-auto max-w-2xl">
          <FadeUp className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              {badge}
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-gray-600">{description}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative px-10 pb-12 sm:px-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 left-0 text-brand-500"
              >
                <div className="rounded-full bg-transparent p-2 animate-bounce">
                  <MoveUpRight className="h-10 w-10 -rotate-12 text-rose-600" strokeWidth={2.25} />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -bottom-2 text-brand-500"
              >
                <div
                  className="rounded-full bg-transparent p-2 animate-bounce"
                  style={{ animationDelay: '180ms' }}
                >
                  <MoveUpLeft className="h-10 w-10 rotate-12 text-rose-600" strokeWidth={2.25} />
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">

                <div className="space-y-3">
                  <a
                    href="/booking"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-brand-600 bg-brand-200 px-6 py-4 text-lg font-semibold text-brand-700 transition-all hover:bg-brand-400"
                  >
                    <CalendarDays className="h-5 w-5" />
                    Pilih Tanggal & Jam
                  </a>
                </div>

                <p className="mt-5 text-center text-sm text-gray-500">
                  Terapi tersedia <strong>Selasa – Minggu, 10:00 – 18:00 WIB</strong>{' '}
                  <span className="font-semibold text-red-600">Senin &amp; Sabtu Libur</span>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
