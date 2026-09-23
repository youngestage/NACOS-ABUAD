"use client";

import { useState } from "react";
import {
  PageShell,
  SoftPanel,
  SoftInput,
  StatusBadge,
} from "@/components/app/ui";
import { MESSAGE_THREADS } from "@/data/mock/messages";

export default function MenteeMessagesPage() {
  const [activeId, setActiveId] = useState(MESSAGE_THREADS[0].id);
  const active = MESSAGE_THREADS.find((t) => t.id === activeId)!;

  return (
    <PageShell title="Messages" description="Async mentor conversations.">
      <div className="grid min-h-[480px] gap-5 lg:grid-cols-[280px_1fr]">
        <SoftPanel title="Threads" className="!p-0 overflow-hidden">
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
              <p className="truncate text-[11px] text-ink/40">{t.peerRole}</p>
              <p className="mt-1 truncate text-xs text-ink/55">{t.lastMessage}</p>
              {t.unread > 0 && (
                <div className="mt-1">
                  <StatusBadge tone="success">{t.unread} new</StatusBadge>
                </div>
              )}
            </button>
          ))}
        </SoftPanel>

        <SoftPanel
          title={active.peerName}
          subtitle={active.peerRole}
          className="flex flex-col"
        >
          <div className="flex-1 space-y-3">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-soft px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "ml-auto bg-forest text-paper"
                    : "bg-soft-muted text-ink"
                }`}
              >
                <p>{m.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    m.from === "me" ? "text-paper/60" : "text-ink/40"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-soft pt-4">
            <SoftInput placeholder="Type a message (demo — not sent)" className="w-full" />
          </div>
        </SoftPanel>
      </div>
    </PageShell>
  );
}
