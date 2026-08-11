import { AppShell } from "@/components/app-shell";
import { getSessionUser } from "@/lib/session";

export default async function ReportsPage() {
  const session = await getSessionUser();
  if (!session) return null;

  return (
    <AppShell title="Reports" subtitle="Your reports and analytics" variant="employee">
      <div className="text-sm text-slate-600">Reports will be available here. Filters: 7D, 30D, 3M, 6M, 1Y.</div>
    </AppShell>
  );
}
 
