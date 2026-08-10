import Link from "next/link";
import { ArrowUpRight, BarChart3, BriefcaseBusiness, Building2, CreditCard, Gauge, LayoutDashboard, LogOut, Menu, Shield, Users, Wallet } from "lucide-react";

const navSections = [
  {
    title: "Main Trading",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
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

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col bg-slate-950 px-5 py-6 text-slate-100 lg:flex">
          <div className="mb-8 flex items-center gap-3 px-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">A</div>
            <div>
              <div className="text-lg font-bold tracking-tight">ARVAN ALGO</div>
              <div className="text-[11px] text-slate-400">Automated Algo Trading Platform</div>
            </div>
          </div>
          <nav className="space-y-6 overflow-y-auto">
            {navSections.map((section) => (
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
          <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
            <div className="mb-1 font-semibold text-white">Trader Profile</div>
            <div className="text-slate-400">Amit Kumar</div>
            <Link href="/login" className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300">
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="text-xl font-bold text-slate-900">{title}</div>
                  {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 md:block">Hello, Trader 👋</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">AK</div>
              </div>
            </div>
          </header>
          <main className="p-5 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
