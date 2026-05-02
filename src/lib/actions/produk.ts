'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProduk() {
  return prisma.herbalProduct.findMany({ orderBy: { name: 'asc' } })
}

export async function createProduk(data: {
  name: string
  description: string
  price: number
  stock: number
  image?: string
}) {
  await prisma.herbalProduct.create({ data })
  revalidatePath('/admin/produk')
}

export async function updateProduk(
  id: string,
  data: {
    name?: string
    description?: string
    price?: number
    stock?: number
    image?: string
    isActive?: boolean
  }
) {
  await prisma.herbalProduct.update({ where: { id }, data })
  revalidatePath('/admin/produk')
  revalidatePath('/herbal')
}

export async function deleteProduk(id: string) {
  await prisma.herbalProduct.delete({ where: { id } })
  revalidatePath('/admin/produk')
  revalidatePath('/herbal')
}
