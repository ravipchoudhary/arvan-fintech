import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const brokerId = String(formData.get("brokerId") || "").trim();

  if (!brokerId) {
    return NextResponse.json({ success: false, message: "Select a broker to connect." }, { status: 400 });
  }

  try {
    const broker = await prisma.broker.findUnique({ where: { id: brokerId } });
    if (!broker) {
      return NextResponse.json({ success: false, message: "Broker not found." }, { status: 404 });
    }

    const existing = await prisma.brokerConnection.findFirst({
      where: { clientId: session.id },
    });

    const connection = existing
      ? await prisma.brokerConnection.update({
          where: { id: existing.id },
          data: {
            brokerId,
            accountId: `ARVAN-${session.id.slice(0, 6).toUpperCase()}`,
            status: "CONNECTED",
            apiStatus: "CONNECTED",
            lastSync: new Date(),
            updatedAt: new Date(),
          },
        })
      : await prisma.brokerConnection.create({
          data: {
            clientId: session.id,
            brokerId,
            accountId: `ARVAN-${session.id.slice(0, 6).toUpperCase()}`,
            status: "CONNECTED",
            apiStatus: "CONNECTED",
            lastSync: new Date(),
          },
        });

    await prisma.broker.update({
      where: { id: broker.id },
      data: {
        connected: true,
        connectedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.redirect(new URL("/client/broker", request.url));
  } catch (error) {
    console.error("Broker connect error:", error);
    return NextResponse.json({ success: false, message: "Unable to connect broker." }, { status: 500 });
  }
}
