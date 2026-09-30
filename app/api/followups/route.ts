import { NextResponse } from "next/server";
import { createFollowup, readFollowups } from "@/lib/followups";
import { parseSessionFromRequest, isAdmin, isManager, isEmployee, isClient } from "@/lib/auth";

type FollowupRecord = {
  id?: string;
  employeeId?: string | null;
  clientId?: string | null;
  clientName?: string | null;
  type?: string | null;
  notes?: string | null;
  status?: string | null;
  scheduledAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

export async function GET(request: Request) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const list = await readFollowups();

  if (isAdmin(session) || isManager(session)) {
    return NextResponse.json({ success: true, data: list });
  }

  if (isEmployee(session)) {
    const mine = list.filter((f: FollowupRecord) => f.employeeId === session.id);
    return NextResponse.json({ success: true, data: mine });
  }

  if (isClient(session)) {
    const mine = list.filter((f: FollowupRecord) => f.clientId === session.id);
    return NextResponse.json({ success: true, data: mine });
  }

  return NextResponse.json({ success: true, data: [] });
}

export async function POST(request: Request) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const data = (await request.json()) as Record<string, unknown>;

  // Only employees or admins can create follow-ups. Employees create for themselves.
  if (!isEmployee(session) && !isAdmin(session)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const entry: FollowupRecord = {
    type: typeof data.type === "string" ? data.type : "CALL",
    notes: typeof data.notes === "string" ? data.notes : "",
    status: typeof data.status === "string" ? data.status : "PENDING",
    scheduledAt: typeof data.scheduledAt === "string" ? data.scheduledAt : new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isEmployee(session)) {
    entry.employeeId = session.id ?? null;
    entry.clientId = typeof data.clientId === "string" ? data.clientId : null;
    entry.clientName = typeof data.clientName === "string" ? data.clientName : null;
  } else if (isAdmin(session)) {
    entry.employeeId = typeof data.employeeId === "string" ? data.employeeId : session.id ?? null;
    entry.clientId = typeof data.clientId === "string" ? data.clientId : null;
    entry.clientName = typeof data.clientName === "string" ? data.clientName : null;
  }

  const created = await createFollowup(entry);
  return NextResponse.json({ success: true, data: created });
}
