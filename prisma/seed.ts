import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed admin
  const hashedPassword = await bcrypt.hash('berubat2024', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: hashedPassword },
  })
  console.log('✅ Admin created:', admin.username)

  // Seed sample testimoni
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'seed-1',
        name: 'Ka Rima (Tangerang)',
        content:
          "Alhamdulillaah pertama kali dateng much much better, sakit punggungku 4 th berakhir sudah, nyesel banget baru tau. Entah udah abis berapa juta ke tukang pijat refleksi ternyata yang masalah ligamennya. Maasyaa'Allah di kasih jalan sembuh juga",
        rating: 5,
        show: true,
      },
      {
        id: 'seed-2',
        name: 'Daffa (Guru)',
        content:
          '3x kesini, syaraf kejepit L3-L5, tangan kanan kiri muntir dan cedera ligamen engkel. Alhamdulillah selalu lancar dan sembuh, murah dan terpercaya',
        rating: 5,
        show: true,
      },
      {
        id: 'seed-3',
        name: 'Ibu Maya (Kab. Tangerang)',
        content:
          'Alhamdulillaah ibu saya syaraf kejepit dua kali kesini sembuh, terimakasih mas semoga Allah mudahkan segala urusan.',
        rating: 5,
        show: true,
      },
      {
        id: 'seed-4',
        name: 'Akmal (Tangerang)',
        content:
          'Sudah beberapa kali kesini dan Alhamdulillah dikasih kebaikan dan kesembuhan oleh Allah, dan untuk bapaknya ramah dan baik sekali, betul2 mengobati secara sabar dan fokus, dijelaskan juga secara detail dan rinci atas sakit yg ditimbulkan, selalu kasih recommend ke teman dan saudara yg lagi sakit masalah persendian untuk berobat ke berubat, terima kasih.',
        rating: 5,
        show: true,
      },
    ],
  })
  console.log('✅ Testimoni seeded.')

  // Seed sample produk
  await prisma.herbalProduct.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'prod-1',
        name: 'Minyak Herbal Sendi',
        description: 'Minyak alami untuk meredakan nyeri sendi dan otot. Cocok untuk pemakaian sehari-hari.',
        price: 75000,
        stock: 20,
        isActive: true,
      },
      {
        id: 'prod-2',
        name: 'Balsem Syaraf BERUBAT',
        description: 'Balsem herbal khusus untuk nyeri syaraf dan punggung bawah.',
        price: 50000,
        stock: 15,
        isActive: true,
      },
    ],
  })
  console.log('✅ Produk seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
