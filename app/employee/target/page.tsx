import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { employeeRecordWhere } from "@/lib/employee";

export default async function TargetPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const target = await prisma.target.findFirst({ where: { ...employeeRecordWhere(session.id), month, year } });
  const salesAgg = await prisma.sale.aggregate({ _sum: { amount: true }, where: { ...employeeRecordWhere(session.id), createdAt: { gte: new Date(year, month - 1, 1), lt: new Date(year, month, 1) } } });
  const achieved = salesAgg._sum?.amount ?? 0;

  return (
    <AppShell title="My Target" subtitle="Monthly sales target" variant="employee">
      <div className="card p-5">
        <div className="text-sm text-slate-500">Monthly Target</div>
        <div className="mt-2 text-3xl font-bold">₹{(target?.amount ?? 0).toLocaleString()}</div>
        <div className="mt-3 text-sm text-slate-600">Achieved: ₹{achieved.toLocaleString()}</div>
      </div>
    </AppShell>
  );
}
 
