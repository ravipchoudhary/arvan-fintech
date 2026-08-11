"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewFollowUpPage() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueAt, setDueAt] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/followups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, notes, dueAt }),
    });
    const data = await res.json();
    if (data?.success) router.push("/employee/follow-ups");
    else alert(data?.message ?? "Failed to create follow up");
  }

  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold">Add Follow Up</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Due</label>
          <input value={dueAt} onChange={(e) => setDueAt(e.target.value)} type="datetime-local" className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-white">Create</button>
        </div>
      </form>
    </div>
  );
}
