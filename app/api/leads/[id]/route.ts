import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

// GET: Fetch a single lead
export async function GET(
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
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        notes: {
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
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
      lead.assignedToId !== null &&
      lead.assignedToId !== sessionUser.id
    ) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, lead }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

// PATCH: Update a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.role === "CLIENT") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    // Authorization check
    if (
      sessionUser.role === "EMPLOYEE" &&
      lead.assignedToId !== null &&
      lead.assignedToId !== sessionUser.id
    ) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Only allow certain fields to be updated
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name.trim() }),
        ...(body.mobile && { mobile: body.mobile.replace(/\D/g, "") }),
        ...(body.email && { email: body.email.trim().toLowerCase() }),
        ...(body.companyName && { companyName: body.companyName.trim() }),
        ...(body.city && { city: body.city.trim() }),
        ...(body.message && { message: body.message.trim() }),
        ...(body.status && { status: body.status }),
        ...(body.assignedToId && sessionUser.role !== "EMPLOYEE" && {
          assignedToId: body.assignedToId,
        }),
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        notes: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a lead (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    await prisma.lead.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
