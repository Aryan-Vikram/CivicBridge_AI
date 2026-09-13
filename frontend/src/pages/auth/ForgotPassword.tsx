import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
      {sent ? (
        <>
          <MailCheck size={32} className="mx-auto text-emerald2-500" />
          <h1 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">Check your email</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            If an account exists for {email}, we've sent a reset link. (Demo mode — no email is actually sent.)
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Enter your email and we'll send you a reset link.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-6 space-y-3 text-left"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus-ring w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
            />
            <button type="submit" className="w-full rounded-lg bg-royal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-royal-700">
              Send reset link
            </button>
          </form>
        </>
      )}
      <Link to="/login" className="mt-6 inline-block text-sm font-medium text-royal-600 hover:underline">Back to log in</Link>
    </div>
  );
}
