import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = String(formData.get("id") || "");

  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

  try {
    const strategy = await prisma.strategy.findUnique({ where: { id } });
    if (!strategy) return NextResponse.json({ success: false, message: "Strategy not found" }, { status: 404 });

    const copy = await prisma.strategy.create({
      data: {
        name: `${strategy.name} (copy)`,
        type: strategy.type,
        status: "DRAFT",
        description: strategy.description,
        pnl: 0,
        performance: 0,
      },
    });

    return NextResponse.redirect(new URL(`/strategies/${copy.id}`, request.url));
  } catch (error) {
    console.error("Duplicate error:", error);
    return NextResponse.json({ success: false, message: "Failed to duplicate" }, { status: 500 });
  }
}
