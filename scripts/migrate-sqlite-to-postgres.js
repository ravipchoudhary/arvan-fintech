#!/usr/bin/env node
/*
  scripts/migrate-sqlite-to-postgres.js
  Usage:
    SOURCE_DATABASE_URL="file:./dev.db" TARGET_DATABASE_URL="postgresql://user:pass@host:5432/db" node scripts/migrate-sqlite-to-postgres.js
  SOURCE_DATABASE_URL="file:./prisma/dev.db" TARGET_DATABASE_URL="postgresql://user:pass@host:5432/db" node scripts/migrate-sqlite-to-postgres.js

  This script copies data model-by-model from a local SQLite file into a Postgres database.
  It reads the source SQLite tables directly with better-sqlite3 and writes into Postgres using Prisma.

  Notes:
  - Apply the schema to the target first with `npx prisma db push`.
  - Backup both databases before running.
  - The script inserts rows in dependency order and skips duplicates.
*/

require('dotenv/config');
const fs = require('fs');
const path = require('path');
const Sqlite = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

function getArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((value) => value.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : undefined;
}

const defaultSourcePath = fs.existsSync(path.resolve(process.cwd(), 'dev.db'))
  ? path.resolve(process.cwd(), 'dev.db')
  : fs.existsSync(path.resolve(process.cwd(), 'prisma/dev.db'))
  ? path.resolve(process.cwd(), 'prisma/dev.db')
  : undefined;
const defaultSourceUrl = defaultSourcePath ? `file:${defaultSourcePath}` : undefined;

const sourceUrl = getArg('source') || process.env.SOURCE_DATABASE_URL || defaultSourceUrl;
const targetUrl = getArg('target') || process.env.TARGET_DATABASE_URL || process.env.DATABASE_URL;

if (!sourceUrl || !targetUrl) {
  console.error('Usage: SOURCE_DATABASE_URL="file:./dev.db" TARGET_DATABASE_URL="postgresql://..." node scripts/migrate-sqlite-to-postgres.js');
  console.error('       or: node scripts/migrate-sqlite-to-postgres.js --source=file:./dev.db --target=postgresql://...');
  process.exit(1);
}

if (defaultSourceUrl && !process.env.SOURCE_DATABASE_URL && !getArg('source')) {
  console.log('No source database URL provided; using default local SQLite source:', defaultSourceUrl);
}

const sourcePath = sourceUrl.startsWith('file:') ? sourceUrl.slice(5) : sourceUrl;
const absoluteSourcePath = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(process.cwd(), sourcePath);

console.log('Source SQLite file:', absoluteSourcePath);
console.log('Target Postgres URL:', targetUrl.replace(/:.+@/, ':******@'));

const sourceDb = new Sqlite(absoluteSourcePath, { readonly: true, fileMustExist: true });
const target = new PrismaClient({
  adapter: new PrismaPg({ connectionString: targetUrl }),
  log: ['error', 'warn'],
});

function parseJson(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }
  return value;
}

function normalizeBoolean(value) {
  return value === 1 || value === '1' || value === true || value === 'true';
}

function transformRow(modelName, row) {
  const data = { ...row };

  if (modelName === 'Broker') {
    data.connected = normalizeBoolean(data.connected);
    data.credentials = parseJson(data.credentials);
    data.config = parseJson(data.config);
  }

  if (modelName === 'BrokerConnection') {
    data.totpEnabled = normalizeBoolean(data.totpEnabled);
  }

  if (modelName === 'Notification') {
    data.unread = normalizeBoolean(data.unread);
  }

  if (modelName === 'ActivityLog') {
    data.meta = parseJson(data.meta);
  }

  if (modelName === 'User') {
    data.createdAt = data.createdAt ? new Date(data.createdAt).toISOString() : undefined;
    data.updatedAt = data.updatedAt ? new Date(data.updatedAt).toISOString() : undefined;
  }

  return data;
}

function isUniqueConstraintError(error) {
  return (
    error?.code === 'P2002' ||
    error?.message?.includes('Unique constraint failed') ||
    error?.message?.includes('duplicate key value') ||
    error?.message?.includes('already exists')
  );
}

function readRows(tableName) {
  const rows = sourceDb.prepare(`SELECT * FROM "${tableName}"`).all();
  return rows;
}

async function createRow(modelName, data) {
  const clientModel = target[modelName[0].toLowerCase() + modelName.slice(1)];
  if (!clientModel) {
    throw new Error(`Prisma client model not found: ${modelName}`);
  }
  return clientModel.create({ data });
}

async function copyUsers() {
  const rows = readRows('User');
  console.log(`Found ${rows.length} rows for User`);

  const remaining = [...rows];
  const insertedIds = new Set();
  let round = 0;

  while (remaining.length > 0) {
    round += 1;
    const nextRemaining = [];
    let progress = false;
    let skipped = 0;

    for (const row of remaining) {
      if (row.managerId && !insertedIds.has(row.managerId)) {
        nextRemaining.push(row);
        continue;
      }

      const data = transformRow('User', row);
      try {
        await createRow('User', data);
        insertedIds.add(row.id);
        progress = true;
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          skipped += 1;
          insertedIds.add(row.id);
          progress = true;
          continue;
        }
        throw error;
      }
    }

    console.log(`User round ${round}: inserted=${insertedIds.size}, skipped=${skipped}, remaining=${nextRemaining.length}`);

    if (!progress) {
      throw new Error('Unable to resolve manager references while inserting users');
    }

    remaining.length = 0;
    remaining.push(...nextRemaining);
  }
}

async function copyModel(modelName) {
  const rows = readRows(modelName);
  console.log(`Found ${rows.length} rows for ${modelName}`);

  let created = 0;
  let skipped = 0;

  for (const row of rows) {
    const data = transformRow(modelName, row);
    try {
      await createRow(modelName, data);
      created += 1;
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        skipped += 1;
        continue;
      }
      console.error(`Failed to insert ${modelName} row ${row.id || '[no id]'}:`, error);
      throw error;
    }
  }

  console.log(`${modelName}: created=${created}, skipped=${skipped}`);
}

async function copyUsersInDependencyOrder() {
  const rows = readRows('User');
  console.log(`Found ${rows.length} rows for User`);

  const remaining = [...rows];
  const insertedIds = new Set();
  let round = 0;
  let skipped = 0;

  while (remaining.length > 0) {
    round += 1;
    const nextRemaining = [];
    let progress = false;

    for (const row of remaining) {
      if (row.managerId && !insertedIds.has(row.managerId)) {
        nextRemaining.push(row);
        continue;
      }

      const data = transformRow('User', row);
      try {
        await createRow('User', data);
        insertedIds.add(row.id);
        progress = true;
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          insertedIds.add(row.id);
          skipped += 1;
          progress = true;
          continue;
        }
        throw error;
      }
    }

    console.log(`User round ${round}: inserted=${insertedIds.size}, skipped=${skipped}, remaining=${nextRemaining.length}`);

    if (!progress) {
      throw new Error('Unable to resolve manager references while inserting users');
    }

    remaining.length = 0;
    remaining.push(...nextRemaining);
  }
}

async function run() {
  await target.$connect();

  try {
    const modelsInOrder = [
      'User',
      'Broker',
      'Strategy',
      'FollowUp',
      'Sale',
      'Target',
      'ActivityLog',
      'Order',
      'Position',
      'BrokerConnection',
      'Notification',
      'RiskSetting',
    ];

    await copyUsersInDependencyOrder();

    for (const modelName of modelsInOrder.slice(1)) {
      await copyModel(modelName);
    }

    console.log('\nMigration complete.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await target.$disconnect();
    sourceDb.close();
  }
}

run();
