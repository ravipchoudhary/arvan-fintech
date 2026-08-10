import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

type Props = { params: { id: string | string[] } };

export default async function EditStrategyPage({ params }: Props) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) notFound();

  const strategy = await prisma.strategy.findUnique({ where: { id } });
  if (!strategy) notFound();

  return (
    <AppShell title={`Edit ${strategy.name}`} subtitle="Modify strategy settings">
      <div className="card p-5 max-w-3xl">
        <form action={`/api/strategies/${id}/edit`} method="post" className="space-y-4">
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Strategy Name</div>
            <input name="name" defaultValue={strategy.name} className="w-full bg-transparent outline-none" required />
          </label>

          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Type</div>
            <input name="type" defaultValue={strategy.type} className="w-full bg-transparent outline-none" required />
          </label>

          <label className="block">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Status</div>
            <select name="status" defaultValue={strategy.status} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <option value="DRAFT">DRAFT</option>
              <option value="RUNNING">RUNNING</option>
              <option value="PAUSED">PAUSED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </label>

          <input type="hidden" name="id" value={id} />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Save</button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
