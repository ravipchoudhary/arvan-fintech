import { AppShell } from "@/components/app-shell";

const strategies = [
  { name: "EMA + RSI", status: "RUNNING" },
  { name: "ORB Breakout", status: "RUNNING" },
  { name: "VWAP Mean Revert", status: "RUNNING" },
  { name: "Supertrend", status: "PAUSED" },
];

const logs = [
  { time: "09:12:18", strategy: "EMA + RSI", action: "BUY", symbol: "NIFTY", quantity: 80, price: "₹24,820", status: "FILLED" },
  { time: "09:18:40", strategy: "ORB Breakout", action: "SELL", symbol: "BANKNIFTY", quantity: 35, price: "₹51,840", status: "PENDING" },
  { time: "09:20:04", strategy: "VWAP Mean Revert", action: "BUY", symbol: "RELIANCE", quantity: 150, price: "₹2,845", status: "FILLED" },
  { time: "09:25:41", strategy: "Supertrend", action: "PAUSE", symbol: "TCS", quantity: 100, price: "₹3,895", status: "REJECTED" },
];

export default function LiveAlgoPage() {
  return (
    <AppShell title="Live Algo" subtitle="Execution monitoring">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Overall Status" value="ACTIVE" tone="green" />
        <Stat label="Today's P&L" value="+₹8,420" tone="green" />
        <Stat label="Open Positions" value="07" tone="blue" />
        <Stat label="Active Strategies" value="03" tone="purple" />
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Live Strategies</h3>
          <div className="flex gap-2">
            <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Pause</button>
            <button className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">Stop</button>
          </div>
        </div>
        <div className="space-y-3">
          {strategies.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="font-semibold text-slate-900">{item.name}</div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.status === "RUNNING" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span>
                <button className="text-xs font-semibold text-blue-700">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Execution Log</h3>
          <button className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">SQUARE OFF ALL POSITIONS</button>
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
              {logs.map((row) => (
                <tr key={`${row.time}-${row.symbol}`} className="border-b border-slate-100 last:border-b-0">
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
