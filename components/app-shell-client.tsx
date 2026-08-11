"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, BriefcaseBusiness, Building2, CreditCard, Gauge, LayoutDashboard, LogOut, Menu, Shield, Users, Wallet, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { adminNavSections, clientNavSections, employeeNavSections } from "@/lib/navigation";
import type { ReactNode } from "react";

interface AppShellClientProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "admin" | "employee" | "client";
  displayName: string;
  initials: string;
}

export default function AppShellClient({ title, subtitle, children, variant = "admin", displayName, initials }: AppShellClientProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEmployeeVariant = variant === "employee";
  const isClientVariant = variant === "client";
  const navSections = isEmployeeVariant ? employeeNavSections : isClientVariant ? clientNavSections : adminNavSections;
  const panelBadge = isEmployeeVariant ? "Employee Portal" : isClientVariant ? "Client Portal" : "Admin Portal";
  const greeting = isEmployeeVariant ? "Hello, Employee 👋" : isClientVariant ? "Hello, Trader 👋" : "Hello, Trader 👋";

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {mobileOpen ? <div className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden" onClick={closeMenu} /> : null}
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-full max-w-xs sm:max-w-sm md:max-w-64 lg:max-w-72 -translate-x-full transform flex-col px-4 sm:px-5 py-6 text-slate-100 transition-transform duration-300 lg:static lg:flex lg:translate-x-0 ${isEmployeeVariant ? "bg-indigo-950" : "bg-slate-950"} ${mobileOpen ? "translate-x-0" : ""}`}>
          <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3 px-2 sm:px-3">
            <BrandLogo
              withLabel
              label="Arvan Fintech"
              subtitle={isClientVariant ? "Client Portal" : panelBadge}
              labelClassName="text-white text-sm sm:text-base"
              subtitleClassName="text-slate-400 text-xs"
            />
            <button type="button" onClick={closeMenu} className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-slate-700 text-slate-200 lg:hidden">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-4 sm:space-y-6 overflow-y-auto flex-1">
            {navSections.map((section) => (
              <div key={section.title}>
                <div className="mb-1 sm:mb-2 px-2 sm:px-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{section.title}</div>
                <div className="space-y-0.5 sm:space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 sm:gap-3 rounded-xl border border-transparent px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-200 transition hover:border-slate-800 hover:bg-slate-900"
                        onClick={closeMenu}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className={`mt-auto rounded-2xl border p-3 sm:p-4 text-xs sm:text-sm ${isEmployeeVariant ? "border-indigo-800 bg-indigo-900/70 text-slate-200" : "border-slate-800 bg-slate-900 text-slate-300"}`}>
            <div className="mb-1 font-semibold text-white text-sm">{isEmployeeVariant ? "My Workspace" : "Team Profile"}</div>
            <div title={displayName}>{displayName}</div>
            <div className="mt-1 sm:mt-2 text-xs text-slate-400">{isEmployeeVariant ? "Focus on clients, follow-ups, and targets" : "Operations and trading overview"}</div>
            <Link href="/login" className={`mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm ${isEmployeeVariant ? "text-indigo-300 hover:text-indigo-200" : "text-blue-400 hover:text-blue-300"}`} onClick={closeMenu}>
              <LogOut className="h-4 w-4 flex-shrink-0" />
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-3 sm:py-4 lg:px-8">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button type="button" onClick={() => setMobileOpen((open) => !open)} className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden flex-shrink-0">
                  {mobileOpen ? <X className="h-4 sm:h-5 w-4 sm:w-5" /> : <Menu className="h-4 sm:h-5 w-4 sm:w-5" />}
                </button>
                <div className="min-w-0">
                  <BrandLogo
                    withLabel
                    label="Arvan Fintech"
                    subtitle={panelBadge}
                    labelClassName="text-slate-900 text-base sm:text-lg"
                    subtitleClassName="text-slate-500 text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="hidden sm:block rounded-full border border-slate-200 bg-slate-50 px-2 sm:px-3 py-1 text-xs sm:text-sm text-slate-700 whitespace-nowrap">{greeting}</div>
                <div className={`flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-white flex-shrink-0 ${isEmployeeVariant ? "bg-indigo-600" : "bg-blue-600"}`}>{initials}</div>
              </div>
            </div>
          </header>
          <main className="p-4 sm:p-5 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
