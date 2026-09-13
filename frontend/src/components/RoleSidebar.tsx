import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface SidebarLink {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export function RoleSidebar({ title, links }: { title: string; links: SidebarLink[] }) {
  return (
    <aside className="hidden w-60 flex-shrink-0 border-r border-slate-200 bg-white px-3 py-6 dark:border-white/10 dark:bg-navy-800 lg:block">
      <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{title}</div>
      <nav className="flex flex-col gap-0.5">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition " +
              (isActive
                ? "bg-royal-50 text-royal-700 dark:bg-royal-500/10 dark:text-royal-400"
                : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5")
            }
          >
            <l.icon size={16} />
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
