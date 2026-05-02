import type { GlobalConfig } from 'payload'
import { publicRead } from '@/access/publicRead'
import { revalidateHomepage } from '@/lib/payload/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: publicRead,
  },
  admin: {
    group: 'Homepage',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero Section',
      fields: [
        { name: 'heroBadge', type: 'text', defaultValue: 'Terapi Legal & Berizin Resmi: STPT 448.1/STPT.04/DPMPTSP/2024' },
        { name: 'heroEyebrow', type: 'text', defaultValue: 'Solusi Tradisional Berbasis Pemahaman Ilmiah' },
        { name: 'heroTitle', type: 'text', required: true, defaultValue: 'Atasi Syaraf Kejepit & Cedera' },
        { name: 'heroTitleHighlight', type: 'text', defaultValue: 'Tanpa Operasi' },
        { name: 'heroDescription', type: 'textarea', required: true, defaultValue: 'Spesialisasi terapi manual untuk syaraf kejepit, cedera olahraga, otot, sendi dan tulang. Penanganan alami tanpa alat khusus — kombinasi peregangan, pelemasan, dan pijatan untuk memulihkan kualitas hidup Anda.' },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroStats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
          defaultValue: [
            { value: '1000+', label: 'Pasien Tertangani' },
            { value: '5+', label: 'Tahun Pengalaman' },
            { value: '3', label: 'Jenis Layanan Utama' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'About Section',
      fields: [
        { name: 'aboutBadge', type: 'text', defaultValue: 'Tentang Kami' },
        { name: 'aboutTitle', type: 'text', defaultValue: 'Tentang BERUBAT' },
        { name: 'aboutParagraphOne', type: 'textarea', required: true, defaultValue: 'Panti Sehat Berubat adalah pusat terapi alami khusus untuk masalah syaraf, otot, sendi dan tulang. Kami berfokus pada pendekatan terapi manual yang alami dan tanpa operasi untuk membantu mengurangi rasa nyeri dan memperbaiki jalur otot serta syaraf yang bermasalah.' },
        { name: 'aboutParagraphTwo', type: 'textarea', required: true, defaultValue: 'Dengan pengalaman bertahun-tahun terhadap ribuan pasien syaraf kejepit, masalah otot dan sendi, BERUBAT memiliki pola dan metode tersendiri dalam menangani pasien yang terukur, nyaman dan aman.' },
        { name: 'aboutQuote', type: 'textarea', defaultValue: 'Kami tidak menjanjikan kesembuhan, akan tetapi kami berupaya semaksimal mungkin untuk mengantarkan Anda kepada kesembuhan dan kualitas hidup yang lebih baik.' },
        {
          name: 'principles',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'icon', type: 'select', required: true, options: ['leaf', 'clock', 'heart'] },
          ],
          defaultValue: [
            { title: 'Pendekatan Holistik', description: 'Memperlakukan tubuh sebagai satu kesatuan yang saling terkait.', icon: 'leaf' },
            { title: 'Kesabaran & Konsistensi', description: 'Proses pemulihan membutuhkan waktu dan kesabaran dari kedua pihak.', icon: 'clock' },
            { title: 'Kenyamanan Pasien', description: 'Mengutamakan kenyamanan dan keamanan pasien selama proses terapi.', icon: 'heart' },
          ],
        },
        { name: 'conditionEyebrow', type: 'text', defaultValue: 'Kenali Kondisi Anda' },
        { name: 'conditionTitle', type: 'text', defaultValue: 'Apa itu Syaraf Kejepit (HNP)?' },
        { name: 'conditionDescription', type: 'textarea', defaultValue: 'Syaraf kejepit adalah kondisi dimana terjadi tekanan berlebih pada syaraf oleh jaringan di sekitarnya, seperti oleh tulang, otot atau tendon. Tekanan ini dapat mengganggu fungsi syaraf dan menyebabkan nyeri yang sangat mengganggu bahkan hingga sampai kelumpuhan.' },
        {
          name: 'symptoms',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }],
          defaultValue: [
            { label: 'Nyeri yang menyebar ke kaki atau tangan' },
            { label: 'Nyeri seperti tertusuk di area dalam bahkan tersetrum' },
            { label: 'Melemahnya otot yang terkena syaraf kejepit bahkan semakin mengecil' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Section Labels',
      fields: [
        { name: 'servicesBadge', type: 'text', defaultValue: 'Layanan Kami' },
        { name: 'servicesTitle', type: 'text', defaultValue: 'Berbagai Layanan Terapi untuk Berbagai Keluhan' },
        { name: 'servicesDescription', type: 'textarea', defaultValue: 'Ditangani langsung oleh terapis berpengalaman dengan metode alami.' },
        { name: 'advantagesTitle', type: 'text', defaultValue: 'Keunggulan BERUBAT' },
        { name: 'galleryBadge', type: 'text', defaultValue: 'Fasilitas Kami' },
        { name: 'galleryTitle', type: 'text', defaultValue: 'Ruang Terapi Modern & Nyaman' },
        { name: 'galleryDescription', type: 'textarea', defaultValue: 'Fasilitas bersih, nyaman, dan dirancang untuk kenyamanan pasien.' },
        { name: 'testimonialsBadge', type: 'text', defaultValue: 'Bukti Nyata' },
        { name: 'testimonialsTitle', type: 'text', defaultValue: 'Bukti Kesembuhan Pasien' },
        { name: 'testimonialsDescription', type: 'textarea', defaultValue: 'Ribuan pasien telah merasakan manfaatnya.' },
        { name: 'bookingBadge', type: 'text', defaultValue: 'Hubungi Kami' },
        { name: 'bookingTitle', type: 'text', defaultValue: 'Booking Jadwal Terapi' },
        { name: 'bookingDescription', type: 'textarea', defaultValue: 'Pilih jenis keluhan dan kami akan konfirmasi jadwal Anda via WhatsApp.' },
        { name: 'contactTitle', type: 'text', defaultValue: 'Hubungi Kami' },
        { name: 'contactDescription', type: 'textarea', defaultValue: 'Kami siap melayani Anda setiap hari. Hubungi melalui WhatsApp atau datang langsung.' },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidateHomepage()],
  },
}
