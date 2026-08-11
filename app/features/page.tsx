import { PublicShell, SectionHeading, FeatureCard } from "@/components/public-site";
import { BarChart3, BellRing, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export default function FeaturesPage() {
  return (
    <PublicShell
      title="Powerful Features For Strategy Teams"
      description="Every module is designed to support execution, monitoring, alerts, reporting and risk control in one secure workflow."
      eyebrow="Features"
      hero={null}
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard icon={Sparkles} title="Strategy Builder" description="Create structured trading strategies with clear conditions and rules." />
        <FeatureCard icon={BarChart3} title="Backtesting" description="Evaluate strategies against historical data and review performance metrics." />
        <FeatureCard icon={Cpu} title="Automated Execution" description="Deploy and monitor execution with connected broker workflows and operational visibility." />
        <FeatureCard icon={BellRing} title="Real-Time Monitoring" description="Monitor algorithms, positions, orders and status updates with live visibility." />
        <FeatureCard icon={ShieldCheck} title="Risk Controls" description="Apply limits across exposure, drawdown and daily loss thresholds for better oversight." />
        <FeatureCard icon={BarChart3} title="Analytics" description="Review performance with reports, charts and trade-level analytics." />
        <FeatureCard icon={BarChart3} title="Reports" description="Create detailed reports that support review, audit and day-to-day operations." />
        <FeatureCard icon={BellRing} title="Notifications" description="Receive timely updates on strategies, trades and risk conditions." />
      </section>
    </PublicShell>
  );
}
