import { AppShell } from "@/components/app-shell";
import { auditRows } from "@/lib/demo-data";

export default function AuditSecurityPage() {
  return (
    <AppShell title="Audit / Security" subtitle="Recent access and actions">
      <div className="card p-5">
        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">User</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
                <th className="pb-3 pr-4 font-medium">Entity</th>
                <th className="pb-3 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {auditRows.map((row) => (
                <tr key={`${row.user}-${row.action}`} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 pr-4 text-slate-800">{row.user}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.role}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.action}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.entity}</td>
                  <td className="py-3"><span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">{row.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
