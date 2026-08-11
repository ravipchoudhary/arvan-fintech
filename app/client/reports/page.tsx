import { AppShell } from "@/components/app-shell";
import { SalesBarChart, TrendLineChart } from "@/components/charts";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

const recentPerformance = [
  { name: "Mon", value: 1.2 },
  { name: "Tue", value: 1.8 },
  { name: "Wed", value: 2.4 },
  { name: "Thu", value: 2.1 },
  { name: "Fri", value: 2.7 },
  { name: "Sat", value: 3.2 },
  { name: "Sun", value: 3.8 },
];

export default async function ClientReportsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const [strategyCount, orderCount, positionCount, notificationCount] = await Promise.all([
    prisma.strategy.count({ where: { clientId: session.id } }),
    prisma.order.count({ where: { clientId: session.id } }),
    prisma.position.count({ where: { clientId: session.id } }),
    prisma.notification.count({ where: { clientId: session.id } }),
  ]);

  const performanceData = [
    { label: "Jan", value: 12 },
    { label: "Feb", value: 18 },
    { label: "Mar", value: 21 },
    { label: "Apr", value: 26 },
    { label: "May", value: 32 },
    { label: "Jun", value: 38 },
  ];

  return (
    <AppShell title="Reports" subtitle="Client performance analytics" variant="client">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Strategies" value={strategyCount.toString()} />
        <Metric label="Orders" value={orderCount.toString()} />
        <Metric label="Positions" value={positionCount.toString()} />
        <Metric label="Alerts" value={notificationCount.toString()} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-slate-900">Equity trend</h3>
          <TrendLineChart data={performanceData} />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-slate-900">Monthly return</h3>
          <SalesBarChart data={recentPerformance.map((item) => ({ name: item.name, sales: item.value * 10 }))} />
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="text-sm uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
