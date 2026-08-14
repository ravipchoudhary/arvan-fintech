import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ClientStrategiesTable } from "@/components/client-strategies-page";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientStrategiesPage() {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    redirect("/login");
  }

  const [strategies, brokerConnection] = await Promise.all([
    prisma.strategy.findMany({
      where: { clientId: session.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.brokerConnection.findFirst({
      where: { clientId: session.id },
      include: { broker: true },
    }),
  ]);

  const fallbackStrategies: Array<{
    id: string;
    name: string;
    type: string;
    description: string;
    status: "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED";
    quantity: number;
    limit: number;
    pnl: number;
    performance: number;
  }> = [
    { id: "bankex", name: "BANKEX", type: "INDEX", description: "Banking sector momentum strategy.", status: "RUNNING", quantity: 10, limit: 400, pnl: 0, performance: 0 },
    { id: "crudeoil", name: "CRUDEOIL", type: "COMMODITY", description: "Crude oil breakout tracking strategy.", status: "RUNNING", quantity: 1, limit: 500, pnl: 0, performance: 0 },
    { id: "finifty", name: "FINIFTY", type: "INDEX", description: "Nifty financials trend strategy.", status: "RUNNING", quantity: 1, limit: 500, pnl: 0, performance: 0 },
    { id: "gold", name: "GOLD", type: "COMMODITY", description: "Gold volatility and breakout strategy.", status: "RUNNING", quantity: 1, limit: 200, pnl: 0, performance: 0 },
    { id: "infy", name: "INFY", type: "STOCK", description: "IT stock momentum allocation.", status: "RUNNING", quantity: 400, limit: 800, pnl: 0, performance: 0 },
    { id: "naturalgas", name: "NATURALGAS", type: "COMMODITY", description: "Natural gas mean reversion strategy.", status: "RUNNING", quantity: 1, limit: 2500, pnl: 0, performance: 0 },
    { id: "nifty50", name: "NIFTY 50", type: "INDEX", description: "Large-cap index tracking strategy.", status: "RUNNING", quantity: 65, limit: 1000, pnl: 0, performance: 0 },
    { id: "niftybank", name: "NIFTY BANK", type: "INDEX", description: "Banking index trend system.", status: "RUNNING", quantity: 30, limit: 1000, pnl: 0, performance: 0 },
    { id: "sensex", name: "SENSEX", type: "INDEX", description: "Sensex broad market trend strategy.", status: "RUNNING", quantity: 40, limit: 1000, pnl: 0, performance: 0 },
    { id: "tvsmotor", name: "TVSMOTOR", type: "STOCK", description: "Auto stock momentum and swing strategy.", status: "PAUSED", quantity: 0, limit: 700, pnl: 0, performance: 0 },
  ];

  const normalizedStrategies = (strategies.length ? strategies : fallbackStrategies).map((strategy) => ({
    id: strategy.id,
    name: strategy.name,
    type: strategy.type || "INDEX",
    description: strategy.description || "No description available.",
    status: strategy.status,
    quantity: strategy.quantity || 1,
    limit: strategy.limit || 500,
    pnl: strategy.pnl ?? 0,
    performance: strategy.performance ?? 0,
  }));

  return (
    <AppShell title="Assets & Strategies" subtitle="Manage your trading strategies across different assets" variant="client">
      <ClientStrategiesTable
        initialStrategies={normalizedStrategies}
        brokerStatus={brokerConnection?.status ?? "CONNECTED"}
        brokerName={brokerConnection?.broker?.name ?? "Connected Broker"}
      />
    </AppShell>
  );
}
