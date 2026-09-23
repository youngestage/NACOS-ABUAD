import { createClient } from "@/lib/supabase/client";

export interface ThreadMessage {
  id: string;
  from: "me" | "peer";
  text: string;
  time: string;
}

export interface ThreadSummary {
  id: string;
  peerId: string;
  peerName: string;
  peerRole: string;
  lastMessage: string;
  time: string;
  messages: ThreadMessage[];
}

/** All threads the current user participates in, each with its full message list. */
export async function fetchThreads(userId: string): Promise<ThreadSummary[]> {
  const supabase = createClient();
  const { data: threads } = await supabase
    .from("message_threads")
    .select("*")
    .or(`participant_a.eq.${userId},participant_b.eq.${userId}`);

  if (!threads?.length) return [];

  const peerIds = threads.map((t) => (t.participant_a === userId ? t.participant_b : t.participant_a));
  const { data: peers } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .in("id", peerIds);
  const peerMap = new Map((peers ?? []).map((p) => [p.id, p]));

  const { data: allMessages } = await supabase
    .from("messages")
    .select("*")
    .in(
      "thread_id",
      threads.map((t) => t.id)
    )
    .order("created_at", { ascending: true });

  return threads.map((t) => {
    const peerId = t.participant_a === userId ? t.participant_b : t.participant_a;
    const peer = peerMap.get(peerId);
    const messages = (allMessages ?? [])
      .filter((m) => m.thread_id === t.id)
      .map((m) => ({
        id: m.id,
        from: (m.sender_id === userId ? "me" : "peer") as "me" | "peer",
        text: m.body,
        time: new Date(m.created_at).toLocaleString(),
      }));
    const last = messages[messages.length - 1];
    return {
      id: t.id,
      peerId,
      peerName: peer?.full_name ?? "Unknown",
      peerRole: peer?.role ?? "",
      lastMessage: last?.text ?? "",
      time: last?.time ?? "",
      messages,
    };
  });
}

export async function sendMessage(threadId: string, senderId: string, body: string) {
  const supabase = createClient();
  const { error } = await supabase.from("messages").insert({
    thread_id: threadId,
    sender_id: senderId,
    body,
  });
  if (error) throw new Error(error.message);
}

/** Finds or creates the 1:1 thread between the current user and a peer. */
export async function getOrCreateThread(userId: string, peerId: string): Promise<string> {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from("message_threads")
    .select("id")
    .or(
      `and(participant_a.eq.${userId},participant_b.eq.${peerId}),and(participant_a.eq.${peerId},participant_b.eq.${userId})`
    )
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("message_threads")
    .insert({ participant_a: userId, participant_b: peerId })
    .select("id")
    .single();
  if (error || !created) throw new Error(error?.message ?? "Failed to start conversation.");
  return created.id;
}
