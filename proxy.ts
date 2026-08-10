import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/signup"];

function parseSession(value?: string) {
  if (!value) return null;

  try {
    return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

function hasAccess(pathname: string, role?: string) {
  if (!role) return false;

  if (pathname.startsWith("/admin/")) {
    return role === "ADMIN";
  }

  if (pathname.startsWith("/employee/")) {
    return ["ADMIN", "MANAGER", "EMPLOYEE"].includes(role);
  }

  return true;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = publicRoutes.includes(pathname) || pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.includes(".");

  if (isPublic) {
    return NextResponse.next();
  }

  const session = parseSession(request.cookies.get("arvan_session")?.value);

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!hasAccess(pathname, session.role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/strategies/:path*",
    "/backtest/:path*",
    "/live-algo/:path*",
    "/orders/:path*",
    "/positions/:path*",
    "/brokers/:path*",
    "/risk-management/:path*",
    "/reports/:path*",
    "/billing/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/employee/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
