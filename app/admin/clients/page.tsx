"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { clientRows } from "@/lib/demo-data";

const filters = [
  { key: "id", label: "Search Client ID" },
  { key: "phone", label: "Mobile" },
  { key: "owner", label: "Employee" },
  { key: "status", label: "Status" },
  { key: "broker", label: "Broker" },
];

type FilterKey = "id" | "phone" | "owner" | "status" | "broker";

export default function ClientsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("id");
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!query.trim()) return clientRows;
    return clientRows.filter((row) => {
      const value = String(row[activeFilter] ?? "").toLowerCase();
      return value.includes(query.trim().toLowerCase());
    });
  }, [activeFilter, query]);

  return (
    <AppShell title="Clients / Users" subtitle="Client directory">
      <div className="card p-5">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key as FilterKey)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold ${activeFilter === filter.key ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
              {filter.label}
            </button>
          ))}
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search by ${filters.find((filter) => filter.key === activeFilter)?.label ?? "Client"}`}
            className="ml-auto min-w-[240px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        <div className="table-shell">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Client ID</th>
                <th className="pb-3 pr-4 font-medium">Client Name</th>
                <th className="pb-3 pr-4 font-medium">Client Owner</th>
                <th className="pb-3 pr-4 font-medium">Broker</th>
                <th className="pb-3 pr-4 font-medium">API Status</th>
                <th className="pb-3 pr-4 font-medium">TOTP Status</th>
                <th className="pb-3 pr-4 font-medium">Account Status</th>
                <th className="pb-3 font-medium">Next Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-3 pr-4 font-semibold text-slate-800">{row.id}</td>
                    <td className="py-3 pr-4 text-slate-800">{row.name}</td>
                    <td className="py-3 pr-4 text-slate-700">{row.owner}</td>
                    <td className="py-3 pr-4 text-slate-700">{row.broker}</td>
                    <td className="py-3 pr-4"><span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">{row.api}</span></td>
                    <td className="py-3 pr-4"><span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">{row.totp}</span></td>
                    <td className="py-3 pr-4"><span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700">{row.status}</span></td>
                    <td className="py-3 text-slate-600">17 Aug 2026</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm text-slate-500">
                    No clients match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
