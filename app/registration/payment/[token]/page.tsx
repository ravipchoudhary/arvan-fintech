import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public-site";
import { StudentPaymentForm } from "@/components/student-payment-form";
import { ProgressStep } from "@/app/registration/page";
import { prisma } from "@/lib/db";

export default async function PaymentPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const registration = await prisma.studentRegistration.findUnique({ where: { paymentToken: token } });
  if (!registration) notFound();
  const qr = await prisma.paymentQrConfiguration.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } });

  return <PublicShell title="Complete Your Registration" description="Use the current payment QR configured by our admin team, then submit the transaction reference for manual verification." eyebrow="Step 2 of 3">
    <div className="mx-auto max-w-3xl"><ProgressStep active={1} /><div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center shadow-2xl shadow-black/20 sm:p-10">
      <p className="text-sm text-slate-400">Registration details saved for {registration.fullName}</p>
      <div className="mx-auto mt-7 flex min-h-64 max-w-sm items-center justify-center rounded-2xl bg-white p-5">{qr ? <img src={qr.qrImageUrl} alt="Current payment QR code" className="h-64 w-64 object-contain" /> : <p className="text-sm text-slate-600">Payment QR is being configured. Please check back shortly.</p>}</div>
      <p className="mt-6 text-base font-medium text-white">Scan the QR code and complete your payment.</p>
      <div className="mx-auto max-w-md text-left"><StudentPaymentForm paymentToken={token} /></div>
    </div></div>
  </PublicShell>;
}