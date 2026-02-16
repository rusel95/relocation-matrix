# Relocation Matrix — Complete Deployment Guide

This guide automates the entire deployment process for Relocation Matrix using CLI tools.

## Prerequisites

Ensure you have installed:
- `gh` (GitHub CLI)
- `npm` / `node`
- Internet connection + GitHub/Supabase/Vercel accounts

## Step 1: Authenticate with GitHub

```bash
gh auth login
# Select: GitHub.com
# Select: HTTPS
# Paste your GitHub Personal Access Token (PAT)
# Verify authentication
gh auth status
```

**Create PAT if needed:**
- Go to https://github.com/settings/tokens/new
- Select: `repo`, `workflow`, `delete_repo`
- Copy token and paste into CLI

## Step 2: Create GitHub Repository

```bash
cd /data/workspace/relocation-matrix

# Create public repository and push code
gh repo create relocation-matrix \
  --public \
  --source=. \
  --remote=origin \
  --push

# Verify
gh repo view relocation-matrix
```

**Output:** `https://github.com/rusel95/relocation-matrix`

## Step 3: Setup Supabase Project

### Option A: Using Supabase Dashboard (Manual)

1. Go to https://supabase.com/dashboard
2. Create new project or use existing: `uusvwweeihhfhdhmgoli`
3. Go to SQL Editor → New Query
4. Copy-paste entire content from `supabase-schema.sql`
5. Run query
6. Get credentials from Project Settings → API:
   - Supabase URL: `https://uusvwweeihhfhdhmgoli.supabase.co`
   - Anon Key: (copy from dashboard)

### Option B: Using Supabase CLI (Automated)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref uusvwweeihhfhdhmgoli

# Run migrations
supabase db push < supabase-schema.sql

# Or create migration
supabase migration new create_relocation_matrix_schema
# Copy schema.sql content into migrations/
supabase db push
```

## Step 4: Configure Environment Variables

Create `.env.local` in root (already done, but verify):

```bash
cat > .env.local <<EOF
REACT_APP_SUPABASE_URL=https://uusvwweeihhfhdhmgoli.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<YOUR_ANON_KEY_HERE>
REACT_APP_VERCEL_ENV=production
EOF
```

## Step 5: Setup Google OAuth in Supabase

1. **Create Google OAuth Credentials:**
   - Go to https://console.cloud.google.com
   - Create new project
   - Go to Credentials → Create OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (local dev)
     - `https://<your-vercel-domain>/auth/callback` (production)

2. **Configure in Supabase:**
   - Supabase Dashboard → Authentication → Providers
   - Enable Google
   - Paste Client ID & Client Secret

## Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Authenticate
vercel login

# Deploy project
vercel --prod

# Set environment variables in Vercel
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY

# Redeploy with env vars
vercel --prod
```

**Output:** `https://relocation-matrix.vercel.app`

## Step 7: Enable GitHub Actions CI/CD

Already configured in `.github/workflows/deploy.yml`

The workflow:
- Triggers on push to master
- Runs tests (if added)
- Deploys to Vercel automatically

Verify:
```bash
gh workflow list -R rusel95/relocation-matrix
gh workflow view deploy.yml -R rusel95/relocation-matrix
```

## Step 8: Local Testing

```bash
cd /data/workspace/relocation-matrix

# Install dependencies
npm install

# Start development server
npm start

# App opens at http://localhost:3000
# Test: Sign up with Google OAuth, create profile, save, share
```

## Step 9: Verify Production Deployment

```bash
# Check Vercel deployment
vercel ls

# Check GitHub Actions runs
gh run list -R rusel95/relocation-matrix --limit 5

# Check Supabase dashboard for new users/profiles
```

## Automated One-Liner Deployment (For CI/CD)

```bash
#!/bin/bash
set -e

# GitHub
gh auth status || gh auth login
gh repo create relocation-matrix --public --source=. --remote=origin --push

# Supabase
supabase link --project-ref uusvwweeihhfhdhmgoli
supabase db push < supabase-schema.sql

# Vercel
vercel login
vercel --prod

# GitHub Actions
gh workflow enable deploy.yml -R rusel95/relocation-matrix

echo "✅ Deployment complete!"
echo "🌍 Live at: https://relocation-matrix.vercel.app"
echo "📊 GitHub: https://github.com/rusel95/relocation-matrix"
```

## Troubleshooting

### GitHub auth fails
```bash
gh auth logout
gh auth login  # Start fresh
```

### Supabase schema errors
- Check SQL Editor error message
- Ensure UUID extension exists
- Verify RLS policies are enabled

### Vercel deployment fails
```bash
vercel logs --prod  # Check deployment logs
vercel env ls       # Verify env vars set
vercel --prod --debug
```

### Google OAuth not working
- Verify redirect URLs match exactly
- Check Google OAuth credentials are in Supabase
- Test with: http://localhost:3000 (dev) first

## Post-Deployment

1. **Update README:**
   ```bash
   git checkout master
   echo "# Relocation Matrix - Live at https://relocation-matrix.vercel.app" >> README.md
   git add README.md && git commit -m "docs: update with live URL"
   git push origin master
   ```

2. **Enable GitHub Pages (optional):**
   ```bash
   gh repo edit --enable-pages
   ```

3. **Setup CDN (optional):**
   - Vercel auto-handles CDN via Edge Network

## Commands Reference

| Task | Command |
|------|---------|
| Create GitHub repo | `gh repo create relocation-matrix --public --source=. --push` |
| Link Supabase | `supabase link --project-ref PROJECT_REF` |
| Run migrations | `supabase db push` |
| Deploy to Vercel | `vercel --prod` |
| Check deployment | `gh run list -R owner/repo` |
| View logs | `vercel logs --prod` |
| Local dev | `npm start` |

## Success Criteria ✅

- [ ] GitHub repo created & code pushed
- [ ] Supabase tables created with RLS
- [ ] `.env.local` configured with credentials
- [ ] Google OAuth credentials in Supabase
- [ ] Vercel deployment live
- [ ] GitHub Actions CI/CD active
- [ ] Local `npm start` works
- [ ] Can sign up → create profile → save → share

---

**Questions?** Check individual CLI documentation:
- `gh help`
- `vercel help`
- `supabase help`
