import type { NotificationItemType } from "../types";

export const notifications: NotificationItemType[] = [
  { id: "n1", message: "Your problem CB-JH-2026-10452 was AI verified.", type: "success", timestamp: "46 days ago", read: true, challengeId: "c-10452" },
  { id: "n2", message: "Your challenge was matched with BIT Mesra (94% match).", type: "info", timestamp: "44 days ago", read: true, challengeId: "c-10452" },
  { id: "n3", message: "BIT Mesra accepted your challenge.", type: "success", timestamp: "42 days ago", read: true, challengeId: "c-10452" },
  { id: "n4", message: "Research team was formed for your challenge.", type: "info", timestamp: "40 days ago", read: true, challengeId: "c-10452" },
  { id: "n5", message: "New milestone completed: Solution Proposed.", type: "success", timestamp: "20 days ago", read: true, challengeId: "c-10452" },
  { id: "n6", message: "Prototype testing started for your challenge.", type: "info", timestamp: "3 days ago", read: false, challengeId: "c-10452" },
  { id: "n7", message: "Government approved field pilot for a nearby challenge.", type: "success", timestamp: "1 day ago", read: false },
];
