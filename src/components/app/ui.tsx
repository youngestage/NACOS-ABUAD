import React from "react";

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-ink/60 font-body max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink/45">
        {label}
      </p>
      <p className="mt-2 font-display font-bold text-2xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </div>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-3">
      <h2 className="font-display font-semibold text-lg text-ink">{title}</h2>
      {action}
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const tones = {
    neutral: "bg-line-subtle text-ink/70",
    success: "bg-signal-soft text-forest",
    warning: "bg-gold-light text-[#7A5A14]",
    danger: "bg-red-50 text-red-700",
    info: "bg-forest/10 text-forest",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 rounded-full bg-line-subtle overflow-hidden">
      <div
        className="h-full rounded-full bg-forest transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center">
      <p className="font-display font-semibold text-ink">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-ink/55 max-w-md mx-auto">{description}</p>
      )}
    </div>
  );
}
