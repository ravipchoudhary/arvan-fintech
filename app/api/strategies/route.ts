import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { strategySchema } from "@/lib/validators";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = strategySchema.safeParse({
    name: String(formData.get("name") || ""),
    type: String(formData.get("type") || "Momentum"),
    status: String(formData.get("status") || "DRAFT"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid strategy data." },
      { status: 400 }
    );
  }

  try {
    await prisma.strategy.create({
      data: {
        name: parsed.data.name,
        type: parsed.data.type,
        status: parsed.data.status as "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED",
        description: "Created through the strategy builder",
        pnl: 0,
        performance: 0,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("API create strategy error:", error);
    return NextResponse.json(
      { success: false, message: "Strategy storage is not available right now. Please try again." },
      { status: 500 }
    );
  }
}
