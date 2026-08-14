import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientBrokerPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  const [connections, brokers] = await Promise.all([
    prisma.brokerConnection.findMany({
      where: { clientId: session.id },
      include: { broker: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.broker.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const connection = connections.find((row) => row.status === "CONNECTED") ?? connections[0] ?? null;

  return (
    <AppShell title="Broker" subtitle="Your brokerage connection" variant="client">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Broker Connections</h3>
            <p className="mt-1 text-sm text-slate-500">Connect a broker to start trading with ARVAN FINTECH.</p>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${connection?.status === "CONNECTED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {connection?.status ?? "DISCONNECTED"}
          </div>
        </div>

        {connection ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="text-lg font-semibold text-slate-900">{connection.broker.name}</h4>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${connection.status === "CONNECTED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {connection.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div><span className="text-slate-500">Account ID:</span> {connection.accountId}</div>
                <div><span className="text-slate-500">Last Sync:</span> {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : "Never"}</div>
                <div><span className="text-slate-500">Connection Status:</span> {connection.status}</div>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <form action="/api/broker/connect" method="post" className="flex-1">
                  <input type="hidden" name="brokerId" value={connection.brokerId} />
                  <button type="submit" className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Re-authorize
                  </button>
                </form>
                <form action="/api/broker/disconnect" method="post" className="flex-1">
                  <button type="submit" className="w-full rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                    Disconnect
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6h6" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900">Broker Not Connected</h4>
            <p className="mt-2 text-sm text-slate-500">Connect a broker to enable live execution and portfolio sync.</p>
            <form action="/api/broker/connect" method="post" className="mt-5 mx-auto max-w-md text-left">
              <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Broker</label>
              <select name="brokerId" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400" defaultValue="">
                <option value="" disabled>Select a broker</option>
                {brokers.map((broker) => (
                  <option key={broker.id} value={broker.id}>{broker.name}</option>
                ))}
              </select>
              <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Connect Broker
              </button>
            </form>
          </div>
        )}
      </div>
    </AppShell>
  );
}
