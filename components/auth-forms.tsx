"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

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
      setPasswordValue("");
    }
  }

  return (
    <form action="/api/auth/login" method="post" onSubmit={handleSubmit} className="space-y-5" autoComplete="off" spellCheck="false">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email or Phone</label>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" />
          <input name="emailOrPhone" type="text" placeholder="name@email.com or +91 98..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required autoComplete="new-password" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} spellCheck="false" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-400" />
          <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" required autoComplete="new-password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
          <button type="button" className="text-slate-500" onClick={() => setShowPassword((value) => !value)}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end text-sm text-slate-600">
        <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-semibold">Forgot Password?</Link>
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
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Lock className="h-4 w-4 text-slate-400" />
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Create password" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confirm Password</label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Lock className="h-4 w-4 text-slate-400" />
            <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm password" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" required />
            <button type="button" onClick={() => setShowConfirm((value) => !value)} className="text-slate-500">{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
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

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const identifier = String(formData.get("emailOrPhone") || "").trim();

      if (!identifier) {
        setMessageType("error");
        setMessage("Please enter your email address or phone number.");
        return;
      }

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrPhone: identifier }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setMessage(result.message || "Unable to process your request. Please try again.");
        return;
      }

      setMessageType("success");
      setMessage(result.message || "If an account exists with this email/phone, you will receive a password reset link shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
      console.error("Forgot password error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email or Phone</label>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            name="emailOrPhone"
            type="text"
            placeholder="name@email.com or +91 98..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            required
            autoComplete="off"
          />
        </div>
      </div>

      {message ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${messageType === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {submitting ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-xs text-slate-600">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({ resetToken }: { resetToken: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const password = String(formData.get("password") || "").trim();
      const confirmPassword = String(formData.get("confirmPassword") || "").trim();

      // Validation
      if (!password || password.length < 8) {
        setMessageType("error");
        setMessage("Password must be at least 8 characters long.");
        setSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        setMessageType("error");
        setMessage("Passwords do not match.");
        setSubmitting(false);
        return;
      }

      if (!resetToken) {
        setMessageType("error");
        setMessage("Invalid reset link. Please request a new one.");
        setSubmitting(false);
        return;
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetToken,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setMessage(result.message || "Unable to reset password. Please try again.");
        return;
      }

      setMessageType("success");
      setMessage("Password reset successful! Redirecting to login...");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  if (!resetToken) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        Invalid reset link. Please request a new password reset.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Lock className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password (min 8 characters)"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            required
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="text-slate-500 flex-shrink-0"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confirm Password</label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Lock className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            required
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((value) => !value)}
            className="text-slate-500 flex-shrink-0"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {message ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${messageType === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {submitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
