import { AppShell } from "@/components/app-shell";
import { SalesBarChart } from "@/components/charts";
import { metricCards, salesData } from "@/lib/demo-data";

export default function AdminDashboardPage() {
  return (
    <AppShell title="Admin Dashboard" subtitle="Company overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Monthly Sales Performance</h3>
          <div className="mt-4">
            <SalesBarChart data={salesData} />
          </div>
        </div>
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Team Achievement</h3>
          <div className="mt-5 space-y-3 text-sm">
            {[
              ["North Team", "92%"],
              ["East Team", "88%"],
              ["West Team", "94%"],
              ["Inside Sales", "90%"],
            ].map(([team, value]) => (
              <div key={team} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">{team}</span>
                  <span className="font-bold text-slate-900">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
