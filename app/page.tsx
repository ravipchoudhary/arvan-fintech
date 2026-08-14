import Link from "next/link";
import { ArrowRight, BarChart3, BellRing, Bot, Cpu } from "lucide-react";
import { prisma } from "@/lib/db";
import { PublicShell, FeatureCard, SectionHeading, TestimonialCard } from "@/components/public-site";
import HomeHeroWithModal from "@/components/home-hero-with-modal";

export default async function HomePage() {
  const [totalStrategies, liveStrategies, connectedBrokers, activeUsers] = await Promise.all([
    prisma.strategy.count(),
    prisma.strategy.count({ where: { status: "RUNNING" } }),
    prisma.broker.count({ where: { connected: true } }),
    prisma.user.count({ where: { status: "ACTIVE" } }),
  ]);

  return (
    <PublicShell
      title="Smarter Trading. Powerful Automation."
      description="Build, test and automate systematic trading strategies with analytics, risk controls and broker connectivity in one secure operating environment."
      eyebrow="Arvan Fintech"
      hero={<HomeHeroWithModal />}
    >
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5 sm:p-8">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="text-xs sm:text-sm text-slate-400">Total Strategies</div>
            <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">{totalStrategies}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="text-xs sm:text-sm text-slate-400">Live Algorithms</div>
            <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">{liveStrategies}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="text-xs sm:text-sm text-slate-400">Connected Brokers</div>
            <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">{connectedBrokers}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="text-xs sm:text-sm text-slate-400">Active Traders</div>
            <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">{activeUsers}</div>
          </div>
        </div>
      </section>

      <section className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <SectionHeading eyebrow="About Arvan Fintech" title="Technology That Makes Trading More Systematic" description="Arvan Fintech brings strategy development, automation, analytics, risk controls and broker connectivity together in a single operating layer." />
          <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-7 sm:leading-8 text-slate-400">The platform is built for teams that need a disciplined approach to execution, monitoring and reporting without losing focus on operational control.</p>
          <Link href="/about" className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-300">Learn More <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 to-slate-900 p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">Why Arvan Fintech?</h3>
          <ul className="mt-4 sm:mt-6 space-y-3 text-sm sm:text-base text-slate-300">
            <li>• Strategy-focused automation</li>
            <li>• Real-time monitoring and alerts</li>
            <li>• Broker connectivity and APIs</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <SectionHeading eyebrow="Services" title="A complete trading workflow for modern teams" description="From strategy creation to execution monitoring, Arvan Fintech covers the full journey." />
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Bot} title="Algo Trading" description="Automate trading strategies with structured execution workflows and clear oversight." />
          <FeatureCard icon={BarChart3} title="API Bridge" description="Connect supported brokers and trading data through secure centralized integrations." />
          <FeatureCard icon={Cpu} title="Strategy Development" description="Create and refine systematic strategies from rules, indicators and risk settings." />
          <FeatureCard icon={BellRing} title="Automated Buy & Sell" description="Trigger predefined actions when conditions are met with monitoring and control." />
        </div>
      </section>

      <section className="mt-12 sm:mt-16 rounded-[32px] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
        <SectionHeading eyebrow="How It Works" title="From setup to live monitoring in six steps" description="A streamlined process for onboarding, strategy creation, risk control and deployment." />
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["01", "Create Account", "Register and access the platform with your role-based workspace."],
            ["02", "Connect Broker", "Link supported broker integrations and establish your trading connection."],
            ["03", "Build Strategy", "Create rules, indicators and execution logic for your trading workflow."],
            ["04", "Backtest", "Validate ideas with historical data and measurable sample metrics."],
            ["05", "Configure Risk", "Set daily loss, exposure and position limits before deployment."],
            ["06", "Deploy & Monitor", "Launch strategies and follow performance with live monitoring and alerts."],
          ].map(([number, title, description]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-lg font-semibold text-blue-300">{number}</div>
              <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <SectionHeading eyebrow="Testimonials" title="Trusted by teams building disciplined trading workflows" description="Arvan Fintech is designed for professional trading operations that need structure, visibility and control." />
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard quote="The workflow feels structured and practical for both strategy execution and daily monitoring." author="A. Sharma" role="Portfolio Operations Lead" />
          <TestimonialCard quote="We use the platform to keep analytics, risk and execution aligned in one place." author="N. Verma" role="Trading Desk Manager" />
          <TestimonialCard quote="It gives our team a clear path from strategy setup to reporting without unnecessary complexity." author="M. Rao" role="Operations Head" />
        </div>
      </section>

      <section className="mt-12 sm:mt-16 rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 to-slate-900 p-6 sm:p-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white">Ready to bring structure to your trading workflow?</h3>
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-slate-400">Explore the platform, review the pricing and start from the existing login or signup experience.</p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/pricing" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 text-center">View Pricing</Link>
          <Link href="/contact" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white text-center">Contact Us</Link>
        </div>
      </section>
    </PublicShell>
  );
}
