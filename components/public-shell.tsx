"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, CircleCheck, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { publicNavItems } from "@/lib/navigation";

export function PublicShell({
  children,
  title,
  description,
  eyebrow,
  hero,
}: {
  children: ReactNode;
  title: string;
  description: string;
  eyebrow?: string;
  hero?: ReactNode;
}) {
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
    <div className="relative min-h-screen bg-[#07111f] text-slate-100">
      {mobileMenuOpen ? <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={closeMobileMenu} /> : null}
      <header className="border-b border-white/10 bg-[#07111f]/95 backdrop-blur relative z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo
              withLabel
              label="Arvan Fintech"
              subtitle="Trading automation and strategy operations"
              labelClassName="text-white"
              subtitleClassName="text-slate-300"
            />
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
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white p-2">
                <img src="/arvan-logo.png" alt="Arvan Fintech" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">ARVAN FINTECH</div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Trading automation</div>
              </div>
            </div>
            <button type="button" onClick={closeMobileMenu} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white">
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

      <main>
        {hero ? (
          <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_42%)]">
            <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-24">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                <div className="flex flex-col justify-center">
                  {eyebrow ? <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200 sm:text-sm">{eyebrow}</div> : null}
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-6xl leading-tight">{title}</h1>
                  <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-lg">{description}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">{hero}</div>
                </div>
                <div className="hidden lg:block rounded-[32px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/30">
                  <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Demo portfolio overview</span>
                      <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Visual only</span>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <HeroMetricCard label="Portfolio Value" value="₹12,48,500" delta="Live view" />
                      <HeroMetricCard label="Today P&amp;L" value="+₹8,420" delta="Positive" />
                      <HeroMetricCard label="Live Algorithms" value="04" delta="Running" />
                      <HeroMetricCard label="Risk Usage" value="42%" delta="Balanced" />
                    </div>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                        <span>Portfolio performance</span>
                        <span className="text-blue-300">Demo chart</span>
                      </div>
                      <div className="flex h-24 items-end gap-2">
                        {[44, 72, 56, 86, 92, 78, 98].map((height, index) => (
                          <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-300" style={{ height: `${height}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">{children}</div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 shadow-md flex-shrink-0">
                  <img src="/arvan-logo.png" alt="Arvan Fintech" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ARVAN FINTECH</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Trading • Automation</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-400">A modern fintech platform for strategy automation, analytics, risk controls and broker connectivity.</p>
            </div>
            <FooterColumn title="Services" links={[{ href: "/services", label: "Algo Trading" }, { href: "/broker-api-integration", label: "API Bridge" }, { href: "/features", label: "Features" }]} />
            <FooterColumn title="Company" links={[{ href: "/about", label: "About" }, { href: "/pricing", label: "Pricing" }, { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" }]} />
            <FooterColumn title="Resources" links={[{ href: "/faq", label: "FAQ" }, { href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-and-conditions", label: "Terms" }, { href: "/disclaimer", label: "Disclaimer" }]} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-400">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeroMetricCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-300">{delta}</div>
    </div>
  );
}
