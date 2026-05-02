import type { GlobalConfig } from 'payload'
import { publicRead } from '@/access/publicRead'
import { revalidateHomepage } from '@/lib/payload/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: publicRead,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'BERUBAT',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'stptLabel',
      type: 'text',
      defaultValue: 'STPT 448.1/STPT.04/DPMPTSP/2024',
    },
    {
      name: 'whatsAppNumber',
      type: 'text',
      required: true,
      defaultValue: '6285817807393',
    },
    {
      name: 'addressTitle',
      type: 'text',
      defaultValue: 'Jl. Proklamasi No. 8c',
    },
    {
      name: 'addressLine',
      type: 'textarea',
      defaultValue: 'Kel. Cimone, Kec. Karawaci, Kota Tangerang',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      defaultValue: 'https://maps.app.goo.gl/ZJu3QXKX5TkLdoVWA',
    },
    {
      name: 'mapsEmbedUrl',
      type: 'text',
    },
    {
      name: 'operatingHours',
      type: 'text',
      defaultValue: 'Selasa – Minggu, 10:00 – 18:00 WIB',
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      defaultValue:
        'Panti Sehat BERUBAT — pusat terapi alami untuk syaraf, otot, sendi dan tulang. Tanpa operasi, berizin resmi.',
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Tentang', href: '#tentang' },
        { label: 'Layanan', href: '#layanan' },
        { label: 'Galeri', href: '#galeri' },
        { label: 'Testimoni', href: '#testimoni' },
        { label: 'Booking', href: '#booking' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Facebook', href: 'https://www.facebook.com/Berubat' },
        { label: 'Instagram', href: 'https://www.instagram.com/be_rubat' },
        { label: 'TikTok', href: 'https://www.tiktok.com/@be_rubat.holistik' },
        { label: 'WhatsApp', href: 'https://wa.me/6285817807393' },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidateHomepage()],
  },
}
