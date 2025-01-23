import type { CollectionConfig } from 'payload'

export const Vinyls: CollectionConfig = {
  slug: 'vinyls',
  admin: {
    defaultColumns: ['name', 'description'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'notes',
      type: 'richText',
      localized: true,
    },
  ],
  timestamps: true,
}
