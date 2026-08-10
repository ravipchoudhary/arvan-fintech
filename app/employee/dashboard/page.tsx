import { AppShell } from "@/components/app-shell";

export default function EmployeeDashboardPage() {
  return (
    <AppShell title="Employee Dashboard" subtitle="My portfolio and tasks">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Assigned Clients", "12"],
          ["Open Tasks", "06"],
          ["Monthly Target", "₹3.5L"],
        ].map(([label, value]) => (
          <div key={label} className="stat-card">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-5">
        <h3 className="text-lg font-bold text-slate-900">My Follow Ups</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          {[
            "Karan Shah — broker configuration pending",
            "Sonia Patel — account review due today",
            "Rahul Mehta — strategy preference update",
          ].map((task) => (
            <div key={task} className="rounded-xl border border-slate-200 bg-slate-50 p-3">{task}</div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
