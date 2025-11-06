# 🚀 Quick Setup Instructions

## Your GitHub Auto-Update System is Ready!

Follow these steps to activate automatic commit date updates.

---

## ✅ **Step 1: Create GitHub Token**

### 1.1 Go to GitHub Settings
1. Click your **profile picture** (top right)
2. **Settings** → **Developer settings** (bottom left)
3. **Personal access tokens** → **Tokens (classic)**

### 1.2 Generate New Token
1. Click **"Generate new token (classic)"**
2. Configure:
   - **Note**: `AK Dashboard Auto-Update`
   - **Expiration**: `No expiration` or `1 year`
   - **Scopes**: Check ✅ **`public_repo`**
3. Click **"Generate token"**
4. **COPY the token** (starts with `ghp_...`)

---

## ✅ **Step 2: Add Secret to Repository**

### 2.1 Open Your Dashboard Repo
Go to: `https://github.com/amerkovacevic/ak-dashboard`

### 2.2 Navigate to Secrets
1. Click **"Settings"** tab
2. Left sidebar: **"Secrets and variables"** → **"Actions"**

### 2.3 Create New Secret
1. Click **"New repository secret"**
2. Enter:
   - **Name**: `GH_PAT`
   - **Secret**: Paste your token (`ghp_...`)
3. Click **"Add secret"**

---

## ✅ **Step 3: Push Code to GitHub**

```bash
cd amerkovacevic/ak-dashboard

# Add all new files
git add .

# Commit changes
git commit -m "feat: add GitHub auto-update system"

# Push to GitHub
git push
```

---

## ✅ **Step 4: Test the Workflow**

### Option A: Manual Trigger (Recommended)

1. Go to your repo on GitHub
2. Click **"Actions"** tab
3. Click **"Update Last Commit Dates"** workflow (left sidebar)
4. Click **"Run workflow"** button (right side)
5. Select **"main"** branch
6. Click **"Run workflow"**

Workflow runs in ~30 seconds!

### Option B: Wait for Schedule

The workflow will run automatically every 6 hours.

---

## ✅ **Step 5: Verify It Worked**

### 5.1 Check Workflow Success
1. **Actions** tab → Click the workflow run
2. All steps should be **green ✓**
3. Look for "Commit and push if changed" step

### 5.2 Pull Latest Changes
```bash
git pull
```

### 5.3 Check the Data File
```bash
cat src/data/lastUpdated.json
```

Should show real commit dates!

---

## ✅ **Step 6: Deploy Updated Dashboard**

```bash
# Build with latest data
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

---

## 🎉 **Done!**

Your dashboard now auto-updates every 6 hours with the latest commit dates from all your repos!

---

## 🔍 **Verify Everything Works**

### Checklist:
- [ ] Created GitHub token with `public_repo` scope
- [ ] Added `GH_PAT` secret to ak-dashboard repo
- [ ] Pushed code changes to GitHub
- [ ] Triggered workflow manually (or waited 6 hours)
- [ ] Workflow run succeeded (green checkmark)
- [ ] Pulled latest changes (`git pull`)
- [ ] Verified `src/data/lastUpdated.json` has real dates
- [ ] Rebuilt dashboard (`npm run build`)
- [ ] Deployed to Firebase

---

## ⚡ **Quick Commands**

```bash
# Test locally (requires GH_PAT env var)
npm run fetch-commits

# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Pull workflow updates
git pull
```

---

## 📊 **What Happens Now**

### Every 6 Hours:
1. ✅ GitHub Action runs automatically
2. ✅ Fetches latest commit from each repo
3. ✅ Updates `src/data/lastUpdated.json`
4. ✅ Commits changes to your repo
5. ⏳ You pull, rebuild, and redeploy (or automate this too!)

### On Your Dashboard:
- Shows **real commit dates**
- Shows **"X days ago"** in Recently Updated
- Shows **NEW badges** for recent updates (< 7 days)
- Always accurate, always fresh! 🎊

---

## 🎯 **Success!**

Your dashboard is now a living, breathing showcase of your active development! 🚀

Any questions? Check `GITHUB_AUTO_UPDATE.md` for detailed docs.

---

© 2025 Amer Kovacevic

