import AdminSeeder from './seeders/seeder-admin'
import AuthorsSeeder from './seeders/seeder-authors'
import { getPayloadClient } from './seeders/lib/payload/client'

async function main() {
  try {
    const payload = await getPayloadClient()
    await AdminSeeder(payload)
    await AuthorsSeeder(payload)
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

void main()
