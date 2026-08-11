import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { listStrategies } from "@/app/actions/strategies";

export default async function StrategiesPage() {
  const rows = await listStrategies();

  return (
    <AppShell title="Strategies" subtitle="Strategy management">
      <div className="card p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Strategy Directory</h3>
          </div>
          <Link href="/strategies/builder" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Create Strategy</Link>
        </div>

        <div className="table-shell">
          {rows.length ? (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Strategy Name</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Today&apos;s P&L</th>
                  <th className="pb-3 pr-4 font-medium">Performance</th>
                  <th className="pb-3 pr-4 font-medium">Table</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${row.name}-${index}`} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-3 pr-4 font-semibold text-slate-800">{row.name}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${row.status === "RUNNING" ? "bg-green-100 text-green-700" : row.status === "PAUSED" ? "bg-yellow-100 text-yellow-700" : row.status === "DRAFT" ? "bg-slate-200 text-slate-700" : "bg-red-100 text-red-700"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{row.type}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">{row.pnl}</td>
                    <td className="py-3 pr-4 text-slate-600">{index % 2 === 0 ? "+11.4%" : "-3.8%"}</td>
                    <td className="py-3 pr-4 text-slate-600">{index === 0 ? "12 Aug 2026" : index === 1 ? "08 Aug 2026" : index === 2 ? "03 Aug 2026" : "18 Jul 2026"}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2 text-xs text-blue-700">
                        <Link href={`/strategies/${row.id}`} className="hover:underline">Open</Link>
                        <Link href={`/strategies/${row.id}/edit`} className="hover:underline">Edit</Link>
                        <Link href={`/strategies/${row.id}/duplicate`} className="hover:underline">Duplicate</Link>
                        <Link href={`/strategies/${row.id}/deploy`} className="hover:underline">Deploy</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              No strategies found. Create a strategy using the builder to get started.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
