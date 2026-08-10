import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

type Props = { params: { id: string | string[] } };

export default async function StrategyPage({ params }: Props) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) notFound();

  const strategy = await prisma.strategy.findUnique({ where: { id } });
  if (!strategy) notFound();

  return (
    <AppShell title={strategy.name} subtitle={`Strategy • ${strategy.type}`}>
      <div className="card p-5 max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{strategy.name}</h3>
            <div className="text-sm text-slate-500">Status: {strategy.status}</div>
          </div>
          <div className="flex gap-2">
            <Link href={`/strategies/${id}/edit`} className="rounded-full border px-3 py-1 text-sm font-semibold">Edit</Link>
            <Link href={`/strategies/${id}/duplicate`} className="rounded-full border px-3 py-1 text-sm font-semibold">Duplicate</Link>
            <Link href={`/strategies/${id}/deploy`} className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">Deploy</Link>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-700">
          <div className="mb-2">Type: {strategy.type}</div>
          <div className="mb-2">Performance: {strategy.performance}</div>
          <div className="mb-2">P&L: {strategy.pnl}</div>
          <div className="mb-2">Description: {strategy.description ?? "—"}</div>
        </div>
      </div>
    </AppShell>
  );
}
