import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ForgotPasswordForm } from "@/components/auth-forms";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#071526] p-8 text-white md:p-12">
            <div className="flex items-center gap-3">
              <BrandLogo
                withLabel
                label="Arvan Fintech"
                subtitle="Trading automation and strategy operations"
                labelClassName="text-white"
                subtitleClassName="text-slate-300"
              />
            </div>
            <h1 className="mt-10 text-4xl font-black leading-tight">Reset your password.</h1>
            <p className="mt-4 max-w-md text-slate-300">Don't worry! We'll help you regain access to your account quickly and securely.</p>

            <div className="mt-10 space-y-4 rounded-3xl border border-slate-700 bg-slate-900/60 p-5">
              <div className="text-sm text-slate-300">Security</div>
              <div className="text-2xl font-bold text-green-400">Secure Process</div>
              <div className="text-sm text-slate-400">We use industry-standard security to protect your account.</div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
            <div className="mb-6">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Reset Password</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Enter your email or phone</h2>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
