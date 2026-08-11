import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BarChart3, Bot, Briefcase, CircleCheck, Cpu, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { LucideIcon } from "lucide-react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

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
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="border-b border-white/10 bg-[#07111f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo withLabel label="Arvan Fintech" subtitle="Trading automation and strategy operations" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-white">
              Login
            </Link>
            <Link href="/signup" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
              Get Started
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:hidden lg:px-8">
          <div className="flex flex-wrap gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-blue-400 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main>
        {hero ? (
          <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_42%)]">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
              <div>
                {eyebrow ? <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">{eyebrow}</div> : null}
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
                {hero}
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/30">
                <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Demo portfolio overview</span>
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold uppercase text-blue-200">Visual only</span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <MetricCard label="Portfolio Value" value="₹12,48,500" delta="Live view" />
                    <MetricCard label="Today P&amp;L" value="+₹8,420" delta="Positive" />
                    <MetricCard label="Live Algorithms" value="04" delta="Running" />
                    <MetricCard label="Risk Usage" value="42%" delta="Balanced" />
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
          </section>
        ) : null}

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
          <div>
            <BrandLogo withLabel label="Arvan Fintech" subtitle="Trading automation and strategy operations" className="mb-4" />
            <p className="mt-3 text-sm leading-7 text-slate-400">A modern fintech platform for strategy automation, analytics, risk controls and broker connectivity.</p>
          </div>
          <FooterColumn title="Services" links={[{ href: "/services", label: "Algo Trading" }, { href: "/broker-api-integration", label: "API Bridge" }, { href: "/analytics", label: "Analytics" }, { href: "/risk-management", label: "Risk Management" }]} />
          <FooterColumn title="Company" links={[{ href: "/about", label: "About" }, { href: "/pricing", label: "Pricing" }, { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" }]} />
          <FooterColumn title="Resources" links={[{ href: "/faq", label: "FAQ" }, { href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-and-conditions", label: "Terms" }, { href: "/disclaimer", label: "Disclaimer" }]} />
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

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{eyebrow}</div> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-lg leading-8 text-slate-400">{description}</p>
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export function MetricCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-300">{delta}</div>
    </div>
  );
}

export function PricingCard({ title, price, subtitle, features, accent = false, cta }: { title: string; price: string; subtitle: string; features: string[]; accent?: boolean; cta: string }) {
  return (
    <div className={`rounded-[28px] border p-8 shadow-xl ${accent ? "border-blue-400/40 bg-gradient-to-br from-blue-600/20 to-slate-900" : "border-white/10 bg-slate-900/70"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {accent ? <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Recommended</span> : null}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-400">{subtitle}</p>
      <div className="mt-6 text-4xl font-semibold text-white">{price}</div>
      <div className="mt-2 text-sm text-slate-400">+ GST</div>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2"><CircleCheck className="mt-0.5 h-4 w-4 flex-none text-blue-300" />{feature}</li>
        ))}
      </ul>
      <Link href="/contact" className={`mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${accent ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-white/10 text-white hover:bg-white/20"}`}>
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-lg font-semibold text-blue-300">{number}</div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}

export function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <p className="text-sm leading-8 text-slate-300">“{quote}”</p>
      <div className="mt-6">
        <div className="font-semibold text-white">{author}</div>
        <div className="text-sm text-slate-400">{role}</div>
      </div>
    </div>
  );
}
