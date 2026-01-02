"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatApplication } from "./formatters";

type ApplicationRow = {
  id: string;
  applicant_name: string | null;
  email: string | null;
  status: string | null;
  submitted_at: string | null;
};

export function ApplicationsTable({ initialApplications }: { initialApplications: ApplicationRow[] }) {
  const [applications, setApplications] = useState<ApplicationRow[]>(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    // Refresh from API to ensure freshest data
    void refresh();
  }, []);

  async function refresh() {
    setError(null);
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    if (!res.ok) {
      setError("Failed to load applications.");
      return;
    }
    const json = (await res.json()) as { data?: ApplicationRow[]; error?: string };
    if (json.error || !json.data) {
      setError(json.error || "Failed to load applications.");
      return;
    }
    setApplications(json.data);
  }

  async function mutate(id: string, method: "DELETE" | "PATCH", action?: "archive" | "transfer") {
    setError(null);
    setLoadingId(id);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "PATCH" ? JSON.stringify({ action }) : undefined,
    });
    setLoadingId(null);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || json.details || "Request failed.");
      return;
    }
    await refresh();
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Applications</h2>
        <p className="text-sm text-muted-foreground">
          Review, archive/transfer, or delete submissions.
        </p>
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-border/70">
        <table className="min-w-full divide-y divide-border/70 text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Applicant</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Submitted</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3 text-foreground">
                  <button
                    type="button"
                    className="text-primary underline-offset-2 hover:underline"
                    onClick={() => openDetail(app.id)}
                  >
                    {app.applicant_name || "—"}
                  </button>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <button
                    type="button"
                    className="text-primary underline-offset-2 hover:underline"
                    onClick={() => openDetail(app.id)}
                  >
                    {app.email || "—"}
                  </button>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{app.status || "new"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loadingId === app.id}
                      onClick={() => mutate(app.id, "PATCH", "archive")}
                    >
                      {loadingId === app.id ? "Archiving..." : "Archive"}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={loadingId === app.id}
                      onClick={() => mutate(app.id, "PATCH", "transfer")}
                    >
                      {loadingId === app.id ? "Transferring..." : "Transfer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      disabled={loadingId === app.id}
                      onClick={() => mutate(app.id, "DELETE")}
                    >
                      {loadingId === app.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={5}>
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detailId && (
        <DetailModal
          loading={detailLoading}
          data={detailData}
          onClose={() => {
            setDetailId(null);
            setDetailData(null);
          }}
        />
      )}
    </div>
  );

  async function openDetail(id: string) {
    setError(null);
    setDetailLoading(true);
    setDetailId(id);
    const res = await fetch(`/api/admin/applications/${id}`, { cache: "no-store" });
    setDetailLoading(false);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || json.details || "Failed to load application.");
      setDetailId(null);
      return;
    }
    const json = (await res.json()) as { data?: any };
    setDetailData(json.data);
  }
}

function DetailModal({
  loading,
  data,
  onClose,
}: {
  loading: boolean;
  data: any;
  onClose: () => void;
}) {
  const sections = data?.data ? formatApplication(data.data) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl border border-border/80 bg-background p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Application Details</h3>
            <p className="text-sm text-muted-foreground">
              {data?.applicant_name || "Applicant"} · {data?.email || "No email"}
            </p>
            <p className="text-xs text-muted-foreground">
              Submitted {data?.submitted_at ? new Date(data.submitted_at).toLocaleString() : "—"}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4">
          {loading && <p className="text-sm text-muted-foreground">Loading application…</p>}
          {!loading && data?.data ? (
            <div className="flex max-h-[520px] flex-col gap-4 overflow-auto pr-1">
              {sections.map((section) => (
                <div key={section.title} className="rounded-lg border border-border/60 bg-background/70 p-3">
                  <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
                  <dl className="mt-2 grid gap-2 text-xs text-foreground sm:grid-cols-2">
                    {section.rows.map((row) => (
                      <div key={row.label} className="space-y-1 rounded-md bg-muted/50 p-2">
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {row.label}
                        </dt>
                        <dd className="whitespace-pre-wrap break-words">{String(row.value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-sm text-muted-foreground">No data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
