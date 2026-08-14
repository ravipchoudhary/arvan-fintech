import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session || session.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [brokerConnection, positions, riskSetting, orders] = await Promise.all([
      prisma.brokerConnection.findFirst({
        where: { clientId: session.id },
        include: { broker: true },
      }),
      prisma.position.findMany({ where: { clientId: session.id } }),
      prisma.riskSetting.findFirst({ where: { clientId: session.id } }),
      prisma.order.findMany({ where: { clientId: session.id } }),
    ]);

    const portfolioValue = positions.reduce((sum, position) => sum + position.quantity * position.ltp, 0);
    const deployedCapital = positions.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0);
    const availableCapital = Math.max(0, (riskSetting?.maxExposure ?? deployedCapital) - deployedCapital);
    const todaysPnl = positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0)
      + orders
          .filter((order) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return order.createdAt >= today;
          })
          .reduce((sum, order) => sum + (Number(order.pnl) || 0), 0);
    const totalPnl = positions.reduce((sum, position) => sum + (Number(position.pnl) || 0), 0)
      + orders.reduce((sum, order) => sum + (Number(order.pnl) || 0), 0);

    return NextResponse.json({
      success: true,
      portfolioValue: brokerConnection?.status === "CONNECTED" ? portfolioValue : 0,
      deployedCapital,
      availableCapital,
      todaysPnl: brokerConnection?.status === "CONNECTED" ? todaysPnl : 0,
      totalPnl: brokerConnection?.status === "CONNECTED" ? totalPnl : 0,
      brokerConnected: brokerConnection?.status === "CONNECTED",
      brokerStatus: brokerConnection?.status || "DISCONNECTED",
      brokerName: brokerConnection?.broker?.name || "Broker Not Connected",
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
