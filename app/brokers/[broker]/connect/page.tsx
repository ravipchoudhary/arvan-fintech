import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { notFound } from "next/navigation";

const validBrokers = ["zerodha", "angel-one", "upstox", "icici-direct", "fyers"];

type Props = { params: Promise<{ broker: string | string[] }> };

export default async function BrokerConnectPage({ params }: Props) {
  const resolvedParams = await params;
  const broker = Array.isArray(resolvedParams.broker) ? resolvedParams.broker[0] : resolvedParams.broker;

  if (!broker || !validBrokers.includes(broker)) {
    notFound();
  }

  return (
    <AppShell title="Broker Connect" subtitle={`Connect ${broker.replace(/-/g, " ")}`}>
      <div className="card p-5 max-w-2xl">
        <p className="mb-4 text-slate-700">Enter the credentials for your {broker.replace(/-/g, " ")} account and click connect.</p>
        <form action={`/api/brokers/${broker}/connect`} method="post" className="space-y-5">
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">API Key</div>
            <input name="apiKey" type="text" placeholder="Enter API key" className="w-full bg-transparent text-sm text-slate-900 outline-none" required />
          </label>
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Secret</div>
            <input name="secret" type="password" placeholder="Enter secret" className="w-full bg-transparent text-sm text-slate-900 outline-none" required />
          </label>
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">Connect</button>
            <Link href="/brokers" className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">Cancel</Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
