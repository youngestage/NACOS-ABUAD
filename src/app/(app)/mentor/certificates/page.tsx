"use client";

import { Award } from "lucide-react";
import { PageShell, SoftPanel, SoftButton, StatusBadge } from "@/components/app/ui";
import { ASSIGNED_MENTEES } from "@/data/mock/mentor-ops";

const SIGNABLE = ASSIGNED_MENTEES.map((m, i) => ({
  id: `cert-${m.id}`,
  mentee: m.name,
  title: `${m.track} Milestone ${i === 2 ? "II" : "I"}`,
  ready: m.progress >= 60,
}));

export default function MentorCertificatesPage() {
  return (
    <PageShell
      title="Sign certificates"
      description="Issue NACOS milestone credentials for mentees who completed phase gates."
    >
      <SoftPanel title="Ready to sign">
        <ul className="divide-y divide-[var(--line-subtle)]">
          {SIGNABLE.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <Award className={`h-6 w-6 ${c.ready ? "text-gold" : "text-ink/25"}`} />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-ink">{c.title}</h3>
                <p className="text-xs text-ink/45">{c.mentee}</p>
              </div>
              <StatusBadge tone={c.ready ? "success" : "neutral"}>
                {c.ready ? "Ready to sign" : "Not ready"}
              </StatusBadge>
              <SoftButton disabled={!c.ready} className="shrink-0">
                Sign
              </SoftButton>
            </li>
          ))}
        </ul>
      </SoftPanel>
    </PageShell>
  );
}
