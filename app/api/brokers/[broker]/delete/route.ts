import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteContext = { params: Promise<{ broker: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { broker: slug } = await context.params;

  if (!slug) return NextResponse.json({ success: false, message: "Broker slug is required" }, { status: 400 });

  try {
    const br = await prisma.broker.findUnique({ where: { slug } });
    if (!br) return NextResponse.json({ success: false, message: "Broker not found" }, { status: 404 });
    await prisma.broker.delete({ where: { slug } });
    return NextResponse.redirect(new URL(`/brokers`, request.url));
  } catch (error) {
    console.error("Broker delete error:", error);
    return NextResponse.json({ success: false, message: "Unable to delete broker." }, { status: 500 });
  }
}
