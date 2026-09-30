import type { Metadata } from "next";
import PaymentRestrictionOverlay from "@/components/payment-restriction-overlay";
import { PAYMENT_RESTRICTED } from "@/components/payment-restriction-config";
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
    <html lang="en" suppressHydrationWarning className={PAYMENT_RESTRICTED ? "overflow-hidden" : undefined}>
      <head>
        <link rel="icon" href="/arvan-logo.png" />
      </head>
      <body className={`bg-[#07111f] text-slate-100${PAYMENT_RESTRICTED ? " overflow-hidden" : ""}`}>
        <div inert={PAYMENT_RESTRICTED ? true : undefined} aria-hidden={PAYMENT_RESTRICTED || undefined}>
          {children}
        </div>
        <PaymentRestrictionOverlay />
      </body>
    </html>
  );
}
