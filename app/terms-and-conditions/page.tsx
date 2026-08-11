import { PublicShell } from "@/components/public-site";

export default function TermsPage() {
  return (
    <PublicShell title="Terms & Conditions" description="The terms governing access to ARVAN FINTECH services and platform usage." eyebrow="Legal" hero={null}>
      <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        <p className="leading-8">By using ARVAN FINTECH, users agree to use the platform responsibly and to comply with applicable laws, trading and data handling requirements. ARVAN FINTECH reserves the right to limit or restrict access where usage conflicts with platform policies or legal obligations.</p>
      </div>
    </PublicShell>
  );
}
