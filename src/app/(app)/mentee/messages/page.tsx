"use client";

import { useState } from "react";
import { PageShell, StatusBadge } from "@/components/app/ui";
import { MESSAGE_THREADS } from "@/data/mock/messages";

export default function MenteeMessagesPage() {
  const [activeId, setActiveId] = useState(MESSAGE_THREADS[0].id);
  const active = MESSAGE_THREADS.find((t) => t.id === activeId)!;

  return (
    <PageShell title="Messages" description="Async mentor conversations (static mock).">
      <div className="grid lg:grid-cols-[280px_1fr] gap-4 min-h-[480px]">
        <div className="rounded-2xl border border-line bg-white overflow-hidden">
          {MESSAGE_THREADS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`w-full text-left px-4 py-3 border-b border-line last:border-0 ${
                activeId === t.id ? "bg-signal-soft" : "hover:bg-line-subtle/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm text-ink truncate">{t.peerName}</p>
                <span className="font-mono text-[10px] text-ink/40">{t.time}</span>
              </div>
              <p className="text-[11px] text-ink/45 truncate">{t.peerRole}</p>
              <p className="text-xs text-ink/60 truncate mt-1">{t.lastMessage}</p>
              {t.unread > 0 && (
                <StatusBadge tone="success">{t.unread} new</StatusBadge>
              )}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-line bg-white flex flex-col">
          <div className="px-5 py-4 border-b border-line">
            <p className="font-display font-semibold text-ink">{active.peerName}</p>
            <p className="text-xs text-ink/50">{active.peerRole}</p>
          </div>
          <div className="flex-1 p-5 space-y-3 overflow-y-auto">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "ml-auto bg-forest text-paper"
                    : "bg-line-subtle text-ink"
                }`}
              >
                <p>{m.text}</p>
                <p
                  className={`text-[10px] mt-1 font-mono ${
                    m.from === "me" ? "text-paper/60" : "text-ink/40"
                  }`}
                >
                  {m.time}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-line">
            <input
              placeholder="Type a message (demo — not sent)"
              className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
