"use client";

import { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

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
  assignedTo?: { id: string; name: string; email: string } | null;
  createdAt: string;
}

export function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
        ...(status && { status }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/leads?${params}`);
      const data = await response.json();

      if (data.success) {
        setLeads(data.leads);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status, sortBy, sortOrder]);

  const handleAssign = async (leadId: string, assignedToId: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedToId }),
      });

      if (response.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (error) {
      console.error("Failed to assign lead:", error);
    }
  };

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

  const pages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Leads" value={total} />
        <StatCard
          label="New"
          value={leads.filter((l) => l.status === "NEW").length}
        />
        <StatCard
          label="Contacted"
          value={leads.filter((l) => l.status === "CONTACTED").length}
        />
        <StatCard
          label="Follow Up"
          value={leads.filter((l) => l.status === "FOLLOW_UP").length}
        />
        <StatCard
          label="Converted"
          value={leads.filter((l) => l.status === "CONVERTED").length}
        />
      </div>

      {/* Filters & Search */}
      <div className="rounded-lg border border-white/10 bg-slate-900/70 p-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-white/10 bg-slate-950/50 py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-white/10 bg-slate-950/50 py-2 px-3 text-sm text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="FOLLOW_UP">Follow Up</option>
            <option value="CONVERTED">Converted</option>
            <option value="LOST">Lost</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-950/50 py-2 px-3 text-sm text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="createdAt">Date Created</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="selectedPlan">Plan</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-950/50 py-2 px-3 text-sm text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/70">
        {loading ? (
          <div className="flex h-48 items-center justify-center text-slate-400">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-slate-400">
            No leads found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-white/10 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Lead ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-white/5 hover:bg-slate-900/50 transition"
                >
                  <td className="px-4 py-3 text-sm font-mono text-blue-300">
                    {lead.leadId}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    <a
                      href={`tel:${lead.mobile}`}
                      className="hover:text-blue-300"
                    >
                      {lead.mobile}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {lead.selectedPlan}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {lead.assignedTo?.name || "Unassigned"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 disabled:opacity-50 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`h-9 w-9 rounded-lg border text-sm font-semibold transition ${
                    page === pageNum
                      ? "border-blue-400 bg-blue-500/10 text-blue-300"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(Math.min(pages, page + 1))}
            disabled={page === pages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 disabled:opacity-50 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Lead Details Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onAssign={handleAssign}
          onStatusChange={handleStatusChange}
          onRefresh={fetchLeads}
        />
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
      <div className="text-xs uppercase tracking-[0.1em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
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

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onAssign: (leadId: string, assignedToId: string) => void;
  onStatusChange: (leadId: string, status: string) => void;
  onRefresh: () => void;
}

function LeadDetailsModal({
  lead,
  onClose,
  onAssign,
  onStatusChange,
  onRefresh,
}: LeadDetailsModalProps) {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/leads/${lead.id}`);
      const data = await response.json();
      if (data.success) {
        setNotes(data.lead.notes || []);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`/api/leads/${lead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });

      if (response.ok) {
        setNewNote("");
        fetchNotes();
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
      <div className="my-8 max-w-2xl w-full rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{lead.name}</h2>
            <p className="text-sm text-slate-400">{lead.leadId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Email
              </label>
              <p className="mt-1 text-white">{lead.email}</p>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Mobile
              </label>
              <p className="mt-1 text-white">
                <a href={`tel:${lead.mobile}`} className="hover:text-blue-300">
                  {lead.mobile}
                </a>
              </p>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Company
              </label>
              <p className="mt-1 text-white">{lead.companyName || "N/A"}</p>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Selected Plan
              </label>
              <p className="mt-1 text-white">
                {lead.selectedPlan} — ₹{lead.planPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status & Assignment */}
          <div className="grid gap-4 sm:grid-cols-2 border-t border-white/10 pt-4">
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Status
              </label>
              <select
                value={lead.status}
                onChange={(e) => onStatusChange(lead.id, e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="FOLLOW_UP">Follow Up</option>
                <option value="CONVERTED">Converted</option>
                <option value="LOST">Lost</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-slate-400">
                Assign To
              </label>
              <select
                onChange={(e) => onAssign(lead.id, e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white"
                defaultValue=""
              >
                <option value="">Select Employee</option>
                {/* This would normally load employees from an API */}
              </select>
            </div>
          </div>

          {/* Notes Section */}
          <div className="border-t border-white/10 pt-4 space-y-4">
            <h3 className="font-semibold text-white">Follow-up Notes</h3>

            {loadingNotes ? (
              <div className="text-sm text-slate-400">Loading notes...</div>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {notes.length === 0 ? (
                  <div className="text-sm text-slate-500">No notes yet.</div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-lg bg-slate-950/50 p-3 text-sm"
                    >
                      <p className="text-white">{note.note}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

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
  );
}
