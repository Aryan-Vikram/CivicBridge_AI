import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../types";

const demoAccounts: { role: Role; email: string; label: string }[] = [
  { role: "citizen", email: "citizen@civicbridge.ai", label: "Citizen" },
  { role: "university", email: "university@civicbridge.ai", label: "University" },
  { role: "government", email: "government@civicbridge.ai", label: "Government" },
  { role: "industry", email: "industry@civicbridge.ai", label: "Industry" },
  { role: "admin", email: "admin@civicbridge.ai", label: "Admin" },
];

const dashboardPath: Record<Role, string> = {
  citizen: "/citizen/dashboard",
  university: "/university/dashboard",
  government: "/government/dashboard",
  industry: "/industry/dashboard",
  admin: "/government/dashboard",
};

export default function Login() {
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await login(email, password);
    setLoading(false);
    navigate(dashboardPath[user.role]);
  };

  const handleDemo = async (role: Role) => {
    setLoading(true);
    await loginDemo(role);
    setLoading(false);
    navigate(dashboardPath[role]);
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Log in to CivicBridge AI</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track challenges, manage research, or monitor impact.</p>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-royal-600 hover:underline">Forgot password?</Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-royal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-royal-700 disabled:opacity-60"
        >
          <LogIn size={15} /> {loading ? "Signing in..." : "Log in"}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /> or try a demo account <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {demoAccounts.map((d) => (
          <button
            key={d.role}
            onClick={() => handleDemo(d.role)}
            disabled={loading}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:border-royal-300 hover:text-royal-600 disabled:opacity-60 dark:border-white/10 dark:text-slate-200"
          >
            Try {d.label} demo
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Don't have an account? <Link to="/register" className="font-medium text-royal-600 hover:underline">Register</Link>
      </p>
    </div>
  );
}
