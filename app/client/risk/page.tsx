import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientRiskPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const [riskSetting, positions, brokerConnectionCount] = await Promise.all([
    prisma.riskSetting.findFirst({ where: { clientId: session.id } }),
    prisma.position.count({ where: { clientId: session.id } }),
    prisma.brokerConnection.count({ where: { clientId: session.id } }),
  ]);

  return (
    <AppShell title="Risk Management" subtitle="Your risk and exposure profile" variant="client">
      <div className="grid gap-4 sm:grid-cols-3">
        <RiskCard label="Daily loss" value={`₹${riskSetting?.dailyLossLimit.toLocaleString() ?? "0"}`} />
        <RiskCard label="Usage" value={`${riskSetting?.usagePercent ?? 0}%`} />
        <RiskCard label="Open positions" value={positions.toString()} />
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
        <div className="text-sm text-slate-500">Risk status</div>
        <div className="mt-3 flex items-center justify-between gap-4 text-slate-900">
          <div>
            <div className="text-xl font-semibold">{riskSetting?.status ?? "SAFE"}</div>
            <div className="text-sm text-slate-500">Connected brokers: {brokerConnectionCount}</div>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{riskSetting?.status ?? "SAFE"}</div>
        </div>
      </div>
    </AppShell>
  );
}

function RiskCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
