/* eslint-disable @typescript-eslint/no-require-imports */
(async () => {
  const { PrismaClient } = require('@prisma/client');
  const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
  const { PrismaPg } = require('@prisma/adapter-pg');
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to run import-brokers-to-db.js');
  }
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  const fs = require('fs').promises;
  const path = require('path');

  try {
    const DB = path.resolve(process.cwd(), 'data', 'brokers.json');
    const raw = await fs.readFile(DB, 'utf-8');
    const list = JSON.parse(raw || '[]');
    for (const b of list) {
      const exists = await prisma.broker.findUnique({ where: { slug: b.slug } });
      if (exists) continue;
      await prisma.broker.create({ data: {
        id: b.id,
        name: b.name,
        slug: b.slug,
        credentials: b.credentials || null,
        connected: !!b.connected,
        config: b.config || null,
        createdAt: b.createdAt ? new Date(b.createdAt) : undefined,
        connectedAt: b.connectedAt ? new Date(b.connectedAt) : undefined,
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : undefined,
      }});
      console.log('Imported', b.slug);
    }
    console.log('Import complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
