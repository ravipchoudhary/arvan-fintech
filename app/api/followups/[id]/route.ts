import { NextResponse } from "next/server";
import { updateFollowup, deleteFollowup, readFollowups } from "@/lib/followups";
import { parseSessionFromRequest, isAdmin, isEmployee } from "@/lib/auth";

export async function PUT(request: Request, context: any) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const params = typeof context?.params?.then === "function" ? await context.params : context.params;
  const id = params?.id;
  const list = await readFollowups();
  const existing = list.find((f: any) => f.id === id);
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

export async function DELETE(request: Request, context: any) {
  const session = parseSessionFromRequest(request);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const params = typeof context?.params?.then === "function" ? await context.params : context.params;
  const id = params?.id;
  const list = await readFollowups();
  const existing = list.find((f: any) => f.id === id);
  if (!existing) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  if (!isAdmin(session) && !(isEmployee(session) && existing.employeeId === session.id)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  await deleteFollowup(id);
  return NextResponse.json({ success: true });
}
