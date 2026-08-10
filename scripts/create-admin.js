/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

process.loadEnvFile?.(".env");

const connectionString = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function upsertUser({ email, phone, name, password, role }) {
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
      email: "admin@arvanalgo.com",
      phone: "+919876543210",
      password: "Admin@12345",
      role: "ADMIN",
    },
    {
      name: "Arvan Manager",
      email: "manager@arvanalgo.com",
      phone: "+919876543211",
      password: "Manager@12345",
      role: "MANAGER",
    },
    {
      name: "Arvan Employee",
      email: "employee@arvanalgo.com",
      phone: "+919876543212",
      password: "Employee@12345",
      role: "EMPLOYEE",
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
