import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { AUTHORS_ROLE_OPTIONS } from '@/collections/Authors/constants'
import createMedia from './lib/create-media'

export default async function AuthorsSeeder(payload: Payload) {
  try {
    const imageURL = faker.image.personPortrait({ size: 256 })
    const image = await createMedia(payload, imageURL)

    if (!image) {
      console.warn('Stoped seeding authors cause no image created')
      return
    }

    await payload.create({
      collection: 'authors',
      data: {
        name: faker.person.fullName(),
        role: AUTHORS_ROLE_OPTIONS.EDITOR,
        avatar: image.id,
        bio: faker.lorem.sentence(16),
      },
    })
  } catch (error) {
    console.warn('Error seeding authors:', error)
  }
}
