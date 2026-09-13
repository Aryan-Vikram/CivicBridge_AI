export function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        This is a hackathon prototype. No real personal data is collected, stored, or shared outside your browser —
        demo submissions are kept only in your local session storage. A production deployment would publish a full
        privacy policy here covering data collection, retention, and citizen rights.
      </p>
    </div>
  );
}

export function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Terms of Use</h1>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        CivicBridge AI is a prototype built for SIH26043 demonstration purposes. All challenge, university, and
        citizen data shown is illustrative and does not represent real complaints, official records, or binding
        commitments from any institution.
      </p>
    </div>
  );
}
