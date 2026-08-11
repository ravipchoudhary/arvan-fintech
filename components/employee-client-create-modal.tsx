"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound, X } from "lucide-react";
import type { createClientForEmployeeAction } from "@/app/actions/auth";

type ActionState = {
  success: boolean;
  message?: string | null;
};

const initialState: ActionState = { success: false, message: null };

export function EmployeeClientCreateModal({
  action,
}: {
  action: typeof createClientForEmployeeAction;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
        Add Client
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create New Client</h3>
                <p className="mt-1 text-sm text-slate-500">Add a client directly from your employee workspace.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {state.message ? (
              <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${state.success ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
                {state.message}
              </div>
            ) : null}

            <form action={formAction} className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field icon={<UserRound className="h-4 w-4 text-slate-400" />} label="Full Name" name="name" placeholder="John Doe" />
                <Field icon={<Mail className="h-4 w-4 text-slate-400" />} label="Email" name="email" type="email" placeholder="name@email.com" />
              </div>

              <Field icon={<Phone className="h-4 w-4 text-slate-400" />} label="Phone" name="phone" placeholder="+91 98765 43210" />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Create password" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
                    <button type="button" onClick={() => setShowPassword((value) => !value)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confirm Password</label>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm password" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
                    <button type="button" onClick={() => setShowConfirm((value) => !value)}>
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" name="agree" className="h-4 w-4" />
                I agree to the Terms & Conditions
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  Cancel
                </button>
                <button type="submit" disabled={pending} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-400">
                  {pending ? "Creating..." : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ icon, label, name, type = "text", placeholder }: { icon: React.ReactNode; label: string; name: string; type?: string; placeholder: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</label>
      <div className="flex items-center gap-2">
        {icon}
        <input name={name} type={type} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
      </div>
    </div>
  );
}
