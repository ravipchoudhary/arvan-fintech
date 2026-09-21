"use client";

import { useActionState } from "react";
import { submitStudentPayment } from "@/app/actions/registrations";

const initialState = { success: false, message: "" };

export function StudentPaymentForm({ paymentToken }: { paymentToken: string }) {
  const [state, action, pending] = useActionState(submitStudentPayment, initialState);
  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="paymentToken" value={paymentToken} />
      <label className="block text-sm font-medium text-slate-200">
        Transaction ID / UTR Number
        <input name="transactionId" required minLength={4} maxLength={120} placeholder="Enter your payment reference" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
      </label>
      {state.message ? <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{state.message}</p> : null}
      <button disabled={pending} className="w-full rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Submitting payment..." : "Submit Payment & Complete Registration"}
      </button>
    </form>
  );
}