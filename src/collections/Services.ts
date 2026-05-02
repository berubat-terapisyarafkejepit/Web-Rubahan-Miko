import type { CollectionConfig } from 'payload'
import { publicRead } from '@/access/publicRead'
import { revalidateHomepage } from '@/lib/payload/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidateHomepage()],
    afterDelete: [() => revalidateHomepage()],
  },
}
