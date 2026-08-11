import { PublicShell, SectionHeading, PricingCard } from "@/components/public-site";

export default function PricingPage() {
  return (
    <PublicShell
      title="Flexible Pricing For Trading Teams"
      description="Choose a plan that matches your automation and support needs. Each plan is structured for professional trading operations and can be tailored further."
      eyebrow="Pricing"
      hero={null}
    >
      <section className="grid gap-6 lg:grid-cols-4">
        <PricingCard title="Monthly" price="₹11,400" subtitle="Ideal for early implementation and short-term strategy rollout." features={["Completely Automated Trade Indices", "Free Demat Account Opening (Optional)", "1 Strategy Coding", "WhatsApp Support", "Remote Support", "₹1,000 Monthly Maintenance Charge"]} cta="Buy Now" />
        <PricingCard title="Quarterly" price="₹29,800" subtitle="Balanced package for teams that want ongoing support and multiple strategies." features={["Completely Automated Trade Indices", "Account Opening (Optional)", "3–4 Strategy Coding", "WhatsApp Support", "Remote Support", "₹1,000 Monthly Maintenance Charge"]} cta="Buy Now" />
        <PricingCard title="Half Yearly" price="₹52,800" subtitle="A strong engagement plan for consistent workflow management." features={["Completely Automated Trade Indices", "Account Opening (Optional)", "5–6 Strategy Coding", "WhatsApp Support", "Remote Support", "₹1,000 Monthly Maintenance Charge"]} cta="Buy Now" />
        <PricingCard title="Yearly" price="₹96,400" subtitle="Recommended value plan for long-term deployment and continuous support." features={["Completely Automated Trade Indices", "Account Opening (Optional)", "8–10 Strategy Coding", "WhatsApp Support", "Remote Support", "₹1,000 Monthly Maintenance Charge"]} accent cta="Contact Us" />
      </section>
    </PublicShell>
  );
}
