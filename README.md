# CivicBridge AI

**From Public Problems to Real Solutions.**

A civic innovation network that converts real societal problems into AI-matched university research
challenges — with industry collaboration and government oversight — rather than routing complaints to
a department and stopping at a status update. Built for SIH26043.

## What's included

```
/frontend     React + Vite + TypeScript + Tailwind — the full working product (start here)
/backend      Express + Mongoose API skeleton (runs in demo mode without MongoDB)
/ai-service   FastAPI microservice skeleton (deterministic mock AI, swappable for a real model)
```

## Quickest way to see it: the frontend alone

The frontend is fully self-contained. It ships with deterministic mock AI, demo Jharkhand data, and
localStorage-backed session/demo persistence, so it runs completely standalone — no backend or AI
service required.

```bash
cd frontend
npm install
npm run dev
```

Open the printed local URL. Click **"Try Demo"** on the login page, or just click **Report a problem**
and use "Log in" → any demo account (citizen / university / government / industry / admin — see
Login page for the exact demo emails).

### Try the core story
1. Home → **Report a problem** → fill in the wizard → watch AI analysis → see university matches → submit.
2. You land on **Track** page for your new challenge ID — the full milestone timeline.
3. Visit **/ai-matching** to see the weighted scoring engine and a worked example.
4. Log in as each demo role to see the Citizen, University, Government, and Industry dashboards.

## Running the backend (optional)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Without `MONGODB_URI` set, every route falls back to an in-memory demo store automatically — the API
never breaks just because a database isn't provisioned.

## Running the AI service (optional)

```bash
cd ai-service
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Ships with a deterministic keyword-based classifier/matcher so it works with zero API keys. Swap the
bodies of `app/services/nlp_engine.py` and `matching_engine.py` for real LLM/embedding calls when ready
— the route contracts (`/ai/analyze-problem`, `/ai/match-university`, etc.) stay the same.

## Design principles this build follows

- **Not another complaint portal.** Every problem is classified, deduplicated, scored, and routed to
  the university/department/expert best equipped to research and solve it — with transparent,
  human-readable reasoning at every step (see any "Why this match?" panel).
- **Demo-mode-first.** Nothing crashes if Mongo, a real AI provider, or a maps API key isn't configured.
  The frontend's `src/services/*` modules are the single abstraction boundary — swap mock logic for
  real API calls there without touching any page or component.
- **The full lifecycle is visible.** Citizen → AI → University → Industry → Government → Impact →
  Citizen feedback is walkable end-to-end from the homepage, `/how-it-works`, `/ai-matching`, and any
  `/track/:id` page.

## Notes

- All challenge, university, and citizen data is **prototype / demonstration data** and does not
  represent real complaints or official records.
- Demo submissions persist to `localStorage` only, per browser session.
