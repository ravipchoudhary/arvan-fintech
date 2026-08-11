import { PublicShell, SectionHeading, FeatureCard } from "@/components/public-site";
import { BarChart3, Cpu, ShieldCheck } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <PublicShell title="Analytics For Trading Performance" description="Understand equity curve, trade performance, monthly outcomes and strategy behavior with clear reporting insights." eyebrow="Analytics" hero={null}>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard icon={BarChart3} title="Equity Curve" description="Visualize longer-term growth and trend behavior with performance graphics." />
        <FeatureCard icon={BarChart3} title="P&amp;L" description="Review daily, weekly and monthly profit and loss movement across strategies." />
        <FeatureCard icon={Cpu} title="Win Rate" description="Understand trade consistency with clear sample-based performance metrics." />
        <FeatureCard icon={ShieldCheck} title="Drawdown" description="Track drawdown and limit events in a controlled and reviewable format." />
      </section>
    </PublicShell>
  );
}
