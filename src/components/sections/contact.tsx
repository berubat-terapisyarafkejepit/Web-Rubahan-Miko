import { FadeUp } from '@/components/motion-div'
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react'

const sosmed = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Berubat',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/be_rubat',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@be_rubat.holistik',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6285817807393',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
]

type ContactSectionProps = {
  title: string
  description: string
  whatsAppNumber: string
  addressTitle: string
  addressLine: string
  googleMapsUrl: string
  mapsEmbedUrl: string
  operatingHours: string
  socialLinks: { label: string; href: string }[]
}

export function ContactSection({
  title,
  description,
  whatsAppNumber,
  addressTitle,
  addressLine,
  googleMapsUrl,
  mapsEmbedUrl,
  operatingHours,
  socialLinks,
}: ContactSectionProps) {
  const whatsAppHref = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}`
  const socialMap = Object.fromEntries(sosmed.map((item) => [item.name, item.icon]))
  return (
    <section id="kontak" className="section-padding bg-white">
      <div className="container-wide">
        <FadeUp className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-gray-500">{description}</p>
        </FadeUp>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info kontak */}
          <FadeUp>
            <div className="space-y-5">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <Phone className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                  <p className="text-xl font-bold text-gray-900">
                    {whatsAppNumber.startsWith('62') ? `+${whatsAppNumber}` : whatsAppNumber}
                  </p>
                  <p className="mt-0.5 text-sm text-green-600 font-medium">Klik untuk chat langsung →</p>
                </div>
              </a>

              <div className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100">
                  <MapPin className="h-7 w-7 text-brand-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Lokasi</p>
                  <p className="text-lg font-bold text-gray-900">{addressTitle}</p>
                  <p className="text-gray-600">{addressLine}</p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                  >
                    Buka di Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <Clock className="h-7 w-7 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Jam Operasional</p>
                  <p className="text-xl font-bold text-gray-900">Jam Operasional</p>
                  <p className="text-lg text-gray-600">{operatingHours}</p>
                </div>
              </div>

              {/* Sosmed */}
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700 hover:shadow"
                  >
                    {socialMap[s.label] ?? null}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Google Maps embed */}
          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi BERUBAT di Google Maps"
                className="w-full"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
