import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function ClientAddBrokerPage() {
  return (
    <AppShell title="Add Broker" subtitle="Connect a new broker account" variant="client">
      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <form action="/api/brokers" method="post" className="space-y-5">
          <input type="hidden" name="source" value="CLIENT" />

          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Broker Name</div>
            <input name="name" type="text" placeholder="Zerodha, Upstox, Angel One" className="w-full bg-transparent text-sm text-slate-900 outline-none" required />
          </label>

          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">API Key / Token</div>
            <input name="credentials" type="text" placeholder="Enter broker API key" className="w-full bg-transparent text-sm text-slate-900 outline-none" required />
          </label>

          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">Add Broker</button>
            <Link href="/client/broker" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">Cancel</Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
