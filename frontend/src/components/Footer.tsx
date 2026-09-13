import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo size={26} />
              <span className="font-display text-sm font-bold text-slate-900 dark:text-white">CivicBridge AI</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">From public problems to real solutions.</p>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">SIH26043 · Software Track · Prototype demonstration</p>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/explore" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Explore</Link></li>
              <li><Link to="/how-it-works" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">How it works</Link></li>
              <li><Link to="/universities" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Universities</Link></li>
              <li><Link to="/industry" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Industry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/impact" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Impact</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">About</Link></li>
              <li><Link to="/privacy" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Privacy</Link></li>
              <li><Link to="/terms" className="text-slate-600 hover:text-royal-600 dark:text-slate-300">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} CivicBridge AI. Prototype for demonstration purposes.</span>
          <span>Built for Smart India Hackathon</span>
        </div>
      </div>
    </footer>
  );
}
