import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

// POST: Add a note to a lead
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    // Authorization check
    if (
      sessionUser.role === "EMPLOYEE" &&
      lead.assignedToId !== sessionUser.id
    ) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();

    if (!body.note || body.note.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Note cannot be empty" },
        { status: 400 }
      );
    }

    const leadNote = await prisma.leadNote.create({
      data: {
        leadId: id,
        userId: sessionUser.id,
        note: body.note.trim(),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, note: leadNote }, { status: 201 });
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add note" },
      { status: 500 }
    );
  }
}
