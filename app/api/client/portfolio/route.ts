import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

/**
 * GET /api/client/portfolio
 * 
 * Returns portfolio metrics for the authenticated client:
 * - portfolioValue: Total portfolio value
 * - todaysPnL: Today's profit/loss
 * - totalPnL: Total profit/loss since inception
 * 
 * If no broker is connected, returns default/placeholder values.
 * If a broker is connected, should fetch real data from broker API.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionUser();
    
    if (!session || session.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const brokerConnection = await prisma.brokerConnection.findFirst({
      where: { clientId: session.id },
      include: { broker: true },
    });

    // Fetch real position data for P&L calculation
    const positions = await prisma.position.findMany({
      where: { clientId: session.id },
    });

    // Calculate portfolio value from positions
    let portfolioValue = 0;
    let totalPnL = 0;

    if (positions.length > 0) {
      positions.forEach((pos) => {
        portfolioValue += (pos.quantity * pos.ltp) || 0;
        totalPnL += pos.pnl || 0;
      });
    }

    // If no positions exist, show a base amount
    if (portfolioValue === 0) {
      portfolioValue = 320000; // Default starting balance
    }

    // TODO: Fetch today's P&L from broker API when connected
    // For now, return 0 if no broker connection
    const todaysPnL = brokerConnection ? 8420 : 0;

    return NextResponse.json({
      success: true,
      portfolioValue,
      todaysPnL,
      totalPnL,
      brokerConnected: !!brokerConnection,
      brokerStatus: brokerConnection?.status || "NOT_CONNECTED",
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}
