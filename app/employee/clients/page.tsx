import { AppShell } from "@/components/app-shell";
import { EmployeeClientCreateModal } from "@/components/employee-client-create-modal";
import { createClientForEmployeeAction } from "@/app/actions/auth";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { employeeClientCountWhere, employeeClientWhere } from "@/lib/employee";

export default async function EmployeeClientsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const [activeUsers, totalStrategies, connectedBrokers, clients] = await Promise.all([
    prisma.user.count({ where: employeeClientCountWhere(session.id) }),
    prisma.strategy.count(),
    prisma.broker.count({ where: { connected: true } }),
    prisma.user.findMany({ where: employeeClientWhere(session.id), orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  const stats = [
    { label: "Active Users", value: activeUsers.toString() },
    { label: "Total Strategies", value: totalStrategies.toString() },
    { label: "Connected Brokers", value: connectedBrokers.toString() },
  ];

  return (
    <AppShell title="My Clients" subtitle="Clients assigned to you" variant="employee">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <div className="text-xs sm:text-sm text-slate-500">{item.label}</div>
            <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 card p-4 sm:p-5">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">My Clients</h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <EmployeeClientCreateModal action={createClientForEmployeeAction} />
            <button type="button" className="rounded-full bg-white border border-slate-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700">Search</button>
          </div>
        </div>
        <div className="table-shell">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Name</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Email</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Role</th>
                <th className="pb-2 sm:pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-semibold text-slate-800">{c.name}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{c.email}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-800">{c.role}</td>
                  <td className="py-2 sm:py-3 text-slate-700">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
