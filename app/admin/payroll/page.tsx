import { AppShell } from "@/components/app-shell";

const payrollRows = [
  { employee: "Amit Kumar", salary: "₹22K", incentive: "₹4.2K", deduction: "₹0", net: "₹26.2K", status: "APPROVED" },
  { employee: "Priya Singh", salary: "₹32K", incentive: "₹8.5K", deduction: "₹1.2K", net: "₹39.3K", status: "PENDING" },
  { employee: "Rahul Sharma", salary: "₹48K", incentive: "₹12.4K", deduction: "₹0", net: "₹60.4K", status: "APPROVED" },
  { employee: "Neha Verma", salary: "₹36K", incentive: "₹5.8K", deduction: "₹1.0K", net: "₹40.8K", status: "REVIEW" },
];

export default function PayrollPage() {
  return (
    <AppShell title="Payroll" subtitle="Salary and incentives">
      <div className="card p-4 sm:p-5">
        <div className="table-shell">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Employee</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Salary</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Incentive</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Deduction</th>
                <th className="pb-2 sm:pb-3 pr-2 sm:pr-4 font-medium">Net Pay</th>
                <th className="pb-2 sm:pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollRows.map((row) => (
                <tr key={row.employee} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 font-semibold text-slate-800">{row.employee}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{row.salary}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{row.incentive}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-700">{row.deduction}</td>
                  <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-slate-800">{row.net}</td>
                  <td className="py-2 sm:py-3">
                    <span className={`rounded-full px-2 py-1 text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${row.status === "APPROVED" ? "bg-green-100 text-green-700" : row.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {row.status}
                    </span>
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
