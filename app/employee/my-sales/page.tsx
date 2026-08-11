import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function EmployeeSalesPage() {
  const [runningStrategies, pausedStrategies, draftStrategies, strategies] = await Promise.all([
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.strategy.count({ where: { status: "PAUSED" } }),
    prisma.strategy.count({ where: { status: "DRAFT" } }),
    prisma.strategy.findMany({ orderBy: { updatedAt: "desc" }, take: 4 }),
  ]);

  const stats = [
    { label: "Booked", value: `₹${(runningStrategies * 120000).toLocaleString("en-IN")}` },
    { label: "Pending", value: `₹${(pausedStrategies * 85000).toLocaleString("en-IN")}` },
    { label: "Expected", value: `₹${(draftStrategies * 95000).toLocaleString("en-IN")}` },
  ];

  const topDeals = strategies.map((strategy) => ({
    id: strategy.id,
    product: strategy.name,
    value: `₹${Math.max(0, strategy.pnl).toLocaleString("en-IN")}`,
    status: strategy.status === "RUNNING" ? "Booked" : strategy.status === "PAUSED" ? "Pending" : "Draft",
  }));

  return (
    <AppShell title="My Sales" subtitle="Sales performance and deals" variant="employee">
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-5">
        <h3 className="text-lg font-bold text-slate-900">Top Deals</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          {topDeals.length > 0 ? (
            topDeals.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <div className="font-semibold text-slate-800">{item.product}</div>
                  <div className="text-slate-500">{item.value}</div>
                </div>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">{item.status}</span>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">No sales deals available yet. Create a strategy to generate sales insights.</div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
