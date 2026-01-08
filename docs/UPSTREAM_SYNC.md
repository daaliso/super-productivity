# Upstream Sync Automation

This fork includes automated syncing with the upstream `super-productivity/super-productivity` repository.

## How It Works

A GitHub Actions workflow (`.github/workflows/sync-upstream.yml`) runs daily to:

1. ✅ Check for new commits in upstream
2. ✅ Create a sync branch if changes detected
3. ✅ Attempt automatic merge
4. ✅ Generate compatibility analysis
5. ✅ Create a PR with findings

## Setup (One-Time)

The workflow uses the default `GITHUB_TOKEN`, which has limited permissions. For full functionality:

1. **Enable GitHub Actions** (if not already):

   - Go to: `Settings` → `Actions` → `General`
   - Allow "All actions and reusable workflows"

2. **Grant PR Creation Permissions**:
   - Go to: `Settings` → `Actions` → `General` → `Workflow permissions`
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

## Manual Trigger

To trigger a sync check manually:

1. Navigate to: [Actions → Sync Upstream Repository](../../actions/workflows/sync-upstream.yml)
2. Click "Run workflow"
3. Select branch: `master`
4. Click "Run workflow"

## What Gets Checked

The automation analyzes:

- **Version Changes**: Detects version bumps in `package.json`
- **File Stats**: Lines added/removed, files changed
- **CHANGELOG**: Extracts recent entries
- **Merge Conflicts**: Reports if manual intervention needed
- **Compatibility**: Highlights areas to review

## Review Process

When a sync PR is created:

1. **Automated analysis** is posted in the PR description
2. **Review the diff** for changes affecting:
   - Your Material 3 migration (`src/app/core-ui/**`, theme files)
   - Android build (`android/**`, Capacitor config)
   - Custom workflows (`.github/workflows/build-apk-github.yml`)
3. **Run tests** locally if unsure
4. **Merge** when satisfied

## Fallback: Manual Sync

If the automation fails (merge conflicts, etc.), use the manual workflow:

```bash
# See .agent/workflows/sync-upstream.md for detailed steps
git fetch upstream
git checkout -b sync-upstream-manual
git merge upstream/master
# ... resolve conflicts, push, create PR
```

Or use the Gemini agent slash command:

```
/sync-upstream
```

## Frequency

- **Automated**: Daily at 2 AM UTC
- **Manual**: As needed via Actions tab
- **Recommended**: Review weekly, merge monthly (or before major releases)

## Disabling Automation

To disable daily checks:

1. Edit `.github/workflows/sync-upstream.yml`
2. Comment out the `schedule` section:
   ```yaml
   # schedule:
   #   - cron: '0 2 * * *'
   ```
3. Keep `workflow_dispatch` for manual triggers

## Monitoring

- **GitHub Actions Tab**: View workflow runs
- **Email Notifications**: Enabled by default for failed workflows
- **PR Labels**: Auto-synced PRs are tagged with `upstream-sync` and `automated`

## Benefits

- ✅ Stay current with upstream features and security fixes
- ✅ Automated compatibility analysis reduces review time
- ✅ Conflict detection before manual merge attempts
- ✅ Clear change tracking via PR history

## Support

For issues with the automation:

1. Check the [workflow file](.github/workflows/sync-upstream.yml)
2. Review [manual workflow documentation](.agent/workflows/sync-upstream.md)
3. Contact the repository maintainer
