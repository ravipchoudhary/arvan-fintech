import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientSettingsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const brokerConnection = await prisma.brokerConnection.findFirst({ where: { clientId: session.id } });

  return (
    <AppShell title="Settings" subtitle="Client account settings" variant="client">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-slate-900">Account settings</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Receive email summaries of portfolio activity.</div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Two-factor authentication is {brokerConnection?.totpEnabled ? "enabled" : "disabled"}.</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-slate-900">Broker connection</h3>
          <div className="mt-4 text-sm text-slate-700">
            {brokerConnection ? (
              <>
                <div className="font-semibold text-slate-900">{brokerConnection.status}</div>
                <div className="mt-2 text-slate-500">Managed by: {brokerConnection.accountId}</div>
              </>
            ) : (
              <div>No broker connected.</div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
