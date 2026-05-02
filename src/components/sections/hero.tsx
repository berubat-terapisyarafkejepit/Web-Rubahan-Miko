'use client'

import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

type HeroSectionProps = {
  badge: string
  eyebrow: string
  title: string
  titleHighlight?: string
  description: string
  imageUrl: string
  stats: { value: string; label: string }[]
}

export function HeroSection({
  badge,
  eyebrow,
  title,
  titleHighlight,
  description,
  imageUrl,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image dengan overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/75 to-brand-800/40" />

      {/* Ornamen lingkaran dekoratif */}
      <div className="absolute top-1/4 right-10 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />

      {/* Content */}
      <div className="container-wide relative z-10 px-4 py-32 md:px-8">
        <div className="max-w-2xl">
          {/* Badge STPT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 text-green-300" />
            {badge}
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-lg font-medium text-green-300"
          >
            {eyebrow}
          </motion.p>

          {/* Heading utama */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display mb-6 text-4xl font-bold leading-tight text-white text-balance md:text-5xl lg:text-6xl"
          >
            {title}{' '}
            {titleHighlight ? <span className="text-green-300">{titleHighlight}</span> : null}
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 text-lg leading-relaxed text-white/85"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#booking"
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-900/40 transition-all hover:bg-brand-500 hover:shadow-xl active:scale-95"
            >
              Booking Sekarang
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="#tentang"
              className="flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-7 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave bottom ornamen */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 30C1200 80 960 0 720 30C480 60 240 0 0 30L0 80Z" fill="#fafaf5" />
        </svg>
      </div>
    </section>
  )
}
