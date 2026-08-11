import { AppShell } from "@/components/app-shell";
import { getSessionUser } from "@/lib/session";
import { readFollowups } from "@/lib/followups";

type FollowUpEntry = {
  id: string;
  employeeId: string;
  clientName?: string | null;
  type?: string | null;
  status?: string | null;
  scheduledAt: string;
};

export default async function FollowUpsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const all = (await readFollowups())
    .filter((f: FollowUpEntry) => f.employeeId === session.id)
    .sort((a: FollowUpEntry, b: FollowUpEntry) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  const today = all.filter((f: FollowUpEntry) => new Date(f.scheduledAt).toDateString() === new Date().toDateString());
  const upcoming = all.filter((f: FollowUpEntry) => new Date(f.scheduledAt) > new Date());
  const completed = all.filter((f: FollowUpEntry) => f.status === "COMPLETED");
  const overdue = all.filter((f: FollowUpEntry) => new Date(f.scheduledAt) < new Date() && f.status !== "COMPLETED");

  return (
    <AppShell title="Follow Ups" subtitle="Manage your follow ups" variant="employee">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Today</h2>
        <a href="/employee/follow-ups/new" className="btn btn-primary">Add Follow-up</a>
      </div>

      <div className="grid gap-4">
        {today.length === 0 ? <div className="text-sm text-slate-500">No follow-ups today.</div> : null}
        {today.map((f: FollowUpEntry) => (
          <div key={f.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{f.clientName || "Client"}</div>
                <div className="text-sm text-slate-500">{new Date(f.scheduledAt).toLocaleTimeString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/employee/follow-ups/${f.id}/edit`} className="text-sm text-blue-600">Edit</a>
                <button className="text-sm text-green-600">Complete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-md font-semibold">Upcoming</h3>
        <div className="mt-3 grid gap-3">
          {upcoming.map((f: FollowUpEntry) => (
            <div key={f.id} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{f.clientName || "Client"}</div>
                  <div className="text-sm text-slate-500">{new Date(f.scheduledAt).toLocaleString()}</div>
                </div>
                <div className="text-sm text-slate-400">{f.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

