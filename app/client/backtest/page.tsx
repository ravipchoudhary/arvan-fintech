import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientBacktestPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const strategies = await prisma.strategy.findMany({ where: { clientId: session.id, status: { in: ["DRAFT", "PAUSED"] } }, orderBy: { updatedAt: "desc" } });

  return (
    <AppShell title="Backtest" subtitle="Your backtest history" variant="client">
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="text-sm text-slate-500">Backtested Strategies</div>
        {strategies.length === 0 ? (
          <div className="mt-4 text-slate-600">No backtests found.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{strategy.name}</div>
                <div className="text-sm text-slate-500">Status: {strategy.status}</div>
                <div className="text-sm text-slate-700">Return: {strategy.performance}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
