import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = String(formData.get("id") || "");

  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

  try {
    await prisma.strategy.update({ where: { id }, data: { status: "RUNNING" } });
    return NextResponse.redirect(new URL(`/strategies/${id}`, request.url));
  } catch (error) {
    console.error("Deploy error:", error);
    return NextResponse.json({ success: false, message: "Failed to deploy" }, { status: 500 });
  }
}
