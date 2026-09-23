import React from "react";
import Link from "next/link";
import { ChevronRight, RotateCcw } from "lucide-react";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type Breadcrumb = { label: string; href?: string };

/** Neiopay-style page header: large title, subtitle, actions, optional crumbs. */
export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink/45">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="rounded-md px-1 py-0.5 transition-colors hover:text-forest"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={cn("px-1 py-0.5", isLast && "text-ink/60")}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="h-3.5 w-3.5 text-ink/30" />}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <h1 className="truncate font-display text-[28px] font-semibold leading-tight tracking-tight text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-sm leading-relaxed text-ink/55">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div>
        )}
      </div>
    </header>
  );
}

/** Page root: `space-y-6` + PageHeader. Prefer SoftPanel for sections inside. */
export function PageShell({
  title,
  description,
  actions,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 pb-4">
      <PageHeader
        title={title}
        subtitle={description}
        actions={actions}
        breadcrumbs={breadcrumbs}
      />
      {children}
    </div>
  );
}

export function SoftCard({
  children,
  className,
  tint = "plain",
  padding = "md",
}: {
  children: React.ReactNode;
  className?: string;
  tint?: "brand" | "muted" | "plain";
  padding?: "sm" | "md" | "lg";
}) {
  const tints = {
    brand: "bg-soft-tint",
    muted: "bg-soft-muted",
    plain: "bg-soft-surface",
  };
  const paddings = { sm: "p-4", md: "p-5", lg: "p-6" };
  return (
    <div className={cn("rounded-soft", tints[tint], paddings[padding], className)}>
      {children}
    </div>
  );
}

/** Titled section surface — no nested bordered cards. */
export function SoftPanel({
  title,
  subtitle,
  actions,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const hasHeader = Boolean(title || subtitle || actions);
  return (
    <section className={cn("rounded-soft bg-soft-surface p-6", className)}>
      {hasHeader && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title && (
              <h2 className="truncate text-base font-semibold tracking-tight text-ink">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-sm text-ink/55">{subtitle}</p>}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-soft bg-soft-surface p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink/55">{label}</p>
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-tint text-forest">
            {icon}
          </span>
        )}
      </div>
      <p className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink">
        {value}
      </p>
      {hint && <p className="text-xs text-ink/45">{hint}</p>}
    </div>
  );
}

export function FilterBar({
  children,
  onReset,
  className,
}: {
  children: React.ReactNode;
  onReset?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("rounded-soft bg-soft-surface p-4", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          {children}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-ink/55 transition-colors hover:bg-soft-muted hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export function SoftInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full min-w-[180px] rounded-soft-sm bg-soft-muted px-3.5 text-sm text-ink outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-forest/25",
        className
      )}
    />
  );
}

export function SoftSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 min-w-[140px] rounded-soft-sm bg-soft-muted px-3.5 text-sm text-ink outline-none focus:ring-2 focus:ring-forest/25",
        className
      )}
    >
      {children}
    </select>
  );
}

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  className?: string;
};

const ALIGN = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

/** Borderless ops table — wrap in SoftPanel for a title. */
export function DataTable<T>({
  columns,
  rows,
  empty,
  onRowClick,
  rowKey,
  dense = false,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: React.ReactNode;
  onRowClick?: (row: T) => void;
  rowKey?: (row: T, i: number) => string;
  dense?: boolean;
  className?: string;
}) {
  const cellPadding = dense ? "px-4 py-2.5" : "px-4 py-4";

  if (rows.length === 0) {
    return (
      <div className={className}>
        {empty ?? (
          <EmptyState
            title="No records found"
            description="Try adjusting your filters or check back later."
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("-mx-1 overflow-x-auto px-1", className)}>
      <table className="w-full min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={cn(
                  "whitespace-nowrap border-b border-soft pb-3 pt-0 text-xs font-medium uppercase tracking-wide text-ink/40",
                  "px-4",
                  ALIGN[column.align ?? "left"]
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={rowKey ? rowKey(row, index) : index}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "transition-colors",
                onRowClick && "cursor-pointer hover:bg-soft-muted/70"
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "border-b border-soft align-middle text-ink/65",
                    cellPadding,
                    ALIGN[column.align ?? "left"],
                    column.className
                  )}
                >
                  {column.render
                    ? column.render(row)
                    : String(
                        (row as Record<string, unknown>)[column.key] ?? "—"
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold tracking-tight text-ink">{title}</h2>
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
    neutral: "bg-soft-raised text-ink/70",
    success: "bg-signal-soft text-forest",
    warning: "bg-gold-light text-[#7A5A14]",
    danger: "bg-red-50 text-red-700",
    info: "bg-soft-tint text-forest",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 overflow-hidden rounded-full bg-soft-muted">
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
    <div className="rounded-soft bg-soft-muted/50 px-6 py-12 text-center">
      <p className="font-semibold text-ink">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-md text-sm text-ink/55">{description}</p>
      )}
    </div>
  );
}

export function SoftButton({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "ghost";
}) {
  const variants = {
    primary: "bg-forest text-paper hover:bg-forest-light",
    soft: "bg-soft-muted text-ink hover:bg-soft-raised",
    ghost: "text-ink/60 hover:bg-soft-muted hover:text-ink",
  };
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors disabled:opacity-40",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
