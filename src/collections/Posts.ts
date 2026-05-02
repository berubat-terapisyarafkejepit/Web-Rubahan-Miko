import type { CollectionConfig } from 'payload'
import { lexicalHTMLField } from '@payloadcms/richtext-lexical'
import { publicRead } from '@/access/publicRead'
import { revalidateBlogPost } from '@/lib/payload/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: publicRead,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Blog',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', required: true },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    lexicalHTMLField({
      lexicalFieldName: 'content',
      htmlFieldName: 'contentHTML',
      hidden: true,
    }),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateBlogPost(doc.slug)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateBlogPost(doc.slug)
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (data && !data.publishedAt) {
          return {
            ...data,
            publishedAt: new Date().toISOString(),
          }
        }

        return data
      },
    ],
  },
}
