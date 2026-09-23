export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">About CivicBridge AI</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        CivicBridge AI is a civic innovation network that connects citizens with the people best equipped to
        solve real societal problems — university researchers, domain experts, and industry partners.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Traditional complaint systems route a problem to a department and stop at a status update. CivicBridge AI
        treats every submitted problem as a research opportunity: AI classifies it, checks for duplicates, scores its
        severity and priority, and identifies which university department, faculty, and industry partner are best
        equipped to solve it — with transparent, human-readable reasoning at every step.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        The full lifecycle stays visible to everyone involved — the citizen who reported it, the researchers working
        on it, and the officials reviewing it — from the moment a problem is submitted to the moment its real-world
        impact is verified.
      </p>

      <div className="mt-10 rounded-xl2 border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
        All challenge, university, and citizen data shown here is illustrative.
      </div>
    </div>
  );
}
