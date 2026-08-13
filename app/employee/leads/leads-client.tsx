"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface Lead {
  id: string;
  leadId: string;
  name: string;
  mobile: string;
  email: string;
  companyName?: string;
  selectedPlan: string;
  planPrice: number;
  status: string;
  createdAt: string;
  notes: Array<{ id: string; note: string; createdAt: string }>;
}

export function EmployeeLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState("");
  const [newNote, setNewNote] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "50",
        ...(status && { status }),
      });

      const response = await fetch(`/api/leads?${params}`);
      const data = await response.json();

      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;

    try {
      const response = await fetch(`/api/leads/${selectedLead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });

      if (response.ok) {
        setNewNote("");
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    contacted: leads.filter((l) => l.status === "CONTACTED").length,
    followUp: leads.filter((l) => l.status === "FOLLOW_UP").length,
    converted: leads.filter((l) => l.status === "CONVERTED").length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-5">
        <StatCard label="My Leads" value={stats.total} />
        <StatCard label="New" value={stats.new} highlight="blue" />
        <StatCard label="Contacted" value={stats.contacted} highlight="purple" />
        <StatCard label="Follow Up" value={stats.followUp} highlight="orange" />
        <StatCard label="Converted" value={stats.converted} highlight="green" />
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setStatus("")}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            status === ""
              ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
              : "bg-slate-900/50 border border-white/10 text-slate-300 hover:text-white"
          }`}
        >
          All
        </button>
        {["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "LOST"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              status === s
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : "bg-slate-900/50 border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex h-48 items-center justify-center text-slate-400">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-slate-400">
            No leads found.
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className="rounded-lg border border-white/10 bg-slate-900/70 p-4 cursor-pointer hover:bg-slate-900/90 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white truncate">
                      {lead.name}
                    </h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getStatusBadgeColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    <div>
                      <span className="text-slate-500">Mobile: </span>
                      <a href={`tel:${lead.mobile}`} className="text-white hover:text-blue-300">
                        {lead.mobile}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Plan: </span>
                      <span className="text-white">{lead.selectedPlan}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Email: </span>
                      <a href={`mailto:${lead.email}`} className="text-white hover:text-blue-300 truncate">
                        {lead.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500">Date: </span>
                      <span className="text-white">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 flex-shrink-0" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
          <div className="my-8 max-w-2xl w-full rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                <p className="text-sm text-slate-400">{selectedLead.leadId}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Details Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] text-slate-400">Email</label>
                  <p className="mt-1 text-white">
                    <a href={`mailto:${selectedLead.email}`} className="hover:text-blue-300">
                      {selectedLead.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] text-slate-400">Mobile</label>
                  <p className="mt-1 text-white">
                    <a href={`tel:${selectedLead.mobile}`} className="hover:text-blue-300">
                      {selectedLead.mobile}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] text-slate-400">Company</label>
                  <p className="mt-1 text-white">{selectedLead.companyName || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] text-slate-400">Selected Plan</label>
                  <p className="mt-1 text-white">
                    {selectedLead.selectedPlan} — ₹{selectedLead.planPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div className="border-t border-white/10 pt-4">
                <label className="text-xs uppercase tracking-[0.1em] text-slate-400">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="FOLLOW_UP">Follow Up</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              {/* Notes Section */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                <h3 className="font-semibold text-white">Follow-up Notes</h3>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {selectedLead.notes.length === 0 ? (
                    <div className="text-sm text-slate-500">No notes yet.</div>
                  ) : (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="rounded-lg bg-slate-950/50 p-3 text-sm">
                        <p className="text-white">{note.note}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a follow-up note..."
                    rows={3}
                    className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: string;
}) {
  const highlightClass = {
    blue: "border-blue-400/20 bg-blue-500/10",
    purple: "border-purple-400/20 bg-purple-500/10",
    orange: "border-orange-400/20 bg-orange-500/10",
    green: "border-green-400/20 bg-green-500/10",
  };

  return (
    <div
      className={`rounded-lg border ${highlightClass[highlight as keyof typeof highlightClass] || "border-white/10 bg-slate-950/50"} p-4`}
    >
      <div className="text-xs uppercase tracking-[0.1em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-300 border border-blue-400/20",
    CONTACTED: "bg-purple-500/10 text-purple-300 border border-purple-400/20",
    FOLLOW_UP: "bg-orange-500/10 text-orange-300 border border-orange-400/20",
    CONVERTED: "bg-green-500/10 text-green-300 border border-green-400/20",
    LOST: "bg-red-500/10 text-red-300 border border-red-400/20",
  };
  return colors[status] || colors.NEW;
}
