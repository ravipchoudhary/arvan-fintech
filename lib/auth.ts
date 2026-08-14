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

export function getDashboardPathForRole(role?: string | null) {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "MANAGER":
      return "/dashboard";
    case "EMPLOYEE":
      return "/employee/dashboard";
    case "CLIENT":
      return "/client/dashboard";
    default:
      return "/login";
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

export function requireSession(session: any) {
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function requireRole(session: any, allowedRoles: string[], context = "Access denied") {
  const current = requireSession(session);
  if (!allowedRoles.includes(current.role)) {
    throw new Error(context);
  }
  return current;
}

export function requireOwnershipOrAdmin(session: any, ownerId?: string | null) {
  const current = requireSession(session);
  if (current.role === "ADMIN") return current;
  if (ownerId && current.id === ownerId) return current;
  throw new Error("Forbidden");
}
