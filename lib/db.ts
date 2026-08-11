import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma to connect to Postgres.");
}

const resolvedDatabaseUrl = databaseUrl;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const isSqlite = resolvedDatabaseUrl.startsWith("file:") || resolvedDatabaseUrl.includes("sqlite");

  if (isSqlite) {
    const adapter = new PrismaBetterSqlite3({ url: resolvedDatabaseUrl });
    return new PrismaClient({ adapter, log: ["error", "warn"] });
  }

  const adapter = new PrismaPg({ connectionString: resolvedDatabaseUrl });
  return new PrismaClient({ adapter, log: ["error", "warn"] });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
