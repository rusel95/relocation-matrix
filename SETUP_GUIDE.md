# 🚀 Relocation Matrix — Setup Guide

## ⚡ 5-Minute Quick Start

### 1. **Supabase Setup**
- Go to https://supabase.com → Create new project
- Copy your project URL & anon key
- Go to SQL Editor → Paste content from `supabase-schema.sql` → Run
- Go to Auth → Providers → Enable Google OAuth
  - Add redirect: `http://localhost:3000/auth/callback`
  - Add redirect: `https://your-domain.vercel.app/auth/callback` (for production)

### 2. **Environment Variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJxx...
```

### 3. **Install & Run**
```bash
npm install
npm start
```

Open http://localhost:3000

---

## 🌐 Deploy to Vercel

### 1. Push to GitHub
```bash
git remote add origin https://github.com/rusel95/relocation-matrix.git
git push -u origin main
```

### 2. Deploy on Vercel
- Go to https://vercel.com
- Import GitHub repo
- Add environment variables (same as `.env.local`)
- Deploy!

### 3. Configure OAuth Callback
- Update Supabase → Auth → Providers → Google
- Add: `https://relocation-matrix-xxx.vercel.app/auth/callback`

---

## 🔧 Configuration Checklist

- [ ] Supabase project created
- [ ] `supabase-schema.sql` executed
- [ ] Google OAuth configured
- [ ] `.env.local` filled with API keys
- [ ] `npm install` completed
- [ ] `npm start` runs without errors
- [ ] Login modal appears on click
- [ ] Matrix displays all 40 cities
- [ ] Weight sliders work & scores update in real-time
- [ ] Can compare multiple cities

---

## 📱 Testing

### Desktop
```bash
npm start
# Open http://localhost:3000
# Test: Sign in → Interact with matrix → Compare cities
```

### Mobile
```bash
npm start
# On phone: http://your-laptop-ip:3000
# Test: Responsive grid → Touch sliders → Compare
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `REACT_APP_SUPABASE_URL is undefined` | Check `.env.local` file — must start with `REACT_APP_` |
| "Google OAuth not working" | Verify redirect URL in Supabase matches your domain |
| "Cities data not loading" | Check `public/cities.json` exists and is valid JSON |
| "TypeError: Cannot read weights" | Clear browser cache → Restart dev server |

---

## 📊 Data Refresh (Optional)

To update city scores after new data:

1. Modify `public/cities.json`
2. Restart dev server
3. Component auto-refreshes

---

## 🚢 Production Checklist

- [ ] Environment variables set on Vercel
- [ ] RLS policies tested
- [ ] Google OAuth redirect updated
- [ ] Performance tested on slow 3G
- [ ] Mobile responsive verified
- [ ] Privacy policy created
- [ ] Terms of Service created

---

**Ready to ship? 🚀**
