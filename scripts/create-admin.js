/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

process.loadEnvFile?.(".env");

const connectionString = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function upsertUser({ email, phone, name, password, role }) {
  if (!email || !phone || !password) {
    console.warn(`Skipping ${role} seed because required credentials are missing.`);
    return null;
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });

  if (existing) {
    console.log(`User already exists: ${email}`);
    return existing;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 10),
      role,
      status: "ACTIVE",
    },
  });

  console.log(`Created ${role} account: ${email} / ${password}`);
  return user;
}

async function main() {
  const users = [
    {
      name: "Arvan Admin",
      email: process.env.SEED_ADMIN_EMAIL || "admin@arvanalgo.com",
      phone: process.env.SEED_ADMIN_PHONE || "+919876543210",
      password: process.env.SEED_ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? undefined : "Admin@12345"),
      role: "ADMIN",
    },
    {
      name: "Arvan Manager",
      email: process.env.SEED_MANAGER_EMAIL || "manager@arvanalgo.com",
      phone: process.env.SEED_MANAGER_PHONE || "+919876543211",
      password: process.env.SEED_MANAGER_PASSWORD || (process.env.NODE_ENV === "production" ? undefined : "Manager@12345"),
      role: "MANAGER",
    },
    {
      name: "Arvan Employee",
      email: process.env.SEED_EMPLOYEE_EMAIL || "employee@arvanalgo.com",
      phone: process.env.SEED_EMPLOYEE_PHONE || "+919876543212",
      password: process.env.SEED_EMPLOYEE_PASSWORD || (process.env.NODE_ENV === "production" ? undefined : "Employee@12345"),
      role: "EMPLOYEE",
    },
    {
      name: "Arvan Client",
      email: process.env.SEED_CLIENT_EMAIL || "client@arvanalgo.com",
      phone: process.env.SEED_CLIENT_PHONE || "+919876543213",
      password: process.env.SEED_CLIENT_PASSWORD || (process.env.NODE_ENV === "production" ? undefined : "Client@12345"),
      role: "CLIENT",
    },
  ];

  for (const user of users) {
    await upsertUser(user);
  }
}

main()
  .catch((error) => {
    console.error("Failed to seed default users:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
