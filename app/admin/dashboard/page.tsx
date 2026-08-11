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
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Users" value={totalUsers.toString()} />
        <Metric label="Strategies" value={totalStrategies.toString()} />
        <Metric label="Connected brokers" value={connectedBrokers.toString()} />
        <Metric label="Running strategies" value={runningStrategies.toString()} />
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Strategy health</h3>
          <div className="mt-4 sm:mt-6">
            <SalesBarChart data={chartData} />
          </div>
        </div>

        <div className="card p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Team coverage</h3>
          <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700">
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
      <div className="text-xs sm:text-sm text-slate-500">{label}</div>
      <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
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
