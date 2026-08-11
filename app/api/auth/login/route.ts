import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDashboardPathForRole } from "@/lib/auth";
import { setSession } from "@/lib/session";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const formData = await request.formData();
  const emailOrPhone = String(formData.get("emailOrPhone") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!emailOrPhone || !password) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email/phone and password." },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash || ""))) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
    }

    await setSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const redirectPath = getDashboardPathForRole(user.role);

    if (request.headers.get("accept")?.includes("application/json")) {
      return NextResponse.json({ success: true, redirect: redirectPath });
    }

    return NextResponse.redirect(new URL(redirectPath, request.url));
  } catch (error) {
    console.error("Login API error:", error);
    if (request.headers.get("accept")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Unable to authenticate right now. Please check your database configuration." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Unable to authenticate right now. Please check your database configuration." },
      { status: 500 },
    );
  }
}
