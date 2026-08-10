import { AppShell } from "@/components/app-shell";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Account and platform preferences">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Profile</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <Row label="Full Name" value="Amit Kumar" />
            <Row label="Email" value="amit@arvanalgo.com" />
            <Row label="Phone" value="+91 98765 43210" />
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-slate-900">Security</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <Row label="Change Password" value="Manage" />
            <Row label="2FA" value="Enabled" />
            <Row label="Active Sessions" value="3 devices" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
