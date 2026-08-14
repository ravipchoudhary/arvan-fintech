import Link from "next/link";
import { PublicShell, SectionHeading } from "@/components/public-site";

const posts = [
  { title: "Algo Trading Basics", category: "Algo Trading", description: "An overview of how systematic automation can structure trading decisions." },
  { title: "Risk Management Strategies", category: "Trading", description: "Essential techniques for managing risk and protecting your capital in live trading scenarios." },
  { title: "Risk Management in Automation", category: "Risk Management", description: "Why position sizing and loss controls are essential for sustainable workflows." },
];

export default function BlogPage() {
  return (
    <PublicShell title="Insights For Modern Trading Teams" description="Read practical updates and structured guidance on trading automation, risk control and platform operations." eyebrow="Blog" hero={null}>
      <section className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <div key={post.title} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{post.category}</div>
            <h3 className="mt-4 text-xl font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{post.description}</p>
            <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-blue-300">Read more →</Link>
          </div>
        ))}
      </section>
    </PublicShell>
  );
}
