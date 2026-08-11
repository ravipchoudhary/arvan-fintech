import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function PositionsPage() {
  const strategyCount = await prisma.strategy.count();
  const liveCount = await prisma.strategy.count({ where: { status: "RUNNING" } });
  const pausedCount = await prisma.strategy.count({ where: { status: "PAUSED" } });

  return (
    <AppShell title="Positions" subtitle="Open positions overview">
      <div className="grid gap-4 md:grid-cols-3">
        <PositionCard label="Total strategies" value={strategyCount.toString()} />
        <PositionCard label="Live strategies" value={liveCount.toString()} />
        <PositionCard label="Paused strategies" value={pausedCount.toString()} />
      </div>
    </AppShell>
  );
}

function PositionCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
      <div className="text-sm uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-3 text-4xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
