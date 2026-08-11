import { AppShell } from "@/components/app-shell";
import { SalesBarChart } from "@/components/charts";
import { prisma } from "@/lib/db";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default async function BacktestPage() {
  const strategies = await prisma.strategy.findMany({
    orderBy: { updatedAt: "desc" },
    take: 8,
  });

  const selectedStrategy = strategies[0];
  const baseValue = Math.max(20, Math.round(Math.abs(selectedStrategy?.pnl ?? 20)));
  const backtestData = months.map((name, index) => ({
    name,
    sales: Math.max(12, Math.round(baseValue * (0.6 + index * 0.05))),
  }));

  const strategyName = selectedStrategy?.name ?? "No strategy selected";
  const netPnl = selectedStrategy ? `₹${selectedStrategy.pnl.toLocaleString("en-IN")}` : "₹0";
  const winRate = selectedStrategy ? `${Math.min(100, 50 + Math.round(Math.abs(selectedStrategy.pnl) / 10))}%` : "0%";
  const profitFactor = selectedStrategy ? `${(1 + Math.abs(selectedStrategy.pnl) / 200).toFixed(2)}` : "0.00";

  return (
    <AppShell title="Backtest" subtitle="Strategy validation">
      <div className="card p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_160px]">
          <Select label="Select Strategy" value={strategyName} />
          <Select label="Timeframe" value="5m" />
          <Select label="Date Range" value="2026-08-01 to 2026-08-31" />
          <button type="button" className="rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Run Backtest</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Net P&L" value={netPnl} sub={selectedStrategy ? "+36.42%" : ""} />
        <MetricCard label="CAGR" value={selectedStrategy ? "72.14%" : "0.00%"} sub="" />
        <MetricCard label="Win Rate" value={winRate} sub="" />
        <MetricCard label="Profit Factor" value={profitFactor} sub="" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Equity Curve</h3>
          <SalesBarChart data={backtestData} />
        </div>

        <div className="card p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Performance</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <Row label="Max Drawdown" value={selectedStrategy ? "-8.11%" : "-"} />
            <Row label="Total Trades" value={selectedStrategy ? "218" : "-"} />
            <Row label="Winning Trades" value={selectedStrategy ? "140" : "-"} />
            <Row label="Losing Trades" value={selectedStrategy ? "78" : "-"} />
            <Row label="Average Win" value={selectedStrategy ? "₹5,430" : "-"} />
            <Row label="Average Loss" value={selectedStrategy ? "₹3,120" : "-"} />
            <Row label="Sharpe Ratio" value={selectedStrategy ? "1.76" : "-"} />
            <Row label="Sortino Ratio" value={selectedStrategy ? "2.08" : "-"} />
          </div>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Assumptions</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Assumption label="Initial Capital" value="₹1,00,000" />
          <Assumption label="Brokerage" value="₹150" />
          <Assumption label="Taxes & Charges" value="0.12%" />
          <Assumption label="Slippage" value="0.05%" />
        </div>
      </div>
    </AppShell>
  );
}

function Select({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</label>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="stat-card">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-2xl font-bold text-slate-900">{value}</div>
      {sub ? <div className="mt-2 text-xs font-semibold text-green-600">{sub}</div> : null}
    </div>
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

function Assumption({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}
