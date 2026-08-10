import { AppShell } from "@/components/app-shell";
import { EquityCurveChart, PnlDonutChart } from "@/components/charts";
import { activityRows, dashboardMetrics, equityCurve, pnlBreakdown, strategyRows } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Portfolio overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</div>
            <div className="mt-2 text-xs font-semibold text-green-600">{metric.change}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Equity Curve</h3>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">+36.42%</span>
          </div>
          <EquityCurveChart data={equityCurve} />
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">P&L Breakdown</h3>
          <div className="mt-3 flex items-center justify-center">
            <PnlDonutChart data={pnlBreakdown} />
          </div>
          <div className="grid gap-2 text-sm text-slate-600">
            {pnlBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Strategies</h3>
            <button className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">View all</button>
          </div>
          <div className="table-shell">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Strategy</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Today&apos;s P&L</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {strategyRows.map((row) => (
                  <tr key={row.name} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-3 pr-4 font-semibold text-slate-800">{row.name}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700">{row.status}</span>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{row.type}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">{row.pnl}</td>
                    <td className="py-3 text-blue-600">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {activityRows.map((row) => (
              <div key={`${row.time}-${row.action}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{row.time}</span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">{row.status}</span>
                </div>
                <div className="mt-2 font-semibold text-slate-900">{row.action}</div>
                <div className="mt-1 text-sm text-slate-600">{row.strategy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
