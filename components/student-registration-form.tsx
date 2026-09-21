"use client";

import { useActionState } from "react";
import { createStudentRegistration } from "@/app/actions/registrations";

const initialState = { success: false, message: "" };

export function StudentRegistrationForm() {
  const [state, action, pending] = useActionState(createStudentRegistration, initialState);
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="fullName" label="Full Name" placeholder="Your full name" />
        <Field name="mobile" label="Mobile Number" placeholder="10-digit mobile number" inputMode="numeric" />
        <Field name="email" label="Email Address" placeholder="you@example.com" type="email" />
        <Field name="college" label="College / University Name" placeholder="Institution name" />
        <Field name="course" label="Course" placeholder="Course or programme" />
      </div>
      <label className="block text-sm font-medium text-slate-200">
        Address
        <textarea name="address" required rows={4} placeholder="Your complete address" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300" />
      </label>
      {state.message ? <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{state.message}</p> : null}
      <button disabled={pending} className="w-full rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Saving details..." : "Continue to Payment"}
      </button>
    </form>
  );
}

function Field({ name, label, placeholder, type = "text", inputMode }: { name: string; label: string; placeholder: string; type?: string; inputMode?: "numeric" }) {
  return (
    <label className="block text-sm font-medium text-slate-200">
      {label}
      <input name={name} type={type} inputMode={inputMode} required placeholder={placeholder} className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300" />
    </label>
  );
}