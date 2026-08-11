import Link from "next/link";
import { ArrowRight, BarChart3, Bot, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [totalStrategies, liveStrategies, connectedBrokers, activeUsers, latestStrategies] = await Promise.all([
    prisma.strategy.count(),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.broker.count({ where: { connected: true } }),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.strategy.findMany({ orderBy: { updatedAt: "desc" }, take: 3 }),
  ]);

  const stats = [
    { label: totalStrategies.toString(), sub: "Total Strategies" },
    { label: liveStrategies.toString(), sub: "Active Strategies" },
    { label: connectedBrokers.toString(), sub: "Connected Brokers" },
    { label: activeUsers.toString(), sub: "Active Traders" },
  ];
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <header className="bg-[#071526] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold">A</div>
            <div>
              <div className="text-lg font-bold">Arvan Fintech</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Trading automation for advisors and teams</div>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <span>BUILD</span>
            <span>BACKTEST</span>
            <span>MONITOR</span>
            <span>AUTOMATE</span>
            <span>REPORT</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">Login</Link>
            <Link href="/signup" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Get Started</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Real trading data from your connected accounts
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
              A smarter way to run algorithmic trading operations.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              Track strategies, manage brokers, and operate from a single real-time platform built for Indian markets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700">Login</Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((item) => (
                <Stat key={item.sub} label={item.label} sub={item.sub} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">Connected brokers</div>
                  <div className="text-3xl font-bold text-slate-900">{connectedBrokers}</div>
                </div>
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">{liveStrategies} live strategies</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="text-slate-500">Strategy library</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">{totalStrategies}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="text-slate-500">Active traders</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">{activeUsers}</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                  <span>Latest strategies</span>
                  <span className="font-semibold text-blue-600">Updated now</span>
                </div>
                <div className="space-y-3">
                  {latestStrategies.length > 0 ? (
                    latestStrategies.map((strategy) => (
                      <div key={strategy.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold text-slate-900">{strategy.name}</div>
                            <div className="text-sm text-slate-500">{strategy.type}</div>
                          </div>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700">{strategy.status}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600">No strategies available yet. Create one to see live metrics here.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          <InfoCard icon={Bot} title="Build" description="Create strategies with a unified logic builder and run them on real accounts." />
          <InfoCard icon={BarChart3} title="Backtest" description="Validate your approach with organized performance history and meaningful insights." />
          <InfoCard icon={ShieldCheck} title="Automate" description="Keep your exposure controlled with live monitoring and broker-level connectivity." />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="mb-3 text-2xl font-bold">Arvan Fintech</div>
            <p className="max-w-sm text-sm text-slate-400">A unified platform for algo trading, broker management, and strategy operations built for growing advisory teams.</p>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Product</div>
            <div className="space-y-2 text-sm text-slate-400">
              <Link href="/strategies" className="block hover:text-white">Strategies</Link>
              <Link href="/brokers" className="block hover:text-white">Brokers</Link>
              <Link href="/dashboard" className="block hover:text-white">Dashboard</Link>
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Company</div>
            <div className="space-y-2 text-sm text-slate-400">
              <span>Contact support</span>
              <span>help@arvanfintech.com</span>
              <span>© {year} Arvan Fintech</span>
            </div>
          </div>
        </div>
      </footer>
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
