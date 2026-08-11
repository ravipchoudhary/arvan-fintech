import { AppShell } from "@/components/app-shell";
import { SalesBarChart } from "@/components/charts";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [totalUsers, totalStrategies, connectedBrokers, runningStrategies, pausedStrategies] = await Promise.all([
    prisma.user.count(),
    prisma.strategy.count(),
    prisma.broker.count({ where: { connected: true } }),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.strategy.count({ where: { status: "PAUSED" } }),
  ]);

  const openStrategies = Math.max(0, totalStrategies - runningStrategies - pausedStrategies);
  const chartData = [
    { name: "Running", sales: runningStrategies },
    { name: "Paused", sales: pausedStrategies },
    { name: "Idle", sales: openStrategies },
  ];

  return (
    <AppShell title="Admin Dashboard" subtitle="Company overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Users" value={totalUsers.toString()} />
        <Metric label="Strategies" value={totalStrategies.toString()} />
        <Metric label="Connected brokers" value={connectedBrokers.toString()} />
        <Metric label="Running strategies" value={runningStrategies.toString()} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Strategy health</h3>
          <div className="mt-4">
            <SalesBarChart data={chartData} />
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Team coverage</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <Stat label="Platform users" value={totalUsers.toString()} />
            <Stat label="Connected brokers" value={connectedBrokers.toString()} />
            <Stat label="Monitoring strategies" value={totalStrategies.toString()} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-3 text-slate-700">
        <span>{label}</span>
        <span className="font-semibold text-slate-900">{value}</span>
      </div>
    </div>
  );
}
