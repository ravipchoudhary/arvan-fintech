import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function ClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell title="Clients / Users" subtitle="Client directory">
      <div className="card p-4 sm:p-5">
        <div className="mb-3 sm:mb-5 text-xs sm:text-sm text-slate-500">Listing all registered users and platform clients.</div>

        <div className="table-shell">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">ID</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Name</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Role</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Email</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Phone</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Status</th>
                <th className="pb-2 sm:pb-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-semibold text-slate-800 text-xs">{client.id.substring(0, 6)}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-800 whitespace-nowrap">{client.name}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{client.role}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{client.email}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700 whitespace-nowrap">{client.phone}</td>
                    <td className="py-2 sm:py-3 pr-2 sm:pr-4">
                      <span className={`rounded-full px-2 py-1 text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${client.status === "ACTIVE" ? "bg-green-100 text-green-700" : client.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-slate-200 text-slate-700"}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 text-slate-600 text-xs sm:text-sm">{client.createdAt.toISOString().slice(0, 10)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 sm:py-8 text-center text-xs sm:text-sm text-slate-500">
                    No users found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
