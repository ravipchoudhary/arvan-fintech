import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientLiveAlgoPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const liveStrategies = await prisma.strategy.findMany({ where: { clientId: session.id, status: { in: ["RUNNING", "PAUSED"] } }, orderBy: { updatedAt: "desc" } });

  return (
    <AppShell title="Live Algo" subtitle="Your algorithm status" variant="client">
      <div className="grid gap-4">
        {liveStrategies.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600">No live algorithms configured.</div>
        ) : (
          liveStrategies.map((strategy) => (
            <div key={strategy.id} className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{strategy.name}</div>
                  <div className="text-sm text-slate-500">{strategy.type} · Updated {new Date(strategy.updatedAt).toLocaleString()}</div>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${strategy.status === "RUNNING" ? "bg-emerald-100 text-emerald-700" : strategy.status === "PAUSED" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                  {strategy.status}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-700">
                <div>
                  <div className="text-slate-500">Today's P&L</div>
                  <div className="font-semibold">+₹1,240</div>
                </div>
                <div>
                  <div className="text-slate-500">Live P&L</div>
                  <div className="font-semibold">+₹{strategy.pnl.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-500">Control</div>
                  <div className="font-semibold">View</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
