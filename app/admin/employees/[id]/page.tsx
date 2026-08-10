import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { EmployeeForm } from "@/components/admin-forms";
import { prisma } from "@/lib/db";
import { updateEmployeeAction } from "@/app/actions/admin";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditEmployeePage({ params }: Props) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    notFound();
  }

  const employee = await prisma.user.findUnique({
    where: { id },
  });

  if (!employee) {
    notFound();
  }

  return (
    <AppShell title="Edit Employee" subtitle="Modify employee profile">
      <div className="card p-5">
        <EmployeeForm
          action={updateEmployeeAction}
          submitLabel="Update Employee"
          defaultValues={{
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            role: employee.role,
            status: employee.status,
          }}
        />
      </div>
    </AppShell>
  );
}
