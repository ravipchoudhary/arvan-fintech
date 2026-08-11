import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientBrokerPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const connection = await prisma.brokerConnection.findFirst({ where: { clientId: session.id }, include: { broker: true } });

  return (
    <AppShell title="Broker" subtitle="Your brokerage connection" variant="client">
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="text-sm text-slate-500">Broker status</div>
        {connection ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-lg font-semibold text-slate-900">{connection.broker.name}</div>
              <div className="text-sm text-slate-500">Account ID: {connection.accountId}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-semibold">{connection.status}</div>
              <div className="mt-1">Last sync: {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : "Never"}</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-slate-500">No broker is connected yet. Connect a broker from the platform to start trading.</div>
        )}
      </div>
    </AppShell>
  );
}
