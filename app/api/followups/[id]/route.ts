import { NextResponse } from "next/server";
import { updateFollowup, deleteFollowup, readFollowups } from "@/lib/followups";
import { parseSessionFromRequest, isAdmin, isEmployee } from "@/lib/auth";

type FollowupRouteContext = {
  params?: Promise<{ id?: string }> | { id?: string };
};

export async function PUT(request: Request, context: FollowupRouteContext) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const resolvedParams = context.params ? await context.params : undefined;
  const id = resolvedParams?.id;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing follow-up id" }, { status: 400 });
  }

  const list = await readFollowups();
  const existing = list.find((f: { id?: string; employeeId?: string | null }) => f.id === id);
  if (!existing) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  // Allow admins or the owning employee to update
  if (!isAdmin(session) && !(isEmployee(session) && existing.employeeId === session.id)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const data = await request.json();
  const updated = await updateFollowup(id, data);
  if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(request: Request, context: FollowupRouteContext) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const resolvedParams = context.params ? await context.params : undefined;
  const id = resolvedParams?.id;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing follow-up id" }, { status: 400 });
  }

  const list = await readFollowups();
  const existing = list.find((f: { id?: string; employeeId?: string | null }) => f.id === id);
  if (!existing) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  if (!isAdmin(session) && !(isEmployee(session) && existing.employeeId === session.id)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  await deleteFollowup(id);
  return NextResponse.json({ success: true });
}
