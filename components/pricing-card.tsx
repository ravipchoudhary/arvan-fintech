"use client";

type PricingCardProps = {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  accent?: boolean;
  onCta?: () => void;
};

export function PricingCard({
  title,
  price,
  subtitle,
  features,
  cta,
  accent,
  onCta,
}: PricingCardProps) {
  return (
    <div className={`rounded-[28px] border p-6 ${accent ? "border-blue-400/30 bg-blue-500/10" : "border-white/10 bg-slate-950/80"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-white">{price}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Billed monthly</p>
        </div>
      </div>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="list-disc pl-5 leading-6">{feature}</li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCta}
          className={`w-full rounded-full px-5 py-3 text-sm font-semibold transition ${accent ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-white/5 text-white hover:bg-white/10"}`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
