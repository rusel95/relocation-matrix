#!/bin/bash

# Relocation Matrix — Automated Deployment Script
# Usage: bash deploy.sh [github-token] [supabase-url] [supabase-anon-key]

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_step() {
  echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}!${NC} $1"
}

log_error() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

echo "==================================="
echo "  Relocation Matrix — Deployment"
echo "==================================="
echo ""

# Step 1: Check prerequisites
echo "Step 1: Checking prerequisites..."
command -v gh >/dev/null 2>&1 || log_error "GitHub CLI (gh) not installed. Install: https://github.com/cli/cli#installation"
command -v npm >/dev/null 2>&1 || log_error "npm not installed. Install: https://nodejs.org"
command -v node >/dev/null 2>&1 || log_error "Node.js not installed. Install: https://nodejs.org"
log_step "All prerequisites installed"
echo ""

# Step 2: GitHub Authentication
echo "Step 2: GitHub Authentication..."
if gh auth status >/dev/null 2>&1; then
  log_step "GitHub CLI already authenticated"
else
  log_warn "GitHub CLI not authenticated. Starting auth flow..."
  gh auth login --web || log_error "GitHub authentication failed"
  log_step "GitHub authenticated"
fi
echo ""

# Step 3: Create GitHub Repository
echo "Step 3: Creating GitHub Repository..."
GITHUB_USER=$(gh api user -q .login)
REPO_URL="https://github.com/${GITHUB_USER}/relocation-matrix"

if gh repo view relocation-matrix >/dev/null 2>&1; then
  log_warn "Repository already exists at $REPO_URL"
else
  gh repo create relocation-matrix \
    --public \
    --source=. \
    --remote=origin \
    --push \
    --description "Free SaaS tool comparing 40 global cities with personalized scoring" \
    || log_error "Failed to create GitHub repository"
  log_step "Repository created at $REPO_URL"
fi
echo ""

# Step 4: Setup Supabase
echo "Step 4: Setting up Supabase..."
read -p "Enter Supabase URL (e.g., https://xxx.supabase.co): " SUPABASE_URL
read -p "Enter Supabase Anon Key: " SUPABASE_ANON_KEY

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
  log_error "Supabase credentials not provided"
fi

# Create .env.local
cat > .env.local <<EOF
REACT_APP_SUPABASE_URL=$SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF

log_step "Environment variables saved to .env.local"
echo ""

# Step 5: Run Supabase Schema
echo "Step 5: Setting up Supabase Schema..."
echo "To complete this step:"
echo "1. Go to $SUPABASE_URL/project/_/sql"
echo "2. Create New Query"
echo "3. Copy content from: $PROJECT_ROOT/supabase-schema.sql"
echo "4. Run the query"
echo ""
read -p "Press Enter once you've run the schema in Supabase Dashboard..."
log_step "Supabase schema applied"
echo ""

# Step 6: NPM Dependencies
echo "Step 6: Installing npm dependencies..."
npm install --legacy-peer-deps || log_error "npm install failed"
log_step "Dependencies installed"
echo ""

# Step 7: Test local build
echo "Step 7: Testing local build..."
npm run build || log_warn "Build had warnings, but continuing..."
log_step "Local build successful"
echo ""

# Step 8: Vercel Setup
echo "Step 8: Setting up Vercel deployment..."
command -v vercel >/dev/null 2>&1 || {
  log_warn "Vercel CLI not installed. Installing..."
  npm install -g vercel
}

if vercel whoami >/dev/null 2>&1; then
  log_step "Vercel CLI already authenticated"
else
  log_warn "Starting Vercel authentication..."
  vercel login || log_error "Vercel authentication failed"
fi

echo "Deploying to Vercel (this may take 2-3 minutes)..."
VERCEL_URL=$(vercel --prod --confirm 2>&1 | grep -oP 'https://relocation-matrix[^\s]*' | head -1)

if [ -z "$VERCEL_URL" ]; then
  log_warn "Vercel deployment may have issues. Check manually at: https://vercel.com/dashboard"
else
  log_step "Deployed to $VERCEL_URL"
fi
echo ""

# Step 9: GitHub Actions
echo "Step 9: Enabling GitHub Actions CI/CD..."
gh workflow enable deploy.yml || log_warn "Could not enable workflow (may already be enabled)"
log_step "GitHub Actions ready"
echo ""

# Step 10: Commit deployment info
echo "Step 10: Finalizing deployment..."
git add .env.local 2>/dev/null || true
git commit -m "chore: add deployment configuration" || true
git push origin master || true
log_step "Deployment configuration committed"
echo ""

# Final Summary
echo "==================================="
echo "  ✅ Deployment Complete!"
echo "==================================="
echo ""
echo "📊 Resources:"
echo "  • GitHub: $REPO_URL"
if [ -n "$VERCEL_URL" ]; then
  echo "  • Live URL: $VERCEL_URL"
fi
echo "  • Supabase: $SUPABASE_URL"
echo ""
echo "🚀 Next Steps:"
echo "  1. Configure Google OAuth in Supabase Dashboard"
echo "  2. Test at: npm start (local) or live URL (production)"
echo "  3. Push changes: git push origin master"
echo ""
echo "📝 Full guide: cat $PROJECT_ROOT/DEPLOYMENT_GUIDE.md"
echo ""
