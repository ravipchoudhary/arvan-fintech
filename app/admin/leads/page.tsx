import { AppShell } from "@/components/app-shell";
import { AdminLeadsClient } from "./leads-client";

export default async function AdminLeadsPage() {
  return (
    <AppShell title="Leads" subtitle="Manage and track all leads from the pricing page" variant="admin">
      <AdminLeadsClient />
    </AppShell>
  );
}
