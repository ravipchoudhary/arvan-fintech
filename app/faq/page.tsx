import { PublicShell, SectionHeading } from "@/components/public-site";

const faqs = [
  { question: "What is ARVAN FINTECH?", answer: "ARVAN FINTECH is a trading automation and analytics platform that helps teams build strategies, connect broker workflows and monitor trading operations in one place." },
  { question: "What is algorithmic trading?", answer: "Algorithmic trading uses predefined rules to automate trading decisions and execution based on market conditions." },
  { question: "Do I need coding knowledge?", answer: "The platform is designed to support structured strategy workflows, but implementation may require assistance depending on the complexity of the strategy." },
  { question: "How does strategy backtesting work?", answer: "Backtesting evaluates strategies against historical data so performance and risk can be reviewed before deployment." },
  { question: "Which brokers are supported?", answer: "Supported brokers depend on the integrations configured in the platform and the existing broker setup." },
  { question: "Can I automate my trading strategy?", answer: "Yes, strategy automation is a core capability, subject to supported integrations and configured risk controls." },
  { question: "What risk controls are available?", answer: "The platform supports exposure controls, drawdown monitoring, position limits and daily loss thresholds." },
  { question: "How does pricing work?", answer: "Pricing is offered through monthly, quarterly, half yearly and yearly plans with optional customization for premium needs." },
  { question: "Is GST included?", answer: "The displayed pricing is listed as + GST and may be adjusted according to the plan and billing requirements." },
  { question: "Does ARVAN FINTECH guarantee profits?", answer: "No. Trading involves market risk and ARVAN FINTECH does not guarantee profits or returns." },
];

export default function FaqPage() {
  return (
    <PublicShell title="Frequently Asked Questions" description="Clear answers about the platform, trading automation, risk controls and pricing." eyebrow="FAQ" hero={null}>
      <section className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </section>
    </PublicShell>
  );
}
