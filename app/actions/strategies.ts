"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { strategySchema } from "@/lib/validators";

export async function listStrategies() {
  try {
    const strategies = await prisma.strategy.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return strategies.map((strategy) => ({
      id: strategy.id,
      name: strategy.name,
      status: strategy.status,
      type: strategy.type,
      pnl: `${strategy.pnl >= 0 ? "+" : ""}₹${Math.abs(strategy.pnl).toLocaleString("en-IN")}`,
    }));
  } catch (error) {
    console.error("List strategies error:", error);
    return [];
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
  } catch (error) {
    if (typeof error === "object" && error !== null) {
      const maybeRedirect = (error as { name?: string; message?: string; type?: string });
      if (
        maybeRedirect.name === "Redirect" ||
        maybeRedirect.message === "NEXT_REDIRECT" ||
        maybeRedirect.type === "redirect"
      ) {
        throw error;
      }
    }

    console.error("Create strategy error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Strategy storage is not available right now. Please try again."
    );
  }
}
