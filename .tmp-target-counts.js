require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

(async () => {
  const url = process.env.TARGET_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error('TARGET_DATABASE_URL or DATABASE_URL must be set');
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
  try {
    const models = ['user','broker','strategy','followUp','sale','target','activityLog','order','position','brokerConnection','notification','riskSetting'];
    const counts = {};
    for (const model of models) {
      try {
        counts[model] = await prisma[model].count();
      } catch (e) {
        counts[model] = `error: ${e.message}`;
      }
    }
    console.log(JSON.stringify(counts, null, 2));
  } finally {
    await prisma.$disconnect();
  }
})();
