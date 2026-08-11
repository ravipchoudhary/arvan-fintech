import { AppShell } from "@/components/app-shell";

export default function AuditSecurityPage() {
  return (
    <AppShell title="Audit / Security" subtitle="Recent access and actions">
      <div className="card p-8 text-center">
        <div className="text-lg font-semibold text-slate-900">Audit logging is not configured yet.</div>
        <p className="mt-3 text-sm text-slate-600">
          Security and activity logs will appear here once the platform begins recording user and broker events.
        </p>
      </div>
    </AppShell>
  );
}
