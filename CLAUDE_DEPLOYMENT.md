# Claude Code — Automated Deployment Instructions

Use these instructions for Claude Code (or any AI assistant) to fully automate Relocation Matrix deployment.

## Prerequisites (Setup by Human)

1. **GitHub Personal Access Token (PAT)**
   - Go to https://github.com/settings/tokens/new
   - Select: `repo`, `workflow`, `delete_repo`
   - Copy token

2. **Supabase Credentials**
   - Project URL: `https://uusvwweeihhfhdhmgoli.supabase.co`
   - Anon Key: (from Project Settings → API)

3. **Vercel Account**
   - Go to https://vercel.com/signup

## Full Automated Deployment Flow

### Phase 1: GitHub Setup (CLI)

```bash
# Authenticate GitHub
export GITHUB_TOKEN="your-pat-here"
gh auth login --with-token < <(echo $GITHUB_TOKEN)
gh auth status

# Create repository & push
cd /data/workspace/relocation-matrix
gh repo create relocation-matrix \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Free SaaS comparing 40 cities with personalized relocation scoring"

# Verify
gh repo view relocation-matrix
GITHUB_REPO_URL=$(gh repo view relocation-matrix --json url -q .url)
echo "GitHub Repository: $GITHUB_REPO_URL"
```

### Phase 2: Environment Setup

```bash
cd /data/workspace/relocation-matrix

# Set Supabase credentials
cat > .env.local <<EOF
REACT_APP_SUPABASE_URL=https://uusvwweeihhfhdhmgoli.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1c3Z3d2VlaWhoZmhkaG1nb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNzU2MTMsImV4cCI6MjA4Njg1MTYxM30.mLzEWq9Hus7ieBHYnGp0_iVMmhItXIFj_9HQ1sygH18
EOF

# Commit
git add .env.local .gitignore
git commit -m "chore: add Supabase environment configuration"
git push origin master
```

### Phase 3: Supabase Schema Deployment

**NOTE: This requires manual step via Dashboard because SQL needs to run in Supabase UI**

```bash
# Option 1: Print schema for manual application
echo "📋 Copy this SQL to Supabase Dashboard → SQL Editor → New Query → Run"
echo "URL: https://uusvwweeihhfhdhmgoli.supabase.co/project/_/sql"
echo ""
cat supabase-schema.sql
echo ""
echo "❌ STOP HERE - Run SQL manually in Supabase Dashboard, then continue"
```

**Manual Step for Human:**
1. Go to https://uusvwweeihhfhdhmgoli.supabase.co/project/_/sql
2. Click "New Query"
3. Copy-paste all content from `supabase-schema.sql`
4. Click "Run"
5. Verify tables appear in Data Editor

### Phase 4: NPM Dependencies & Build

```bash
cd /data/workspace/relocation-matrix

# Install
npm install --legacy-peer-deps

# Build test
npm run build

# Check for errors
if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed - check logs above"
  exit 1
fi
```

### Phase 5: Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# NOTE: Vercel auth requires interactive login or token
# Option A (Interactive): vercel login
# Option B (Token): VERCEL_TOKEN="..." vercel --prod

# Deploy (this may need manual intervention for first-time setup)
vercel --prod --confirm

# Get production URL
VERCEL_URL=$(vercel list --prod 2>/dev/null | grep relocation-matrix | awk '{print $2}')
echo "🚀 Live at: $VERCEL_URL"
```

### Phase 6: GitHub Actions Verification

```bash
# Enable CI/CD workflow
gh workflow enable deploy.yml -R $GITHUB_USER/relocation-matrix

# Check workflow
gh workflow list -R $GITHUB_USER/relocation-matrix
gh run list -R $GITHUB_USER/relocation-matrix --limit 3
```

## Fully Automated One-Shot Script

Save as `full-deploy.sh` and run once:

```bash
#!/bin/bash
set -e

PROJECT_DIR="/data/workspace/relocation-matrix"
cd "$PROJECT_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Step 1: GitHub Setup..."
export GITHUB_TOKEN="${GITHUB_TOKEN:-}"
[ -z "$GITHUB_TOKEN" ] && { echo "❌ GITHUB_TOKEN not set"; exit 1; }
gh auth login --with-token < <(echo $GITHUB_TOKEN) || gh auth status
gh repo create relocation-matrix --public --source=. --remote=origin --push || echo "⚠️  Repo may exist"

echo "Step 2: Environment..."
cat > .env.local <<'EOF'
REACT_APP_SUPABASE_URL=https://uusvwweeihhfhdhmgoli.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1c3Z3d2VlaWhoZmhkaG1nb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNzU2MTMsImV4cCI6MjA4Njg1MTYxM30.mLzEWq9Hus7ieBHYnGp0_iVMmhItXIFj_9HQ1sygH18
EOF
git add .env.local && git commit -m "chore: environment" && git push origin master

echo "Step 3: Build..."
npm install --legacy-peer-deps
npm run build

echo "Step 4: Deploy to Vercel..."
export VERCEL_TOKEN="${VERCEL_TOKEN:-}"
[ -z "$VERCEL_TOKEN" ] && { echo "❌ VERCEL_TOKEN not set"; exit 1; }
vercel --prod --confirm

echo "Step 5: GitHub Actions..."
GITHUB_USER=$(gh api user -q .login)
gh workflow enable deploy.yml -R $GITHUB_USER/relocation-matrix

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "📊 Check: https://github.com/$GITHUB_USER/relocation-matrix"
echo "🚀 Live: https://relocation-matrix.vercel.app (or check Vercel dashboard)"
echo ""
echo "⚠️  MANUAL STEP: Run Supabase schema via Dashboard if not done yet"
```

Run with:
```bash
export GITHUB_TOKEN="your-pat"
export VERCEL_TOKEN="your-vercel-token"
bash full-deploy.sh
```

## Tokens Required

| Service | Token | Where to Get |
|---------|-------|-------------|
| GitHub | PAT | https://github.com/settings/tokens/new |
| Vercel | Token | https://vercel.com/account/tokens |
| Supabase | Already provided | N/A (already in .env.local) |

## Troubleshooting

### "gh: command not found"
```bash
sudo apt-get install gh  # Linux
brew install gh          # macOS
```

### GitHub auth fails
```bash
gh auth logout
export GITHUB_TOKEN="..."
gh auth login --with-token < <(echo $GITHUB_TOKEN)
```

### Vercel deployment fails
```bash
export VERCEL_TOKEN="..."
vercel --prod --confirm
vercel logs --prod  # Check logs
```

### Supabase schema doesn't apply
- Go to Dashboard manually
- Paste SQL into SQL Editor
- Check for error messages
- Run line-by-line if needed

## Post-Deployment Checklist

- [ ] GitHub repo created
- [ ] Code pushed to master
- [ ] Supabase schema applied (tables visible in Data Editor)
- [ ] `.env.local` configured
- [ ] npm build succeeds
- [ ] Vercel deployment live
- [ ] GitHub Actions enabled
- [ ] Google OAuth configured in Supabase (manual)
- [ ] Local `npm start` works
- [ ] Can sign up & create profile in live app

## Commands for Claude Code

Use these exact commands to execute deployment:

```bash
# 1. Setup
cd /data/workspace/relocation-matrix
export GITHUB_TOKEN="provided-by-user"

# 2. GitHub
gh auth login --with-token < <(echo $GITHUB_TOKEN)
gh repo create relocation-matrix --public --source=. --remote=origin --push

# 3. Environment
echo 'REACT_APP_SUPABASE_URL=https://uusvwweeihhfhdhmgoli.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' > .env.local
git add .env.local && git commit -m "chore: env" && git push

# 4. Build
npm install --legacy-peer-deps && npm run build

# 5. Vercel
npm install -g vercel
export VERCEL_TOKEN="provided-by-user"
vercel --prod --confirm

# 6. GitHub Actions
GITHUB_USER=$(gh api user -q .login)
gh workflow enable deploy.yml -R $GITHUB_USER/relocation-matrix

# 7. Verify
gh repo view relocation-matrix
gh workflow list
```

---

**Summary:** All automated except Supabase schema (requires manual SQL execution in Dashboard).
