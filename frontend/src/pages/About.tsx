export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">About CivicBridge AI</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        CivicBridge AI is a civic innovation network built for Smart India Hackathon problem statement SIH26043 — a digital
        platform to crowdsource societal challenges and facilitate collaborative problem solving through university and
        industry partnerships.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Traditional complaint systems route a problem to a department and stop at a status update. CivicBridge AI treats every
        submitted problem as a research opportunity: AI classifies it, checks for duplicates, scores its severity and priority,
        and identifies which university department, faculty, and industry partner are best equipped to solve it — with
        transparent reasoning at every step.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        This build is a working prototype. It runs entirely on deterministic mock AI and demonstration data so the full
        experience — submission, matching, tracking, dashboards for every role — works without any external services connected.
        The service layer is structured so real AI models, a production database, and live institutional data can be plugged in
        without changing the interface.
      </p>

      <div className="mt-10 rounded-xl2 border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
        SIH26043 · Software Track · Prototype demonstration. All challenge, university, and citizen data shown is
        illustrative and does not represent real complaints or official government records.
      </div>
    </div>
  );
}
