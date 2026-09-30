import nodemailer from "nodemailer";

type PasswordResetEmail = {
  recipient: string;
  resetLink: string;
};

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass: password },
  });
}

export async function sendPasswordResetEmail({ recipient, resetLink }: PasswordResetEmail) {
  const transport = getMailTransport();
  if (!transport) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP mail service is not configured.");
    }

    console.info(`Password reset link for ${recipient}: ${resetLink}`);
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("SMTP_FROM or SMTP_USER is required.");
  }

  await transport.sendMail({
    from,
    to: recipient,
    subject: "Reset your Arvan Fintech password",
    text: `Use this link to reset your Arvan Fintech password: ${resetLink}\n\nThis link expires in 1 hour.`,
    html: `<p>Use the button below to reset your Arvan Fintech password.</p><p><a href="${resetLink}">Reset password</a></p><p>This link expires in 1 hour.</p>`,
  });
}