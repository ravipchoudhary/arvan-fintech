import { AppShell } from "@/components/app-shell";
import { orders } from "@/lib/demo-data";

export default function OrdersPage() {
  return (
    <AppShell title="Orders" subtitle="Execution history">
      <div className="card p-5">
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          <Filter label="All" active />
          <Filter label="Buy" />
          <Filter label="Sell" />
          <Filter label="Filled" />
          <Filter label="Pending" />
          <Filter label="Rejected" />
        </div>

        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Time</th>
                <th className="pb-3 pr-4 font-medium">Symbol</th>
                <th className="pb-3 pr-4 font-medium">Type</th>
                <th className="pb-3 pr-4 font-medium">Quantity</th>
                <th className="pb-3 pr-4 font-medium">Price</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row) => (
                <tr key={`${row.time}-${row.symbol}`} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 pr-4 text-slate-600">{row.time}</td>
                  <td className="py-3 pr-4 font-semibold text-slate-800">{row.symbol}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.type}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.quantity}</td>
                  <td className="py-3 pr-4 text-slate-700">₹{row.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${row.status === "FILLED" ? "bg-green-100 text-green-700" : row.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{row.status}</span>
                  </td>
                  <td className="py-3 font-semibold text-slate-900">{row.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Filter({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`rounded-full px-3 py-2 ${active ? "bg-blue-600 text-white" : "border border-slate-200 bg-slate-50 text-slate-600"}`}>
      {label}
    </button>
  );
}
