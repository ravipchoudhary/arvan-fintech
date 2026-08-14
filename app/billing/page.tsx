import { AppShell } from "@/components/app-shell";

const plans = [
  { name: "Free", price: "₹0", features: ["1 strategy", "Basic analytics"] },
  { name: "Pro", price: "₹1,999", features: ["Unlimited strategies", "Advanced analytics", "Risk alerts"] },
  { name: "Enterprise", price: "Custom", features: ["Multi-team admin", "Payroll", "Custom reports"] },
];

export default function BillingPage() {
  return (
    <AppShell title="Billing" subtitle="Plan and usage overview">
      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`card p-5 ${plan.name === "Pro" ? "border-blue-400 shadow-lg shadow-blue-500/10" : ""}`}>
            <div className="text-xs uppercase tracking-[0.12em] text-slate-500">{plan.name}</div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{plan.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <button type="button" className={`mt-5 w-full rounded-full px-4 py-2 text-sm font-semibold ${plan.name === "Pro" ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
              {plan.name === "Free" ? "Current Plan" : plan.name === "Pro" ? "Upgrade" : "Manage"}
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
