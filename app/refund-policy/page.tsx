import { PublicShell } from "@/components/public-site";

export default function RefundPolicyPage() {
  return (
    <PublicShell title="Refund Policy" description="Guidance regarding cancellations, subscriptions and service-related refunds." eyebrow="Legal" hero={null}>
      <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        <p className="leading-8">Refunds are evaluated according to the subscription arrangement and the services provided. Any request for a refund should be raised through the support or contact channel and will be reviewed on a case-by-case basis.</p>
      </div>
    </PublicShell>
  );
}
