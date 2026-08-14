import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ClientBrokerPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const connection = await prisma.brokerConnection.findFirst({ 
    where: { clientId: session.id }, 
    include: { broker: true } 
  });

  return (
    <AppShell title="Broker" subtitle="Your brokerage connection" variant="client">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Broker Connections</h3>
            <p className="text-sm text-slate-500 mt-1">Connect a broker to start trading with ARVAN FINTECH</p>
          </div>
        </div>

        {connection ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-slate-900">{connection.broker.name}</h4>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${connection.status === 'CONNECTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {connection.status}
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div><span className="text-slate-500">Account ID:</span> {connection.accountId}</div>
                <div><span className="text-slate-500">Last Synced:</span> {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : 'Never'}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="#" className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 transition">
                  View Details
                </Link>
                <button className="flex-1 rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6h6" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900">No Broker Connected</h4>
            <p className="mt-2 text-sm text-slate-500">Connect a broker to start trading and monitoring your strategies</p>
            <button 
              onClick={() => {
                // TODO: Open broker connection modal/form
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Connect Broker
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
