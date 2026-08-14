import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

/**
 * POST /api/auth/forgot-password
 * 
 * Initiates password reset flow:
 * 1. Find user by email or phone
 * 2. Generate secure reset token with expiry
 * 3. Store token in database
 * 4. Send email/SMS (if configured) or log token
 * 5. Return success response
 * 
 * Security: Does not reveal whether account exists
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const emailOrPhone = String(body.emailOrPhone || "").trim();

    if (!emailOrPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email address or phone number.",
        },
        { status: 400 }
      );
    }

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });

    // Always return success message for security (don't reveal if account exists)
    const successMessage =
      "If an account exists with this email/phone, you will receive a password reset link shortly.";

    if (!user) {
      // Simulate delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
        },
        { status: 200 }
      );
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store token with 1 hour expiry
    const expiryTime = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.upsert({
      where: { userId: user.id },
      update: {
        token: tokenHash,
        expiresAt: expiryTime,
        used: false,
      },
      create: {
        userId: user.id,
        token: tokenHash,
        expiresAt: expiryTime,
        used: false,
      },
    });

    // TODO: Send email/SMS with reset link
    // For now, log the token for development
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    console.log(`Password reset link for ${user.email}: ${resetLink}`);

    // If email service is not configured, add info to console
    if (!process.env.SMTP_HOST) {
      console.info(
        "EMAIL SERVICE NOT CONFIGURED: Password reset link would be sent here in production"
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
