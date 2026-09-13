import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-6xl font-bold text-royal-600">404</div>
      <h1 className="mt-3 font-display text-xl font-semibold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-6 rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal-700">
        Back to home
      </Link>
    </div>
  );
}
