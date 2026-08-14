import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientBacktestPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  const strategies = await prisma.strategy.findMany({
    where: { clientId: session.id },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  return (
    <AppShell title="Backtest" subtitle="Your strategy performance review" variant="client">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Strategies" value={String(strategies.length)} />
        <Metric label="Running" value={String(strategies.filter((strategy) => strategy.status === "RUNNING").length)} />
        <Metric label="Paused" value={String(strategies.filter((strategy) => strategy.status === "PAUSED").length)} />
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
        <div className="mb-4 text-lg font-semibold text-slate-900">Strategy review</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3">Strategy</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">PnL</th>
              </tr>
            </thead>
            <tbody>
              {strategies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-slate-500">No strategy data is available yet.</td>
                </tr>
              ) : (
                strategies.map((strategy) => (
                  <tr key={strategy.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{strategy.name}</td>
                    <td className="px-3 py-3">{strategy.type}</td>
                    <td className="px-3 py-3">{strategy.status}</td>
                    <td className={`px-3 py-3 ${strategy.pnl >= 0 ? "text-emerald-600" : "text-rose-600"}`}>₹{strategy.pnl.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
