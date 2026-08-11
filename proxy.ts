import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/services",
  "/features",
  "/how-it-works",
  "/pricing",
  "/faq",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  "/disclaimer",
];

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
  // Admin area: ADMIN and MANAGER
  if (pathname.startsWith("/admin/")) {
    return role === "ADMIN" || role === "MANAGER";
  }

  // Employee area: only EMPLOYEE
  if (pathname.startsWith("/employee/")) {
    return role === "EMPLOYEE";
  }

  // Client area: only CLIENT
  if (pathname.startsWith("/client/")) {
    return role === "CLIENT";
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
    // redirect users to their appropriate dashboard
    const redirectPath =
      session.role === "ADMIN" || session.role === "MANAGER"
        ? "/admin/dashboard"
        : session.role === "EMPLOYEE"
        ? "/employee/dashboard"
        : session.role === "CLIENT"
        ? "/client/dashboard"
        : "/login";

    return NextResponse.redirect(new URL(redirectPath, request.url));
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
