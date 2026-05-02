import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { CmsUsers } from '@/collections/CmsUsers'
import { Media } from '@/collections/Media'
import { Services } from '@/collections/Services'
import { Advantages } from '@/collections/Advantages'
import { GalleryItems } from '@/collections/GalleryItems'
import { Posts } from '@/collections/Posts'
import { Homepage } from '@/globals/Homepage'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || process.env.AUTH_SECRET || 'payload-dev-secret',
  admin: {
    user: CmsUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/cms',
    api: '/api/payload',
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // DB ini dipakai bersama Prisma (Booking, Admin, dll.). `push: true` akan DROP tabel yang bukan schema Payload.
    // Aktifkan hanya saat mengembangkan schema Payload di DB kosong / migrasi Payload:
    // PAYLOAD_DATABASE_PUSH=true bun dev
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
  }),
  collections: [CmsUsers, Media, Services, Advantages, GalleryItems, Posts],
  globals: [Homepage, SiteSettings],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
