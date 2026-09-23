"use client";

import { useEffect, useState } from "react";
import { PageShell, SoftPanel, DataTable, ProgressBar, StatusBadge, EmptyState, type Column } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { fetchAssignedMentees, type AssignedMentee } from "@/lib/data/mentees";

export default function MentorMenteesPage() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState<AssignedMentee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchAssignedMentees(user.id).then((m) => {
      setMentees(m);
      setLoading(false);
    });
  }, [user]);

  const columns: Column<AssignedMentee>[] = [
    {
      key: "name",
      header: "Mentee",
      render: (m) => (
        <div>
          <p className="font-medium text-ink">{m.name}</p>
          <p className="text-xs text-ink/45">{m.level}</p>
        </div>
      ),
    },
    {
      key: "track",
      header: "Track",
      render: (m) => <StatusBadge tone="info">{m.track}</StatusBadge>,
    },
    {
      key: "progress",
      header: "Progress",
      render: (m) => (
        <div className="min-w-[120px] space-y-1">
          <span className="text-xs text-ink/45">{m.progress}%</span>
          <ProgressBar value={m.progress} />
        </div>
      ),
    },
    { key: "nextMilestone", header: "Next" },
    {
      key: "matchStatus",
      header: "Status",
      render: (m) => (
        <StatusBadge tone={m.matchStatus === "active" ? "success" : "warning"}>
          {m.matchStatus}
        </StatusBadge>
      ),
    },
  ];

  return (
    <PageShell
      title="Your mentees"
      description="Matched learners and milestone progress."
    >
      {!loading && mentees.length === 0 ? (
        <EmptyState
          title="No mentees yet"
          description="Mentee match requests will show up here."
        />
      ) : (
        <SoftPanel title="Roster" subtitle={`${mentees.length} mentees`}>
          <DataTable columns={columns} rows={mentees} rowKey={(m) => m.id} />
        </SoftPanel>
      )}
    </PageShell>
  );
}
