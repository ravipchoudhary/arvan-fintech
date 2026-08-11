"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getDashboardPathForRole } from "@/lib/auth";
import { getSessionUser, setSession } from "@/lib/session";
import { loginSchema, signupSchema } from "@/lib/validators";

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse({
    emailOrPhone: String(data.emailOrPhone || ""),
    password: String(data.password || ""),
  });

  if (!parsed.success) {
    return { success: false, message: "Please enter a valid email/phone and password." };
  }

  const { emailOrPhone, password } = parsed.data;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash || ""))) {
      return { success: false, message: "Invalid credentials." };
    }

    await setSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const redirectPath = getDashboardPathForRole(user.role);
    return { success: true, redirect: redirectPath };
  } catch {
    return { success: false, message: "Unable to authenticate right now. Please check your database configuration." };
  }
}

export async function signupAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse({
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    password: String(data.password || ""),
    confirmPassword: String(data.confirmPassword || ""),
    agree: data.agree === "on",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const { name, email, phone, password } = parsed.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email or phone.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      passwordHash,
      role: "EMPLOYEE",
      status: "ACTIVE",
    },
  });

  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(getDashboardPathForRole("EMPLOYEE"));
}

export async function createClientForEmployeeAction(_prevState: { success: boolean; message?: string | null } | null, formData: FormData) {
  const session = await getSessionUser();
  if (!session || session.role !== "EMPLOYEE") {
    return { success: false, message: "Only employees can create client accounts." };
  }

  const data = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse({
    name: String(data.name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    password: String(data.password || ""),
    confirmPassword: String(data.confirmPassword || ""),
    agree: data.agree === "on",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please fill in all required fields." };
  }

  const { name, email, phone, password } = parsed.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    return { success: false, message: "A user with this email or phone already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const client = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      passwordHash,
      role: "CLIENT",
      status: "ACTIVE",
      managerId: session.id,
    },
  });

  revalidatePath("/employee/clients");

  return { success: true, message: `Client ${client.name} was created successfully.` };
}

export async function logoutAction() {
  const { clearSession } = await import("@/lib/session");
  await clearSession();
  redirect("/login");
}
