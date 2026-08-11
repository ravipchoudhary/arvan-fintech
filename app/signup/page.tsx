import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signupAction } from "@/app/actions/auth";
import { SignupForm } from "@/components/auth-forms";
import { BrandLogo } from "@/components/brand-logo";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#071526] p-8 text-white md:p-12">
            <div className="flex items-center gap-3">
              <BrandLogo withLabel label="Arvan Fintech" subtitle="Trading automation and strategy operations" />
            </div>
            <h1 className="mt-10 text-4xl font-black leading-tight">Start building smarter trades.</h1>
            <p className="mt-4 max-w-md text-slate-300">Launch strategy workflows, automate execution and track performance in real time.</p>

            <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900/60 p-5 text-sm text-slate-300">
              <div className="mb-2 text-slate-400">Platform highlights</div>
              <ul className="space-y-2">
                <li>• Real strategy and broker data</li>
                <li>• Live account connectivity</li>
                <li>• Role-based access and management</li>
              </ul>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="mb-6">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Sign Up</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Create your account</h2>
            </div>
            <SignupForm action={signupAction} />
            <div className="mt-5 text-center text-sm text-slate-500">
              Already registered? <Link href="/login" className="font-semibold text-blue-600">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
