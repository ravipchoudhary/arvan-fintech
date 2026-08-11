import { NextResponse } from "next/server";
import { createFollowup, readFollowups } from "@/lib/followups";
import { parseSessionFromRequest, isAdmin, isManager, isEmployee, isClient } from "@/lib/auth";

export async function GET(request: Request) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const list = await readFollowups();

  if (isAdmin(session) || isManager(session)) {
    return NextResponse.json({ success: true, data: list });
  }

  if (isEmployee(session)) {
    const mine = list.filter((f: any) => f.employeeId === session.id);
    return NextResponse.json({ success: true, data: mine });
  }

  if (isClient(session)) {
    const mine = list.filter((f: any) => f.clientId === session.id);
    return NextResponse.json({ success: true, data: mine });
  }

  return NextResponse.json({ success: true, data: [] });
}

export async function POST(request: Request) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const data = await request.json();

  // Only employees or admins can create follow-ups. Employees create for themselves.
  if (!isEmployee(session) && !isAdmin(session)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const entry: any = {
    type: data.type || "CALL",
    notes: data.notes || "",
    status: data.status || "PENDING",
    scheduledAt: data.scheduledAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isEmployee(session)) {
    entry.employeeId = session.id;
    entry.clientId = data.clientId || null;
    entry.clientName = data.clientName || null;
  } else if (isAdmin(session)) {
    entry.employeeId = data.employeeId || session.id;
    entry.clientId = data.clientId || null;
    entry.clientName = data.clientName || null;
  }

  const created = await createFollowup(entry);
  return NextResponse.json({ success: true, data: created });
}
