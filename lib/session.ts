import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const value = cookieStore.get("arvan_session")?.value;

  if (!value) return null;

  try {
    const payload = JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
    return payload;
  } catch {
    return null;
  }
}

export async function setSession(user: { id: string; email: string; name: string; role: string }) {
  const cookieStore = await cookies();
  const encoded = Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }),
    "utf-8",
  ).toString("base64");

  cookieStore.set("arvan_session", encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("arvan_session");
}
