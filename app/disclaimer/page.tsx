import { PublicShell } from "@/components/public-site";

export default function DisclaimerPage() {
  return (
    <PublicShell title="Disclaimer" description="Important information about the platform and trading-related services." eyebrow="Legal" hero={null}>
      <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        <p className="leading-8">Arvan Fintech provides software and platform services for trading workflow automation and analytics. All trading activity carries risk and users are responsible for their own investment decisions. The platform does not guarantee profits, returns or protection against losses.</p>
      </div>
    </PublicShell>
  );
}
