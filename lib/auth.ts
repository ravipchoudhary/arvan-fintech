type SessionLike = {
  id?: string;
  role?: string | null;
  [key: string]: unknown;
} | null | undefined;

export function parseSessionFromRequest(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/arvan_session=([^;]+)/);
    const raw = match?.[1];
    if (!raw) return null;
    const decoded = typeof atob === "function" ? atob(raw) : Buffer.from(raw, "base64").toString("utf-8");
    return JSON.parse(decoded) as SessionLike;
  } catch {
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

export function getPublicOrigin(request: Request) {
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (configuredOrigin && !configuredOrigin.includes("localhost")) {
    return configuredOrigin;
  }

  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");

  return forwardedHost ? `${forwardedProtocol}://${forwardedHost}` : new URL(request.url).origin;
}

export function isAdmin(session: SessionLike) {
  return session?.role === "ADMIN";
}

export function isManager(session: SessionLike) {
  return session?.role === "MANAGER";
}

export function isEmployee(session: SessionLike) {
  return session?.role === "EMPLOYEE";
}

export function isClient(session: SessionLike) {
  return session?.role === "CLIENT";
}

export function requireSession(session: SessionLike): NonNullable<SessionLike> {
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function requireRole(session: SessionLike, allowedRoles: string[], context = "Access denied") {
  const current = requireSession(session);
  const currentRole = typeof current.role === "string" ? current.role : "";
  if (!allowedRoles.includes(currentRole)) {
    throw new Error(context);
  }
  return current;
}

export function requireOwnershipOrAdmin(session: SessionLike, ownerId?: string | null) {
  const current = requireSession(session);
  if (current.role === "ADMIN") return current;
  if (ownerId && current.id === ownerId) return current;
  throw new Error("Forbidden");
}
