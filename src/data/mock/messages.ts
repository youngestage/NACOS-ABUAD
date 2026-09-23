export interface MessageThread {
  id: string;
  peerName: string;
  peerRole: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: { id: string; from: "me" | "peer"; text: string; time: string }[];
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: "t1",
    peerName: "Chidi Nwosu",
    peerRole: "Mentor · Cybersecurity",
    lastMessage: "Leave a comment on the auth middleware PR when ready.",
    time: "10:24",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "peer",
        text: "Great start on the scaffold. Add input validation next.",
        time: "Yesterday",
      },
      {
        id: "m2",
        from: "me",
        text: "Will do — aiming to push tonight.",
        time: "Yesterday",
      },
      {
        id: "m3",
        from: "peer",
        text: "Leave a comment on the auth middleware PR when ready.",
        time: "10:24",
      },
    ],
  },
  {
    id: "t2",
    peerName: "Amaka Eze",
    peerRole: "Mentor · Fullstack",
    lastMessage: "Your API routes look clean. Let's review caching.",
    time: "Mon",
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "peer",
        text: "Your API routes look clean. Let's review caching.",
        time: "Mon",
      },
    ],
  },
  {
    id: "t3",
    peerName: "NACOS Committee",
    peerRole: "Admin",
    lastMessage: "Welcome to Skills Hub — complete your quiz to get matched.",
    time: "Feb 12",
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "peer",
        text: "Welcome to Skills Hub — complete your quiz to get matched.",
        time: "Feb 12",
      },
    ],
  },
];
