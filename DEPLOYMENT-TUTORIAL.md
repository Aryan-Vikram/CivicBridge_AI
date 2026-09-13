# CivicBridge AI — Complete Deployment Tutorial (Zero to Live)

This guide assumes no prior deployment experience. Follow it top to bottom and you'll end
with a live, shareable URL. Total time: roughly 1–2 hours the first time.

---

## Part 0 — Understand what you're deploying

Your project has three independent pieces:

| Piece | What it does | Do you need it live? |
|---|---|---|
| `frontend` | The actual website (React) — everything judges/users see and click | **Yes, always** |
| `backend` | An API server (Express) — only needed if you want real accounts/database | Optional |
| `ai-service` | A Python service that does the AI matching | Optional |

**Important:** the frontend already works completely on its own using built-in mock data — it
does not call the backend or AI service at all right now. So the fastest path to a live demo
is deploying just the frontend (Part 3). Parts 5–7 (backend, database, AI service) are only
needed if you later want real user accounts and a real database instead of mock data.

If you're short on time, do **Part 1 → Part 2 → Part 3** and stop there. You'll have a fully
working live demo.

---

## Part 1 — Install the basic tools on your computer

You only do this once, ever.

### 1.1 Install Node.js
Node.js lets you run and build the frontend/backend on your machine.

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (not "Current")
3. Run the installer, click Next through all the defaults
4. Verify it worked — open a terminal (Command Prompt / Terminal / PowerShell) and type:
   ```bash
   node -v
   npm -v
   ```
   You should see version numbers (e.g. `v20.11.0`). If you see "command not found", restart
   your computer and try again.

### 1.2 Install Git
Git tracks your code changes and lets you push code to GitHub.

1. Go to [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install for your OS (defaults are fine)
3. Verify:
   ```bash
   git --version
   ```

### 1.3 Create a GitHub account
GitHub is where your code lives so deployment platforms can find it.

1. Go to [github.com](https://github.com) → Sign up (it's free)
2. Verify your email

### 1.4 (Optional but recommended) Install a code editor
[VS Code](https://code.visualstudio.com/) — free, works everywhere, makes editing files easier.

---

## Part 2 — Get the project onto your computer and running locally

### 2.1 Unzip the project
Unzip `civicbridge-ai.zip` somewhere easy to find, like your Desktop. You'll get a folder
called `civicbridge` containing `frontend`, `backend`, and `ai-service`.

### 2.2 Open a terminal in that folder
- **Windows:** open the `civicbridge` folder in File Explorer, click the address bar, type
  `cmd`, press Enter.
- **Mac:** right-click the `civicbridge` folder in Finder → "New Terminal at Folder" (if you
  don't see this option, open Terminal app and type `cd ` then drag the folder in, then Enter).

### 2.3 Run the frontend
```bash
cd frontend
npm install
```
This downloads all the code libraries the project needs — it will take 1–3 minutes and print a
lot of text. That's normal.

```bash
npm run dev
```
You'll see something like:
```
Local:   http://localhost:5173/
```
Open that link in your browser. **This is your actual website, running on your own computer.**
Click around — Report a Problem, the demo logins, everything works right now, locally.

To stop it later, go back to the terminal and press `Ctrl + C`.

**If something breaks here, fix it before moving on** — deployment just repeats this same
process on someone else's computer, so if it doesn't run locally it won't run live either.

---

## Part 3 — Put your code on GitHub

Deployment platforms (Vercel, Render, etc.) work by connecting to a GitHub repository and
rebuilding your code whenever you push changes.

### 3.1 Create a repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `civicbridge-ai`
3. Keep it **Public** (required for free hosting tiers to work smoothly)
4. Do NOT check "Add a README" (you'll push your own files)
5. Click **Create repository**
6. GitHub will show you a page with commands — keep that tab open

### 3.2 Push your code
Back in your terminal, go to the top-level `civicbridge` folder (not `frontend`):
```bash
cd ..
git init
git add .
git commit -m "Initial commit — CivicBridge AI"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/civicbridge-ai.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your actual GitHub username. It may open a browser window asking
you to log in and authorize — do that.

Refresh your GitHub repository page — you should now see all your project files there.

---

## Part 4 — Deploy the frontend (this alone gives you a live demo link)

We'll use **Vercel** — free, and built specifically for projects like this one.

1. Go to [vercel.com](https://vercel.com) → **Sign up** → choose "Continue with GitHub" (this
   links your accounts automatically)
2. Click **Add New...** → **Project**
3. Find `civicbridge-ai` in the list and click **Import**
4. On the configuration screen:
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** click Edit → select `frontend` → Continue

     *(This step matters — without it, Vercel will try to build the whole repo instead of
     just the frontend folder, and it will fail.)*
   - Leave Build Command and Output Directory on their defaults (`npm run build` / `dist`)
5. Click **Deploy**
6. Wait ~1–2 minutes. You'll see a confetti animation and a link like
   `civicbridge-ai.vercel.app` — **that's your live website.**

Open it. Click through Report a Problem, the demo logins, the AI matching page — it all works,
because everything runs on mock data inside the frontend itself.

**You're done with the essential part.** Everything below is optional and only matters if you
want a real backend, database, and AI service behind it instead of mock data.

### Whenever you make code changes later
```bash
git add .
git commit -m "describe what you changed"
git push
```
Vercel automatically rebuilds and redeploys within a minute of every push. No manual redeploy
step needed.

---

## Part 5 — (Optional) Set up a real database

Only do this if you want real, persistent data instead of the built-in mock data.

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) →
   sign up for free
2. Create a free **M0 cluster** (follow the on-screen setup wizard, any region is fine)
3. Under **Database Access**, click **Add New Database User** — set a username and password
   (write these down)
4. Under **Network Access**, click **Add IP Address** → **Allow Access From Anywhere**
   (`0.0.0.0/0`) — fine for a demo project
5. Click **Connect** on your cluster → **Drivers** → copy the connection string, it looks like:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password. Save this whole string somewhere — you'll
   need it in Part 6.

---

## Part 6 — (Optional) Deploy the backend API

We'll use **Render** — free tier, straightforward for Node.js APIs.

1. Go to [render.com](https://render.com) → sign up with GitHub
2. Click **New +** → **Web Service**
3. Connect your `civicbridge-ai` repository
4. Configure:
   - **Name:** `civicbridge-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Scroll to **Environment Variables** and add these (values from `backend/.env.example`):
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | the connection string from Part 5 (skip if not using a database) |
   | `JWT_SECRET` | any long random string, e.g. `a8f3k2p9x7q1m4z6` |
   | `CLIENT_ORIGIN` | your Vercel URL from Part 4, e.g. `https://civicbridge-ai.vercel.app` |
   | `AI_SERVICE_URL` | leave blank for now, fill in after Part 7 |
6. Click **Create Web Service**. Wait for the build (2–4 minutes).
7. Once live, you'll get a URL like `https://civicbridge-backend.onrender.com`. Test it by
   opening `https://civicbridge-backend.onrender.com/api/health` in your browser — you should
   see `{"status":"ok", ...}`.

*Free Render services "sleep" after 15 minutes of no traffic and take ~30 seconds to wake up on
the next request — normal for a free tier, not a bug.*

---

## Part 7 — (Optional) Deploy the AI microservice

Also on Render, as a second, separate service:

1. **New +** → **Web Service** → same `civicbridge-ai` repo
2. Configure:
   - **Name:** `civicbridge-ai-service`
   - **Root Directory:** `ai-service`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Free
3. No environment variables are required — it runs on deterministic mock logic out of the box.
4. Deploy. Test at `https://civicbridge-ai-service.onrender.com/health`.
5. Go back to your **backend** service on Render → Environment tab → set `AI_SERVICE_URL` to
   this new URL → save (this triggers an automatic redeploy of the backend).

---

## Part 8 — (Optional) Connect the live frontend to the live backend

Right now, even after Parts 5–7, your frontend still uses its own built-in mock data — it
doesn't know your backend exists yet. To actually connect them:

1. In Vercel, open your project → **Settings** → **Environment Variables**
2. Add: `VITE_API_BASE_URL` = your Render backend URL + `/api`, e.g.
   `https://civicbridge-backend.onrender.com/api`
3. Redeploy (Vercel → Deployments tab → click the three dots on the latest deployment →
   Redeploy)
4. In the code, open `frontend/src/services/problemService.ts` (and similarly `aiService.ts`,
   `universityService.ts`) and replace the local demo-data logic with real `fetch()` calls to
   `import.meta.env.VITE_API_BASE_URL`, matching the routes already defined in
   `backend/src/routes/`. Commit and push — Vercel redeploys automatically.

This is the only code change required. It was intentionally isolated to the `services/` folder
so nothing else in the app needs to change.

---

## Part 9 — Final checklist

- [ ] Opening your Vercel URL loads the homepage
- [ ] Report a Problem → AI analysis → matching → submit → Track page all work
- [ ] All demo logins work (citizen / university / government / industry)
- [ ] Dark mode toggle works and persists on refresh
- [ ] Site looks correct on a phone (resize your browser or use DevTools device mode)
- [ ] If backend deployed: `/api/health` returns `200`
- [ ] If AI service deployed: `/health` returns `200`

---

## Part 10 — Common problems and fixes

**"Root Directory" build fails on Vercel/Render**
You forgot to set Root Directory to `frontend` (or `backend`/`ai-service`). Go to Project
Settings → General → Root Directory → fix it → redeploy.

**Vercel build fails with a TypeScript error**
Run `npm run build` locally inside `frontend` first — fix any errors there, commit, push again.

**Render backend won't start**
Check the **Logs** tab on Render — it usually shows the exact missing environment variable or
error. Most common cause: missing `JWT_SECRET`.

**CORS errors in the browser console after connecting frontend to backend**
Your backend's `CLIENT_ORIGIN` env var doesn't match your actual Vercel URL exactly (including
`https://`, no trailing slash). Fix it in Render → Environment → redeploy.

**Site works locally but not after deploying**
Almost always an environment variable that exists in your local `.env` file but wasn't added
to Vercel/Render's dashboard. `.env` files are never uploaded to GitHub (that's intentional,
for security) — you must re-enter each variable manually in each platform's dashboard.

**Free tier backend feels slow on first request**
Expected — Render's free tier spins the service down after inactivity. Upgrade to a paid tier
later if this matters for a real launch.

---

## Optional: custom domain

Once live on Vercel:
1. Buy a domain (Namecheap, Google Domains, GoDaddy — any registrar)
2. In Vercel → Project → Settings → Domains → add your domain
3. Vercel shows you a DNS record to add — go to your domain registrar's DNS settings and add it
4. Wait up to 24 hours for DNS to propagate (usually much faster)

---

You now have everything needed to go from a zip file on your computer to a live, shareable
website — with an optional real backend and database layered in whenever you're ready.
