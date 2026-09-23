"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import type { MentorApplication } from "@/lib/auth/auth-context";
import {
  PageShell,
  SoftPanel,
  FilterBar,
  SoftSelect,
  DataTable,
  StatusBadge,
  SoftButton,
  type Column,
} from "@/components/app/ui";

export default function AdminApplicationsPage() {
  const { getApplications, approveApplication, rejectApplication } = useAuth();
  const apps = getApplications();
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      status === "all" ? apps : apps.filter((a) => a.status === status),
    [apps, status]
  );

  const columns: Column<MentorApplication>[] = [
    {
      key: "fullName",
      header: "Applicant",
      render: (a) => (
        <div>
          <p className="font-medium text-ink">{a.fullName}</p>
          <p className="text-xs text-ink/45">{a.email}</p>
        </div>
      ),
    },
    {
      key: "level",
      header: "Level / Track",
      render: (a) => (
        <span>
          {a.level} · {a.specialization}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => (
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
      ),
    },
    {
      key: "submittedAt",
      header: "Submitted",
      render: (a) => (
        <span className="text-xs text-ink/45">
          {new Date(a.submittedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (a) =>
        a.status === "pending" ? (
          <div className="flex justify-end gap-2">
            <SoftButton
              variant="primary"
              className="h-9 px-3 text-xs"
              onClick={() => approveApplication(a.id)}
            >
              Approve
            </SoftButton>
            <SoftButton
              variant="soft"
              className="h-9 px-3 text-xs"
              onClick={() => rejectApplication(a.id)}
            >
              Reject
            </SoftButton>
          </div>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <PageShell
      title="Mentor applications"
      description="Approve or reject applicants. Approvals unlock the mentor desk."
    >
      <FilterBar onReset={() => setStatus("all")}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink/45">Status</label>
          <SoftSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </SoftSelect>
        </div>
      </FilterBar>

      <SoftPanel title="Queue" subtitle={`${filtered.length} applications`}>
        <DataTable columns={columns} rows={filtered} rowKey={(a) => a.id} />
      </SoftPanel>
    </PageShell>
  );
}
