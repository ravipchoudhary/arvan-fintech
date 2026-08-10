import Link from "next/link";
import { ArrowRight, BarChart3, Bot, CandlestickChart, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { EquityCurveChart } from "@/components/charts";
import { equityCurve } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <header className="bg-[#071526] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold">A</div>
            <div>
              <div className="text-lg font-bold">ARVAN ALGO</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Automated Algo Trading Platform</div>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <span>BUILD</span>
            <span>BACKTEST</span>
            <span>SIMULATE</span>
            <span>AUTOMATE</span>
            <span>ANALYZE</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">Login</Link>
            <Link href="/signup" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Start Free</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              One Platform. Endless Possibilities.
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
              Build. Backtest. Simulate. Automate.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              Create trading strategies in minutes, test on historical data and deploy with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700">Login</Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="10K+" sub="Active Users" />
              <Stat label="50K+" sub="Strategies Built" />
              <Stat label="4.8/5" sub="User Rating" />
              <Stat label="99.9%" sub="Uptime" />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">Total P&L</div>
                  <div className="text-3xl font-bold text-slate-900">₹12.48L</div>
                </div>
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">+4.6%</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="text-slate-500">Today&apos;s P&L</div>
                  <div className="mt-1 text-xl font-bold text-green-600">+₹8,420</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="text-slate-500">Live Algo</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">Running</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Equity Curve</span>
                  <span className="font-semibold text-blue-600">+36.42%</span>
                </div>
                <EquityCurveChart data={equityCurve} />
              </div>
              <div className="mt-5 grid gap-2 md:grid-cols-2">
                <MiniFeature icon={TrendingUp} title="Trading Statistics" value="64.20% Win Rate" />
                <MiniFeature icon={CandlestickChart} title="Live Execution" value="04 Strategies" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          <InfoCard icon={Bot} title="Build" description="Create strategies using drag-and-drop logic blocks." />
          <InfoCard icon={BarChart3} title="Backtest" description="Run historical performance analysis with real metrics." />
          <InfoCard icon={ShieldCheck} title="Automate" description="Monitor exposure, deployment and risk across live strategies." />
        </div>
      </section>
    </main>
  );
}

function Stat({ label, sub }: { label: string; sub: string }) {
  return (
    <div>
      <div className="text-lg font-bold text-slate-900">{label}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
}

function MiniFeature({ icon: Icon, title, value }: { icon: typeof TrendingUp; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-600">
        <Icon className="h-4 w-4 text-blue-600" />
        <span className="text-xs uppercase tracking-[0.12em]">{title}</span>
      </div>
      <div className="mt-2 text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, description }: { icon: typeof Bot; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
