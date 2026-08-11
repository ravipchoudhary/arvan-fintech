import { AppShell } from "@/components/app-shell";
import { SalesBarChart } from "@/components/charts";
import { prisma } from "@/lib/db";

export default async function SalesManagementPage() {
  const [strategyCount, runningStrategies, pausedStrategies, connectedBrokers] = await Promise.all([
    prisma.strategy.count(),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.strategy.count({ where: { status: "PAUSED" } }),
    prisma.broker.count({ where: { connected: true } }),
  ]);

  const chartData = [
    { name: "Running", sales: runningStrategies },
    { name: "Paused", sales: pausedStrategies },
    { name: "Other", sales: Math.max(0, strategyCount - runningStrategies - pausedStrategies) },
  ];

  return (
    <AppShell title="Sales Management" subtitle="Platform performance overview">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Operational metrics</h3>
          <div className="mt-5 space-y-4">
            <Metric label="Strategies" value={strategyCount.toString()} />
            <Metric label="Running" value={runningStrategies.toString()} />
            <Metric label="Paused" value={pausedStrategies.toString()} />
            <Metric label="Connected brokers" value={connectedBrokers.toString()} />
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Strategy status trend</h3>
          <div className="mt-4">
            <SalesBarChart data={chartData} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
