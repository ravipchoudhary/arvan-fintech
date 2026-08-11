import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientStrategiesPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const strategies = await prisma.strategy.findMany({ where: { clientId: session.id }, orderBy: { updatedAt: "desc" } });

  return (
    <AppShell title="My Strategies" subtitle="Your live and backtested strategies" variant="client">
      <div className="grid gap-5">
        {strategies.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600">No strategies found.</div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="table-shell overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 pr-4">Strategy</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">P&L</th>
                    <th className="pb-3">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {strategies.map((strategy) => (
                    <tr key={strategy.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-3 pr-4 font-semibold text-slate-800">{strategy.name}</td>
                      <td className="py-3 pr-4 text-slate-700">{strategy.status}</td>
                      <td className="py-3 pr-4 text-emerald-600">₹{strategy.pnl.toLocaleString()}</td>
                      <td className="py-3 text-slate-500">{new Date(strategy.updatedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
