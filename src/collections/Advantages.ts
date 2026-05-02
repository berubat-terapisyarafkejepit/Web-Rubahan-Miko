import type { CollectionConfig } from 'payload'
import { publicRead } from '@/access/publicRead'
import { revalidateHomepage } from '@/lib/payload/revalidate'

export const Advantages: CollectionConfig = {
  slug: 'advantages',
  access: {
    read: publicRead,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Homepage',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 1, required: true },
  ],
  hooks: {
    afterChange: [() => revalidateHomepage()],
    afterDelete: [() => revalidateHomepage()],
  },
}
