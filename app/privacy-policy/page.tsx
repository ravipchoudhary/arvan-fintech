import { PublicShell } from "@/components/public-site";

export default function PrivacyPolicyPage() {
  return (
    <PublicShell title="Privacy Policy" description="How ARVAN FINTECH handles user information and platform data." eyebrow="Legal" hero={null}>
      <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        <p className="leading-8">ARVAN FINTECH uses user information strictly to provide access to the platform, manage authentication, support operations and improve the quality of services. Sensitive credentials and private account data are never exposed publicly.</p>
      </div>
    </PublicShell>
  );
}
