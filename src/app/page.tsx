import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ServicesSection } from '@/components/sections/services'
import { GallerySection } from '@/components/sections/gallery'
import { TestimoniSection } from '@/components/sections/testimonials'
import { BookingCTASection } from '@/components/sections/booking-cta'
import { ContactSection } from '@/components/sections/contact'
import { Footer } from '@/components/footer'
import { getHomepageContent } from '@/lib/site-content'
import { getConfirmedAvailability } from '@/lib/actions/booking'
import { BOOKING_SERVICES } from '@/lib/booking-config'

export default async function HomePage() {
  const [content, availability] = await Promise.all([
    getHomepageContent(),
    getConfirmedAvailability(),
  ])

  return (
    <>
      <Navbar
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
      />
      <main>
        <HeroSection
          badge={content.homepage.heroBadge}
          eyebrow={content.homepage.heroEyebrow}
          title={content.homepage.heroTitle}
          titleHighlight={content.homepage.heroTitleHighlight}
          description={content.homepage.heroDescription}
          imageUrl={content.homepage.heroImageUrl}
          stats={content.homepage.heroStats}
        />
        <AboutSection
          badge={content.homepage.aboutBadge}
          title={content.homepage.aboutTitle}
          paragraphOne={content.homepage.aboutParagraphOne}
          paragraphTwo={content.homepage.aboutParagraphTwo}
          quote={content.homepage.aboutQuote}
          principles={content.homepage.principles}
          conditionEyebrow={content.homepage.conditionEyebrow}
          conditionTitle={content.homepage.conditionTitle}
          conditionDescription={content.homepage.conditionDescription}
          symptoms={content.homepage.symptoms}
        />
        <ServicesSection
          badge={content.homepage.servicesBadge}
          title={content.homepage.servicesTitle}
          description={content.homepage.servicesDescription}
          services={content.services}
          advantagesTitle={content.homepage.advantagesTitle}
          advantages={content.advantages}
        />
        <GallerySection
          badge={content.homepage.galleryBadge}
          title={content.homepage.galleryTitle}
          description={content.homepage.galleryDescription}
          items={content.gallery}
        />
        <TestimoniSection
          badge={content.homepage.testimonialsBadge}
          title={content.homepage.testimonialsTitle}
          description={content.homepage.testimonialsDescription}
          testimonials={content.testimonials}
        />
        <BookingCTASection
          badge={content.homepage.bookingBadge}
          title={content.homepage.bookingTitle}
          description={content.homepage.bookingDescription}
          whatsAppNumber={content.settings.whatsAppNumber}
          layananOptions={BOOKING_SERVICES}
          availabilityDates={availability.dates}
        />
        <ContactSection
          title={content.homepage.contactTitle}
          description={content.homepage.contactDescription}
          whatsAppNumber={content.settings.whatsAppNumber}
          addressTitle={content.settings.addressTitle}
          addressLine={content.settings.addressLine}
          googleMapsUrl={content.settings.googleMapsUrl}
          mapsEmbedUrl={content.settings.mapsEmbedUrl}
          operatingHours={content.settings.operatingHours}
          socialLinks={content.settings.socialLinks}
        />
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
