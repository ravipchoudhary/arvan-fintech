import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const strategy = await prisma.strategy.findFirst({
      where: {
        id,
        clientId: session.id,
      },
    });

    if (!strategy) {
      return NextResponse.json({ success: false, message: "Strategy not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, strategy });
  } catch (error) {
    console.error("Get strategy error:", error);
    return NextResponse.json({ success: false, message: "Unable to load strategy." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session || session.role !== "CLIENT") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const { name, quantity, limit, type, status, description } = body || {};

  const parsedQuantity = Number(quantity);
  const parsedLimit = Number(limit);

  if (!Number.isFinite(parsedQuantity) || parsedQuantity < 0) {
    return NextResponse.json({ success: false, message: "Quantity must be a valid non-negative number." }, { status: 400 });
  }

  if (limit !== undefined && (!Number.isFinite(parsedLimit) || parsedLimit < 0)) {
    return NextResponse.json({ success: false, message: "Limit must be a valid non-negative number." }, { status: 400 });
  }

  try {
    const strategy = await prisma.strategy.findFirst({
      where: {
        id,
        clientId: session.id,
      },
    });

    if (!strategy) {
      return NextResponse.json({ success: false, message: "Strategy not found or not accessible." }, { status: 404 });
    }

    const updated = await prisma.strategy.update({
      where: { id },
      data: {
        name: typeof name === "string" && name.trim() ? name.trim() : strategy.name,
        quantity: Number.isFinite(parsedQuantity) ? parsedQuantity : strategy.quantity,
        limit: Number.isFinite(parsedLimit) ? parsedLimit : strategy.limit,
        type: typeof type === "string" && type.trim() ? type.trim() : strategy.type,
        description: typeof description === "string" ? description : strategy.description,
        status: status === "RUNNING" || status === "PAUSED" || status === "DRAFT" || status === "COMPLETED" ? status : strategy.status,
      },
    });

    return NextResponse.json({ success: true, strategy: updated });
  } catch (error) {
    console.error("Update strategy error:", error);
    return NextResponse.json({ success: false, message: "Unable to update strategy." }, { status: 500 });
  }
}
