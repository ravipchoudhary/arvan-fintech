import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { notFound } from "next/navigation";

const validBrokers = ["zerodha", "angel-one", "upstox", "icici-direct", "fyers"];

type Props = { params: Promise<{ broker: string | string[] }> };

export default async function BrokerConfigurePage({ params }: Props) {
  const resolvedParams = await params;
  const broker = Array.isArray(resolvedParams.broker) ? resolvedParams.broker[0] : resolvedParams.broker;

  if (!broker || !validBrokers.includes(broker)) {
    notFound();
  }

  return (
    <AppShell title="Configure Broker" subtitle={`Configure ${broker.replace(/-/g, " ")}`}>
      <div className="card p-5 max-w-2xl">
        <p className="mb-4 text-slate-700">Update the connection settings for {broker.replace(/-/g, " ")}.</p>
        <form action={`/api/brokers/${broker}/configure`} method="post" className="space-y-5">
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Connection Mode</div>
            <select name="mode" className="w-full bg-transparent text-sm text-slate-900 outline-none">
              <option value="live">Live</option>
              <option value="sandbox">Sandbox</option>
            </select>
          </label>
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Webhook URL</div>
            <input name="webhook" type="text" placeholder="https://yourapp.com/webhook" className="w-full bg-transparent text-sm text-slate-900 outline-none" />
          </label>
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">Save Settings</button>
            <Link href="/brokers" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">Cancel</Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
