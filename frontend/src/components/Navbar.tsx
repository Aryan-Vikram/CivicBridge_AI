import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Bell, ChevronDown, LogOut, LayoutDashboard, FilePlus2 } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  // close the account dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setOpen(false);
    navigate("/");
  };

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

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-white/5"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-600 text-xs font-semibold text-white">
                    {user.avatarInitials}
                  </span>
                  <ChevronDown size={14} className={"text-slate-400 transition-transform " + (menuOpen ? "rotate-180" : "")} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-card dark:border-white/10 dark:bg-navy-800">
                    <div className="border-b border-slate-100 px-3 py-2.5 dark:border-white/10">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{user.name}</div>
                      <div className="truncate text-xs text-slate-400 dark:text-slate-500">{user.email}</div>
                      <div className="mt-1 inline-block rounded-full bg-royal-50 px-2 py-0.5 text-[10px] font-medium capitalize text-royal-700 dark:bg-royal-500/10 dark:text-royal-400">
                        {user.role}
                      </div>
                    </div>
                    <Link
                      to={dashboardPath[user.role]}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link
                      to="/report"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      <FilePlus2 size={15} /> Report a problem
                    </Link>
                    <div className="my-1 h-px bg-slate-100 dark:bg-white/10" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-crimson-600 hover:bg-crimson-50 dark:hover:bg-crimson-500/10"
                    >
                      <LogOut size={15} /> Log out
                    </button>
                  </div>
                )}
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
          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-white/5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-600 text-sm font-semibold text-white">
                {user.avatarInitials}
              </span>
              <div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{user.name}</div>
                <div className="text-xs capitalize text-slate-400 dark:text-slate-500">{user.role}</div>
              </div>
            </div>
          )}

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
              <>
                <Link
                  to={dashboardPath[user.role]}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-royal-600"
                >
                  <LayoutDashboard size={16} /> Go to dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-crimson-600"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
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
