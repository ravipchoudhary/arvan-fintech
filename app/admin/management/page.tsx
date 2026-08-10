import { AppShell } from "@/components/app-shell";

const hierarchy = [
  { role: "Admin", count: 3, lead: "Amit Kumar" },
  { role: "Manager", count: 5, lead: "Priya Singh" },
  { role: "Team Lead", count: 12, lead: "Rahul Sharma" },
  { role: "Executive", count: 32, lead: "Neha Verma" },
];

export default function ManagementPage() {
  return (
    <AppShell title="Management" subtitle="Organization structure">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {hierarchy.map((item) => (
          <div key={item.role} className="card p-5">
            <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.role}</div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{item.count}</div>
            <div className="mt-2 text-sm text-slate-600">Lead: {item.lead}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
