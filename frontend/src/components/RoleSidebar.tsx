import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export interface SidebarLink {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export function RoleSidebar({ title, links }: { title: string; links: SidebarLink[] }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white dark:border-white/10 dark:bg-navy-800 lg:flex">
      <div className="flex-1 px-3 py-6">
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
      </div>

      {/* Always-visible account footer with logout — no hunting through menus */}
      <div className="border-t border-slate-100 p-3 dark:border-white/10">
        {user && (
          <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-royal-600 text-xs font-semibold text-white">
              {user.avatarInitials}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{user.name}</div>
              <div className="truncate text-xs capitalize text-slate-400 dark:text-slate-500">{user.role}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-crimson-600 transition hover:bg-crimson-50 dark:hover:bg-crimson-500/10"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}
