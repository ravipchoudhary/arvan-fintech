"use client";

import { useState } from "react";
import { savePaymentQr } from "@/app/actions/registrations";

export function AdminQrForm({ currentQr }: { currentQr: string | null }) {
  const [preview, setPreview] = useState(currentQr);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const selectFile = (file?: File) => { if (!file) return; if (!file.type.match(/^image\/(png|jpeg|webp)$/) || file.size > 2 * 1024 * 1024) { setMessage("Choose a PNG, JPG, or WEBP image smaller than 2 MB."); return; } const reader = new FileReader(); reader.onload = () => setPreview(String(reader.result)); reader.readAsDataURL(file); };
  const save = async () => { if (!preview || preview === currentQr) { setMessage("Choose a new QR image before saving."); return; } setPending(true); const formData = new FormData(); formData.set("qrImageUrl", preview); const result = await savePaymentQr(formData); setMessage(result.message ?? (result.success ? "QR code updated successfully." : "Unable to update QR code.")); setPending(false); };
  return <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"><div className="flex flex-col gap-6 md:flex-row md:items-center"><div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-white p-4">{preview ? <img src={preview} alt="Payment QR preview" className="h-full w-full object-contain" /> : <span className="text-center text-sm text-slate-500">No active QR code</span>}</div><div className="flex-1"><h2 className="text-xl font-semibold text-white">Payment QR Management</h2><p className="mt-2 text-sm leading-6 text-slate-400">Upload a replacement QR code. Only the saved active QR appears on future payment pages.</p><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => selectFile(event.target.files?.[0])} className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:font-semibold file:text-slate-950" /><button onClick={save} disabled={pending} className="mt-4 rounded-lg bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 disabled:opacity-50">{pending ? "Saving..." : "Save / Update QR Code"}</button>{message ? <p className="mt-3 text-sm text-cyan-200">{message}</p> : null}</div></div></div>;
}