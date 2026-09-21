import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AdminRegistrationTable } from "@/components/admin-registration-table";
import { AdminQrForm } from "@/components/admin-qr-form";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function AdminRegistrationsPage() {
  const session = await getSessionUser();
  if (!session || !["ADMIN", "MANAGER"].includes(session.role)) redirect("/login");
  const [registrations, total, pending, verified, rejected, qr] = await Promise.all([
    prisma.studentRegistration.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.studentRegistration.count({ where: { registrationId: { not: null } } }),
    prisma.studentRegistration.count({ where: { paymentStatus: "PENDING_VERIFICATION" } }),
    prisma.studentRegistration.count({ where: { paymentStatus: "VERIFIED" } }),
    prisma.studentRegistration.count({ where: { paymentStatus: "REJECTED" } }),
    prisma.paymentQrConfiguration.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } }),
  ]);
  return <AppShell title="Student Registrations" subtitle="Review payment submissions and manage the active payment QR" variant="admin"><div className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Total Registrations", total], ["Pending Payments", pending], ["Verified Payments", verified], ["Rejected Payments", rejected]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-semibold text-white">{value}</p></div>)}</div><AdminQrForm currentQr={qr?.qrImageUrl ?? null} /><div><h2 className="mb-3 text-xl font-semibold text-white">Student Registrations</h2><AdminRegistrationTable registrations={registrations.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }))} /></div></div></AppShell>;
}