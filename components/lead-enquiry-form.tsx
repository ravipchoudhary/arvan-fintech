"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface LeadFormProps {
  selectedPlan: string;
  planPrice: number;
  onClose: () => void;
  onSuccess?: () => void;
  source?: "PRICING" | "GET_STARTED";
}

export default function LeadEnquiryForm({
  selectedPlan,
  planPrice,
  onClose,
  onSuccess,
  source = "PRICING",
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    companyName: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name is required (minimum 2 characters)";
    }

    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Valid 10-digit mobile number is required";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedPlan,
          planPrice,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.error || "Submission failed" });
        return;
      }

      setShowSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 3000);
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative max-w-md w-full mx-4 rounded-2xl border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Thank You! 🎉
          </h2>
          <p className="text-slate-300 mb-6">
            Your enquiry has been received successfully. Our team will contact
            you shortly.
          </p>
          <div className="text-sm text-slate-400 mb-6">
            Redirecting you back to the page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/95 px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-sm">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Get Started</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 truncate">
              Selected Plan: <span className="text-blue-300 font-semibold">{selectedPlan}</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-400 truncate">₹{planPrice.toLocaleString()} + GST</p>
          </div>
          <button
            onClick={onClose}
            className="ml-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 text-slate-400 transition hover:bg-white/10 hover:text-white"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
          {errors.general && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">
              {errors.general}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              disabled={isSubmitting}
              className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50"
            />
            {errors.mobile && (
              <p className="mt-2 text-sm text-red-400 font-medium">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your company"
                disabled={isSubmitting}
                className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Your city"
                disabled={isSubmitting}
                className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Selected Plan (display only) */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">
              Selected Plan
            </label>
            <div className="w-full rounded-lg border-2 border-blue-400/40 bg-blue-500/15 px-4 py-3 text-blue-100 font-semibold">
              {selectedPlan} — ₹{planPrice.toLocaleString()} + GST
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">
              Your Requirement
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your requirements or any specific needs..."
              disabled={isSubmitting}
              rows={4}
              className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 disabled:opacity-50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border-2 border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-blue-500/50 hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
