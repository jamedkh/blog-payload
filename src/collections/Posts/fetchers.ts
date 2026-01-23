import { getPayloadClient } from '@/scripts/seed/seeders/lib/payload/client'
import { POST_STATUS } from './constants'

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
