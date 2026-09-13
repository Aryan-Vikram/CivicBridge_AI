import { useAuth } from "../../context/AuthContext";
import { MapPin, FileText, CheckCircle2, Star } from "lucide-react";

export default function CitizenProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>

      <div className="mt-6 flex items-center gap-4 rounded-xl2 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-navy-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-lg font-semibold text-white">
          {user?.avatarInitials ?? "U"}
        </div>
        <div>
          <div className="font-display text-lg font-semibold text-slate-900 dark:text-white">{user?.name ?? "Citizen"}</div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><MapPin size={13} /> Ranchi, Jharkhand</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Problems submitted", value: 3, icon: FileText },
          { label: "Challenges solved", value: 1, icon: CheckCircle2 },
          { label: "Contribution score", value: 78, icon: Star },
          { label: "Evidence submitted", value: 6, icon: FileText },
        ].map((s) => (
          <div key={s.label} className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
            <s.icon size={15} className="text-royal-500" />
            <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl2 border border-slate-200 p-6 dark:border-white/10">
        <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Account details</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Email</span><span className="text-slate-800 dark:text-slate-100">{user?.email}</span></div>
          <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Role</span><span className="capitalize text-slate-800 dark:text-slate-100">{user?.role}</span></div>
        </div>
      </div>
    </div>
  );
}
