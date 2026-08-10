import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteContext = { params: Promise<{ broker: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { broker: slug } = await context.params;
  const form = await request.formData();
  const mode = String(form.get("mode") || "live");
  const webhook = String(form.get("webhook") || "");

  if (!slug) return NextResponse.json({ success: false, message: "Broker slug is required" }, { status: 400 });

  try {
    const br = await prisma.broker.findUnique({ where: { slug } });
    if (!br) return NextResponse.json({ success: false, message: "Broker not found" }, { status: 404 });

    await prisma.broker.update({
      where: { slug },
      data: {
        config: { mode, webhook },
        updatedAt: new Date(),
      },
    });

    return NextResponse.redirect(new URL(`/brokers`, request.url));
  } catch (error) {
    console.error("Broker configure error:", error);
    return NextResponse.json({ success: false, message: "Unable to update broker configuration." }, { status: 500 });
  }
}
