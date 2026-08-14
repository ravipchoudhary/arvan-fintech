"use client";

import { useState } from "react";
import { X } from "lucide-react";
import LeadEnquiryForm from "@/components/lead-enquiry-form";

interface LeadEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
  planPrice?: number;
  source?: "PRICING" | "GET_STARTED";
}

export default function LeadEnquiryModal({
  isOpen,
  onClose,
  selectedPlan = "Standard",
  planPrice = 0,
  source = "PRICING",
}: LeadEnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">Get Started with ARVAN FINTECH</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <LeadEnquiryForm
            selectedPlan={selectedPlan}
            planPrice={planPrice}
            onClose={onClose}
            onSuccess={onClose}
            source={source}
          />
        </div>
      </div>
    </div>
  );
}
