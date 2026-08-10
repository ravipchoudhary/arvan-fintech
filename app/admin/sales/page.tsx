import { AppShell } from "@/components/app-shell";
import { salesData } from "@/lib/demo-data";

export default function SalesManagementPage() {
  return (
    <AppShell title="Sales Management" subtitle="Regional sales performance">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Revenue By Region</h3>
          <div className="mt-5 space-y-4">
            {[
              { label: "North Team", value: "₹14.2L", pct: "38%" },
              { label: "South Team", value: "₹11.6L", pct: "31%" },
              { label: "East Team", value: "₹9.8L", pct: "22%" },
              { label: "West Team", value: "₹7.1L", pct: "19%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Trend</h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-700">
            {salesData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span>{entry.name}</span>
                <span className="font-semibold text-slate-900">{entry.sales}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
