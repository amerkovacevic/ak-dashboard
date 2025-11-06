# 🤖 GitHub Auto-Update System

## ✅ System Overview

Your AK Dashboard now **automatically updates** the "last updated" dates by fetching the latest commit from each GitHub repository every 6 hours!

---

## 🔐 **Required GitHub Secret**

### Secret Name: `GH_PAT`

You need to create **ONE secret** in your `ak-dashboard` GitHub repository.

---

## 📝 **Step-by-Step Setup**

### 1. Create GitHub Personal Access Token

1. Go to **GitHub.com** → Click your profile picture (top right)
2. Navigate: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Click **"Generate new token (classic)"**

**Configure the token**:
- **Note**: `AK Dashboard Auto-Update`
- **Expiration**: `No expiration` (or `1 year`)
- **Select scopes**:
  - ✅ **`public_repo`** - Access public repositories
  
4. Click **"Generate token"**
5. **COPY THE TOKEN** (starts with `ghp_...`) - You won't see it again!

---

### 2. Add Secret to ak-dashboard Repository

1. Go to: `https://github.com/amerkovacevic/ak-dashboard`
2. Click **Settings** tab (top)
3. Left sidebar: **Secrets and variables** → **Actions**
4. Click **"New repository secret"**
5. Add secret:
   - **Name**: `GH_PAT`
   - **Value**: Paste your `ghp_...` token
   - Click **"Add secret"**

✅ **Done!** That's the only secret needed.

---

## 🚀 **How It Works**

### Automated Process

```
Every 6 hours:
  1. GitHub Action triggers
  2. Fetches latest commit from each repo:
     - amerkovacevic/encryption
     - amerkovacevic/time-buddy
     - amerkovacevic/flickfeed
     - amerkovacevic/personal-portfolio
     - amerkovacevic/pickup-soccer
     - amerkovacevic/amer-gauntlet
     - amerkovacevic/color-crafter
     - amerkovacevic/secret-santa
     - amerkovacevic/fm-team-draw
  3. Updates src/data/lastUpdated.json
  4. Commits changes to repo
  5. Next deployment picks up new dates
```

---

## 📋 **Files Created**

### 1. `.github/workflows/update-commits.yml`
GitHub Actions workflow that runs every 6 hours

### 2. `scripts/fetch-commits.js`
Node.js script that fetches commit data from GitHub API

### 3. `src/data/lastUpdated.json`
Generated data file with latest commit info

### 4. Updated `src/App.jsx`
Now reads from `lastUpdated.json` instead of hardcoded dates

### 5. Updated `package.json`
Added `node-fetch` dependency and `fetch-commits` script

---

## 🎯 **Manual Trigger**

### Run Locally (Test)
```bash
cd amerkovacevic/ak-dashboard
npm run fetch-commits
```

This will:
- Fetch latest commits from all repos
- Update `src/data/lastUpdated.json`
- Show success message

### Run on GitHub
1. Go to your repo: **Actions** tab
2. Click **"Update Last Commit Dates"** workflow
3. Click **"Run workflow"** button
4. Select branch (main)
5. Click **"Run workflow"**

Workflow runs immediately and updates the JSON file.

---

## 📊 **What Gets Updated**

For each app, the system tracks:

```json
{
  "App Name": {
    "date": "2025-01-25T17:45:00Z",      // ISO date of latest commit
    "sha": "abc1234",                     // Short commit hash
    "message": "feat: add new feature"    // Commit message
  }
}
```

Your dashboard then displays:
- **Last Updated**: Jan 25, 2025
- **Days Ago**: 2 days ago (in Recently Updated section)
- **NEW Badge**: If updated within 7 days

---

## ⏰ **Schedule**

### Current: Every 6 hours
```yaml
schedule:
  - cron: '0 */6 * * *'
```

### Change Frequency?

Edit `.github/workflows/update-commits.yml`:

**Every hour**:
```yaml
- cron: '0 * * * *'
```

**Every 12 hours**:
```yaml
- cron: '0 */12 * * *'
```

**Daily at midnight**:
```yaml
- cron: '0 0 * * *'
```

**Cron syntax**: `minute hour day month weekday`

---

## 🔧 **Customization**

### Add New App Repo

1. **Edit `scripts/fetch-commits.js`**:
```javascript
const repos = [
  // ... existing repos
  { name: 'New App Name', repo: 'amerkovacevic/new-repo' },
]
```

2. **Edit `src/App.jsx`**:
```javascript
{
  id: 10,
  name: 'New App Name',
  // ... other fields
  githubRepo: 'amerkovacevic/new-repo',
}
```

3. **Commit and push** - workflow updates automatically!

---

## 🐛 **Troubleshooting**

### Workflow Not Running?

**Check**:
1. Secret `GH_PAT` exists in repo settings
2. Token has `public_repo` scope
3. Token hasn't expired
4. Workflow file is in `.github/workflows/`

**View Logs**:
1. Repo → **Actions** tab
2. Click latest workflow run
3. View step outputs

### Dates Not Updating?

**Possible Issues**:
1. Workflow succeeded but no new commits
2. JSON file not being read correctly
3. Need to rebuild/redeploy dashboard

**Quick Fix**:
```bash
# Manually run script
npm run fetch-commits

# Check the output
cat src/data/lastUpdated.json

# Rebuild and redeploy
npm run build
firebase deploy
```

### API Rate Limiting?

**Without Token**: 60 requests/hour  
**With Token**: 5000 requests/hour

**Solution**: Make sure `GH_PAT` secret is set!

---

## 📦 **Deployment Workflow**

### After Workflow Runs

1. **Workflow commits** new JSON data
2. **You pull** latest changes: `git pull`
3. **Build**: `npm run build`
4. **Deploy**: `firebase deploy`

### Auto-Deploy (Optional)

Add Firebase deployment to workflow:
```yaml
- name: Build
  run: npm run build

- name: Deploy to Firebase
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
    projectId: your-project-id
```

---

## 🎯 **Testing the System**

### Test Locally (Recommended First)

```bash
# Set your token temporarily
export GH_PAT=ghp_your_token_here  # Mac/Linux
$env:GH_PAT="ghp_your_token_here"  # Windows PowerShell

# Run script
npm run fetch-commits

# Check output
cat src/data/lastUpdated.json

# Should show all repos with commit dates
```

### Test on GitHub

1. Push all changes to GitHub
2. Go to **Actions** tab
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait ~30 seconds
5. Check if `src/data/lastUpdated.json` was updated
6. Pull changes locally
7. Rebuild and deploy

---

## 📊 **Data Structure**

### lastUpdated.json Format

```json
{
  "lastFetch": "2025-01-25T12:00:00.000Z",
  "commits": {
    "App Name": {
      "date": "2025-01-22T13:20:00Z",
      "sha": "a1b2c3d",
      "message": "fix: resolve bug"
    }
  }
}
```

### App Data Structure

```javascript
{
  name: 'Encryption Suite',
  githubRepo: 'amerkovacevic/encryption',
  lastUpdated: '2025-01-22',        // From JSON
  lastCommitSha: 'a1b2c3d',         // From JSON
  lastCommitMessage: 'fix: ...',    // From JSON
}
```

---

## 🎨 **UI Display**

### Where Dates Appear

1. **App Cards (Grid View)**: "Updated Jan 22, 2025"
2. **Recently Updated Section**: "15 days ago"
3. **NEW Badges**: Shown if < 7 days old
4. **Admin Panel**: Can see commit SHAs

### Optional: Show Commit Info

Add to admin panel in `App.jsx`:
```javascript
<div className="text-xs text-quaternary-500">
  Last commit: {app.lastCommitSha} - {app.lastCommitMessage}
</div>
```

---

## 🔒 **Security**

### What's Safe
- ✅ Token stored in GitHub Secrets (encrypted)
- ✅ Only fetches public repo data
- ✅ Read-only access
- ✅ No sensitive data exposed

### Best Practices
- 🔐 Use token with minimal scope (`public_repo` only)
- ⏰ Set token expiration (1 year max)
- 🔄 Rotate tokens periodically
- 📝 Document what each token is for

---

## 📚 **Next Steps**

### 1. Create the Secret
✅ Follow steps above to create `GH_PAT`

### 2. Push to GitHub
```bash
git add .
git commit -m "feat: add GitHub auto-update system"
git push
```

### 3. Test the Workflow
- Go to Actions tab
- Click "Run workflow"
- Verify it succeeds

### 4. Check Results
```bash
git pull
cat src/data/lastUpdated.json
```

### 5. Deploy
```bash
npm run build
firebase deploy
```

---

## 🎉 **Benefits**

### Automated
- ✅ No manual date updates
- ✅ Always accurate
- ✅ Runs while you sleep

### Accurate
- ✅ Real commit dates
- ✅ Shows actual activity
- ✅ Reflects development pace

### Professional
- ✅ Live data
- ✅ Trustworthy dates
- ✅ Shows active maintenance

---

## 📝 **Quick Reference**

### Secret Name
```
GH_PAT
```

### Scope Required
```
public_repo
```

### Schedule
```
Every 6 hours
```

### Manual Trigger
```bash
npm run fetch-commits
```

### GitHub Actions Tab
```
Actions → Update Last Commit Dates → Run workflow
```

---

## 🚀 **Ready to Go!**

Once you:
1. ✅ Create GitHub token
2. ✅ Add `GH_PAT` secret to repo
3. ✅ Push these changes to GitHub
4. ✅ Trigger workflow (or wait 6 hours)

Your dashboard will auto-update forever! 🎊

---

**Questions?** Check the workflow logs in the Actions tab!

© 2025 Amer Kovacevic

