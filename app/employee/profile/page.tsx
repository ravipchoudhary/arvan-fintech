import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function EmployeeProfilePage() {
  const sessionUser = await getSessionUser();
  const user = sessionUser ? await prisma.user.findUnique({ where: { id: sessionUser.id } }) : null;

  return (
    <AppShell title="My Profile" subtitle="Employee account overview" variant="employee">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm text-slate-500">Name</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">{user?.name ?? sessionUser?.name ?? "—"}</div>
          <div className="mt-4 text-sm text-slate-600">{user?.role ?? "Employee"}</div>
        </div>

        <div className="card p-5">
          <div className="text-sm text-slate-500">Email</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">{user?.email ?? sessionUser?.email ?? "—"}</div>
          <div className="mt-4 text-sm text-slate-600">{user ? `Status: ${user.status}` : ""}</div>
        </div>

        <div className="card p-5">
          <div className="text-sm text-slate-500">Phone</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">{user?.phone ?? "—"}</div>
          <div className="mt-4 text-sm text-slate-600">Reporting Manager: {user ? "(not set)" : "—"}</div>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="text-lg font-bold text-slate-900">Profile Summary</h3>
        <p className="mt-4 text-sm leading-7 text-slate-700">{user ? "No profile summary available." : "No profile summary available."}</p>
      </div>
    </AppShell>
  );
}
