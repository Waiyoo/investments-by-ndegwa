import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with initial reference data...')

  // Clear existing lookup data if needed or upsert
  const openStatus = await prisma.investmentStatus.upsert({
    where: { slug: 'open' },
    update: {},
    create: { name: 'Open', slug: 'open', color: 'emerald', ordering: 1 },
  })

  await prisma.investmentStatus.upsert({
    where: { slug: 'closing-soon' },
    update: {},
    create: { name: 'Closing Soon', slug: 'closing-soon', color: 'amber', ordering: 2 },
  })

  await prisma.investmentStatus.upsert({
    where: { slug: 'fully-funded' },
    update: {},
    create: { name: 'Fully Funded', slug: 'fully-funded', color: 'blue', ordering: 3 },
  })

  await prisma.investmentStatus.upsert({
    where: { slug: 'completed' },
    update: {},
    create: { name: 'Completed', slug: 'completed', color: 'purple', ordering: 4 },
  })

  // Sample Categories
  const realEstateCat = await prisma.investmentCategory.upsert({
    where: { slug: 'real-estate' },
    update: {},
    create: { name: 'Real Estate', slug: 'real-estate', description: 'Commercial and residential property development opportunities in prime Kenyan corridors.', ordering: 1 },
  })

  const agriCat = await prisma.investmentCategory.upsert({
    where: { slug: 'agriculture' },
    update: {},
    create: { name: 'Agriculture', slug: 'agriculture', description: 'Agribusiness production, export-grade horticulture, and value-chain processing.', ordering: 2 },
  })

  const infrastructureCat = await prisma.investmentCategory.upsert({
    where: { slug: 'infrastructure' },
    update: {},
    create: { name: 'Infrastructure', slug: 'infrastructure', description: 'Logistics, clean energy, and regional development projects.', ordering: 3 },
  })

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: {
      id: 'default-settings',
      companyName: 'PY Capital',
      phone: '0799357038',
      internationalPhone: '+254 799 357 038',
      location: 'Nairobi, Kenya',
      currency: 'KSh',
      homepageSettings: {
        heroTitle: 'Curated Investment Opportunities in East Africa',
        heroSubtitle: 'Connecting discerning investors with vetted, high-potential commercial and enterprise ventures.',
      },
    },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })