import type { CollectionConfig } from 'payload'
import { AUTHORS_ROLE_OPTIONS } from './constants'

export const Authors: CollectionConfig = {
  slug: 'authors',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: Object.values(AUTHORS_ROLE_OPTIONS),
      defaultValue: AUTHORS_ROLE_OPTIONS.EDITOR,
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
  ],
}
