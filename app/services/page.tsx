import { PublicShell, SectionHeading, FeatureCard } from "@/components/public-site";
import { BarChart3, Bot, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function ServicesPage() {
  return (
    <PublicShell
      title="Services Built For Modern Trading Operations"
      description="From algo trading to broker connectivity and analytics, Arvan Fintech provides a complete operating layer for modern trading teams."
      eyebrow="Services"
      hero={null}
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <FeatureCard icon={Bot} title="Algo Trading" description="Automate trading strategies with structured execution workflows and clear operational controls." />
        <FeatureCard icon={Cpu} title="API Bridge" description="Connect supported brokers and exchange data through secure, centralized integrations." />
        <FeatureCard icon={BarChart3} title="Strategy Development" description="Design entry and exit logic with indicators, rules, and risk filters in one place." />
        <FeatureCard icon={Zap} title="Automated Buy & Sell" description="Trigger predefined actions when conditions are met, with monitoring and execution oversight." />
        <FeatureCard icon={ShieldCheck} title="Risk Management" description="Manage exposure, drawdown, position limits and daily loss thresholds in a controlled workflow." />
      </section>

      <section className="mt-16 rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
        <SectionHeading eyebrow="Operational coverage" title="Everything needed to run trading workflows with confidence" description="Arvan Fintech supports strategy creation, execution monitoring, reporting, risk checks and broker connectivity in a unified environment." />
      </section>
    </PublicShell>
  );
}
