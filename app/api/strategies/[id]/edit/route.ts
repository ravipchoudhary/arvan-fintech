import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type StrategyStatus = "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const type = String(formData.get("type") || "");
  const status = (String(formData.get("status") || "DRAFT") as StrategyStatus);

  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

  try {
    await prisma.strategy.update({ where: { id }, data: { name, type, status } });
    return NextResponse.redirect(new URL(`/strategies`, request.url));
  } catch (error) {
    console.error("Update strategy error:", error);
    return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
  }
}
