import { getSessionUser } from "@/lib/session";
import AppShellClient from "@/components/app-shell-client";

export async function AppShell({
  title,
  subtitle,
  children,
  variant = "admin",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "admin" | "employee" | "client";
}) {
  const sessionUser = await getSessionUser();
  const displayName = sessionUser?.name ?? (variant === "employee" ? "Your Workspace" : "Team Profile");
  const initials = sessionUser?.name
    ? sessionUser.name
        .split(" ")
        .map((s: string) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AK";

  return (
    <AppShellClient
      title={title}
      subtitle={subtitle}
      variant={variant}
      displayName={displayName}
      initials={initials}
    >
      {children}
    </AppShellClient>
  );
}
