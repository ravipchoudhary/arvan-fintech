import Link from "next/link";

export function BrandLogo({ className, withLabel = false, label = "Arvan Fintech", subtitle }: { className?: string; withLabel?: boolean; label?: string; subtitle?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white p-2 shadow-lg">
        <img src="/arvan-logo.png" alt={label} className="h-full w-full object-contain" />
      </div>
      {withLabel ? (
        <div className="flex flex-col leading-tight text-slate-900">
          <span className="text-base font-semibold tracking-[0.04em]">{label}</span>
          {subtitle ? <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{subtitle}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export function BrandLogoLink({ href = "/", className, withLabel = false, label = "Arvan Fintech", subtitle }: { href?: string; className?: string; withLabel?: boolean; label?: string; subtitle?: string }) {
  return (
    <Link href={href} className={className}>
      <BrandLogo withLabel={withLabel} label={label} subtitle={subtitle} />
    </Link>
  );
}
