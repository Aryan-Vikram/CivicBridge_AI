import { demoStore } from "../utils/demoStore.js";

export function listNotifications(req, res) {
  res.json(demoStore.notifications);
}
