"use client";

import { useState } from "react";
import {
  PageShell,
  SoftPanel,
  SoftInput,
  StatusBadge,
} from "@/components/app/ui";
import { MESSAGE_THREADS } from "@/data/mock/messages";

export default function MentorMessagesPage() {
  const [activeId, setActiveId] = useState(MESSAGE_THREADS[0].id);
  const active = MESSAGE_THREADS.find((t) => t.id === activeId)!;

  return (
    <PageShell title="Messages" description="Conversations with your mentees.">
      <div className="grid min-h-[480px] gap-5 lg:grid-cols-[280px_1fr]">
        <SoftPanel className="overflow-hidden !p-0">
          <div className="border-b border-soft px-6 py-4">
            <h2 className="text-base font-semibold text-ink">Threads</h2>
          </div>
          {MESSAGE_THREADS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`w-full border-b border-soft px-5 py-3.5 text-left last:border-0 ${
                activeId === t.id ? "bg-soft-tint" : "hover:bg-soft-muted/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-ink">
                  {t.peerName}
                </p>
                <span className="text-[10px] text-ink/40">{t.time}</span>
              </div>
              <p className="mt-1 truncate text-xs text-ink/55">{t.lastMessage}</p>
              {t.unread > 0 && (
                <div className="mt-1">
                  <StatusBadge tone="success">{t.unread} new</StatusBadge>
                </div>
              )}
            </button>
          ))}
        </SoftPanel>
        <SoftPanel title={active.peerName}>
          <div className="space-y-3">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-soft px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "ml-auto bg-forest text-paper"
                    : "bg-soft-muted text-ink"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-soft pt-4">
            <SoftInput placeholder="Reply (demo)" />
          </div>
        </SoftPanel>
      </div>
    </PageShell>
  );
}
