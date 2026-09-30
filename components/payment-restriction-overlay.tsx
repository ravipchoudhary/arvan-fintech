"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BadgeIndianRupee, Building2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PAYMENT_RESTRICTED } from "@/components/payment-restriction-config";

const CONTACT_EMAIL = "info@encogix.com";
const CONTACT_PHONE = "+91 9431607346";

export default function PaymentRestrictionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!PAYMENT_RESTRICTED) return;

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
      }

      if (event.key === "Tab") {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, []);

  if (!PAYMENT_RESTRICTED) return null;

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Payment resolution - website access")}`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-10000 flex min-h-screen items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-restriction-title"
      aria-describedby="payment-restriction-description"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[#07111f]/85 backdrop-blur-md" />

      <section className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#101b24] text-white shadow-2xl shadow-black/50">
        <div className="h-1 w-full bg-linear-to-r from-amber-300 via-amber-200 to-cyan-300" />
        <div className="p-4 sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/8 pb-4 sm:pb-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-200/10 text-amber-200">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">Account access notice</div>
              <p className="mt-1 text-xs text-slate-400">Arvan Fintech website</p>
            </div>
          </div>

          <div className="pt-4 sm:pt-6">
            <h1 id="payment-restriction-title" className="text-xl font-semibold tracking-tight sm:text-3xl">
              Website Temporarily Restricted
            </h1>
            <p id="payment-restriction-description" className="mt-3 text-sm leading-5 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
              Access to this website has been temporarily restricted due to an outstanding payment associated with the website development/services.
            </p>
            <p className="mt-2 text-sm leading-5 text-slate-400 sm:mt-3 sm:leading-6">
              Please contact the service provider to clear the pending payment and restore full website access.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/8 bg-[#0b141b] p-3 sm:mt-7 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Building2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Encogix Technology Pvt. Ltd.
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 flex min-h-9 items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:mt-4 sm:min-h-11">
              <Mail className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <a href={`tel:${CONTACT_PHONE.replaceAll(" ", "")}`} className="mt-1 flex min-h-9 items-center gap-3 text-sm text-slate-300 transition hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:mt-2 sm:min-h-11">
              <BadgeIndianRupee className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span>{CONTACT_PHONE}</span>
            </a>
          </div>

          <a
            href={mailto}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-2 py-2.5 text-center text-xs font-semibold text-[#07111f] transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 sm:mt-6 sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
          >
            Contact for Payment / Resolution
            <ArrowUpRight className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
          </a>

          <div className="mt-4 flex items-start gap-2 border-t border-white/8 pt-3 text-[11px] leading-4 text-slate-500 sm:mt-6 sm:pt-4 sm:text-xs sm:leading-5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <p>For assistance, contact the service provider using the details above. No payment information is collected on this page.</p>
          </div>
        </div>
      </section>
    </div>
  );
}