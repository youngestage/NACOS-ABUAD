"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PageShell,
  SoftPanel,
  SoftInput,
  StatusBadge,
  EmptyState,
} from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { fetchThreads, sendMessage, type ThreadSummary } from "@/lib/data/messages";

export default function MenteeMessagesPage() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    const t = await fetchThreads(user.id);
    setThreads(t);
    setActiveId((current) => current ?? t[0]?.id ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const active = threads.find((t) => t.id === activeId);

  const handleSend = async () => {
    if (!user || !active || !draft.trim()) return;
    const text = draft.trim();
    setDraft("");
    await sendMessage(active.id, user.id, text);
    await load();
  };

  if (!loading && threads.length === 0) {
    return (
      <PageShell title="Messages" description="Async mentor conversations.">
        <EmptyState
          title="No conversations yet"
          description="Once you're matched with a mentor, your thread will show up here."
        />
      </PageShell>
    );
  }

  return (
    <PageShell title="Messages" description="Async mentor conversations.">
      <div className="grid min-h-[480px] gap-5 lg:grid-cols-[280px_1fr]">
        <SoftPanel title="Threads" className="!p-0 overflow-hidden">
          <div className="border-b border-soft px-6 py-4">
            <h2 className="text-base font-semibold text-ink">Threads</h2>
          </div>
          {threads.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`w-full border-b border-soft px-5 py-3.5 text-left last:border-0 ${
                activeId === t.id ? "bg-soft-tint" : "hover:bg-soft-muted/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-ink">{t.peerName}</p>
                <span className="text-[10px] text-ink/40">{t.time}</span>
              </div>
              <p className="truncate text-[11px] text-ink/40">{t.peerRole}</p>
              <p className="mt-1 truncate text-xs text-ink/55">{t.lastMessage}</p>
            </button>
          ))}
        </SoftPanel>

        {active && (
          <SoftPanel title={active.peerName} subtitle={active.peerRole} className="flex flex-col">
            <div className="flex-1 space-y-3">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] rounded-soft px-4 py-2.5 text-sm ${
                    m.from === "me" ? "ml-auto bg-forest text-paper" : "bg-soft-muted text-ink"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-paper/60" : "text-ink/40"}`}>
                    {m.time}
                  </p>
                </div>
              ))}
              {active.messages.length === 0 && (
                <StatusBadge tone="neutral">No messages yet — say hello.</StatusBadge>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="mt-4 flex gap-2 border-t border-soft pt-4"
            >
              <SoftInput
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message"
                className="flex-1"
              />
            </form>
          </SoftPanel>
        )}
      </div>
    </PageShell>
  );
}
