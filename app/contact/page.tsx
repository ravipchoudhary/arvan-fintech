import { PublicShell, SectionHeading } from "@/components/public-site";

export default function ContactPage() {
  return (
    <PublicShell title="Contact ARVAN FINTECH" description="Get in touch for product questions, implementation support and tailored pricing inquiries." eyebrow="Contact" hero={null}>
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
          <SectionHeading eyebrow="Support" title="Let’s talk about your trading workflow" description="Whether you are exploring automation or need a tailored deployment plan, our team can help you get started." />
          <div className="mt-8 space-y-3 text-sm text-slate-400">
            <div>Email: hello@arvanfintech.com</div>
            <div>Phone: +91 98765 43210</div>
            <div>Location: Mumbai, India</div>
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none" placeholder="Full Name" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none" placeholder="Email" />
            </div>
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none" placeholder="Phone" />
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none" placeholder="Subject" />
            <textarea className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none" placeholder="Message" />
            <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">Send Message</button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
