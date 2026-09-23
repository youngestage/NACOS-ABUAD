"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { statusLabel } from "@/lib/auth/guards";
import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";

export default function MentorApplicationPage() {
  const { user, getApplications } = useAuth();
  const apps = getApplications().filter(
    (a) => a.email === user?.email || a.userId === user?.id
  );
  const app = apps[0];
  const status = user?.mentorStatus ?? "pending";

  const steps = [
    { key: "submitted", label: "Application submitted", done: true },
    {
      key: "review",
      label: "Committee review",
      done: status === "approved" || status === "rejected",
      current: status === "pending",
    },
    {
      key: "decision",
      label:
        status === "rejected"
          ? "Rejected"
          : status === "approved"
            ? "Approved — mentoring unlocked"
            : "Awaiting decision",
      done: status === "approved" || status === "rejected",
    },
  ];

  return (
    <PageShell
      title="Mentor application"
      description="Track your NACOS committee review status."
    >
      <div className="max-w-xl space-y-5">
        <SoftPanel
          title={user?.fullName}
          subtitle={`${user?.level} · ${user?.specialization ?? user?.track} · ${user?.matricNumber}`}
          actions={
            <StatusBadge
              tone={
                status === "approved"
                  ? "success"
                  : status === "rejected"
                    ? "danger"
                    : "warning"
              }
            >
              {statusLabel(status)}
            </StatusBadge>
          }
        >
          {app && (
            <p className="text-xs text-ink/40">
              Submitted {new Date(app.submittedAt).toLocaleDateString()}
            </p>
          )}
          {status === "pending" && (
            <p className="mt-3 text-sm text-ink/60">
              Typically reviewed within 48 hours. Sign in as Admin and approve
              this application to unlock the full mentor desk.
            </p>
          )}
        </SoftPanel>

        <SoftPanel title="Status timeline">
          <ol className="space-y-4">
            {steps.map((s) => {
              const Icon = s.done ? CheckCircle2 : s.current ? Clock : Circle;
              return (
                <li key={s.key} className="flex items-start gap-3">
                  <Icon
                    className={`mt-0.5 h-5 w-5 ${
                      s.done
                        ? "text-forest"
                        : s.current
                          ? "text-gold"
                          : "text-ink/25"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      s.done || s.current
                        ? "font-medium text-ink"
                        : "text-ink/40"
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </SoftPanel>
      </div>
    </PageShell>
  );
}
