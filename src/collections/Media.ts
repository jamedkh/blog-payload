import type { CollectionConfig } from 'payload'
import { generateBlurDataURL, isEligibleForBlurDataURL } from './Media/lib/hook-media-blur'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataUrl',
      type: 'text',
      required: true,
      admin: { hidden: true },
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation !== 'create') return data
        // check eligibility
        if (!isEligibleForBlurDataURL(req.file?.mimetype)) return data
        // if it is, generate blur hash
        const base64 = await generateBlurDataURL(req.file?.data)
        if (!base64) return data
        // set it data.blurDataUrl
        data.blurDataUrl = base64

        console.log(`Generated blur data URL for ${data.filename}`)
        return data
      },
    ],
  },
}
