import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import PublicShellNav from "@/components/public-shell-nav";
import { ArrowRight, BarChart3, BellRing, Bot, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export function PublicShell({
  children,
  title,
  description,
  eyebrow,
  hero,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  eyebrow?: string;
  hero?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#07111f] text-slate-100">
      <PublicShellNav />
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
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <HeroMetricCard label="Portfolio Value" value="₹12,48,500" delta="Live view" />
                      <HeroMetricCard label="Today P&amp;L" value="+₹8,420" delta="Positive" />
                      <HeroMetricCard label="Live Algorithms" value="04" delta="Running" />
                      <HeroMetricCard label="Risk Usage" value="42%" delta="Balanced" />
                    </div>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                        <span>Portfolio performance</span>
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <BrandLogo
                withLabel
                label="Arvan Fintech"
                subtitle="Trading automation and strategy operations"
                className="mb-4"
                labelClassName="text-white"
                subtitleClassName="text-slate-300"
              />
              <p className="mt-3 text-sm leading-7 text-slate-400">A modern fintech platform for strategy automation, analytics, risk controls and broker connectivity.</p>
            </div>
            <FooterColumn title="Services" links={[{ href: "/services", label: "Algo Trading" }, { href: "/strategies", label: "Strategy Builder" }, { href: "/features", label: "Features" }]} />
            <FooterColumn title="Company" links={[{ href: "/about", label: "About" }, { href: "/pricing", label: "Pricing" }, { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" }]} />
            <FooterColumn title="Resources" links={[{ href: "/faq", label: "FAQ" }, { href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms-and-conditions", label: "Terms" }, { href: "/disclaimer", label: "Disclaimer" }]} />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Email</p>
                  <a
                    href="mailto:info@arvanfintech.com"
                    className="mt-1 inline-block text-sm text-slate-300 hover:text-blue-300 transition"
                  >
                    info@arvanfintech.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Phone</p>
                  <a
                    href="tel:8429359030"
                    className="mt-1 inline-block text-sm text-slate-300 hover:text-blue-300 transition"
                  >
                    8429359030
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Address</p>
                  <p className="mt-1 text-sm text-slate-300">Greater Noida, Uttar Pradesh</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="text-center text-xs text-slate-500">
              <p>&copy; 2026 ARVAN FINTECH. All rights reserved.</p>
            </div>
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

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <div className="text-xs uppercase tracking-[0.24em] text-blue-300">{eyebrow}</div> : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 text-white">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 text-white shadow-xl shadow-black/10">
      <p className="text-base leading-7 text-slate-200">“{quote}”</p>
      <div className="mt-6">
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-sm text-slate-400">{role}</p>
      </div>
    </div>
  );
}

export function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 text-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300 font-semibold">{number}</div>
      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}
