import { getPayloadClient } from '@/scripts/seed/seeders/lib/payload/client'
import { POST_CACHE_TAG, POST_STATUS } from './constants'
import { unstable_cache } from 'next/cache'

export async function getPosts() {
  const payload = await getPayloadClient()
  try {
    const { docs: posts } = await payload.find({
      collection: 'posts',
      select: {
        id: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        readTimeInMins: true,
        author: true,
        slug: true,
        coverImage: true,
      },
      where: {
        status: {
          equals: POST_STATUS.PUBLISHED,
        },
      },
    })
    return posts ?? []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPost(slug: string) {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: POST_STATUS.PUBLISHED,
      },
    },
  })

  return posts?.[0] || null
}
