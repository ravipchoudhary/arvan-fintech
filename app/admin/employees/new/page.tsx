import { AppShell } from "@/components/app-shell";
import { EmployeeForm } from "@/components/admin-forms";
import { createEmployeeAction } from "@/app/actions/admin";

export default function NewEmployeePage() {
  return (
    <AppShell title="Add Employee" subtitle="Create employee record">
      <div className="card p-5">
        <EmployeeForm action={createEmployeeAction} submitLabel="Create Employee" />
      </div>
    </AppShell>
  );
}
