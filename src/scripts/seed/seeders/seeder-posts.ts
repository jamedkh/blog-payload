import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import config from '@/payload.config'
import { MAX_EXCERPT_LENGTH } from '@/collections/Posts/constants'
import createMedia from './lib/create-media'
import { slugify } from 'payload/shared'
import { POST_STATUS } from '@/collections/Posts/constants'

const POSTS_COUNT = 10

export default async function PostsSeeder(payload: Payload) {
  let successCount = 0

  for (let i = 0; i < POSTS_COUNT; i++) {
    try {
      // add width and height to faker.image.urlPicsumPhotos()
      const imageURL = faker.image.urlPicsumPhotos()
      const image = await createMedia(payload, imageURL)

      if (!image) {
        console.warn('Stoped seeding posts cause no image created')
        return
      }

      const title = faker.lorem.sentence(6)
      const postContent = faker.lorem.paragraphs(6)
      const contentLaxical = convertMarkdownToLexical({
        markdown: postContent,
        editorConfig: await editorConfigFactory.default({ config: await config }),
      })

      const postStatus = faker.helpers.arrayElement(Object.values(POST_STATUS))

      const authors = await payload.find({
        collection: 'authors',
        limit: 10,
      })

      const randomAuthor = faker.helpers.arrayElement(authors.docs)

      await payload.create({
        collection: 'posts',
        data: {
          title,
          slug: slugify(title),
          content: contentLaxical,
          excerpt: postContent.slice(0, MAX_EXCERPT_LENGTH),
          coverImage: image.id,
          author: randomAuthor.id,
          status: postStatus,
          ...(postStatus === POST_STATUS.PUBLISHED && {
            publishedAt: faker.date.recent() as unknown as string,
          }),
        },
        draft: true,
      })

      successCount++
    } catch (error) {
      console.error('Error seeding posts:', error)
    }
  }
}
