"use client";

import { FormEvent, useState } from "react";

const blockLibrary = [
  "Indicators",
  "Conditions",
  "Price Action",
  "Math",
  "Time",
  "Volume",
  "Custom",
];

const entryBlocks = [
  "EMA 20",
  "Crosses Above",
  "EMA 50",
  "AND",
  "RSI 14",
  "Greater Than",
  "55",
];

export function StrategyBuilderForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/strategies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.message || "Failed to save strategy.";
        throw new Error(message);
      }

      window.location.href = "/strategies";
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <div className="card p-4">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Block Library</h3>
        <div className="space-y-2">
          {blockLibrary.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Rule Builder</h3>
            <div className="flex gap-2">
              <button type="button" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Validate</button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Strategy Name</span>
                <input
                  type="text"
                  name="name"
                  defaultValue="Momentum Pulse"
                  placeholder="Enter strategy name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>
              <label className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Type</span>
                <input
                  type="text"
                  name="type"
                  defaultValue="Momentum"
                  placeholder="Enter strategy type"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>
            </div>

            <input type="hidden" name="status" value="DRAFT" />

            <div className="space-y-4">
              <RuleSection title="ENTRY" blocks={entryBlocks} />
              <RuleSection title="ACTION" blocks={["BUY", "1 Lot"]} />
              <RuleSection title="EXIT" blocks={["Stop Loss — 1%", "Take Profit — 2%", "Trailing SL — 0.5%", "Time Exit — 15:10"]} />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {status === "submitting" ? "Saving strategy…" : "Save Strategy"}
              </button>
              {status === "submitting" ? (
                <p className="text-sm text-slate-500">Saving your strategy and navigating to the strategy list.</p>
              ) : status === "error" ? (
                <p className="text-sm text-red-600">{errorMessage || "Unable to save strategy. Please try again."}</p>
              ) : (
                <p className="text-sm text-slate-500">Save a new strategy to start tracking performance across your real broker connections.</p>
              )}
            </div>
          </form>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Risk Management</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Max Trades / Day",
              "Daily Loss Limit",
              "Max Positions",
              "Max Exposure",
              "Position Sizing",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">{item}</div>
                <div className="mt-2 text-lg font-bold text-slate-900">{item.includes("Limit") ? "₹1.5L" : item.includes("Exposure") ? "₹25L" : item.includes("Trades") ? "12" : item.includes("Positions") ? "05" : "25%"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleSection({ title, blocks }: { title: string; blocks: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</div>
      <div className="flex flex-wrap gap-2">
        {blocks.map((block) => (
          <span key={block} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">{block}</span>
        ))}
      </div>
    </div>
  );
}
