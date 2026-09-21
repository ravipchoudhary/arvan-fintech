"use client";

import { useState } from "react";
import { updateRegistrationStatus } from "@/app/actions/registrations";

type Registration = {
  id: string;
  registrationId: string | null;
  fullName: string;
  address: string;
  mobile: string;
  email: string;
  college: string;
  course: string;
  transactionId: string | null;
  paymentStatus: string;
  createdAt: string;
};

export function AdminRegistrationTable({ registrations }: { registrations: Registration[] }) {
  const [selected, setSelected] = useState<Registration | null>(null);
  const [busy, setBusy] = useState("");
  const changeStatus = async (id: string, status: "VERIFIED" | "REJECTED") => {
    setBusy(id);
    await updateRegistrationStatus(id, status);
    window.location.reload();
  };

  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/70"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="border-b border-white/10 bg-slate-950/60 text-xs uppercase tracking-[0.12em] text-slate-500"><tr>{["Registration ID", "Name", "Mobile", "Email", "College", "Course", "Transaction ID", "Submission Date", "Payment Status", "Actions"].map((head) => <th key={head} className="px-4 py-4">{head}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{registrations.map((row) => <tr key={row.id} className="text-slate-300"><td className="px-4 py-4 font-semibold text-cyan-300">{row.registrationId ?? "Draft"}</td><td className="px-4 py-4 font-medium text-white">{row.fullName}</td><td className="px-4 py-4">{row.mobile}</td><td className="px-4 py-4">{row.email}</td><td className="max-w-48 truncate px-4 py-4">{row.college}</td><td className="px-4 py-4">{row.course}</td><td className="px-4 py-4">{row.transactionId ?? "-"}</td><td className="whitespace-nowrap px-4 py-4">{formatSubmissionDate(row.createdAt)}</td><td className="px-4 py-4"><Status status={row.paymentStatus} /></td><td className="px-4 py-4"><button onClick={() => setSelected(row)} className="font-semibold text-cyan-300 hover:text-cyan-200">View</button></td></tr>)}</tbody></table>{registrations.length === 0 ? <div className="p-12 text-center text-slate-400">No student registrations have been submitted.</div> : null}{selected ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" onClick={() => setSelected(null)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-slate-500">Student Registration</p><h2 className="mt-2 text-2xl font-semibold text-white">{selected.fullName}</h2></div><button onClick={() => setSelected(null)} className="text-2xl text-slate-400">&times;</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{[["Registration ID", selected.registrationId ?? "Draft"], ["Mobile", selected.mobile], ["Email", selected.email], ["College", selected.college], ["Course", selected.course], ["Transaction ID", selected.transactionId ?? "Not submitted"], ["Address", selected.address], ["Submitted", formatSubmissionDate(selected.createdAt)]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 break-words text-sm text-white">{value}</p></div>)}</div><div className="mt-6 flex flex-wrap items-center gap-3"><Status status={selected.paymentStatus} />{selected.paymentStatus === "PENDING_VERIFICATION" ? <><button disabled={busy === selected.id} onClick={() => changeStatus(selected.id, "VERIFIED")} className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">Verify Payment</button><button disabled={busy === selected.id} onClick={() => changeStatus(selected.id, "REJECTED")} className="rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">Reject Payment</button></> : null}</div></div></div> : null}</div>;
}

function Status({ status }: { status: string }) { const text = status === "PENDING_VERIFICATION" ? "Pending Verification" : status === "VERIFIED" ? "Payment Verified" : status === "REJECTED" ? "Payment Rejected" : "Pending Payment"; const color = status === "VERIFIED" ? "bg-emerald-400/15 text-emerald-300" : status === "REJECTED" ? "bg-rose-400/15 text-rose-300" : "bg-amber-400/15 text-amber-200"; return <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{text}</span>; }

function formatSubmissionDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "medium",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value));
}