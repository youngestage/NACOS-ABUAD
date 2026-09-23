"use client";

import { PageShell, ProgressBar, StatusBadge } from "@/components/app/ui";
import { ASSIGNED_MENTEES } from "@/data/mock/mentor-ops";

export default function MentorMenteesPage() {
  return (
    <PageShell
      title="Your mentees"
      description="Assigned learners and milestone progress."
    >
      <div className="rounded-2xl border border-line bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-line-subtle/80 text-left font-mono text-[11px] uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Mentee</th>
              <th className="px-4 py-3 hidden sm:table-cell">Track</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3 hidden md:table-cell">Next</th>
              <th className="px-4 py-3 hidden lg:table-cell">Active</th>
            </tr>
          </thead>
          <tbody>
            {ASSIGNED_MENTEES.map((m) => (
              <tr key={m.id} className="border-t border-line">
                <td className="px-4 py-4">
                  <p className="font-medium text-ink">{m.name}</p>
                  <p className="text-xs text-ink/45">{m.level}</p>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <StatusBadge tone="info">{m.track}</StatusBadge>
                </td>
                <td className="px-4 py-4 min-w-[140px]">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-ink/45">
                      {m.progress}%
                    </span>
                    <ProgressBar value={m.progress} />
                  </div>
                </td>
                <td className="px-4 py-4 text-ink/65 hidden md:table-cell">
                  {m.nextMilestone}
                </td>
                <td className="px-4 py-4 text-ink/45 hidden lg:table-cell">
                  {m.lastActive}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
