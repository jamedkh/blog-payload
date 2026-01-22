import AdminSeeder from './seeders/seeder-admin'
import AuthorsSeeder from './seeders/seeder-authors'
import { getPayloadClient } from './seeders/lib/payload/client'
import PostsSeeder from './seeders/seeder-posts'

async function reset() {
  console.log('Starting database reset...')
  try {
    const payload = await getPayloadClient()

    console.log('Clearing collections...')
    // Delete all documents in dependent collections first to avoid potential constraints issues (though less likely in Mongo)
    await payload.delete({ collection: 'posts', where: {} })
    console.log('  - Cleared posts')

    await payload.delete({ collection: 'authors', where: {} })
    console.log('  - Cleared authors')

    await payload.delete({ collection: 'media', where: {} })
    console.log('  - Cleared media')

    console.log('Collections cleared. Starting seeding...')

    await AdminSeeder(payload)
    await AuthorsSeeder(payload)
    await PostsSeeder(payload)

    console.log('Database reset and seed completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Error resetting database:', error)
    process.exit(1)
  }
}

void reset()
