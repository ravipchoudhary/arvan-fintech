import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  agree: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
}).refine((data) => data.agree === true, {
  path: ["agree"],
  message: "Please accept the terms",
});

export const loginSchema = z.object({
  emailOrPhone: z.string().min(3),
  password: z.string().min(1),
});

export const createEmployeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  password: z.string().min(8),
});

export const updateEmployeeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  password: z.string().optional(),
});

export const strategySchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  status: z.string().default("DRAFT"),
});

export const studentRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  address: z.string().trim().min(5, "Please enter your complete address.").max(500),
  mobile: z.string().trim().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  college: z.string().trim().min(2, "Please enter your college or university.").max(160),
  course: z.string().trim().min(2, "Please enter your course.").max(120),
});

export const transactionIdSchema = z.string().trim().min(4, "Transaction ID / UTR is required.").max(120);
