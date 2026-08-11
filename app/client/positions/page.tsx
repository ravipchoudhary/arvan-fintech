import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientPositionsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const positions = await prisma.position.findMany({ where: { clientId: session.id }, orderBy: { updatedAt: "desc" } });
  const totalExposure = positions.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0);

  return (
    <AppShell title="Positions" subtitle="Your current positions" variant="client">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Open positions</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">{positions.length}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Exposure</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">₹{totalExposure.toLocaleString()}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Active symbols</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">{new Set(positions.map((position) => position.symbol)).size}</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-5">
        <div className="text-sm font-semibold text-slate-900">Open positions</div>
        {positions.length === 0 ? (
          <div className="mt-5 text-sm text-slate-500">No positions are open right now.</div>
        ) : (
          <table className="mt-4 min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3">Symbol</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Qty</th>
                <th className="px-3 py-3">Avg price</th>
                <th className="px-3 py-3">LTP</th>
                <th className="px-3 py-3">Unrealized P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-3 font-semibold text-slate-900">{position.symbol}</td>
                  <td className="px-3 py-3 text-slate-700">{position.type}</td>
                  <td className="px-3 py-3">{position.quantity}</td>
                  <td className="px-3 py-3">₹{position.avgPrice.toLocaleString()}</td>
                  <td className="px-3 py-3">₹{position.ltp.toLocaleString()}</td>
                  <td className={`px-3 py-3 ${position.pnl >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    ₹{position.pnl.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}
