import { AppShell } from "@/components/app-shell";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = { params: { id: string | string[] } };

export default async function DeployStrategyPage({ params }: Props) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) notFound();

  const strategy = await prisma.strategy.findUnique({ where: { id } });
  if (!strategy) notFound();

  return (
    <AppShell title={`Deploy ${strategy.name}`} subtitle="Deploy strategy to live environment">
      <div className="card p-5 max-w-3xl">
        <form action={`/api/strategies/${id}/deploy`} method="post">
          <input type="hidden" name="id" value={id} />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Deploy Now</button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
