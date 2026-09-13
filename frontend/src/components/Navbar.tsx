import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Logo } from "./Logo";

const links = [
  { to: "/explore", label: "Explore" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/universities", label: "Universities" },
  { to: "/industry", label: "Industry" },
  { to: "/impact", label: "Impact" },
  { to: "/about", label: "About" },
];

const dashboardPath: Record<string, string> = {
  citizen: "/citizen/dashboard",
  university: "/university/dashboard",
  government: "/government/dashboard",
  industry: "/industry/dashboard",
  admin: "/government/dashboard",
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-navy-900/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">CivicBridge <span className="text-royal-600">AI</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "rounded-lg px-3 py-2 text-sm font-medium transition " +
                (isActive ? "text-royal-600 dark:text-royal-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="focus-ring rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/notifications" className="focus-ring relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5">
                <Bell size={17} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-royal-600" />
              </Link>
              <div className="group relative">
                <button className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-white/5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-600 text-xs font-semibold text-white">
                    {user.avatarInitials}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                <div className="invisible absolute right-0 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-card transition group-hover:visible group-hover:opacity-100 dark:border-white/10 dark:bg-navy-800">
                  <Link to={dashboardPath[user.role]} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5">
                    Dashboard
                  </Link>
                  <Link to="/report" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5">
                    Report a problem
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-crimson-600 hover:bg-crimson-50 dark:hover:bg-crimson-500/10"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Log in
              </Link>
              <Link
                to="/report"
                className="rounded-lg bg-royal-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-royal-700"
              >
                Report a problem
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-navy-900 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="my-2 h-px bg-slate-100 dark:bg-white/10" />
            {user ? (
              <Link to={dashboardPath[user.role]} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-royal-600">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Log in
                </Link>
                <Link to="/report" onClick={() => setOpen(false)} className="mt-1 rounded-lg bg-royal-600 px-3 py-2.5 text-center text-sm font-semibold text-white">
                  Report a problem
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
