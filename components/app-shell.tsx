import Link from "next/link";
import { ArrowUpRight, BarChart3, BriefcaseBusiness, Building2, CreditCard, Gauge, LayoutDashboard, LogOut, Menu, Shield, Users, Wallet } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { BrandLogo } from "@/components/brand-logo";

const adminNavSections = [
  {
    title: "Main Trading",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/strategies", label: "Strategies", icon: BarChart3 },
      { href: "/backtest", label: "Backtest", icon: Gauge },
      { href: "/live-algo", label: "Live Algo", icon: ArrowUpRight },
      { href: "/orders", label: "Orders", icon: BriefcaseBusiness },
      { href: "/positions", label: "Positions", icon: Wallet },
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/brokers", label: "Brokers", icon: Building2 },
      { href: "/risk-management", label: "Risk Management", icon: Shield },
    ],
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/employees", label: "Employees", icon: Users },
      { href: "/admin/clients", label: "Clients / Users", icon: Users },
      { href: "/admin/sales", label: "Sales Management", icon: BarChart3 },
      { href: "/admin/payroll", label: "Payroll", icon: CreditCard },
      { href: "/admin/management", label: "Management", icon: Building2 },
      { href: "/admin/audit", label: "Audit / Security", icon: Shield },
      { href: "/settings", label: "Settings", icon: Gauge },
    ],
  },
  {
    title: "Billing",
    items: [{ href: "/billing", label: "Billing", icon: CreditCard }],
  },
];

const employeeNavSections = [
  {
    title: "Employee Workspace",
    items: [
      { href: "/employee/dashboard", label: "My Dashboard", icon: LayoutDashboard },
      { href: "/employee/clients", label: "My Clients", icon: Users },
      { href: "/employee/follow-ups", label: "Follow Ups", icon: Shield },
      { href: "/employee/target", label: "My Target", icon: Gauge },
      { href: "/employee/my-sales", label: "My Sales", icon: BarChart3 },
      { href: "/employee/reports", label: "Reports", icon: BarChart3 },
      { href: "/employee/profile", label: "My Profile", icon: CreditCard },
    ],
  },
];

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
  const isEmployeeVariant = variant === "employee";
  const isClientVariant = variant === "client";
  const navSections = isEmployeeVariant ? employeeNavSections : adminNavSections;
  const panelBadge = isEmployeeVariant ? "Employee Portal" : "Admin Portal";
  const greeting = isEmployeeVariant ? "Hello, Employee 👋" : isClientVariant ? "Hello, Trader 👋" : "Hello, Trader 👋";
  if (isClientVariant) {
    // merge client nav into navSections when client variant
  }
  const displayName = sessionUser?.name ?? (isEmployeeVariant ? "Your Workspace" : "Team Profile");
  const initials = sessionUser?.name
    ? sessionUser.name
        .split(" ")
        .map((s: string) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AK";

  // decide navSections for client
  const finalNavSections = isClientVariant ? [
    {
      title: "Trading",
      items: [
        { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/client/strategies", label: "My Strategies", icon: BarChart3 },
        { href: "/client/backtest", label: "Backtest", icon: Gauge },
        { href: "/client/live-algo", label: "Live Algo", icon: ArrowUpRight },
        { href: "/client/orders", label: "Orders", icon: BriefcaseBusiness },
        { href: "/client/positions", label: "Positions", icon: Wallet },
      ],
    },
    {
      title: "Analytics",
      items: [
        { href: "/client/reports", label: "Reports", icon: BarChart3 },
        { href: "/client/risk", label: "Risk Management", icon: Shield },
      ],
    },
    {
      title: "Account",
      items: [
        { href: "/client/broker", label: "Broker", icon: Building2 },
        { href: "/client/notifications", label: "Notifications", icon: ArrowUpRight },
        { href: "/client/profile", label: "Profile", icon: CreditCard },
        { href: "/client/settings", label: "Settings", icon: Gauge },
      ],
    },
  ] : navSections;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`hidden w-72 flex-col px-5 py-6 text-slate-100 lg:flex ${isEmployeeVariant ? "bg-indigo-950" : "bg-slate-950"}`}>
          <div className="mb-8 flex items-center gap-3 px-3">
            <BrandLogo withLabel label="Arvan Fintech" subtitle={isClientVariant ? "Client Portal" : panelBadge} />
          </div>
          <nav className="space-y-6 overflow-y-auto">
            {finalNavSections.map((section) => (
              <div key={section.title}>
                <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{section.title}</div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-slate-200 transition hover:border-slate-800 hover:bg-slate-900"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className={`mt-auto rounded-2xl border p-4 text-sm ${isEmployeeVariant ? "border-indigo-800 bg-indigo-900/70 text-slate-200" : "border-slate-800 bg-slate-900 text-slate-300"}`}>
            <div className="mb-1 font-semibold text-white">{isEmployeeVariant ? "My Workspace" : "Team Profile"}</div>
            <div className={isEmployeeVariant ? "text-slate-300" : "text-slate-400"}>{displayName}</div>
            <div className="mt-2 text-xs text-slate-400">{isEmployeeVariant ? "Focus on clients, follow-ups, and targets" : "Operations and trading overview"}</div>
            <Link href="/login" className={`mt-3 flex items-center gap-2 ${isEmployeeVariant ? "text-indigo-300 hover:text-indigo-200" : "text-blue-400 hover:text-blue-300"}`}>
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="text-xl font-bold text-slate-900">{title}</div>
                  {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 md:block">{greeting}</div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${isEmployeeVariant ? "bg-indigo-600" : "bg-blue-600"}`}>{initials}</div>
              </div>
            </div>
          </header>
          <main className="p-5 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
