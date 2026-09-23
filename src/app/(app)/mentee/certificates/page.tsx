"use client";

import { Award, Lock } from "lucide-react";
import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";
import { CERTIFICATES } from "@/data/mock/milestones";

export default function MenteeCertificatesPage() {
  return (
    <PageShell
      title="Certificates"
      description="Milestone credentials signed by NACOS."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATES.map((c) => (
          <SoftPanel
            key={c.id}
            title={c.title}
            subtitle={c.track}
            actions={
              <StatusBadge tone={c.earned ? "success" : "neutral"}>
                {c.earned ? "Earned" : "Locked"}
              </StatusBadge>
            }
          >
            <div className="mb-2">
              {c.earned ? (
                <Award className="h-6 w-6 text-gold" />
              ) : (
                <Lock className="h-5 w-5 text-ink/30" />
              )}
            </div>
            {c.earned && (
              <p className="text-[11px] text-ink/40">
                {c.date} · {c.signedBy}
              </p>
            )}
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
