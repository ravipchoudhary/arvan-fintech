import { AppShell } from "@/components/app-shell";
import { EmployeeLeadsClient } from "./leads-client";

export default async function EmployeeLeadsPage() {
  return (
    <AppShell
      title="My Leads"
      subtitle="Track and manage leads assigned to you"
      variant="employee"
    >
      <EmployeeLeadsClient />
    </AppShell>
  );
}
