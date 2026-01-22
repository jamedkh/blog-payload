import { faker } from '@faker-js/faker'
import { Payload } from 'payload'

export default async function createMedia(payload: Payload, imageURL: string) {
  try {
    const imageResponse = await fetch(imageURL)
    const imageBlob = await imageResponse.arrayBuffer()
    const imageBuffer = Buffer.from(imageBlob)
    const imageMimetype = imageResponse.headers.get('content-type') || 'image/jpeg'
    const imageSize = imageBuffer.length
    const imageFileName = imageResponse.url.split('/').pop()?.split('?')[0]
    if (!imageFileName) throw new Error('Image file name not found')

    return await payload.create({
      collection: 'media',
      draft: true,
      data: {
        alt: faker.lorem.word(3),
      },
      file: {
        data: imageBuffer,
        name: imageFileName,
        mimetype: imageMimetype,
        size: imageSize,
      },
    })
  } catch (error) {
    console.warn('Error creating media:', error)
    throw error
  }
}
