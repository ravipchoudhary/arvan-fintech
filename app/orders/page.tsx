import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function OrdersPage() {
  const orderCount = await prisma.strategy.count();
  const running = await prisma.strategy.count({ where: { status: "RUNNING" } });
  const paused = await prisma.strategy.count({ where: { status: "PAUSED" } });

  return (
    <AppShell title="Orders" subtitle="Execution history and real-time trade activity">
      <div className="card p-5">
        <div className="mb-6">
          <div className="text-sm font-semibold text-slate-900">Order summary</div>
          <div className="mt-2 text-sm text-slate-600">
            Showing live order activity based on active strategy execution across connected brokers.
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Summary label="Total strategies" value={orderCount.toString()} />
          <Summary label="Running strategies" value={running.toString()} />
          <Summary label="Paused strategies" value={paused.toString()} />
        </div>
      </div>
    </AppShell>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
