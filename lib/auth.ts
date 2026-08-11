export function parseSessionFromRequest(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/arvan_session=([^;]+)/);
    const raw = match?.[1];
    if (!raw) return null;
    const decoded = typeof atob === "function" ? atob(raw) : Buffer.from(raw, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export function isAdmin(session: any) {
  return session?.role === "ADMIN";
}

export function isManager(session: any) {
  return session?.role === "MANAGER";
}

export function isEmployee(session: any) {
  return session?.role === "EMPLOYEE";
}

export function isClient(session: any) {
  return session?.role === "CLIENT";
}
