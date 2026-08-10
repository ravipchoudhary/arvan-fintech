import { AppShell } from "@/components/app-shell";
import { riskSettings } from "@/lib/demo-data";

export default function RiskManagementPage() {
  return (
    <AppShell title="Risk Management" subtitle="System limits and overrides">
      <div className="card p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Account Limits</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {riskSettings.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Strategy-level Overrides</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <Row label="Daily Loss Limit" value="₹1.5L" />
          <Row label="Max Positions" value="05" />
          <Row label="Max Exposure" value="₹25L" />
          <Row label="Enable / Disable" value="Enabled" />
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
