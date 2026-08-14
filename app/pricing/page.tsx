"use client";

import { useState } from "react";
import { PublicShell, SectionHeading } from "@/components/public-site";
import { PricingCard } from "@/components/pricing-card";
import LeadEnquiryModal from "@/components/lead-enquiry-modal";

const PRICING_PLANS = [
  {
    title: "Monthly",
    price: "₹11,400",
    planName: "Monthly",
    planPrice: 11400,
    subtitle: "Ideal for early implementation and short-term strategy rollout.",
    features: [
      "Completely Automated Trade Indices",
      "Free Demat Account Opening (Optional)",
      "1 Strategy Coding",
      "WhatsApp Support",
      "Remote Support",
      "₹1,000 Monthly Maintenance Charge",
    ],
    cta: "Buy Now",
  },
  {
    title: "Quarterly",
    price: "₹29,800",
    planName: "Quarterly",
    planPrice: 29800,
    subtitle: "Balanced package for teams that want ongoing support and multiple strategies.",
    features: [
      "Completely Automated Trade Indices",
      "Account Opening (Optional)",
      "3–4 Strategy Coding",
      "WhatsApp Support",
      "Remote Support",
      "₹1,000 Monthly Maintenance Charge",
    ],
    cta: "Buy Now",
  },
  {
    title: "Half Yearly",
    price: "₹52,800",
    planName: "Half Yearly",
    planPrice: 52800,
    subtitle: "A strong engagement plan for consistent workflow management.",
    features: [
      "Completely Automated Trade Indices",
      "Account Opening (Optional)",
      "5–6 Strategy Coding",
      "WhatsApp Support",
      "Remote Support",
      "₹1,000 Monthly Maintenance Charge",
    ],
    cta: "Buy Now",
  },
  {
    title: "Yearly",
    price: "₹96,400",
    planName: "Yearly",
    planPrice: 96400,
    subtitle: "Recommended value plan for long-term deployment and continuous support.",
    features: [
      "Completely Automated Trade Indices",
      "Account Opening (Optional)",
      "8–10 Strategy Coding",
      "WhatsApp Support",
      "Remote Support",
      "₹1,000 Monthly Maintenance Charge",
    ],
    cta: "Contact Us",
    accent: true,
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const handlePlanSelect = (planName: string, planPrice: number) => {
    setSelectedPlan({ name: planName, price: planPrice });
  };

  return (
    <>
      <PublicShell
        title="Flexible Pricing For Trading Teams"
        description="Choose a plan that matches your automation and support needs. Each plan is structured for professional trading operations and can be tailored further."
        eyebrow="Pricing"
        hero={null}
      >
        <section className="grid gap-6 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              subtitle={plan.subtitle}
              features={plan.features}
              cta={plan.cta}
              accent={plan.accent}
              onCta={() => handlePlanSelect(plan.planName, plan.planPrice)}
            />
          ))}
        </section>
      </PublicShell>

      {selectedPlan && (
        <LeadEnquiryModal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          selectedPlan={selectedPlan.name}
          planPrice={selectedPlan.price}
          source="PRICING"
        />
      )}
    </>
  );
}
