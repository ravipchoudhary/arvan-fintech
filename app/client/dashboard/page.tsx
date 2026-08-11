import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientDashboardPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const [strategyCount, orderCount, positionCount, notifications, brokerConnection, risk] = await Promise.all([
    prisma.strategy.count({ where: { clientId: session.id } }),
    prisma.order.count({ where: { clientId: session.id } }),
    prisma.position.count({ where: { clientId: session.id } }),
    prisma.notification.findMany({ where: { clientId: session.id, unread: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.brokerConnection.findFirst({ where: { clientId: session.id }, include: { broker: true } }),
    prisma.riskSetting.findFirst({ where: { clientId: session.id } }),
  ]);

  const portfolioValue = positionCount > 0 ? 1248500 : 320000;
  const todaysPnl = 8420;
  const totalPnl = 48250;
  const liveAlgos = strategyCount;
  const riskUsage = risk?.usagePercent ?? 42;

  return (
    <AppShell title={`Good Morning, ${session.name}`} subtitle="Here's your trading account overview." variant="client">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Net Worth</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">₹{portfolioValue.toLocaleString()}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Today's P&L</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-emerald-600">+₹{todaysPnl.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">+0.68%</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Total P&L</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-emerald-600">+₹{totalPnl.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">+4.82%</div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Live Algorithms</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{liveAlgos}</div>
          <div className="text-xs text-slate-500 mt-1">Running</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Open Positions</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{positionCount}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Risk Usage</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{riskUsage}%</div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-xs sm:text-sm text-slate-500">Connected Broker</div>
            <div className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold">{brokerConnection?.broker.name ?? "No broker connected"}</div>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs sm:text-sm font-semibold w-fit ${brokerConnection?.status === "CONNECTED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {brokerConnection?.status ?? "DISCONNECTED"}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Recent Notifications</h3>
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700">
            {notifications.length === 0 ? (
              <div className="text-slate-500">No new notifications.</div>
            ) : (
              notifications.map((note) => (
                <div key={note.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                  <div className="text-xs sm:text-sm text-slate-900 font-semibold">{note.type}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{note.message}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(note.createdAt).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Portfolio Snapshot</h3>
          <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Strategies</span><span className="font-semibold">{strategyCount}</span></div>
            <div className="flex items-center justify-between"><span>Orders</span><span className="font-semibold">{orderCount}</span></div>
            <div className="flex items-center justify-between"><span>Positions</span><span className="font-semibold">{positionCount}</span></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
