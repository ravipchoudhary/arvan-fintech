import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function BrokersPage() {
  const brokers = await prisma.broker.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AppShell title="Brokers" subtitle="Broker connectivity status">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-lg font-bold text-slate-900">Broker Connectivity</div>
        <Link href="/brokers/add" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Add Broker</Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {brokers.map((broker) => (
          <div key={broker.id} className="card p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900">{broker.name}</div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${broker.connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {broker.connected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link href={`/brokers/${broker.slug}/connect`} className="flex-1 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white text-center">Connect</Link>
              <Link href={`/brokers/${broker.slug}/configure`} className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 text-center">Configure</Link>
              <form action={`/api/brokers/${broker.slug}/delete`} method="post" className="flex-1">
                <button type="submit" className="w-full rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
