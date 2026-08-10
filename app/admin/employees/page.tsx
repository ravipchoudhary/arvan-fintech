import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";

export default async function EmployeesPage() {
  const employees = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell title="Employees" subtitle="Employee directory">
      <div className="card p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-bold text-slate-900">Employee Directory</div>
          <Link href="/admin/employees/new" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Add Employee</Link>
        </div>

        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Employee ID</th>
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Phone</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 pr-4 font-semibold text-slate-800">{employee.id}</td>
                  <td className="py-3 pr-4 text-slate-800">{employee.name}</td>
                  <td className="py-3 pr-4 text-slate-700">{employee.role}</td>
                  <td className="py-3 pr-4 text-slate-700">{employee.email}</td>
                  <td className="py-3 pr-4 text-slate-700">{employee.phone}</td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${employee.status === "ACTIVE" ? "bg-green-100 text-green-700" : employee.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-slate-200 text-slate-700"}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link href={`/admin/employees/${employee.id}`} className="text-blue-700 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
