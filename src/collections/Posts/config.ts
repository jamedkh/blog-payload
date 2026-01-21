import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/hook-generate-slug'
import { generateExcerptHook } from './hooks/hook-generate-excerpt'
import { et } from 'payload/i18n/et'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [generateSlugHook],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      hooks: {
        beforeValidate: [generateExcerptHook],
      },
    },
    {
      name: 'readTimeInMins',
      type: 'number',
      defaultValue: 0,
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensuring not save in DB
            delete siblingData.readTimeInMins
          },
        ],
        afterRead: [
          ({ data }) => {
            const text = convertLexicalToPlaintext({ data: data?.content })
            const words = text.trim().split(/\s+/).length
            return Math.max(1, Math.ceil(words / 200))
          },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        condition: (data) => data?.status === 'published',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
