import { notifications as seed } from "../data/notifications";
import type { NotificationItemType } from "../types";

// Mirrors GET /api/notifications
let store: NotificationItemType[] = [...seed];

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const notificationService = {
  async getAll() {
    return delay([...store], 200);
  },
  async markRead(id: string) {
    store = store.map((n) => (n.id === id ? { ...n, read: true } : n));
    return delay(store, 100);
  },
  async unreadCount() {
    return delay(store.filter((n) => !n.read).length, 100);
  },
};
