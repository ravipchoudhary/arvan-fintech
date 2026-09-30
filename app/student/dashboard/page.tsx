"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageCircle,
  NotebookPen,
  PanelsTopLeft,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "#courses", icon: BookOpen },
  { label: "Strategy Lab", href: "#strategy-lab", icon: ChartNoAxesCombined },
  { label: "Virtual Trading", href: "#virtual-trading", icon: Activity },
  { label: "Portfolio", href: "#portfolio", icon: Wallet },
  { label: "Trade Journal", href: "#journal", icon: NotebookPen },
  { label: "Arvan AI Coach", href: "#coach", icon: BrainCircuit },
  { label: "Certificates", href: "#certificates", icon: GraduationCap },
  { label: "Profile", href: "#account", icon: PanelsTopLeft },
];

const courses = [
  { number: "01", category: "Foundation", title: "Stock Market Foundation", description: "Markets, orders, charts and essential terminology.", progress: 100, action: "Review" },
  { number: "02", category: "Technicals", title: "Technical Analysis Mastery", description: "Candles, trends, support, resistance and indicators.", progress: 64, action: "Continue" },
  { number: "03", category: "Risk", title: "Risk Management", description: "Position sizing, drawdown and trading discipline.", progress: 58, action: "Continue" },
  { number: "04", category: "Psychology", title: "Trading Psychology", description: "Process, discipline and behavioural mistakes.", progress: 0, action: "Start" },
];

const strategies = [
  { level: "BEGINNER", title: "Moving Average Learning", description: "Learn trend identification and crossover concepts." },
  { level: "BEGINNER", title: "RSI Learning", description: "Learn momentum and overbought/oversold concepts." },
  { level: "INTERMEDIATE", title: "Breakout Learning", description: "Learn breakout confirmation and disciplined entries." },
  { level: "BEGINNER", title: "Support & Resistance", description: "Learn price-action zones and market structure." },
  { level: "INTERMEDIATE", title: "MACD Learning", description: "Learn momentum and trend confirmation concepts." },
  { level: "INTERMEDIATE", title: "Trend Following", description: "Learn trend structure and process-based practice." },
];

const instruments = {
  "NIFTY 50": { price: "24,150.25", change: "+0.62%", positive: true },
  "BANK NIFTY": { price: "52,840.10", change: "-0.18%", positive: false },
  SENSEX: { price: "79,430.40", change: "+0.31%", positive: true },
};

const initialJournal = [
  { date: "28 Sep", instrument: "NIFTY", strategy: "Breakout", reason: "Range breakout confirmation", result: "+₹1,420", positive: true },
  { date: "27 Sep", instrument: "BANK NIFTY", strategy: "RSI", reason: "Momentum reversal practice", result: "-₹680", positive: false },
  { date: "26 Sep", instrument: "NIFTY", strategy: "Breakout", reason: "Early entry before confirmation", result: "-₹450", positive: false },
];

const chartBars = [31, 37, 33, 45, 40, 48, 43, 55, 51, 47, 61, 57, 65, 60, 72, 68, 77, 72, 83, 79, 91, 87, 96, 89, 100, 95, 108, 102, 116, 112, 123, 118, 131, 125];

type OrderSide = "BUY" | "SELL";
type JournalEntry = (typeof initialJournal)[number];

export default function StudentDashboardPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<keyof typeof instruments>("NIFTY 50");
  const [timeframe, setTimeframe] = useState("1D");
  const [selectedStrategy, setSelectedStrategy] = useState("Breakout Learning");
  const [quantity, setQuantity] = useState("1");
  const [tradeReason, setTradeReason] = useState("");
  const [tradeMessage, setTradeMessage] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournal);
  const [coachPrompt, setCoachPrompt] = useState("");
  const [coachReply, setCoachReply] = useState("");
  const quote = instruments[selectedInstrument];

  function recordPractice(side: OrderSide) {
    const parsedQuantity = Number(quantity);
    if (!tradeReason.trim()) {
      setTradeMessage("Add a short reason for this practice decision first.");
      return;
    }
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 100) {
      setTradeMessage("Choose a quantity from 1 to 100.");
      return;
    }

    const entry: JournalEntry = {
      date: "Today",
      instrument: selectedInstrument,
      strategy: selectedStrategy.replace(" Learning", ""),
      reason: `${side}: ${tradeReason.trim()}`,
      result: "Practice logged",
      positive: true,
    };
    setJournalEntries((entries) => [entry, ...entries]);
    setTradeMessage(`Virtual ${side} logged for ${parsedQuantity} ${selectedInstrument}. No real order was sent.`);
    setTradeReason("");
  }

  function askCoach(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = coachPrompt.trim();
    if (!question) return;
    const topic = question.toLowerCase();
    const response = topic.includes("breakout")
      ? "A breakout is stronger when price closes beyond a clearly marked level and participation confirms the move. Before practice, define your entry, invalidation level and maximum risk."
      : topic.includes("risk") || topic.includes("stop")
        ? "Start by deciding what would prove your idea wrong. Set an invalidation level, size the position so the potential loss stays within your limit, and write that reason before entry."
        : "Break the idea into three parts: what the market is doing, what would confirm your setup, and what would invalidate it. Write those down before you practise the decision.";
    setCoachReply(response);
    setCoachPrompt("");
  }

  return (
    <div className="min-h-screen bg-[#090f12] text-slate-100">
      {mobileNavOpen ? <button type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden" /> : null}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/8 bg-[#0c1418] px-4 py-5 transition-transform lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300 text-sm font-black text-[#071014]">A</span>
            <span>
              <span className="block text-sm font-semibold text-white">Arvan Fintech</span>
              <span className="mt-0.5 block text-xs text-slate-500">Learning</span>
            </span>
          </Link>
          <button type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 lg:hidden"><X className="h-5 w-5" /></button>
        </div>

        <nav className="mt-9 flex-1 space-y-1 overflow-y-auto" aria-label="Student dashboard">
          {navigation.map(({ label, href, icon: Icon }, index) => (
            <a key={href} href={href} onClick={() => setMobileNavOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${index === 0 ? "bg-cyan-300/10 font-medium text-cyan-200" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}>
              <Icon className="h-4 w-4" />{label}
            </a>
          ))}
        </nav>

        <div id="account" className="border-t border-white/8 pt-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/3.5 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/15 text-xs font-semibold text-amber-200">AC</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-white">Student Account</span><span className="mt-0.5 block text-xs text-slate-500">Learning preview</span></span>
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/8 bg-[#090f12]/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-375 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 lg:hidden"><Menu className="h-5 w-5" /></button>
              <div className="hidden text-sm text-slate-500 sm:block">Student workspace <span className="px-2 text-slate-700">/</span> <span className="text-slate-200">Dashboard</span></div>
              <div className="text-sm font-medium text-slate-200 sm:hidden">Learning Lab</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3 py-1.5 text-xs text-emerald-200 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />Learning mode</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/15 text-xs font-semibold text-amber-100">AC</span>
            </div>
          </div>
        </header>

        <main id="dashboard" className="mx-auto max-w-375 space-y-8 px-4 py-6 sm:space-y-10 sm:px-6 sm:py-8 lg:px-8">
          <section className="grid gap-6 overflow-hidden rounded-xl border border-cyan-200/10 bg-[linear-gradient(120deg,#102126_0%,#101a1d_55%,#171a13_100%)] p-5 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> Arvan AI Trading Learning Lab</div>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">Learn Trading. Practice. Improve.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Learn market concepts, choose an educational strategy and practice with virtual capital in a simulated market environment.</p>
              <a href="#virtual-trading" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#071014] transition hover:bg-cyan-200">Start Virtual Practice <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="hidden h-32 w-32 items-center justify-center rounded-full border border-cyan-100/10 bg-cyan-200/4 text-cyan-200 lg:flex"><ChartNoAxesCombined className="h-14 w-14" strokeWidth={1.2} /></div>
          </section>

          <section aria-label="Learning summary" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <MetricCard icon={BookOpen} label="Course Progress" value="64%" detail="2 courses in progress" accent="cyan" />
            <MetricCard icon={Wallet} label="Virtual Portfolio" value="₹1,04,250" detail="+₹4,250 (+4.25%)" accent="green" />
            <MetricCard icon={Activity} label="Practice Trades" value="37" detail="12 this week" accent="amber" />
            <MetricCard icon={TrendingUp} label="Learning Score" value="82/100" detail="Good progress" accent="blue" />
          </section>

          <section>
            <SectionTitle eyebrow="Your next steps" title="Continue Learning" action={<a href="#courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 hover:text-cyan-100">View Courses <ArrowRight className="h-4 w-4" /></a>} />
            <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                <CourseProgressCard category="Technical Analysis" title="Technical Analysis Mastery" progress={64} lessons="12 / 18 lessons" />
                <CourseProgressCard category="Risk Management" title="Risk & Trading Psychology" progress={58} lessons="7 / 12 lessons" />
              </div>
              <div className="flex flex-col justify-between gap-4 rounded-lg border border-cyan-200/10 bg-[#101a1d] p-5 sm:flex-row sm:items-center xl:flex-col xl:items-start">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200"><BrainCircuit className="h-4 w-4" /> Arvan AI Coach</div>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">Review your virtual trades, understand mistakes and get help with concepts.</p>
                </div>
                <a href="#coach" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-cyan-200/40 hover:bg-white/5">Ask AI Coach <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-lg border border-amber-200/15 bg-amber-100/3.5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-200/10 text-amber-200"><TrendingUp className="h-5 w-5" /></span>
              <div><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200">Current Strategy</span><span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400">INTERMEDIATE</span></div><h2 className="mt-1 text-lg font-semibold text-white">{selectedStrategy}</h2><p className="mt-1 text-sm text-slate-400">Learn confirmation, entry discipline and risk management through simulation.</p></div>
            </div>
            <a href="#virtual-trading" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-2.5 text-sm font-semibold text-[#17140a] transition hover:bg-amber-100">Practice Strategy <ArrowRight className="h-4 w-4" /></a>
          </section>

          <section id="courses" className="scroll-mt-24">
            <SectionTitle eyebrow="Structured learning" title="My Courses" description="Build your trading knowledge step by step." />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {courses.map((course) => (
                <article key={course.number} className="flex min-h-52 flex-col rounded-lg border border-white/8 bg-[#0e171b] p-4 transition hover:border-white/15">
                  <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200">{course.number} · {course.category}</span><BookOpen className="h-4 w-4 text-slate-500" /></div>
                  <h3 className="mt-4 text-base font-semibold text-white">{course.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-5 text-slate-400">{course.description}</p>
                  <a href="#strategy-lab" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-200 hover:text-cyan-100">{course.action}<ArrowRight className="h-3.5 w-3.5" /></a>
                </article>
              ))}
            </div>
          </section>

          <section id="strategy-lab" className="scroll-mt-24">
            <SectionTitle eyebrow="Learn by doing" title="Strategy Learning Lab" description="Choose a framework to learn and practice in simulation." />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {strategies.map((strategy) => {
                const selected = selectedStrategy === strategy.title;
                return (
                  <article key={strategy.title} className={`rounded-lg border bg-[#0e171b] p-4 transition ${selected ? "border-cyan-200/35" : "border-white/8 hover:border-white/15"}`}>
                    <div className="flex items-center justify-between"><span className={`text-[10px] font-semibold tracking-[0.13em] ${strategy.level === "BEGINNER" ? "text-emerald-200" : "text-amber-200"}`}>{strategy.level}</span>{selected ? <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cyan-200"><Check className="h-3 w-3" />Selected</span> : null}</div>
                    <h3 className="mt-3 text-base font-semibold text-white">{strategy.title}</h3>
                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">{strategy.description}</p>
                    <button type="button" onClick={() => setSelectedStrategy(strategy.title)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 hover:text-cyan-100">{selected ? "Strategy selected" : "Select Strategy"}<ArrowRight className="h-3.5 w-3.5" /></button>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="virtual-trading" className="scroll-mt-24">
            <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle eyebrow="Simulated trading · No real money or broker order execution" title="Virtual Trading Lab" />
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-200/5 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> LIVE PRACTICE PREVIEW</span>
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
              <div className="min-w-0 rounded-lg border border-white/8 bg-[#0e171b] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div><div className="text-xs text-slate-500">Simulated market view</div><div className="mt-1 flex flex-wrap items-baseline gap-2"><h3 className="text-xl font-semibold text-white sm:text-2xl">{selectedInstrument}</h3><span className="text-lg font-semibold tabular-nums text-white">{quote.price}</span><span className={`inline-flex items-center text-sm ${quote.positive ? "text-emerald-300" : "text-rose-300"}`}>{quote.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}{quote.change}</span></div></div>
                  <div className="flex rounded-lg border border-white/8 p-1" aria-label="Chart timeframe">{["1D", "1W", "1M"].map((period) => <button key={period} type="button" onClick={() => setTimeframe(period)} className={`rounded px-2.5 py-1 text-xs ${timeframe === period ? "bg-cyan-200/15 text-cyan-100" : "text-slate-500 hover:text-white"}`}>{period}</button>)}</div>
                </div>
                <div className="mt-5 flex h-36 items-end gap-1 border-b border-l border-white/8 px-2 pb-1 sm:h-44 sm:gap-1.5" aria-label={`${selectedInstrument} illustrative ${timeframe} chart`}>
                  {chartBars.map((height, index) => <span key={`${timeframe}-${index}`} className={`flex-1 rounded-t-sm ${index % 7 === 0 ? "bg-amber-300/70" : "bg-cyan-300/60"}`} style={{ height: `${Math.min(height, 100)}%` }} />)}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {(Object.keys(instruments) as Array<keyof typeof instruments>).map((instrument) => <button type="button" key={instrument} onClick={() => setSelectedInstrument(instrument)} className={`flex min-w-0 flex-col rounded-md border px-2.5 py-2 text-left transition sm:flex-row sm:items-center sm:justify-between ${selectedInstrument === instrument ? "border-cyan-200/25 bg-cyan-200/5" : "border-white/8 hover:border-white/15"}`}><span className="truncate text-xs font-medium text-slate-200">{instrument}</span><span className={`mt-1 text-[10px] sm:mt-0 ${instruments[instrument].positive ? "text-emerald-300" : "text-rose-300"}`}>{instruments[instrument].change}</span></button>)}
                </div>
              </div>

              <div className="rounded-lg border border-white/8 bg-[#0e171b] p-4 sm:p-5">
                <div className="flex items-center justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200">{selectedStrategy.replace(" Learning", "")}</div><h3 className="mt-1 text-lg font-semibold text-white">Virtual Order</h3></div><CircleHelp className="h-4 w-4 text-slate-500" /></div>
                <label className="mt-5 block text-xs font-medium text-slate-400" htmlFor="practice-quantity">Quantity</label>
                <input id="practice-quantity" type="number" min="1" max="100" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-2 h-10 w-full rounded-md border border-white/10 bg-[#091114] px-3 text-sm text-white outline-none focus:border-cyan-200/50" />
                <label className="mt-4 block text-xs font-medium text-slate-400" htmlFor="practice-reason">Trade reason</label>
                <textarea id="practice-reason" rows={3} value={tradeReason} onChange={(event) => setTradeReason(event.target.value)} placeholder="What confirms your setup?" className="mt-2 w-full resize-y rounded-md border border-white/10 bg-[#091114] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-200/50" />
                <div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => recordPractice("BUY")} className="flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-300 text-sm font-semibold text-[#07130f] transition hover:bg-emerald-200"><ArrowUpRight className="h-4 w-4" />Virtual BUY</button><button type="button" onClick={() => recordPractice("SELL")} className="flex h-10 items-center justify-center gap-2 rounded-md bg-rose-300 text-sm font-semibold text-[#1c0d0d] transition hover:bg-rose-200"><ArrowDownRight className="h-4 w-4" />Virtual SELL</button></div>
                <p aria-live="polite" className={`mt-3 min-h-10 text-xs leading-5 ${tradeMessage.includes("logged") ? "text-emerald-200" : "text-slate-500"}`}>{tradeMessage || "Add your reasoning before logging a practice decision."}</p>
                <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3 text-xs"><span className="text-slate-500">Available Balance</span><strong className="text-slate-200">₹1,04,250</strong></div>
                <div className="mt-2 flex items-center justify-between text-xs"><span className="text-slate-500">Today&apos;s Virtual P&amp;L</span><strong className="text-emerald-300">+₹850</strong></div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">This learning preview uses sample market values. Practice decisions are kept only in this page session and are never sent to a broker.</p>
          </section>

          <section id="portfolio" className="scroll-mt-24">
            <SectionTitle eyebrow="Simulated · Sample values" title="Virtual Portfolio" />
            <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
              <PortfolioMetric label="Virtual Capital" value="₹1,04,250" icon={Wallet} />
              <PortfolioMetric label="Total P&L" value="+₹4,250" icon={TrendingUp} positive />
              <PortfolioMetric label="Win Rate" value="59%" icon={Check} />
              <PortfolioMetric label="Max Drawdown" value="-3.8%" icon={ArrowDownRight} negative />
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg border border-white/8 bg-[#0e171b] p-4 sm:p-5">
                <div className="flex items-center justify-between"><div><h3 className="text-sm font-semibold text-white">Equity Curve</h3><p className="mt-1 text-xs text-slate-500">Illustrative learning account history</p></div><TrendingUp className="h-4 w-4 text-emerald-300" /></div>
                <div className="mt-5 flex h-32 items-end gap-1 border-b border-l border-white/8 px-2 pb-1">{[30, 34, 32, 39, 36, 43, 40, 47, 45, 53, 50, 59, 54, 65, 62, 72, 68, 78, 74, 84, 81, 92].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-emerald-300/55" style={{ height: `${height}%` }} />)}</div>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/8 bg-[#0e171b]">
                <div className="flex items-center justify-between px-4 py-4 sm:px-5"><h3 className="text-sm font-semibold text-white">Open Positions</h3><span className="text-xs text-slate-500">2 simulated</span></div>
                <div className="overflow-x-auto"><table className="w-full min-w-115 text-left text-xs"><thead className="border-y border-white/8 bg-white/2.5 text-slate-500"><tr><th className="px-4 py-2.5 font-medium">Instrument</th><th className="px-4 py-2.5 font-medium">Side</th><th className="px-4 py-2.5 font-medium">Qty</th><th className="px-4 py-2.5 font-medium">Entry</th><th className="px-4 py-2.5 text-right font-medium">Virtual P&amp;L</th></tr></thead><tbody className="divide-y divide-white/5 text-slate-300"><tr><td className="px-4 py-3 font-medium text-white">NIFTY 50</td><td className="px-4 py-3 text-emerald-300">BUY</td><td className="px-4 py-3">50</td><td className="px-4 py-3">24,020</td><td className="px-4 py-3 text-right text-emerald-300">+₹6,512</td></tr><tr><td className="px-4 py-3 font-medium text-white">BANK NIFTY</td><td className="px-4 py-3 text-rose-300">SELL</td><td className="px-4 py-3">1</td><td className="px-4 py-3">52,900</td><td className="px-4 py-3 text-right text-rose-300">-₹2,262</td></tr></tbody></table></div>
              </div>
            </div>
          </section>

          <section id="journal" className="scroll-mt-24">
            <SectionTitle eyebrow="Reflect and improve" title="Trade Journal" description="Record the reasoning behind each practice decision." action={<span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><NotebookPen className="h-3.5 w-3.5" /> Session preview</span>} />
            <div className="mt-4 overflow-hidden rounded-lg border border-white/8 bg-[#0e171b]">
              <div className="overflow-x-auto"><table className="w-full min-w-170 text-left text-sm"><thead className="border-b border-white/8 bg-white/2.5 text-xs text-slate-500"><tr><th className="px-4 py-3 font-medium sm:px-5">Date</th><th className="px-4 py-3 font-medium">Instrument</th><th className="px-4 py-3 font-medium">Strategy</th><th className="px-4 py-3 font-medium">Reason</th><th className="px-4 py-3 text-right font-medium sm:px-5">Result</th></tr></thead><tbody className="divide-y divide-white/5">{journalEntries.map((entry, index) => <tr key={`${entry.date}-${entry.instrument}-${index}`} className="text-slate-300"><td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 sm:px-5">{entry.date}</td><td className="whitespace-nowrap px-4 py-3 text-xs font-medium text-white">{entry.instrument}</td><td className="whitespace-nowrap px-4 py-3 text-xs">{entry.strategy}</td><td className="max-w-xs truncate px-4 py-3 text-xs text-slate-400">{entry.reason}</td><td className={`whitespace-nowrap px-4 py-3 text-right text-xs font-medium sm:px-5 ${entry.positive ? "text-emerald-300" : "text-rose-300"}`}>{entry.result}</td></tr>)}</tbody></table></div>
              <div className="border-t border-white/8 px-4 py-2.5 text-[11px] text-slate-500 sm:px-5">Practice log entries are temporary and clear when this preview is refreshed.</div>
            </div>
          </section>

          <section id="coach" className="scroll-mt-24 rounded-xl border border-cyan-200/10 bg-[#101a1d] p-5 sm:p-7">
            <div className="grid min-w-0 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200"><BrainCircuit className="h-4 w-4" /> Arvan AI Coach</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">Your learning companion.</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Ask about trading concepts or use the sample prompts to reflect on a practice setup.</p>
                <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setCoachPrompt("Explain breakout confirmation")} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-200/30 hover:text-white">Explain breakout confirmation</button><button type="button" onClick={() => setCoachPrompt("How should I manage risk?")} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-200/30 hover:text-white">Review risk basics</button></div>
              </div>
              <div className="min-w-0 rounded-lg border border-white/8 bg-[#0b1316] p-4 sm:p-5">
                <div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-200/10 text-cyan-200"><Sparkles className="h-4 w-4" /></span><div className="min-w-0"><div className="text-xs font-medium text-cyan-100">Arvan Coach <span className="ml-1 text-slate-600">· Preview</span></div><p className="mt-1 text-sm leading-6 text-slate-300">Hi! I can explain concepts, quiz you, or help review a virtual practice decision. What would you like to learn?</p></div></div>
                {coachReply ? <div className="mt-4 flex items-start gap-3 border-t border-white/8 pt-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200/10 text-amber-200"><MessageCircle className="h-4 w-4" /></span><div className="min-w-0"><div className="text-xs font-medium text-amber-100">Sample response</div><p className="mt-1 text-sm leading-6 text-slate-300">{coachReply}</p></div></div> : null}
                <form onSubmit={askCoach} className="mt-4 flex gap-2 border-t border-white/8 pt-4"><input value={coachPrompt} onChange={(event) => setCoachPrompt(event.target.value)} placeholder="Ask about a trading concept..." aria-label="Ask the coach" className="h-10 min-w-0 flex-1 rounded-md border border-white/10 bg-[#090f12] px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-200/50" /><button type="submit" aria-label="Send question" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-300 text-[#071014] transition hover:bg-cyan-200"><Send className="h-4 w-4" /></button></form>
                <p className="mt-3 text-[11px] leading-5 text-slate-600">Coach replies in this preview are sample guidance and are not generated by a live AI service.</p>
              </div>
            </div>
          </section>

          <section id="certificates" className="flex flex-col gap-3 border-t border-white/8 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><span>Educational simulation only. No investment advice, real-money trading or broker execution.</span></div>
            <Link href="/registration" className="inline-flex shrink-0 items-center gap-1 text-slate-400 hover:text-white">Explore student registration <ArrowRight className="h-3.5 w-3.5" /></Link>
          </section>
        </main>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>{eyebrow ? <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">{eyebrow}</div> : null}<h2 className="mt-1.5 text-xl font-semibold text-white sm:text-2xl">{title}</h2>{description ? <p className="mt-1.5 text-sm text-slate-400">{description}</p> : null}</div>
      {action}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail, accent }: { icon: typeof BookOpen; label: string; value: string; detail: string; accent: "cyan" | "green" | "amber" | "blue" }) {
  const accentClasses = { cyan: "text-cyan-200 bg-cyan-200/10", green: "text-emerald-200 bg-emerald-200/10", amber: "text-amber-200 bg-amber-200/10", blue: "text-sky-200 bg-sky-200/10" };
  const detailClasses = { cyan: "text-slate-400", green: "text-emerald-200", amber: "text-slate-400", blue: "text-sky-200" };
  return <article className="rounded-lg border border-white/8 bg-[#0e171b] p-4 sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-xs text-slate-400">{label}</span><span className={`flex h-8 w-8 items-center justify-center rounded-md ${accentClasses[accent]}`}><Icon className="h-4 w-4" /></span></div><div className="mt-3 text-xl font-semibold tabular-nums text-white sm:text-2xl">{value}</div><div className={`mt-1 text-xs ${detailClasses[accent]}`}>{detail}</div></article>;
}

function CourseProgressCard({ category, title, progress, lessons }: { category: string; title: string; progress: number; lessons: string }) {
  return <article className="rounded-lg border border-white/8 bg-[#0e171b] p-4"><div className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-300">{category}</span><span className="text-xs font-semibold text-cyan-200">{progress}%</span></div><h3 className="mt-3 text-base font-semibold text-white">{title}</h3><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-cyan-300" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex items-center justify-between text-xs text-slate-500"><span>{lessons}</span><span>{progress}%</span></div></article>;
}

function PortfolioMetric({ label, value, icon: Icon, positive, negative }: { label: string; value: string; icon: typeof BookOpen; positive?: boolean; negative?: boolean }) {
  return <article className="rounded-lg border border-white/8 bg-[#0e171b] p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><Icon className={`h-4 w-4 ${positive ? "text-emerald-300" : negative ? "text-rose-300" : "text-cyan-200"}`} /></div><div className={`mt-3 text-lg font-semibold tabular-nums sm:text-xl ${positive ? "text-emerald-300" : negative ? "text-rose-300" : "text-white"}`}>{value}</div></article>;
}