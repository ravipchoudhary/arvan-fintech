import { AppShell } from "@/components/app-shell";
import { positions } from "@/lib/demo-data";

export default function PositionsPage() {
  return (
    <AppShell title="Positions" subtitle="Open positions overview">
      <div className="card p-5">
        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Symbol</th>
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">Quantity</th>
                <th className="pb-3 pr-4 font-medium">Average Price</th>
                <th className="pb-3 pr-4 font-medium">LTP</th>
                <th className="pb-3 font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((row) => (
                <tr key={row.symbol} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 pr-4 font-semibold text-slate-800">{row.symbol}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.type}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.quantity}</td>
                  <td className="py-3 pr-4 text-slate-700">₹{row.avg.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4 text-slate-700">₹{row.ltp.toLocaleString("en-IN")}</td>
                  <td className={`py-3 font-semibold ${row.pnl.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{row.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
