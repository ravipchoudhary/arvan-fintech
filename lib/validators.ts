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
