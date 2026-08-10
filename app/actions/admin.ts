"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createEmployeeSchema, updateEmployeeSchema } from "@/lib/validators";

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
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    throw new Error("An employee with this email or phone already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
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

  const { id, name, email, phone, role, status, password } = parsed.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
      NOT: { id },
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

  if (password) {
    updateData.passwordHash = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  redirect("/admin/employees");
}
