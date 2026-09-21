import { PublicShell } from "@/components/public-site";
import { StudentRegistrationForm } from "@/components/student-registration-form";

export default function RegistrationPage() {
  return (
    <PublicShell title="Student Registration" description="Register your details first. Payment verification is completed by our admin team after you submit your transaction reference." eyebrow="Step 1 of 3">
      <div className="mx-auto max-w-3xl">
        <ProgressStep active={0} />
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 sm:p-10">
          <h2 className="text-2xl font-semibold text-white">Create your registration</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">All fields are required. Your details are saved securely before payment so you can continue without losing your application.</p>
          <div className="mt-8"><StudentRegistrationForm /></div>
        </div>
      </div>
    </PublicShell>
  );
}

export function ProgressStep({ active }: { active: number }) {
  return <div className="mb-8 grid grid-cols-3 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{["Registration", "Payment", "Completed"].map((step, index) => <div key={step} className={index <= active ? "text-cyan-300" : ""}><div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border ${index <= active ? "border-cyan-300 bg-cyan-300/10" : "border-white/15"}`}>{index + 1}</div>{step}</div>)}</div>;
}