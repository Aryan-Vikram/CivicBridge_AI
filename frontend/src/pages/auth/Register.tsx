import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, GraduationCap, Landmark, Factory } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../types";

const roles: { role: Role; label: string; icon: typeof User; desc: string }[] = [
  { role: "citizen", label: "Citizen", icon: User, desc: "Report problems and track their progress" },
  { role: "university", label: "University", icon: GraduationCap, desc: "Accept challenges and lead research" },
  { role: "government", label: "Government", icon: Landmark, desc: "Oversee and coordinate implementation" },
  { role: "industry", label: "Industry", icon: Factory, desc: "Support and scale prototype solutions" },
];

const dashboardPath: Record<Role, string> = {
  citizen: "/citizen/dashboard",
  university: "/university/dashboard",
  government: "/government/dashboard",
  industry: "/industry/dashboard",
  admin: "/government/dashboard",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("citizen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await register(name, email, role);
    setLoading(false);
    navigate(dashboardPath[user.role]);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose the role that best describes you.</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <button
            key={r.role}
            onClick={() => setRole(r.role)}
            className={
              "rounded-xl2 border p-4 text-left transition " +
              (role === r.role
                ? "border-royal-400 bg-royal-50 dark:border-royal-500/50 dark:bg-royal-500/10"
                : "border-slate-200 hover:border-slate-300 dark:border-white/10")
            }
          >
            <r.icon size={18} className={role === r.role ? "text-royal-600" : "text-slate-400"} />
            <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{r.label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{r.desc}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
          />
        </div>
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
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-royal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-royal-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account? <Link to="/login" className="font-medium text-royal-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
