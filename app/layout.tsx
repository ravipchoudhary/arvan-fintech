import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arvan Fintech | Algo Trading Automation Platform",
  description: "Arvan Fintech offers strategy automation, analytics, broker connectivity and risk controls for modern trading teams.",
  keywords: ["Arvan Fintech", "Algo Trading", "Algorithmic Trading", "Trading Automation", "Risk Management", "Broker API"],
  openGraph: {
    title: "Arvan Fintech | Algo Trading Automation Platform",
    description: "Arvan Fintech offers strategy automation, analytics, broker connectivity and risk controls for modern trading teams.",
    type: "website",
  },
  icons: {
    icon: '/arvan-logo.png',
    shortcut: '/arvan-logo.png',
    apple: '/arvan-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/arvan-logo.png" />
      </head>
      <body className="bg-[#07111f] text-slate-100">{children}</body>
    </html>
  );
}
