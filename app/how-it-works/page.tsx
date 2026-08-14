import { PublicShell, SectionHeading, StepCard } from "@/components/public-site";

export default function HowItWorksPage() {
  return (
    <PublicShell
      title="How Arvan Fintech Works"
      description="A simple sequence from account setup to live monitoring, built to keep operations structured and transparent."
      eyebrow="How It Works"
      hero={null}
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StepCard number="01" title="Create Account" description="Register and access the platform with your role-based workspace." />
        <StepCard number="02" title="Connect Broker" description="Link supported broker integrations and establish your trading connection." />
        <StepCard number="03" title="Build Strategy" description="Create rules, indicators and execution logic for your trading workflow." />
        <StepCard number="04" title="Configure Risk" description="Set daily loss, exposure and position limits before deployment." />
        <StepCard number="05" title="Deploy & Monitor" description="Launch strategies and follow performance with live monitoring and alerts." />
      </section>
    </PublicShell>
  );
}
