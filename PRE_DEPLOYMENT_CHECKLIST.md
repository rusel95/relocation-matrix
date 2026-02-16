# 🚀 Pre-Deployment Checklist

**Last Updated:** 2026-02-16 21:00 UTC  
**Build Status:** ✅ COMPLETE  
**Ready to Deploy:** YES

---

## Phase 1: Local Verification (You)

- [ ] Have Supabase API keys ready
- [ ] Have GitHub account with repo pushed
- [ ] Have Vercel account ready
- [ ] `.env.local` created with Supabase keys

### Test Locally
```bash
npm install
npm start
```

- [ ] Landing page loads
- [ ] "Start Exploring" button works
- [ ] Matrix view shows 40 cities
- [ ] Weight sliders adjust scores
- [ ] Can select cities to compare
- [ ] Sign in modal appears
- [ ] No console errors

---

## Phase 2: Backend Setup (Supabase)

### Create Project
- [ ] Go to https://supabase.com
- [ ] Click "New Project"
- [ ] Choose region (Europe recommended)
- [ ] Wait for deployment (~2 min)

### Run Database Schema
- [ ] Go to SQL Editor
- [ ] Create new query
- [ ] Paste all content from `supabase-schema.sql`
- [ ] Click "Run"
- [ ] Verify 5 tables created

### Configure Auth
- [ ] Go to Auth → Providers → Google
- [ ] Add redirect URL:
  - Local: `http://localhost:3000/auth/callback`
  - Production: `https://relocation-matrix.vercel.app/auth/callback`

### Get API Keys
- [ ] Go to Settings → API
- [ ] Copy "Project URL"
- [ ] Copy "anon public key"
- [ ] Paste into `.env.local`

---

## Phase 3: GitHub Setup

### Push to GitHub
- [ ] Initialize git repo
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Relocation Matrix MVP"
  ```
- [ ] Create repo on GitHub
- [ ] Add remote and push
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/relocation-matrix.git
  git push -u origin main
  ```

---

## Phase 4: Vercel Deployment

### Create Vercel Project
- [ ] Go to https://vercel.com
- [ ] Click "New Project"
- [ ] Import GitHub repo
- [ ] Select `relocation-matrix`

### Set Environment Variables
- [ ] Add `REACT_APP_SUPABASE_URL`
- [ ] Add `REACT_APP_SUPABASE_ANON_KEY`

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (~3 min)
- [ ] Check deployment status

### Verify Live
- [ ] Open live URL
- [ ] Test landing page
- [ ] Test matrix
- [ ] Test sign in

---

## Phase 5: Post-Deployment Testing

### Functionality
- [ ] Landing page loads
- [ ] All 40 cities display
- [ ] Weight sliders work
- [ ] Scores update real-time
- [ ] Comparison view works
- [ ] Sign up with email works
- [ ] Sign in with Google works
- [ ] Can save profiles
- [ ] Can load profiles
- [ ] Can share profiles
- [ ] Share links are unique
- [ ] No 404 errors

### Performance
- [ ] First paint < 2s
- [ ] City ranking updates < 100ms
- [ ] No console errors
- [ ] No network failures

### Mobile
- [ ] Landing page responsive
- [ ] Matrix responsive
- [ ] No horizontal scroll
- [ ] Touch sliders work
- [ ] Auth modal works

### Browser Support
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Mobile Safari ✅
- [ ] Chrome Mobile ✅

---

## Phase 6: Update OAuth Callbacks

### Supabase
- [ ] Update Google OAuth redirect to live domain
- [ ] Test sign in on live site

### GitHub OAuth (Optional)
- [ ] Add GitHub OAuth if desired
- [ ] Test sign in

---

## Phase 7: Pre-Launch Marketing

### Content Ready
- [ ] ProductHunt description written
- [ ] Reddit post drafted
- [ ] Twitter thread outlined
- [ ] Landing page copy reviewed
- [ ] FAQ section complete

### Assets Ready
- [ ] Logo/favicon ready
- [ ] Screenshot/demo video ready
- [ ] Social preview image ready

---

## Phase 8: Launch Day

### Morning
- [ ] Double-check everything works
- [ ] Run performance audit
- [ ] Test on 3G connection
- [ ] Verify all links work

### Noon
- [ ] Submit to ProductHunt
- [ ] Post on Twitter
- [ ] Submit to Reddit (r/expats, r/digitalnomad)

### Evening
- [ ] Check metrics
- [ ] Respond to comments
- [ ] Note any bugs for next iteration

---

## 🎯 Success Criteria (Week 1)

| Metric | Target |
|--------|--------|
| Unique visitors | 500+ |
| Sign-ups | 50+ |
| Avg session | 3+ min |
| ProductHunt votes | 100+ |
| GitHub stars | 50+ |

---

## 🚨 If Something Breaks

### 404 on Matrix View
- [ ] Check that `src/components/Matrix/Matrix.tsx` exists
- [ ] Verify Vercel build logs
- [ ] Check that imports are correct

### Auth Not Working
- [ ] Verify Supabase API keys in `.env`
- [ ] Check OAuth redirect URL in Supabase
- [ ] Test on different browser

### Scores Not Updating
- [ ] Check that `cities.json` loaded correctly
- [ ] Verify weight state updates (React DevTools)
- [ ] Check console for errors

### Share Links Broken
- [ ] Verify Supabase database has `shared_profiles` table
- [ ] Check that share token is unique
- [ ] Test on different browser

---

## ✅ Final Sign-Off

- [ ] All boxes above checked
- [ ] Live site verified working
- [ ] Performance acceptable
- [ ] No critical bugs
- [ ] Ready to announce

---

## 🎉 Ready to Ship!

**All systems go.** 🚀

Next: Tell the world! 📢
