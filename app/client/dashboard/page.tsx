import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientDashboardPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  const [strategies, orders, positions, notifications, brokerConnection, risk] = await Promise.all([
    prisma.strategy.findMany({ where: { clientId: session.id }, orderBy: { updatedAt: "desc" } }),
    prisma.order.findMany({ where: { clientId: session.id }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.position.findMany({ where: { clientId: session.id }, orderBy: { updatedAt: "desc" } }),
    prisma.notification.findMany({ where: { clientId: session.id }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.brokerConnection.findFirst({ where: { clientId: session.id }, include: { broker: true } }),
    prisma.riskSetting.findFirst({ where: { clientId: session.id } }),
  ]);

  const connected = brokerConnection?.status === "CONNECTED";
  const totalPortfolioValue = connected ? positions.reduce((sum, position) => sum + position.quantity * position.ltp, 0) : 0;
  const deployedCapital = positions.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0);
  const availableCapital = Math.max(0, (risk?.maxExposure ?? deployedCapital) - deployedCapital);
  const todaysPnl = connected
    ? positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0)
      + orders
          .filter((order) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return order.createdAt >= today;
          })
          .reduce((sum, order) => sum + (Number(order.pnl) || 0), 0)
    : 0;
  const overallPnl = connected
    ? positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0) + orders.reduce((sum, order) => sum + (Number(order.pnl) || 0), 0)
    : 0;
  const runningStrategies = strategies.filter((strategy) => strategy.status === "RUNNING").length;

  return (
    <AppShell title={`Good Morning, ${session.name}`} subtitle="Here's your trading account overview." variant="client">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Total Portfolio Value</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">{connected ? `₹${totalPortfolioValue.toLocaleString()}` : "Broker Not Connected"}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Deployed Capital</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">{connected ? `₹${deployedCapital.toLocaleString()}` : "—"}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Available Capital</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">{connected ? `₹${availableCapital.toLocaleString()}` : "—"}</div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Today's P&L</div>
          <div className={`mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold ${todaysPnl >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {connected ? `₹${todaysPnl.toLocaleString()}` : "Broker Not Connected"}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Overall P&L</div>
          <div className={`mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold ${overallPnl >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {connected ? `₹${overallPnl.toLocaleString()}` : "—"}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Open Positions</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{positions.length}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Running Strategies</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{runningStrategies}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="text-xs sm:text-sm text-slate-500">Strategy Status</div>
          <div className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold">{strategies.length ? "ACTIVE" : "IDLE"}</div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-xs sm:text-sm text-slate-500">Connected Broker</div>
            <div className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold">{brokerConnection?.broker?.name ?? "Broker Not Connected"}</div>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs sm:text-sm font-semibold w-fit ${brokerConnection?.status === "CONNECTED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {brokerConnection?.status ?? "DISCONNECTED"}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Recent Orders</h3>
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700">
            {orders.length === 0 ? (
              <div className="text-slate-500">No recent orders found.</div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">{order.symbol}</span>
                    <span className="text-slate-500">{order.side}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                    <span>{order.quantity} qty</span>
                    <span>{order.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Portfolio Snapshot</h3>
          <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Strategies</span><span className="font-semibold">{strategies.length}</span></div>
            <div className="flex items-center justify-between"><span>Orders</span><span className="font-semibold">{orders.length}</span></div>
            <div className="flex items-center justify-between"><span>Positions</span><span className="font-semibold">{positions.length}</span></div>
            <div className="flex items-center justify-between"><span>Risk Usage</span><span className="font-semibold">{risk?.usagePercent ?? 0}%</span></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
