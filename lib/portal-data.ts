import { prisma } from "@/lib/db";

export async function getClientDashboardData(clientId: string) {
  const [brokerConnection, strategies, positions, orders, risk, notifications] = await Promise.all([
    prisma.brokerConnection.findFirst({
      where: { clientId },
      include: { broker: true },
    }),
    prisma.strategy.findMany({
      where: { clientId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.position.findMany({
      where: { clientId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.order.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.riskSetting.findFirst({ where: { clientId } }),
    prisma.notification.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const connected = brokerConnection?.status === "CONNECTED";
  const totalPortfolioValue = connected ? positions.reduce((sum, position) => sum + position.quantity * position.ltp, 0) : 0;
  const deployedCapital = positions.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0);
  const availableCapital = Math.max(0, (risk?.maxExposure ?? deployedCapital) - deployedCapital);
  const todaysStart = new Date();
  todaysStart.setHours(0, 0, 0, 0);
  const todaysPnl = orders
    .filter((order) => order.createdAt >= todaysStart)
    .reduce((sum, order) => sum + (Number(order.pnl) || 0), 0) + positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0);
  const overallPnl = orders.reduce((sum, order) => sum + (Number(order.pnl) || 0), 0) + positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0);
  const runningStrategies = strategies.filter((strategy) => strategy.status === "RUNNING").length;
  const recentOrders = orders;

  return {
    brokerConnection,
    connected,
    strategies,
    positions,
    orders: recentOrders,
    notifications,
    risk,
    totalPortfolioValue,
    deployedCapital,
    availableCapital,
    todaysPnl,
    overallPnl,
    openPositions: positions.length,
    runningStrategies,
  };
}
