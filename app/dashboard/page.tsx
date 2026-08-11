import { AppShell } from "@/components/app-shell";
import { SalesBarChart } from "@/components/charts";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const [strategyCount, runningStrategies, pausedStrategies, brokerCount, strategies] = await Promise.all([
    prisma.strategy.count(),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.strategy.count({ where: { status: "PAUSED" } }),
    prisma.broker.count(),
    prisma.strategy.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const completedStrategies = Math.max(0, strategyCount - runningStrategies - pausedStrategies);
  const statusData = [
    { name: "Running", sales: runningStrategies },
    { name: "Paused", sales: pausedStrategies },
    { name: "Completed", sales: completedStrategies },
  ];

  return (
    <AppShell title="Dashboard" subtitle="Portfolio overview">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Total strategies" value={strategyCount.toString()} />
        <Metric label="Active strategies" value={runningStrategies.toString()} />
        <Metric label="Connected brokers" value={brokerCount.toString()} />
        <Metric label="Paused strategies" value={pausedStrategies.toString()} />
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 lg:gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="card p-4 sm:p-5 lg:p-6">
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Strategy Status</h3>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 w-fit">Live view</span>
          </div>
          <SalesBarChart data={statusData} />
        </div>

        <div className="card p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Broker connectivity</h3>
          <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-slate-500 text-xs sm:text-sm">Total connected brokers</div>
              <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{brokerCount}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-3 sm:py-4">
              <div className="text-slate-500 text-xs sm:text-sm">Strategies under management</div>
              <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{strategyCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 card p-4 sm:p-5 lg:p-6">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent strategies</h3>
          <span className="text-xs sm:text-sm text-slate-500">Updated automatically</span>
        </div>
        <div className="table-shell">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Strategy</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Status</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Type</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Performance</th>
                <th className="pb-2 sm:pb-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {strategies.length > 0 ? (
                strategies.map((strategy) => (
                  <tr key={strategy.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-semibold text-slate-800">{strategy.name}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4">
                      <span className={`rounded-full px-2 py-1 text-[10px] sm:text-[11px] font-semibold ${strategy.status === "RUNNING" ? "bg-green-100 text-green-700" : strategy.status === "PAUSED" ? "bg-yellow-100 text-yellow-700" : strategy.status === "DRAFT" ? "bg-slate-200 text-slate-700" : "bg-slate-100 text-slate-700"}`}>{strategy.status}</span>
                    </td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-600">{strategy.type}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-semibold text-slate-900">{strategy.pnl >= 0 ? "+" : ""}₹{strategy.pnl.toLocaleString("en-IN")}</td>
                    <td className="py-2 sm:py-3 text-slate-600 text-xs sm:text-sm">{new Date(strategy.updatedAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 sm:py-8 text-center text-xs sm:text-sm text-slate-500">
                    No strategies found. Create a new strategy to start tracking performance.
                  </td>
                </tr>
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
    <div className="stat-card">
      <div className="text-xs sm:text-sm text-slate-500">{label}</div>
      <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
