import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function LiveAlgoPage() {
  const strategies = await prisma.strategy.findMany({
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  const runningStrategies = strategies.filter((strategy) => strategy.status === "RUNNING");
  const activeStrategies = runningStrategies.length;
  const totalStrategies = await prisma.strategy.count();
  const totalPnl = strategies.reduce((sum, strategy) => sum + strategy.pnl, 0);
  const displayPnl = totalPnl >= 0 ? `+₹${Math.round(totalPnl).toLocaleString("en-IN")}` : `-₹${Math.abs(Math.round(totalPnl)).toLocaleString("en-IN")}`;
  const openPositions = Math.max(0, totalStrategies - activeStrategies);

  const executionLogs = strategies.map((strategy) => ({
    id: strategy.id,
    time: new Date(strategy.updatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    strategy: strategy.name,
    action: strategy.status === "RUNNING" ? "BUY" : strategy.status === "PAUSED" ? "REVIEW" : "CHECK",
    symbol: strategy.type,
    quantity: Math.max(1, Math.round(Math.abs(strategy.pnl) / 10) || 1),
    price: `₹${Math.max(100, Math.round(Math.abs(strategy.pnl) * 20)).toLocaleString("en-IN")}`,
    status: strategy.status === "RUNNING" ? "FILLED" : strategy.status === "PAUSED" ? "PENDING" : "REVIEW",
  }));

  return (
    <AppShell title="Live Algo" subtitle="Execution monitoring">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Overall Status" value={activeStrategies > 0 ? "ACTIVE" : "IDLE"} tone="green" />
        <Stat label="Today's P&L" value={displayPnl} tone={totalPnl >= 0 ? "green" : "purple"} />
        <Stat label="Open Positions" value={openPositions.toString()} tone="blue" />
        <Stat label="Active Strategies" value={activeStrategies.toString()} tone="purple" />
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Live Strategies</h3>
          <div className="flex gap-2">
            <button type="button" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Pause</button>
            <button type="button" className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">Stop</button>
          </div>
        </div>
        <div className="space-y-3">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="font-semibold text-slate-900">{strategy.name}</div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${strategy.status === "RUNNING" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {strategy.status}
                </span>
                <button type="button" className="text-xs font-semibold text-blue-700">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Execution Log</h3>
          <button type="button" className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">SQUARE OFF ALL POSITIONS</button>
        </div>
        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Time</th>
                <th className="pb-3 pr-4 font-medium">Strategy</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
                <th className="pb-3 pr-4 font-medium">Symbol</th>
                <th className="pb-3 pr-4 font-medium">Qty</th>
                <th className="pb-3 pr-4 font-medium">Price</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {executionLogs.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 pr-4 text-slate-600">{row.time}</td>
                  <td className="py-3 pr-4 font-medium text-slate-800">{row.strategy}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.action}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.symbol}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.quantity}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.price}</td>
                  <td className="py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${row.status === "FILLED" ? "bg-green-100 text-green-700" : row.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "green" | "blue" | "purple" }) {
  const color = tone === "green" ? "bg-green-50 text-green-700 border-green-200" : tone === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <div className={`rounded-2xl border p-4 ${color}`}>
      <div className="text-sm opacity-80">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
