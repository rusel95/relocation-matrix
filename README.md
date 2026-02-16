# 🌍 Relocation Matrix

**Data-driven relocation comparison for 40 global cities. 17 criteria. Personalized scoring.**

Live: https://relocation-matrix.vercel.app

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Supabase account (free tier works)

### Setup

1. **Clone & install**
```bash
git clone <repo>
cd relocation-matrix
npm install
```

2. **Supabase Setup**
   - Create Supabase project
   - Run `supabase-schema.sql` in SQL editor
   - Copy API keys to `.env`

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

3. **Configure Google OAuth**
   - Go to Supabase → Auth → Providers → Google
   - Add redirect URL: `http://localhost:3000/auth/callback`

4. **Start dev server**
```bash
npm start
```

---

## 📋 Features

### ✅ Core MVP
- 40 global cities ranked by 17 criteria
- **Super-weighted** criteria (×10): Purchasing Power, Language Barrier, Career, Visa Ease
- **Standard criteria** (1-5): Safety, QoL, Education, Climate, etc.
- Real-time scoring recalculation
- Compare 3+ cities side-by-side
- Personalized salary input (for purchasing power)

### 🔐 Auth
- Email + Password signup/login
- Google OAuth
- Supabase Row Level Security (RLS)

### 💾 Profiles (Coming Soon)
- Save custom weight profiles
- Public share links
- Profile history

---

## 📊 Data Sources

- **City Safety**: Global Peace Index 2025
- **Cost of Living**: Numbeo
- **Tech Salaries**: Glassdoor
- **HDI**: UN Human Development Index
- **Tax Rates**: IMF World Economic Outlook
- **Passport Strength**: Henley Passport Index 2025

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Hosting**: Vercel (free tier)
- **State**: React Hooks + Context

---

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile: iOS 12+, Android 8+

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
```bash
npm run build
# Deploy the `build/` directory
```

---

## 📝 Contributing

Contributions welcome! Submit PRs for:
- City data updates
- UI improvements
- New criteria
- Bug fixes

---

## 📄 License

MIT — Feel free to fork & modify

---

**Made with 🌍 by Ruslan Popesku**
