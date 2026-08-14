"use client";

import { useMemo, useState } from "react";

type StrategyRow = {
  id: string;
  name: string;
  type: string;
  description: string;
  status: "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED";
  quantity: number;
  limit: number;
  pnl: number;
  performance: number;
};

const strategyOptions: Record<string, string[]> = {
  BANKEX: ["AXBANKEX"],
  CRUDEOIL: ["AXCRD", "CRUDEFIREOUT", "CRX100", "NEXTSUREcrude"],
  FINNIFTY: ["FINNIFTY"],
  GOLD: ["AXGOLD"],
  INFY: ["AXpaisa"],
  NATURALGAS: ["AXNATURALGAS"],
  "NIFTY 50": ["AAX10", "ADXline", "DniftyRSI", "INDEXEMAPOINT", "MXchain", "NIFTYLONGSTRADDLE", "Nextsurenifty", "Ntrendlinebreakout", "SWING AX"],
  "NIFTY BANK": ["Axmono"],
  SENSEX: ["AXSENSEX", "FX-sensex", "SENSEXPOWER"],
  TVSMOTOR: ["No bot active", "AXpaisa"],
};

export function ClientStrategiesTable({
  initialStrategies,
  brokerStatus,
  brokerName,
}: {
  initialStrategies: StrategyRow[];
  brokerStatus: "CONNECTED" | "DISCONNECTED" | string;
  brokerName?: string;
}) {
  const [rows, setRows] = useState(initialStrategies);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [infoRowId, setInfoRowId] = useState<string | null>(null);

  const brokerConnected = brokerStatus === "CONNECTED";

  const typeStyles: Record<string, string> = useMemo(
    () => ({
      INDEX: "border border-sky-200 bg-sky-50 text-sky-700",
      STOCK: "border border-violet-200 bg-violet-50 text-violet-700",
      COMMODITY: "border border-pink-200 bg-pink-50 text-pink-700",
      DEFAULT: "border border-slate-200 bg-slate-100 text-slate-700",
    }),
    [],
  );

  const updateRow = (id: string, patch: Partial<StrategyRow>) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const handleStrategyChange = (id: string, value: string) => {
    updateRow(id, { name: value });
    setMessage(null);
  };

  const handleQuantityChange = (id: string, value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric < 0) {
      setMessage({ type: "error", text: "Quantity must be a valid non-negative number." });
      return;
    }
    updateRow(id, { quantity: Math.max(0, Math.floor(numeric)) });
    setMessage(null);
  };

  const handleSave = async (row: StrategyRow) => {
    setSavingId(row.id);
    setMessage(null);

    try {
      const response = await fetch(`/api/strategies/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: row.name,
          quantity: row.quantity,
          status: row.status,
          type: row.type,
          description: row.description,
          limit: row.limit,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save strategy settings.");
      }

      setMessage({ type: "success", text: "Strategy settings updated successfully." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to save strategy settings.",
      });
    } finally {
      setSavingId(null);
    }
  };

  const tableOptions = rows.length ? rows : [];

  return (
    <div className="space-y-4">
      {message ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tableOptions.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No strategies available.
          </div>
        ) : (
          tableOptions.map((row) => {
            const options = strategyOptions[row.name] || [row.name];
            const isOn = row.status === "RUNNING";
            const style = typeStyles[row.type.toUpperCase()] ?? typeStyles.DEFAULT;

            return (
              <div
                key={row.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-100 to-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{row.name}</h3>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${style}`}>
                      {row.type.toUpperCase()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateRow(row.id, { status: isOn ? "PAUSED" : "RUNNING" })}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition ${isOn ? "border-emerald-400 bg-emerald-500" : "border-slate-300 bg-slate-200"}`}
                    aria-label={`Toggle strategy status ${row.status}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition ${isOn ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </div>

                <div className="mb-4 space-y-3 flex-grow">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Strategy</label>
                    <select
                      value={row.name}
                      onChange={(event) => handleStrategyChange(row.id, event.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400"
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Quantity</label>
                      <input
                        type="number"
                        min={0}
                        value={row.quantity}
                        onChange={(event) => handleQuantityChange(row.id, event.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Limit</label>
                      <input
                        type="number"
                        min={0}
                        value={row.limit}
                        onChange={(event) => updateRow(row.id, { limit: Number(event.target.value) || 0 })}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setInfoRowId((current) => (current === row.id ? null : row.id))}
                    className="flex-1 rounded-full border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    Info
                  </button>
                  <button
                    type="button"
                    disabled={savingId === row.id}
                    onClick={() => handleSave(row)}
                    className="flex-1 rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                  >
                    {savingId === row.id ? "Saving..." : "Save"}
                  </button>
                </div>

                {infoRowId === row.id ? (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900">{row.name}</div>
                    <div className="mt-2 text-slate-600">{row.description}</div>
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
