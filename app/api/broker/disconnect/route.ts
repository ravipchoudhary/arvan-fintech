import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const connection = await prisma.brokerConnection.findFirst({
      where: { clientId: session.id },
      include: { broker: true },
    });

    if (!connection) {
      return NextResponse.redirect(new URL("/client/broker", request.url));
    }

    await prisma.brokerConnection.update({
      where: { id: connection.id },
      data: {
        status: "DISCONNECTED",
        apiStatus: "DISCONNECTED",
        lastSync: new Date(),
        updatedAt: new Date(),
      },
    });

    await prisma.broker.update({
      where: { id: connection.brokerId },
      data: { connected: false, updatedAt: new Date() },
    });

    return NextResponse.redirect(new URL("/client/broker", request.url));
  } catch (error) {
    console.error("Broker disconnect error:", error);
    return NextResponse.json({ success: false, message: "Unable to disconnect broker." }, { status: 500 });
  }
}
