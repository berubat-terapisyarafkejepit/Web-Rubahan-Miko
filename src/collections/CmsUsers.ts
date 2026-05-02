import type { CollectionConfig } from 'payload'

export const CmsUsers: CollectionConfig = {
  slug: 'cms-users',
  admin: {
    useAsTitle: 'email',
    group: 'System',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
    },
  ],
}
