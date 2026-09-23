"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, StatusBadge } from "@/components/app/ui";

export default function AdminApplicationsPage() {
  const { getApplications, approveApplication, rejectApplication } = useAuth();
  const apps = getApplications();

  return (
    <PageShell
      title="Mentor applications"
      description="Approve or reject applicants. Approvals unlock the mentor desk for that user."
    >
      <div className="space-y-3">
        {apps.map((a) => (
          <article
            key={a.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col lg:flex-row lg:items-center gap-4"
          >
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-semibold text-ink">{a.fullName}</h3>
                <StatusBadge
                  tone={
                    a.status === "approved"
                      ? "success"
                      : a.status === "rejected"
                        ? "danger"
                        : "warning"
                  }
                >
                  {a.status}
                </StatusBadge>
              </div>
              <p className="text-xs text-ink/50">
                {a.email} · {a.matricNumber} · {a.level} · {a.specialization}
              </p>
              {a.note && <p className="text-sm text-ink/65 mt-2">{a.note}</p>}
              <p className="font-mono text-[11px] text-ink/35">
                {new Date(a.submittedAt).toLocaleString()}
              </p>
            </div>
            {a.status === "pending" && (
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => approveApplication(a.id)}
                  className="rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5 hover:bg-forest-light"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => rejectApplication(a.id)}
                  className="rounded-xl border border-line text-sm font-semibold px-4 py-2.5 hover:bg-red-50 hover:text-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
