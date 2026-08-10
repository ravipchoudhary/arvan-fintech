import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const list = await prisma.broker.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch (error) {
    console.error("Broker list error:", error);
    return NextResponse.json({ success: false, message: "Unable to load brokers." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "");
  const credentials = String(form.get("credentials") || "");

  if (!name) return NextResponse.json({ success: false, message: "Missing name" }, { status: 400 });

  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  try {
    const exists = await prisma.broker.findUnique({ where: { slug } });
    if (exists) return NextResponse.json({ success: false, message: "Broker already exists" }, { status: 409 });

    await prisma.broker.create({
      data: {
        name,
        slug,
        credentials: { raw: credentials },
        connected: false,
        config: { mode: "live", webhook: "" },
      },
    });

    return NextResponse.redirect(new URL(`/brokers`, request.url));
  } catch (error) {
    console.error("Broker create error:", error);
    return NextResponse.json({ success: false, message: "Unable to create broker." }, { status: 500 });
  }
}
