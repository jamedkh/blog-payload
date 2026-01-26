import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/hook-generate-slug'
import { generateExcerptHook } from './hooks/hook-generate-excerpt'
import { et } from 'payload/i18n/et'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { POST_CACHE_TAG, POST_STATUS } from './constants'
import { revalidateTag, unstable_cache } from 'next/cache'
import { getPosts } from './fetchers'

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
        { label: 'Draft', value: POST_STATUS.DRAFT },
        { label: 'Published', value: POST_STATUS.PUBLISHED },
      ],
      defaultValue: POST_STATUS.DRAFT,
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        condition: (data) => data?.status === POST_STATUS.PUBLISHED,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],

  hooks: {
    afterChange: [() => revalidateTag(POST_CACHE_TAG)],
  },
}
