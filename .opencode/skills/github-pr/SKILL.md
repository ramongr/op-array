---
name: github-pr
description: Use when creating a GitHub pull request in this repo. Ensures the PR is assigned to the repo owner and linked to the originating issue and milestone.
---

# GitHub PR

Whenever you create a pull request in this repository (via `gh pr create`
or any other mechanism), you **must** ensure all three of:

1. **Assignee:** `ramongr` is set as the assignee.
2. **Issue link:** the PR body contains `Closes #<issue>` so GitHub
   auto-closes the issue on merge.
3. **Milestone:** the PR is attached to the same milestone as the
   originating issue (e.g. `v2.1`, `v2.2`, `v2.3`). PRs without an
   originating issue are attached to the milestone they target.

## How

```sh
# Look up the issue's milestone first
MILESTONE=$(gh issue view <issue> --json milestone --jq '.milestone.title')

gh pr create \
  --title "<conventional-commit subject>" \
  --base main \
  --assignee ramongr \
  --milestone "$MILESTONE" \
  --body "$(cat <<'EOF'
## Summary
...

## Changes
- ...

Closes #<issue>
EOF
)"
```

## If you forgot

Fix any opened PR immediately:

```sh
gh pr edit <pr-number> --add-assignee ramongr
gh pr edit <pr-number> --milestone "<milestone-title>"
# To add the issue link, edit the body to include "Closes #<issue>".
```

## Why

- **Assignee** surfaces the PR in the owner's dashboard for review.
- **`Closes #<issue>`** lets GitHub auto-close the issue and keeps the
  release notes traceable.
- **Milestone** keeps the v2.x roadmap accurate; release notes are
  generated from the milestone view.
