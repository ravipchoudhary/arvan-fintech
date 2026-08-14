"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { publicNavItems } from "@/lib/navigation";
import { Menu, X } from "lucide-react";

export default function PublicShellNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="relative">
      {mobileMenuOpen ? <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={closeMobileMenu} /> : null}
      <header className="border-b border-white/10 bg-[#07111f]/95 backdrop-blur relative z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8 gap-3">
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white p-1 shadow-md flex-shrink-0">
              <img src="/arvan-logo.png" alt="Arvan Fintech" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">ARVAN FINTECH</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-400 truncate">Trading • Automation</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {publicNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-white">
              Login
            </Link>
          </div>

          <button type="button" onClick={toggleMobileMenu} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white md:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className={`fixed inset-x-0 top-0 z-40 h-full w-full overflow-y-auto bg-slate-950/95 transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto max-w-7xl px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white p-1.5">
                <img src="/arvan-logo.png" alt="Arvan Fintech" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white">ARVAN FINTECH</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Trading • Automation</div>
              </div>
            </div>
            <button type="button" onClick={closeMobileMenu} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white flex-shrink-0">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="mx-auto max-w-7xl w-full flex flex-col px-5 pb-6">
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="border-t border-white/10 px-5 py-4 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-white/10 bg-slate-950/70 px-5 py-3">
            <Link href="/login" onClick={closeMobileMenu} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
