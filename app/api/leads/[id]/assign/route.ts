import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

// POST: Assign a lead to an employee
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || (sessionUser.role !== "ADMIN" && sessionUser.role !== "MANAGER")) {
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

    const body = await request.json();

    if (!body.assignedToId) {
      return NextResponse.json(
        { success: false, error: "assignedToId is required" },
        { status: 400 }
      );
    }

    // Verify the employee exists
    const employee = await prisma.user.findUnique({
      where: { id: body.assignedToId },
    });

    if (!employee || employee.role !== "EMPLOYEE") {
      return NextResponse.json(
        { success: false, error: "Invalid employee" },
        { status: 400 }
      );
    }

    // Update the lead assignment
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { assignedToId: body.assignedToId },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Error assigning lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to assign lead" },
      { status: 500 }
    );
  }
}
