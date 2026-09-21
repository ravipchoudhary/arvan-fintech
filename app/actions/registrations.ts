"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { studentRegistrationSchema, transactionIdSchema } from "@/lib/validators";

export async function createStudentRegistration(_previousState: { success: boolean; message?: string }, formData: FormData) {
  const parsed = studentRegistrationSchema.safeParse({
    fullName: String(formData.get("fullName") || ""),
    address: String(formData.get("address") || ""),
    mobile: String(formData.get("mobile") || "").replace(/\D/g, ""),
    email: String(formData.get("email") || ""),
    college: String(formData.get("college") || ""),
    course: String(formData.get("course") || ""),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  const registration = await prisma.studentRegistration.create({
    data: {
      ...parsed.data,
      paymentToken: randomBytes(24).toString("hex"),
    },
  });

  redirect(`/registration/payment/${registration.paymentToken}`);
}

export async function submitStudentPayment(_previousState: { success: boolean; message?: string }, formData: FormData) {
  const paymentToken = String(formData.get("paymentToken") || "").trim();
  const transactionId = String(formData.get("transactionId") || "").trim();
  const parsed = transactionIdSchema.safeParse(transactionId);

  if (!paymentToken || !parsed.success) {
    return { success: false, message: parsed.success ? "Your payment session is invalid." : parsed.error.issues[0]?.message };
  }

  const registration = await prisma.studentRegistration.findUnique({ where: { paymentToken } });
  if (!registration) return { success: false, message: "This payment link is invalid or has expired." };

  if (registration.paymentStatus === "PENDING_VERIFICATION" && registration.registrationId) {
    redirect(`/registration/success/${registration.registrationId}`);
  }

  const year = new Date().getFullYear();
  const submittedCount = await prisma.studentRegistration.count({ where: { registrationId: { not: null } } });
  const registrationId = `REG-${year}-${String(submittedCount + 1).padStart(5, "0")}`;

  const updated = await prisma.studentRegistration.updateMany({
    where: { id: registration.id, paymentStatus: "PENDING_PAYMENT" },
    data: { transactionId: parsed.data, registrationId, paymentStatus: "PENDING_VERIFICATION" },
  });

  if (updated.count === 0) {
    const current = await prisma.studentRegistration.findUnique({ where: { id: registration.id }, select: { registrationId: true } });
    if (current?.registrationId) redirect(`/registration/success/${current.registrationId}`);
    return { success: false, message: "This registration has already been submitted." };
  }

  redirect(`/registration/success/${registrationId}`);
}

export async function updateRegistrationStatus(registrationId: string, status: "VERIFIED" | "REJECTED") {
  const session = await getSessionUser();
  if (!session || session.role !== "ADMIN") return { success: false, message: "Admin access required." };

  await prisma.studentRegistration.update({
    where: { id: registrationId },
    data: { paymentStatus: status },
  });
  revalidatePath("/admin/registrations");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function savePaymentQr(formData: FormData) {
  const session = await getSessionUser();
  if (!session || session.role !== "ADMIN") return { success: false, message: "Admin access required." };

  const qrImageUrl = String(formData.get("qrImageUrl") || "");
  if (!/^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/.test(qrImageUrl) || qrImageUrl.length > 2_500_000) {
    return { success: false, message: "Upload a valid PNG, JPG, or WEBP QR image smaller than 2 MB." };
  }

  // Keep QR replacement compatible with the deployed Prisma Postgres adapter,
  // which may not have a transaction slot available for this request.
  await prisma.paymentQrConfiguration.updateMany({
    where: { isActive: true },
    data: { isActive: false },
  });
  await prisma.paymentQrConfiguration.create({
    data: { qrImageUrl, isActive: true },
  });
  revalidatePath("/registration/payment/[token]", "page");
  revalidatePath("/admin/registrations");
  return { success: true };
}