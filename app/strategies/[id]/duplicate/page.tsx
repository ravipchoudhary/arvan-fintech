import { AppShell } from "@/components/app-shell";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = { params: Promise<{ id: string | string[] }> };

export default async function DuplicateStrategyPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;
  if (!id) notFound();

  const strategy = await prisma.strategy.findUnique({ where: { id } });
  if (!strategy) notFound();

  return (
    <AppShell title={`Duplicate ${strategy.name}`} subtitle="Create a copy of this strategy">
      <div className="card p-5 max-w-3xl">
        <form action={`/api/strategies/${id}/duplicate`} method="post">
          <input type="hidden" name="id" value={id} />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Create Duplicate</button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
