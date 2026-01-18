---
layout: blog
title: "Enforcing Conventional Commits"
date: 2025-11-04 16:00:00 +0000
author: "Andre' Vella"
tags: [git, conventional-commits]
excerpt: "Enforcing Conventional Commits"
---

1. Create a global hooks directory
```bash
mkdir -p ~/.git-hooks
```
2. Save the hook script
```bash
# Create the commit-msg hook file
cat > ~/.git-hooks/commit-msg << 'EOF'
#!/bin/bash
# Conventional commit pattern
conventional_pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,50}'
# Read commit message
commit_message=$(cat "$1")
# Validate format
if ! echo "$commit_message" | grep -qE "$conventional_pattern"; then
    echo ""
    echo "❌ Commit message does not follow conventional commit format!"
    echo ""
    echo "Required format: <type>[optional scope]: <description>"
    echo ""
    echo "Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    echo ""
    echo "Examples:"
    echo "  feat: add user authentication"
    echo "  fix(auth): resolve login issue"  
    echo "  docs: update README"
    echo ""
    echo "Your message: '$commit_message'"
    echo ""
    exit 1
fi
echo "✅ Commit message follows conventional format"
exit 0
EOF
```

3. Make it executable
```bash
chmod +x ~/.git-hooks/commit-msg
```
4. Configure git to use this directory globally
```bash
git config --global core.hooksPath ~/.git-hooks
```
Now all your git repositories will use this hook. Test it with a new commit:

```bash
# This should fail
git commit -m "bad commit message"
```

```bash
# This should succeed
git commit -m "feat: add new feature"
```

Note: Claude was used to generate the conventional-commit script.