"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFollowUpPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [entry, setEntry] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueAt, setDueAt] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/followups").then((r) => r.json()).then((data) => {
      const found = (data.data || []).find((f: any) => f.id === id);
      if (found) {
        setEntry(found);
        setTitle(found.title || "");
        setNotes(found.notes || "");
        setDueAt(found.dueAt ? new Date(found.dueAt).toISOString().slice(0, 16) : "");
      }
    });
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/followups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, notes, dueAt }),
    });
    const data = await res.json();
    if (data?.success) router.push("/employee/follow-ups");
    else alert(data?.message ?? "Failed to save");
  }

  if (!entry) return <div className="card p-5">Loading...</div>;

  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold">Edit Follow Up</h3>
      <form onSubmit={handleSave} className="mt-4 space-y-4">
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
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}
