import AdminSeeder from './seeders/admin-seeder'

async function main() {
  try {
    await AdminSeeder()
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

void main()
