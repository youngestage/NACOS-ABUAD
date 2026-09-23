"use client";

import { PageShell, SoftPanel, DataTable, ProgressBar, StatusBadge, type Column } from "@/components/app/ui";
import { ASSIGNED_MENTEES, type AssignedMentee } from "@/data/mock/mentor-ops";

export default function MentorMenteesPage() {
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
    { key: "lastActive", header: "Active" },
  ];

  return (
    <PageShell
      title="Your mentees"
      description="Assigned learners and milestone progress."
    >
      <SoftPanel title="Roster" subtitle={`${ASSIGNED_MENTEES.length} mentees`}>
        <DataTable
          columns={columns}
          rows={ASSIGNED_MENTEES}
          rowKey={(m) => m.id}
        />
      </SoftPanel>
    </PageShell>
  );
}
