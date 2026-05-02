import { prisma } from '@/lib/prisma'
import { getPayloadClient } from '@/lib/payload/client'

type MediaLike = {
  url?: string | null
}

type PayloadServiceDoc = {
  title?: string
  description?: string
  image?: MediaLike | number | string | null
  items?: { label?: string | null }[] | null
  isActive?: boolean | null
}

type PayloadAdvantageDoc = {
  title?: string
  description?: string
}

type PayloadGalleryDoc = {
  image?: MediaLike | number | string | null
  alt?: string
  label?: string
}

type PayloadPostDoc = {
  id: string
  title?: string
  slug?: string
  excerpt?: string
  featuredImage?: MediaLike | number | string | null
  publishedAt?: string | null
  contentHTML?: string | null
}

const fallbackTestimonials = [
  {
    id: '1',
    name: 'Ka Rima (Tangerang)',
    content:
      "Alhamdulillaah pertama kali dateng much much better, sakit punggungku 4 th berakhir sudah, nyesel banget baru tau. Entah udah abis berapa juta ke tukang pijat refleksi ternyata yang masalah ligamennya. Maasyaa'Allah di kasih jalan sembuh juga",
    rating: 5,
  },
  {
    id: '2',
    name: 'Daffa (Guru)',
    content:
      '3x kesini, syaraf kejepit L3-L5, tangan kanan kiri muntir dan cedera ligamen engkel. Alhamdulillah selalu lancar dan sembuh, murah dan terpercaya',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ibu Maya (Kab. Tangerang)',
    content:
      'Alhamdulillaah ibu saya syaraf kejepit dua kali kesini sembuh, terimakasih mas semoga Allah mudahkan segala urusan.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Akmal (Tangerang)',
    content:
      'Sudah beberapa kali kesini dan Alhamdulillah dikasih kebaikan dan kesembuhan oleh Allah, dan untuk bapaknya ramah dan baik sekali, betul2 mengobati secara sabar dan fokus, dijelaskan juga secara detail dan rinci atas sakit yg ditimbulkan.',
    rating: 5,
  },
]

const fallbackSiteSettings = {
  siteName: 'BERUBAT',
  logoUrl: '/images/LOGO-BERUBAT.png',
  stptLabel: 'STPT 448.1/STPT.04/DPMPTSP/2024',
  whatsAppNumber: '6285817807393',
  addressTitle: 'Jl. Proklamasi No. 8c',
  addressLine: 'Kel. Cimone, Kec. Karawaci, Kota Tangerang',
  googleMapsUrl: 'https://maps.app.goo.gl/ZJu3QXKX5TkLdoVWA',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3456789!2d106.6123456!3d-6.1789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBerubat!5e0!3m2!1sid!2sid!4v1234567890',
  operatingHours: 'Selasa – Minggu, 10:00 – 18:00 WIB',
  footerDescription:
    'Panti Sehat BERUBAT — pusat terapi alami untuk syaraf, otot, sendi dan tulang. Tanpa operasi, berizin resmi.',
  navigation: [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'Booking', href: '#booking' },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/Berubat' },
    { label: 'Instagram', href: 'https://www.instagram.com/be_rubat' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@be_rubat.holistik' },
    { label: 'WhatsApp', href: 'https://wa.me/6285817807393' },
  ],
}

const fallbackHomepage = {
  heroBadge: 'Terapi Legal & Berizin Resmi: STPT 448.1/STPT.04/DPMPTSP/2024',
  heroEyebrow: 'Solusi Tradisional Berbasis Pemahaman Ilmiah',
  heroTitle: 'Atasi Syaraf Kejepit & Cedera',
  heroTitleHighlight: 'Tanpa Operasi',
  heroDescription:
    'Spesialisasi terapi manual untuk syaraf kejepit, cedera olahraga, otot, sendi dan tulang. Penanganan alami tanpa alat khusus — kombinasi peregangan, pelemasan, dan pijatan untuk memulihkan kualitas hidup Anda.',
  heroImageUrl: '/images/sakit-pinggang.jpg',
  heroStats: [
    { value: '1000+', label: 'Pasien Tertangani' },
    { value: '5+', label: 'Tahun Pengalaman' },
    { value: '3', label: 'Jenis Layanan Utama' },
  ],
  aboutBadge: 'Tentang Kami',
  aboutTitle: 'Tentang BERUBAT',
  aboutParagraphOne:
    'Panti Sehat Berubat adalah pusat terapi alami khusus untuk masalah syaraf, otot, sendi dan tulang. Kami berfokus pada pendekatan terapi manual yang alami dan tanpa operasi untuk membantu mengurangi rasa nyeri dan memperbaiki jalur otot serta syaraf yang bermasalah.',
  aboutParagraphTwo:
    'Dengan pengalaman bertahun-tahun terhadap ribuan pasien syaraf kejepit, masalah otot dan sendi, BERUBAT memiliki pola dan metode tersendiri dalam menangani pasien yang terukur, nyaman dan aman.',
  aboutQuote:
    'Kami tidak menjanjikan kesembuhan, akan tetapi kami berupaya semaksimal mungkin untuk mengantarkan Anda kepada kesembuhan dan kualitas hidup yang lebih baik.',
  principles: [
    { title: 'Pendekatan Holistik', description: 'Memperlakukan tubuh sebagai satu kesatuan yang saling terkait.', icon: 'leaf' },
    { title: 'Kesabaran & Konsistensi', description: 'Proses pemulihan membutuhkan waktu dan kesabaran dari kedua pihak.', icon: 'clock' },
    { title: 'Kenyamanan Pasien', description: 'Mengutamakan kenyamanan dan keamanan pasien selama proses terapi.', icon: 'heart' },
  ],
  conditionEyebrow: 'Kenali Kondisi Anda',
  conditionTitle: 'Apa itu Syaraf Kejepit (HNP)?',
  conditionDescription:
    'Syaraf kejepit adalah kondisi dimana terjadi tekanan berlebih pada syaraf oleh jaringan di sekitarnya, seperti oleh tulang, otot atau tendon. Tekanan ini dapat mengganggu fungsi syaraf dan menyebabkan nyeri yang sangat mengganggu bahkan hingga sampai kelumpuhan.',
  symptoms: [
    { label: 'Nyeri yang menyebar ke kaki atau tangan' },
    { label: 'Nyeri seperti tertusuk di area dalam bahkan tersetrum' },
    { label: 'Melemahnya otot yang terkena syaraf kejepit bahkan semakin mengecil' },
  ],
  servicesBadge: 'Layanan Kami',
  servicesTitle: 'Berbagai Layanan Terapi untuk Berbagai Keluhan',
  servicesDescription: 'Ditangani langsung oleh terapis berpengalaman dengan metode alami.',
  advantagesTitle: 'Keunggulan BERUBAT',
  galleryBadge: 'Fasilitas Kami',
  galleryTitle: 'Ruang Terapi Modern & Nyaman',
  galleryDescription: 'Fasilitas bersih, nyaman, dan dirancang untuk kenyamanan pasien.',
  testimonialsBadge: 'Bukti Nyata',
  testimonialsTitle: 'Bukti Kesembuhan Pasien',
  testimonialsDescription: 'Ribuan pasien telah merasakan manfaatnya.',
  bookingBadge: 'Hubungi Kami',
  bookingTitle: 'Booking Jadwal Terapi',
  bookingDescription: 'Pilih jenis keluhan dan kami akan konfirmasi jadwal Anda via WhatsApp.',
  contactTitle: 'Hubungi Kami',
  contactDescription: 'Kami siap melayani Anda setiap hari. Hubungi melalui WhatsApp atau datang langsung.',
}

const fallbackServices = [
  {
    title: 'Syaraf Kejepit / HNP',
    description:
      'Penanganan HNP (hernia nucleus pulposus) atau syaraf kejepit tanpa alat khusus: kombinasi peregangan, pelemasan, dan pijatan khusus untuk memperbaiki postur, melepaskan tekanan saraf, dan memulihkan jalur otot serta saraf tepi.',
    imageUrl: '/images/hnp-pinnggang.jpg',
    items: ['HNP Lumbar, Sacrum atau Cervical', 'Sciatica', 'Pemulihan Mobilitas'],
  },
  {
    title: 'Cedera Umum & Olahraga',
    description:
      'Penanganan cedera otot dan sendi baik akibat olahraga atau aktifitas sehari-hari dengan metode yang aman dan efektif.',
    imageUrl: '/images/scatia.jpg',
    items: ['Cedera Seluruh Sendi (engkel, bahu, lutut, dll)', 'Otot Yang Tertarik', 'Pemulihan Atlet atau Gym'],
  },
  {
    title: 'Masalah Postur Tubuh',
    description:
      'Menangani berbagai macam masalah postur tubuh akibat ketidakseimbangan otot dan rangka tubuh.',
    imageUrl: '/images/postur-sko.jpg',
    items: ['Bahu Tinggi Sebelah', 'Skoliosis', 'Kaki Panjang Sebelah'],
  },
]

const fallbackAdvantages = [
  { title: 'Tanpa Operasi', description: 'Metode alami tanpa tindakan medis invasif' },
  { title: 'Aman & Legal', description: 'Berizin resmi, terdaftar sebagai STPT' },
  { title: 'Profesional', description: 'Terapis berpengalaman dan terlatih khusus' },
  { title: 'Hasil Nyata', description: 'Pemulihan terukur dalam beberapa sesi' },
]

const fallbackGallery = [
  { imageUrl: '/images/tempat-tidur.jpg', alt: 'Ruang Terapi Utama', label: 'Ruang Terapi Utama' },
  { imageUrl: '/images/jalur-otot.jpg', alt: 'Ruang Konsultasi', label: 'Ruang Konsultasi' },
  { imageUrl: '/images/ruang-tunggu.jpg', alt: 'Area Tunggu Nyaman', label: 'Area Tunggu Nyaman' },
  { imageUrl: '/images/parkiran.jpg', alt: 'Area Parkir Luas', label: 'Area Parkir Luas' },
  { imageUrl: '/images/nyeri-belikat.jpg', alt: 'Terapi Nyeri Belikat', label: 'Sesi Terapi' },
  { imageUrl: '/images/sakit-pinggang.jpg', alt: 'Terapi Punggung', label: 'Terapi Punggung' },
]

function getMediaUrl(media?: MediaLike | number | string | null) {
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }

  return null
}

async function getPayloadHomepageData() {
  try {
    const payload = await getPayloadClient()
    const [settings, homepage, services, advantages, gallery] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.findGlobal({ slug: 'homepage', depth: 1 }),
      payload.find({ collection: 'services', depth: 1, limit: 20, sort: 'order' }),
      payload.find({ collection: 'advantages', limit: 20, sort: 'order' }),
      payload.find({ collection: 'gallery-items', depth: 1, limit: 20, sort: 'order' }),
    ])

    return {
      settings: {
        siteName: settings.siteName || fallbackSiteSettings.siteName,
        logoUrl: getMediaUrl(settings.logo) || fallbackSiteSettings.logoUrl,
        stptLabel: settings.stptLabel || fallbackSiteSettings.stptLabel,
        whatsAppNumber: settings.whatsAppNumber || fallbackSiteSettings.whatsAppNumber,
        addressTitle: settings.addressTitle || fallbackSiteSettings.addressTitle,
        addressLine: settings.addressLine || fallbackSiteSettings.addressLine,
        googleMapsUrl: settings.googleMapsUrl || fallbackSiteSettings.googleMapsUrl,
        mapsEmbedUrl: settings.mapsEmbedUrl || fallbackSiteSettings.mapsEmbedUrl,
        operatingHours: settings.operatingHours || fallbackSiteSettings.operatingHours,
        footerDescription: settings.footerDescription || fallbackSiteSettings.footerDescription,
        navigation: settings.navigation?.length ? settings.navigation : fallbackSiteSettings.navigation,
        socialLinks: settings.socialLinks?.length ? settings.socialLinks : fallbackSiteSettings.socialLinks,
      },
      homepage: {
        ...fallbackHomepage,
        ...homepage,
        heroImageUrl: getMediaUrl(homepage.heroImage) || fallbackHomepage.heroImageUrl,
      },
      services:
        services.docs.length > 0
          ? services.docs
            .filter((item) => (item as PayloadServiceDoc).isActive !== false)
            .map((item) => {
              const doc = item as PayloadServiceDoc
              return {
                title: doc.title || '',
                description: doc.description || '',
                imageUrl: getMediaUrl(doc.image) || fallbackServices[0]?.imageUrl,
                items: doc.items?.map((entry) => entry.label || '').filter(Boolean) || [],
              }
            })
          : fallbackServices,
      advantages:
        advantages.docs.length > 0
          ? advantages.docs.map((item) => {
            const doc = item as PayloadAdvantageDoc
            return {
              title: doc.title || '',
              description: doc.description || '',
            }
          })
          : fallbackAdvantages,
      gallery:
        gallery.docs.length > 0
          ? gallery.docs.map((item) => {
            const doc = item as PayloadGalleryDoc
            return {
              imageUrl: getMediaUrl(doc.image) || fallbackGallery[0]?.imageUrl,
              alt: doc.alt || '',
              label: doc.label || '',
            }
          })
          : fallbackGallery,
    }
  } catch {
    return {
      settings: fallbackSiteSettings,
      homepage: fallbackHomepage,
      services: fallbackServices,
      advantages: fallbackAdvantages,
      gallery: fallbackGallery,
    }
  }
}

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { show: true },
      orderBy: { id: 'desc' },
      take: 8,
    })

    return testimonials.length > 0 ? testimonials : fallbackTestimonials
  } catch {
    return fallbackTestimonials
  }
}

export async function getHomepageContent() {
  const [payloadData, testimonials] = await Promise.all([
    getPayloadHomepageData(),
    getTestimonials(),
  ])

  return {
    ...payloadData,
    testimonials,
  }
}

export async function getBlogList() {
  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      draft: false,
      limit: 20,
      sort: '-publishedAt',
    })

    return posts.docs.map((post) => {
      const doc = post as PayloadPostDoc
      return {
        id: doc.id,
        title: doc.title || '',
        slug: doc.slug || '',
        excerpt: doc.excerpt || '',
        featuredImageUrl: getMediaUrl(doc.featuredImage),
        publishedAt: doc.publishedAt,
      }
    })
  } catch {
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    draft: false,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = posts.docs[0] as PayloadPostDoc | undefined
  if (!post) return null

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    contentHTML: post.contentHTML || '',
    featuredImageUrl: getMediaUrl(post.featuredImage),
    publishedAt: post.publishedAt,
  }
}
