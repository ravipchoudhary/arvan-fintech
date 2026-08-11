import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARVAN FINTECH | Algo Trading Automation Platform",
  description: "ARVAN FINTECH offers strategy automation, analytics, broker connectivity and risk controls for modern trading teams.",
  keywords: ["ARVAN FINTECH", "Algo Trading", "Algorithmic Trading", "Trading Automation", "Risk Management", "Broker API"],
  openGraph: {
    title: "ARVAN FINTECH | Algo Trading Automation Platform",
    description: "ARVAN FINTECH offers strategy automation, analytics, broker connectivity and risk controls for modern trading teams.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#07111f] text-slate-100">{children}</body>
    </html>
  );
}
