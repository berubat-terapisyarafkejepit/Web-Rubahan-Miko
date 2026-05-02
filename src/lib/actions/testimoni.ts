'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimoni() {
  return prisma.testimonial.findMany({ orderBy: { id: 'desc' } })
}

export async function updateTestimoniShow(id: string, show: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { show } })
  revalidatePath('/admin/testimoni')
  revalidatePath('/')
}

export async function deleteTestimoni(id: string) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimoni')
  revalidatePath('/')
}

export async function createTestimoni(data: {
  name: string
  content: string
  rating: number
  show: boolean
}) {
  await prisma.testimonial.create({ data })
  revalidatePath('/admin/testimoni')
  revalidatePath('/')
}
