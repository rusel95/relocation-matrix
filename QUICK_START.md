# ⚡ Relocation Matrix — Quick Start (5 Minutes)

## Step 1: Supabase (2 min)

```bash
# 1. Go to https://supabase.com
# 2. Create new project (wait 1-2 min)
# 3. Go to SQL Editor
# 4. Paste all content from supabase-schema.sql
# 5. Hit "Run"
```

### Get API Keys
- Go to Settings → API
- Copy: `Project URL` and `anon public key`

## Step 2: Local Setup (2 min)

```bash
cp .env.example .env.local
# Edit .env.local:
# REACT_APP_SUPABASE_URL=paste_url_here
# REACT_APP_SUPABASE_ANON_KEY=paste_key_here

npm install
npm start
```

Open http://localhost:3000 🎉

## Step 3: Test (1 min)

- [ ] Landing page loads
- [ ] Click "Start Exploring"
- [ ] Matrix displays (40 cities)
- [ ] Adjust weights
- [ ] Scores update

---

## Deploy to Vercel (2 min)

```bash
# 1. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/relocation-matrix.git
git push -u origin main

# 2. Go to vercel.com
# 3. Import GitHub repo
# 4. Add environment variables (same as .env.local)
# 5. Deploy!
```

---

## Done! 🚀

Your Relocation Matrix is live!

**Next:**
- Share link in ProductHunt
- Post on Reddit (r/expats)
- Tweet about it

For details, see README.md or SETUP_GUIDE.md
