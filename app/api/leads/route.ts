import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

// Generate unique Lead ID
async function generateLeadId(): Promise<string> {
  const lastLead = await prisma.lead.findFirst({
    orderBy: { createdAt: "desc" },
    select: { leadId: true },
  });

  let nextNumber = 1;
  if (lastLead && lastLead.leadId) {
    const match = lastLead.leadId.match(/LEAD-(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  return `LEAD-${String(nextNumber).padStart(6, "0")}`;
}

// Validation helper
function validateLeadData(data: any) {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name is required and must be at least 2 characters";
  }

  if (!data.mobile || !/^[0-9]{10}$/.test(data.mobile.replace(/\D/g, ""))) {
    errors.mobile = "Valid 10-digit mobile number is required";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  if (!data.selectedPlan) {
    errors.selectedPlan = "Selected plan is required";
  }

  return errors;
}

// POST: Create a new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const errors = validateLeadData(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Generate unique Lead ID
    const leadId = await generateLeadId();

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        leadId,
        name: body.name.trim(),
        mobile: body.mobile.replace(/\D/g, ""),
        email: body.email.trim().toLowerCase(),
        companyName: body.companyName?.trim() || null,
        city: body.city?.trim() || null,
        message: body.message?.trim() || null,
        selectedPlan: body.selectedPlan,
        planPrice: body.planPrice || 0,
        status: "NEW",
        source: body.source || "PRICING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        lead,
        message: "Thank you for your interest in ARVAN FINTECH. Your enquiry has been received successfully. Our team will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// GET: List leads (admin/manager/employee)
export async function GET(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {};

    // Role-based filtering
    if (sessionUser.role === "EMPLOYEE") {
      where.OR = [
        { assignedToId: sessionUser.id },
        { assignedToId: null },
      ];
    } else if (sessionUser.role === "MANAGER") {
      // Managers can view all leads, including unassigned ones.
    } else if (sessionUser.role !== "ADMIN") {
      // Only admin/manager/employee can access leads
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
        { leadId: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch leads
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          notes: { select: { id: true, note: true, createdAt: true } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
