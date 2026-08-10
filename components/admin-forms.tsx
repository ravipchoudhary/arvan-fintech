"use client";

import { useState } from "react";
import Link from "next/link";

type ServerAction = (formData: FormData) => void | Promise<void>;

type EmployeeFormProps = {
  action: string | ServerAction;
  defaultValues?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    status?: string;
  };
  submitLabel?: string;
};

export function EmployeeForm({ action, defaultValues, submitLabel = "Save Employee" }: EmployeeFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isEdit = Boolean(defaultValues?.id);

  return (
    <form action={action} className="space-y-5">
      {defaultValues?.id ? <input type="hidden" name="id" value={defaultValues.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full Name" defaultValue={defaultValues?.name ?? ""} required />
        <Field name="email" label="Email" type="email" defaultValue={defaultValues?.email ?? ""} required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field name="phone" label="Phone" defaultValue={defaultValues?.phone ?? ""} required />
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Role</label>
          <select name="role" defaultValue={defaultValues?.role ?? "EMPLOYEE"} className="w-full bg-transparent text-sm text-slate-800 outline-none">
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Status</label>
          <select name="status" defaultValue={defaultValues?.status ?? "ACTIVE"} className="w-full bg-transparent text-sm text-slate-800 outline-none">
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={isEdit ? "Leave blank to keep current password" : "Create password"}
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
              {...(isEdit ? {} : { required: true })}
            />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white">{submitLabel}</button>
        <Link href="/admin/employees" className="rounded-full border border-slate-200 px-5 py-2.5 font-semibold text-slate-700">Cancel</Link>
      </div>
    </form>
  );
}

function Field({ name, label, type = "text", defaultValue = "", required = false }: { name: string; label: string; type?: string; defaultValue?: string; required?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <label htmlFor={name} className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </label>
      <input id={name} name={name} type={type} defaultValue={defaultValue} required={required} className="w-full bg-transparent text-sm text-slate-800 outline-none" />
    </div>
  );
}
