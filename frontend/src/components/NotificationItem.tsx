import { Link } from "react-router-dom";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import type { NotificationItemType } from "../types";

const iconMap = { success: CheckCircle2, info: Info, warning: AlertTriangle };
const colorMap = {
  success: "text-emerald2-600 bg-emerald2-50 dark:bg-emerald2-500/10",
  info: "text-royal-600 bg-royal-50 dark:bg-royal-500/10",
  warning: "text-amber2-600 bg-amber2-50 dark:bg-amber2-500/10",
};

export function NotificationItemRow({ item }: { item: NotificationItemType }) {
  const Icon = iconMap[item.type];
  const content = (
    <div className={"flex items-start gap-3 rounded-xl border px-4 py-3 transition " + (item.read ? "border-slate-200 dark:border-white/10" : "border-royal-200 bg-royal-50/40 dark:border-royal-500/30 dark:bg-royal-500/5")}>
      <div className={`rounded-full p-1.5 ${colorMap[item.type]}`}>
        <Icon size={14} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-700 dark:text-slate-200">{item.message}</p>
        <span className="text-xs text-slate-400 dark:text-slate-500">{item.timestamp}</span>
      </div>
      {!item.read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-royal-500" />}
    </div>
  );

  return item.challengeId ? <Link to={`/track/${item.challengeId}`}>{content}</Link> : content;
}
