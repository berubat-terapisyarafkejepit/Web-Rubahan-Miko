import type { CollectionConfig } from 'payload'
import { publicRead } from '@/access/publicRead'
import { revalidateHomepage } from '@/lib/payload/revalidate'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  access: {
    read: publicRead,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'order', 'updatedAt'],
    group: 'Homepage',
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'alt', type: 'text', required: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'order', type: 'number', defaultValue: 1, required: true },
  ],
  hooks: {
    afterChange: [() => revalidateHomepage()],
    afterDelete: [() => revalidateHomepage()],
  },
}
