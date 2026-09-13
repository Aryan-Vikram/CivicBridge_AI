import { useEffect, useState } from "react";
import { notificationService } from "../services/notificationService";
import { NotificationItemRow } from "../components/NotificationItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import type { NotificationItemType } from "../types";

export default function Notifications() {
  const [items, setItems] = useState<NotificationItemType[] | null>(null);

  useEffect(() => {
    notificationService.getAll().then(setItems);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Every update on your challenges, in one place.</p>

      <div className="mt-6 space-y-2.5">
        {items === null ? (
          <LoadingSkeleton rows={4} />
        ) : items.length === 0 ? (
          <EmptyState title="No notifications yet" description="You'll see updates here as soon as something changes on your challenges." />
        ) : (
          items.map((n) => <NotificationItemRow key={n.id} item={n} />)
        )}
      </div>
    </div>
  );
}
