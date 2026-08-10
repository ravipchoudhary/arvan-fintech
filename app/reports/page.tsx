import { AppShell } from "@/components/app-shell";
import { SalesBarChart, TrendLineChart } from "@/components/charts";

const salesData = [
  { name: "Jan", sales: 24 },
  { name: "Feb", sales: 31 },
  { name: "Mar", sales: 36 },
  { name: "Apr", sales: 32 },
  { name: "May", sales: 48 },
  { name: "Jun", sales: 56 },
  { name: "Jul", sales: 61 },
  { name: "Aug", sales: 68 },
];

const trendData = [
  { label: "W1", value: 12 },
  { label: "W2", value: 18 },
  { label: "W3", value: 21 },
  { label: "W4", value: 27 },
  { label: "W5", value: 34 },
  { label: "W6", value: 40 },
];

export default function ReportsPage() {
  return (
    <AppShell title="Reports" subtitle="Trading analytics">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total P&L" value="₹12.48L" tone="green" />
        <Stat label="Daily P&L" value="₹8,420" tone="green" />
        <Stat label="Monthly P&L" value="₹1.24L" tone="blue" />
        <Stat label="Win Rate" value="64.20%" tone="purple" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Equity Curve</h3>
          <SalesBarChart data={salesData} />
        </div>
        <div className="card p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Drawdown Trend</h3>
          <TrendLineChart data={trendData} />
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "green" | "blue" | "purple" }) {
  const toneClass = tone === "green" ? "bg-green-50 text-green-700 border-green-200" : tone === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="text-sm opacity-80">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
