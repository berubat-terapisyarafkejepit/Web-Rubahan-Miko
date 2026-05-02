import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BookingForm } from '@/components/booking/booking-form'
import { ShieldCheck, Clock, Phone } from 'lucide-react'
import { BOOKING_SERVICES, BOOKING_TIME_SLOTS } from '@/lib/booking-config'
import { getConfirmedAvailability } from '@/lib/actions/booking'
import { getHomepageContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Booking Jadwal Terapi – BERUBAT',
  description:
    'Pesan jadwal terapi syaraf kejepit, cedera olahraga, dan masalah postur di BERUBAT Tangerang. Mudah, cepat, dan dikonfirmasi via WhatsApp.',
}

export default async function BookingPage() {
  const [{ dates }, content] = await Promise.all([
    getConfirmedAvailability(),
    getHomepageContent(),
  ])

  return (
    <>
      <Navbar
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
      />
      <main className="bg-cream min-h-screen pt-24 pb-16">
        {/* Hero mini */}
        <div className="bg-linear-to-r from-brand-900 to-brand-800 py-14 text-center text-white">
          <p className="mb-2 text-sm font-medium tracking-widest text-green-300 uppercase">
            Langkah Pertama Menuju Kesembuhan
          </p>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Booking Jadwal Terapi
          </h1>
          <p className="mt-3 text-lg text-white/75">
            Isi formulir di bawah, kami akan konfirmasi jadwal Anda via WhatsApp.
          </p>
        </div>

        <div className="container-wide px-4 md:px-8 mt-10">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Info Samping */}
            <aside className="space-y-5 lg:order-last">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-display mb-4 font-bold text-gray-900 text-lg">Info Penting</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-[15px] text-gray-600">
                      Terapi dilakukan oleh terapis berpengalaman dan berizin resmi STPT.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-[15px] text-gray-600">
                      Jam operasional: <strong>Selasa – Minggu, 10:00 – 18:00 WIB</strong>{' '}
                      <span className="font-semibold text-red-600">Senin &amp; Sabtu Libur</span>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-[15px] text-gray-600">
                      Konfirmasi akan dikirim via WhatsApp ke nomor yang Anda daftarkan.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6">
                <p className="text-sm font-semibold text-brand-800 mb-2">Lokasi Klinik</p>
                <p className="text-[15px] text-brand-900 leading-relaxed">
                  Jl. Proklamasi No. 8c, Kel. Cimone,<br />
                  Kec. Karawaci, Kota Tangerang
                </p>
                <a
                  href="https://maps.app.goo.gl/ZJu3QXKX5TkLdoVWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline"
                >
                  Lihat di Google Maps →
                </a>
              </div>

              <div className="rounded-2xl bg-green-50 border border-green-100 p-6">
                <p className="text-sm font-semibold text-green-800 mb-2">Atau Chat Langsung</p>
                <a
                  href={`https://wa.me/${content.settings.whatsAppNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold text-green-700 text-lg hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  {content.settings.whatsAppNumber.startsWith('62')
                    ? `+${content.settings.whatsAppNumber}`
                    : content.settings.whatsAppNumber}
                </a>
              </div>
            </aside>

            {/* Form Booking */}
            <div className="lg:col-span-2">
              <BookingForm
                layananList={BOOKING_SERVICES}
                timeSlots={BOOKING_TIME_SLOTS}
                availabilityDates={dates}
                whatsAppNumber={content.settings.whatsAppNumber}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        footerDescription={content.settings.footerDescription}
        stptLabel={content.settings.stptLabel}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
        addressTitle={content.settings.addressTitle}
        addressLine={content.settings.addressLine}
        operatingHours={content.settings.operatingHours}
      />
    </>
  )
}
