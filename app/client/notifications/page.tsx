import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientNotificationsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const notifications = await prisma.notification.findMany({ where: { clientId: session.id }, orderBy: { createdAt: "desc" }, take: 30 });

  return (
    <AppShell title="Notifications" subtitle="Alerts and updates for your account" variant="client">
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        {notifications.length === 0 ? (
          <div className="text-sm text-slate-500">No notifications yet.</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-slate-900">{notification.type}</div>
                  <div className="text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-sm text-slate-700">{notification.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
