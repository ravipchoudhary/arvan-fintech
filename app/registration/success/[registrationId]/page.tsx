import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PublicShell } from "@/components/public-site";
import { ProgressStep } from "@/app/registration/page";
import { prisma } from "@/lib/db";

export default async function RegistrationSuccessPage({ params }: { params: Promise<{ registrationId: string }> }) {
  const { registrationId } = await params;
  const registration = await prisma.studentRegistration.findUnique({ where: { registrationId } });
  if (!registration) notFound();
  return <PublicShell title="Registration Submitted Successfully" description="Your registration and payment details have been submitted successfully. Our team will verify your payment and update your registration status." eyebrow="Step 3 of 3">
    <div className="mx-auto max-w-2xl"><ProgressStep active={2} /><div className="rounded-3xl border border-emerald-400/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-black/20 sm:p-12"><CheckCircle2 className="mx-auto h-16 w-16 text-emerald-300" /><h2 className="mt-6 text-2xl font-semibold text-white">Registration Submitted Successfully</h2><p className="mt-4 text-sm leading-7 text-slate-400">Your registration and payment details have been submitted successfully. Our team will verify your payment and update your registration status.</p><div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Registration ID</p><p className="mt-2 text-2xl font-bold tracking-wider text-cyan-300">{registration.registrationId}</p><p className="mt-2 text-xs text-amber-200">Payment Submitted / Pending Verification</p></div><Link href="/" className="mt-8 inline-flex rounded-xl bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950">Back to Home</Link></div></div>
  </PublicShell>;
}