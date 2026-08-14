"use client";

import { useState } from "react";
import Link from "next/link";
import LeadEnquiryModal from "@/components/lead-enquiry-modal";

export default function HomeHeroWithModal() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={() => setShowLeadForm(true)}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 text-center"
        >
          Get Started
        </button>
        <Link
          href="/services"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white text-center"
        >
          Explore Services
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white text-center"
        >
          Login
        </Link>
      </div>
      <LeadEnquiryModal
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        selectedPlan="Standard"
        planPrice={0}
        source="GET_STARTED"
      />
    </>
  );
}
