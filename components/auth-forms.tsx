"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setMessage(null);
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
        credentials: "same-origin",
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      const result = await response.json();

      if (!result) {
        setMessage("Unable to complete login. Please try again.");
        return;
      }

      if (!result.success) {
        setMessage(result.message ?? "Login failed. Please check your credentials.");
        return;
      }

      if (result.redirect) {
        window.location.href = result.redirect;
      }
    } catch (error) {
      setMessage("Unexpected error during login. Please try again.");
      console.error("LoginForm handleSubmit error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form action="/api/auth/login" method="post" onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email or Phone</label>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" />
          <input name="emailOrPhone" type="text" placeholder="name@email.com or +91 98..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-400" />
          <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
          <button type="button" className="text-slate-500" onClick={() => setShowPassword((value) => !value)}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4" /> Remember me</label>
        <button type="button" className="text-blue-600">Forgot Password</button>
      </div>

      {message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{message}</div>
      ) : null}

      <button type="submit" disabled={submitting} className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-400">
        {submitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}

type ServerAction = (formData: FormData) => void | Promise<void>;

export function SignupForm({ action }: { action: string | ServerAction }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form action={action} method="POST" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field icon={<UserRound className="h-4 w-4 text-slate-400" />} label="Full Name" name="name" placeholder="John Doe" />
        <Field icon={<Mail className="h-4 w-4 text-slate-400" />} label="Email" name="email" type="email" placeholder="name@email.com" />
      </div>
      <Field icon={<Phone className="h-4 w-4 text-slate-400" />} label="Phone" name="phone" placeholder="+91 98765 43210" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400" />
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Create password" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confirm Password</label>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400" />
            <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm password" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
            <button type="button" onClick={() => setShowConfirm((value) => !value)}>{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-600">
        <input type="checkbox" name="agree" className="h-4 w-4" />
        I agree to the Terms & Conditions
      </label>

      <button type="submit" className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20">Create Account</button>
    </form>
  );
}

function Field({ icon, label, name, type = "text", placeholder }: { icon: React.ReactNode; label: string; name: string; type?: string; placeholder: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</label>
      <div className="flex items-center gap-2">
        {icon}
        <input name={name} type={type} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required />
      </div>
    </div>
  );
}
