import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientLiveAlgoPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  const strategies = await prisma.strategy.findMany({
    where: { clientId: session.id },
    orderBy: { updatedAt: "desc" },
    take: 12,
  });

  return (
    <AppShell title="Live Algo" subtitle="Your active strategy monitoring" variant="client">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Total" value={String(strategies.length)} />
        <Metric label="Running" value={String(strategies.filter((strategy) => strategy.status === "RUNNING").length)} />
        <Metric label="Paused" value={String(strategies.filter((strategy) => strategy.status === "PAUSED").length)} />
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
        <div className="mb-4 text-lg font-semibold text-slate-900">Live strategy status</div>
        <div className="grid gap-3 md:grid-cols-2">
          {strategies.length === 0 ? (
            <div className="md:col-span-2 text-slate-500">No live strategy data is available.</div>
          ) : (
            strategies.map((strategy) => (
              <div key={strategy.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-slate-900">{strategy.name}</div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${strategy.status === "RUNNING" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {strategy.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-600">{strategy.type}</div>
                <div className="mt-2 text-sm text-slate-600">Quantity: {strategy.quantity}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
