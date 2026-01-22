import AdminSeeder from './seeders/seeder-admin'
import AuthorsSeeder from './seeders/seeder-authors'
import { getPayloadClient } from './seeders/lib/payload/client'
import PostsSeeder from './seeders/seeder-posts'

async function main() {
  try {
    const payload = await getPayloadClient()
    await AdminSeeder(payload)
    await AuthorsSeeder(payload)
    await PostsSeeder(payload)
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

void main()
