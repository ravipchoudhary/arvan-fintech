import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function RiskManagementPage() {
  const [strategyCount, runningStrategies, brokerCount] = await Promise.all([
    prisma.strategy.count(),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.broker.count(),
  ]);

  const dailyLoss = brokerCount * 150000;
  const maxExposure = brokerCount * 2500000;

  return (
    <AppShell title="Risk Management" subtitle="Platform risk overview">
      <div className="card p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Connected account risk summary</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <RiskMetric label="Live strategies" value={runningStrategies.toString()} />
          <RiskMetric label="Total strategies" value={strategyCount.toString()} />
          <RiskMetric label="Connected brokers" value={brokerCount.toString()} />
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recommended limits</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <Row label="Daily Loss Limit" value={`₹${dailyLoss.toLocaleString("en-IN")}`} />
          <Row label="Max Exposure" value={`₹${maxExposure.toLocaleString("en-IN")}`} />
          <Row label="Max Positions" value="05" />
          <Row label="Auto square off" value="Enabled" />
        </div>
      </div>
    </AppShell>
  );
}

function RiskMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
