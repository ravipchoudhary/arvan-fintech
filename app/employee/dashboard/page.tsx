import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { readFollowups } from "@/lib/followups";
import { employeeClientCountWhere, employeeClientCreatedAtWhere, employeeRecordWhere } from "@/lib/employee";

export default async function EmployeeDashboardPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const todayEnd = new Date(new Date().setHours(24, 0, 0, 0));

  const [activeClients, followups, salesAgg, monthlyNewClients, target] = await Promise.all([
    prisma.user.count({ where: employeeClientCountWhere(session.id) }),
    readFollowups(),
    prisma.sale.aggregate({ _sum: { amount: true }, where: { ...employeeRecordWhere(session.id), createdAt: { gte: new Date(year, month - 1, 1), lt: new Date(year, month, 1) } } }),
    prisma.user.count({ where: employeeClientCreatedAtWhere(session.id, new Date(year, month - 1, 1), new Date(year, month, 1)) }),
    prisma.target.findFirst({ where: { ...employeeRecordWhere(session.id), month, year } }),
  ]);

  const followupsTodayCount = followups.filter((f: any) => f.employeeId === session.id && new Date(f.scheduledAt) >= todayStart && new Date(f.scheduledAt) < todayEnd).length;

  const achieved = salesAgg._sum?.amount ?? 0;
  const targetAmount = target?.amount ?? 0;
  const achievedPct = targetAmount > 0 ? Math.min(100, Math.round((achieved / targetAmount) * 100)) : 0;

  const newClients = monthlyNewClients;
  const conversionRate = activeClients > 0 ? Math.round(((activeClients / Math.max(1, newClients + 0)) * 100) * 10) / 10 : 0;

  return (
    <AppShell title={`Good Morning, ${session.name}`} subtitle={`Here's your performance overview for ${now.toLocaleString("default", { month: "long" })}.`} variant="employee">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="stat-card">
          <div className="text-xs sm:text-sm text-slate-500">Active Clients</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{activeClients}</div>
          <div className="text-xs text-slate-400 mt-1">+{newClients} this month</div>
        </div>

        <div className="stat-card">
          <div className="text-xs sm:text-sm text-slate-500">Follow-ups Today</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{followupsTodayCount.toString().padStart(2, "0")}</div>
          <div className="text-xs text-slate-400 mt-1">{followupsTodayCount} pending</div>
        </div>

        <div className="stat-card">
          <div className="text-xs sm:text-sm text-slate-500">Monthly Target</div>
          <div className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-slate-900">₹{targetAmount.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Achieved: ₹{achieved.toLocaleString()} ({achievedPct}%)</div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 lg:gap-6 lg:grid-cols-2">
        <div className="card p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">MONTHLY SALES TARGET</h3>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600">₹{achieved.toLocaleString()} / ₹{targetAmount.toLocaleString()}</div>
          <div className="mt-2 sm:mt-3 h-4 overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full rounded-full ${achievedPct >= 90 ? "bg-emerald-600" : achievedPct >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${achievedPct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
            <div>
              <div className="font-semibold">Target</div>
              <div>₹{targetAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-semibold">Achieved</div>
              <div>₹{achieved.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-semibold">Remaining</div>
              <div>₹{Math.max(0, targetAmount - achieved).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-semibold">Achievement</div>
              <div>{achievedPct}%</div>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">MY CLIENTS</h3>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-700">Active: {activeClients} • New this month: {newClients} • Conversion: {conversionRate}%</div>
          <div className="mt-4 text-xs sm:text-sm text-slate-600">Quick Actions:</div>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <a href="/employee/clients" className="btn text-xs sm:text-sm">View Clients</a>
            <a href="/employee/follow-ups/new" className="btn btn-primary text-xs sm:text-sm">Add Follow-up</a>
            <a href="/employee/sales" className="btn text-xs sm:text-sm">View Sales</a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
