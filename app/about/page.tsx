import Link from "next/link";
import { PublicShell, SectionHeading, FeatureCard } from "@/components/public-site";
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <PublicShell
      title="Technology That Makes Trading More Systematic"
      description="Arvan Fintech combines algorithmic trading, strategy development, automation, risk controls and analytics into one secure platform."
      eyebrow="About Arvan Fintech"
      hero={
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">Explore Services</Link>
          <Link href="/contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white">Contact Us</Link>
        </div>
      }
    >
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
          <SectionHeading eyebrow="About Us" title="A modern trading automation platform" description="Designed for professionals who need a structured path from signal to execution, dashboard to reporting, and analytics to risk oversight." />
          <p className="mt-6 text-lg leading-8 text-slate-400">Arvan Fintech helps teams build systematic strategies, connect to supported brokers, monitor live activity and manage exposure with clarity. The platform brings execution, risk and analytics together so decisions can be made with full context.</p>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 to-slate-900 p-8">
          <h3 className="text-2xl font-semibold text-white">Why Arvan Fintech?</h3>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li>• Strategy-focused automation</li>
            <li>• Advanced analytics and reporting</li>
            <li>• Real-time monitoring and alerts</li>
            <li>• Strong risk management workflows</li>
            <li>• Secure broker and API integration</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <FeatureCard icon={Sparkles} title="Strategy Development" description="Create and manage systematic rules with structured logic and clear execution conditions." />
        <FeatureCard icon={BarChart3} title="Trading Analytics" description="Track performance with reporting, charts and strategic insight for better decisions." />
        <FeatureCard icon={ShieldCheck} title="Risk Controls" description="Monitor position sizing, exposure and drawdown limits with visible controls." />
      </section>
    </PublicShell>
  );
}
