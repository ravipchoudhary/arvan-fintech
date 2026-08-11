import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { employeeRecordWhere } from "@/lib/employee";

export default async function SalesPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const sales = await prisma.sale.findMany({ where: employeeRecordWhere(session.id), orderBy: { createdAt: "desc" }, take: 50 });

  const total = sales.reduce((s, it) => s + it.amount, 0);

  return (
    <AppShell title="My Sales" subtitle="Your recorded sales" variant="employee">
      <div className="mb-4 text-sm text-slate-600">Total this view: ₹{total.toLocaleString()}</div>
      <div className="grid gap-3">
        {sales.map((s) => (
          <div key={s.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">₹{s.amount.toLocaleString()}</div>
                <div className="text-sm text-slate-500">{s.clientId || "Client"}</div>
              </div>
              <div className="text-sm text-slate-400">{new Date(s.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
