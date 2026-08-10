"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { strategySchema } from "@/lib/validators";

const fallbackStrategyRows = [
  { id: "strat-ema-rsi", name: "EMA + RSI", status: "RUNNING", type: "Momentum", pnl: "+₹3,420" },
  { id: "strat-orb-breakout", name: "ORB Breakout", status: "RUNNING", type: "Breakout", pnl: "+₹2,690" },
  { id: "strat-vwap-mean", name: "VWAP Mean Revert", status: "PAUSED", type: "Mean Reversion", pnl: "-₹1,120" },
  { id: "strat-supertrend", name: "Supertrend", status: "DRAFT", type: "Trend", pnl: "₹0" },
];

export async function listStrategies() {
  try {
    const strategies = await prisma.strategy.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    if (!strategies.length) {
      return fallbackStrategyRows;
    }

    return strategies.map((strategy) => ({
      id: strategy.id,
      name: strategy.name,
      status: strategy.status,
      type: strategy.type,
      pnl: `${strategy.pnl >= 0 ? "+" : ""}₹${Math.abs(strategy.pnl).toLocaleString("en-IN")}`,
    }));
  } catch {
    return fallbackStrategyRows;
  }
}

export async function createStrategyAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = strategySchema.safeParse({
    name: String(raw.name || ""),
    type: String(raw.type || "Momentum"),
    status: String(raw.status || "DRAFT"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid strategy data.");
  }

  try {
    await prisma.strategy.create({
      data: {
        name: parsed.data.name,
        type: parsed.data.type,
        status: parsed.data.status as "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED",
        description: "Created through the strategy builder",
        pnl: 0,
        performance: 0,
      },
    });

    redirect("/strategies");
  } catch {
    throw new Error("Strategy storage is not available right now. The app is running in demo mode.");
  }
}
