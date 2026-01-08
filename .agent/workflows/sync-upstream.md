---
description: Sync upstream changes from super-productivity/super-productivity
---

# Sync Upstream Repository

This workflow syncs changes from the original `super-productivity/super-productivity` repository into your fork.

## Automated Method (Recommended)

The GitHub Actions workflow runs automatically daily at 2 AM UTC.

**To trigger manually:**

1. Go to: `https://github.com/daaliso/super-productivity/actions/workflows/sync-upstream.yml`
2. Click "Run workflow"
3. Wait for the workflow to complete
4. Review the automatically created PR

## Manual Method

Use this when the automated workflow fails or you want more control.

### Step 1: Check for Upstream Changes

```bash
# turbo
git fetch upstream

# turbo
git log master..upstream/master --oneline
```

If no output, you're up to date. Otherwise, continue.

### Step 2: Create Sync Branch

```bash
# turbo
git checkout -b sync-upstream-$(date +%Y-%m-%d)
```

### Step 3: Merge Upstream

```bash
git merge upstream/master --no-edit
```

**If conflicts occur:**

- Resolve manually in your editor
- Focus on `package.json`, `package-lock.json` (usually auto-resolvable)
- Check for conflicts in files you've modified (e.g., Material 3 components)

```bash
# After resolving conflicts
git add .
git commit -m "chore: resolve merge conflicts from upstream sync"
```

### Step 4: Analyze Changes

```bash
# turbo
git diff master --stat

# turbo
git log master..HEAD --oneline --no-merges
```

**Key areas to review:**

- Version bump in `package.json`
- CHANGELOG.md entries
- Changes to `.github/workflows/` (should not affect your custom workflows)
- Any modifications to Android build files
- Core UI components (check Material 3 compatibility)

### Step 5: Push and Create PR

```bash
git push origin sync-upstream-$(date +%Y-%m-%d)
```

Then create a PR on GitHub:

- **Base**: `master`
- **Compare**: `sync-upstream-YYYY-MM-DD`
- **Title**: `🔄 Sync Upstream Changes (vX.X.X)`
- **Description**: Use the PR template from `.gemini/antigravity/brain/.../pr-template.md`

### Step 6: Review & Merge

**Pre-merge checklist:**

- [ ] Review diff for breaking changes
- [ ] Check CHANGELOG for major features/deprecations
- [ ] Verify no conflicts with Material 3 migration
- [ ] Ensure Android build files unchanged or safe
- [ ] Test locally if unsure:
  ```bash
  npm run startFrontend
  npm run droid
  ```

**Merge the PR:**

```bash
# turbo
git checkout master

# turbo
git merge sync-upstream-YYYY-MM-DD

# turbo
git push origin master
```

### Step 7: Update Your Feature Branches

```bash
git checkout feat/material-3-migration
git rebase master
# Resolve any conflicts
git push origin feat/material-3-migration --force-with-lease
```

## Troubleshooting

### "Upstream remote not found"

```bash
# turbo
git remote add upstream https://github.com/super-productivity/super-productivity.git
```

### "Merge conflicts in package-lock.json"

```bash
# turbo
git checkout --theirs package-lock.json

# turbo
npm install

# turbo
git add package-lock.json
```

### "Analysis taking too long"

Skip detailed analysis and just review the PR diff on GitHub.

### "Automated workflow failed"

Check the Actions tab for error logs. Common causes:

- Merge conflicts (run manual method)
- GitHub API rate limits (wait and retry)
- Network issues (retry workflow)

## Frequency Recommendations

- **Automated**: Runs daily automatically
- **Manual Check**: Weekly if automated is disabled
- **Before Major Release**: Always sync before deploying

## Notes

- The automated workflow creates branches named `sync-upstream-YYYY-MM-DD`
- PRs are automatically labeled with `upstream-sync` and `automated`
- Analysis is posted as the PR description
- Manual review is still recommended even with automation
