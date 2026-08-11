import { AppShell } from "@/components/app-shell";
import { getSessionUser } from "@/lib/session";

export default async function ClientProfilePage() {
  const session = await getSessionUser();
  if (!session) return null;

  return (
    <AppShell title="Profile" subtitle="Your account details" variant="client">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Name</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">{session.name}</div>
          <div className="mt-4 text-sm text-slate-500">Email</div>
          <div className="mt-2 text-lg text-slate-900">{session.email}</div>
          <div className="mt-4 text-sm text-slate-500">Role</div>
          <div className="mt-2 text-lg text-slate-900">{session.role}</div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Account settings</div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Update your trading preferences and notification settings.</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Manage linked brokers and account authorizations.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
