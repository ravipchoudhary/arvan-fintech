"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createEmployeeSchema, updateEmployeeSchema } from "@/lib/validators";

async function generateArvanEmployeeId() {
  const lastEmployee = await prisma.user.findFirst({
    where: { id: { startsWith: "ARVAN-" } },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  if (!lastEmployee) {
    return "ARVAN-EMP-0001";
  }

  const match = lastEmployee.id.match(/ARVAN-EMP-(\d+)/);
  const nextNumber = match ? Number(match[1]) + 1 : 1;
  return `ARVAN-EMP-${String(nextNumber).padStart(4, "0")}`;
}

export async function createEmployeeAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = createEmployeeSchema.safeParse({
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    role: String(data.role || "EMPLOYEE"),
    status: String(data.status || "ACTIVE"),
    password: String(data.password || ""),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid employee data.");
  }

  const { name, email, phone, role, status, password } = parsed.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        { role: { in: ["ADMIN", "MANAGER", "EMPLOYEE"] } },
        {
          OR: [{ email }, { phone }],
        },
      ],
    },
  });

  if (existingUser) {
    throw new Error("An employee with this email or phone already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const employeeId = await generateArvanEmployeeId();

  await prisma.user.create({
    data: {
      id: employeeId,
      name,
      email,
      phone,
      passwordHash,
      role,
      status,
    },
  });

  redirect("/admin/employees");
}

export async function updateEmployeeAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = updateEmployeeSchema.safeParse({
    id: String(data.id || ""),
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    role: String(data.role || "EMPLOYEE"),
    status: String(data.status || "ACTIVE"),
    password: String(data.password || ""),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid employee data.");
  }

  const { id, name, email, phone, role, status } = parsed.data;
  const password = String(data.password || "").trim();

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        { role: { in: ["ADMIN", "MANAGER", "EMPLOYEE"] } },
        {
          OR: [{ email }, { phone }],
        },
        {
          NOT: { id },
        },
      ],
    },
  });

  if (existingUser) {
    throw new Error("Another user already uses this email or phone.");
  }

  const updateData: {
    name: string;
    email: string;
    phone: string;
    role: "ADMIN" | "MANAGER" | "EMPLOYEE";
    status: "ACTIVE" | "INACTIVE" | "PENDING";
    passwordHash?: string;
  } = {
    name,
    email,
    phone,
    role,
    status,
  };

  if (password.length > 0) {
    updateData.passwordHash = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  redirect("/admin/employees");
}
