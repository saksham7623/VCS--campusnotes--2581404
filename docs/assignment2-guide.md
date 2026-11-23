# Assignment 2 — execution and evidence guide

This guide is a checklist, not proof that the commands have already been run. Capture your own terminal and GitHub screenshots after each successful step.

## Before starting

- Confirm your GitHub account and the email configured in Git.
- Confirm your actual enrollment number and use it in the repository name.
- Keep this project folder as the local `campusnotes` repository.
- Ask a classmate for their GitHub username/repository URL for Q2 and Q3.

## Q1 — remote workflow

Create a **public, empty** GitHub repository named `vcs-campusnotes-<your-enrollment-number>` (do not initialize it with README, license or .gitignore).

From this folder:

```bash
git init
git branch -M main
git add .
git commit -m "feat: create CampusNotes starter app"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git remote -v
git push -u origin main
```

If `git remote -v` says `origin` already exists, inspect it first with `git remote -v`; do not blindly add a second origin.

To demonstrate a second branch:

```bash
git switch -c feature/search-notes
git push -u origin feature/search-notes
git switch main
```

Clone to a second folder (replace the URL and choose a location that does not already contain a folder with this name):

```bash
cd ..
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git campusnotes-second
cd campusnotes-second
```

Make a real change, for example edit a sentence in README.md, then:

```bash
git add README.md
git commit -m "docs: clarify project run instructions"
git push
```

Return to the original folder and pull:

```bash
cd ../campusnotes
git pull
git log --oneline -5
```

Capture the repository URL, `git remote -v`, initial push, second-folder push and original-folder pull.

## Q2 — fork and pull request (requires a real partner)

1. Ask your partner for their original public repository URL.
2. Open it on GitHub and select **Fork**.
3. Clone your fork, not the partner's original repository.
4. In your clone, add the partner's repository as `upstream`.
5. Create a branch named `feature/kuwar-improve-readme` (adjust name if needed).
6. Make a meaningful change, commit and push the branch to your fork.
7. Open a PR from your fork's feature branch into your partner's original repository.
8. Link a real related issue in the PR description. If no issue exists, ask the partner to create one first.

Example commands (replace URLs and username):

```bash
git clone https://github.com/YOUR-USERNAME/PARTNER-REPO.git
cd PARTNER-REPO
git remote add upstream https://github.com/PARTNER-USERNAME/PARTNER-REPO.git
git remote -v
git switch -c feature/kuwar-improve-readme
```

Do not invent a partner repository, issue, PR or screenshot.

## Q3 — review and merge (requires the real PRs)

On your partner's PR, open **Files changed** and add at least three specific inline comments tied to actual lines. Include one GitHub suggested change using the suggestion UI. Submit **Approve** or **Request changes** as appropriate.

On your own PR, respond to the review, make the requested change locally, commit and push the update. As PR owner, merge it using the strategy permitted by the repository. Record the real review, reply and merged PR URLs. Explain your chosen strategy in two truthful lines.

## Q4 — five Conventional Commits, tags and release

The five required commit types are `feat:`, `fix:`, `docs:`, `refactor:` and `chore:`. Make five separate meaningful changes and commits; do not create empty or misleading commits.

Suggested sequence (make the corresponding change before each commit):

```bash
git add index.html
git commit -m "feat: add note creation interface"
git add app.js
git commit -m "fix: validate empty note fields"
git add README.md
git commit -m "docs: explain how to run CampusNotes"
git add app.js
git commit -m "refactor: separate note rendering logic"
git add .gitignore
git commit -m "chore: ignore temporary editor files"
```

The starter project already has a `.gitignore`; if it is already committed, make a further meaningful update before the chore commit.

Create and push tags after the commits:

```bash
git tag v0.1.0
git tag -a v1.0.0 -m "CampusNotes version 1.0.0"
git push origin v0.1.0
git push origin v1.0.0
git log --oneline
git tag -n
```

On GitHub, open **Releases → Draft a new release**, choose `v1.0.0`, add concise notes describing the actual delivered features, and publish. Save the real Release URL.

## Q5 — hooks

Enable the tracked hooks:

```bash
chmod +x .githooks/pre-commit .githooks/commit-msg
git config core.hooksPath .githooks
```

### Demonstrate blocked pre-commit

Create a temporary file with a TODO marker, stage it, and try to commit:

```bash
echo "TODO: remove this test marker" > hook-test.txt
git add hook-test.txt
git commit -m "chore: test precommit hook"
```

The hook should reject the commit. Remove the marker and stage the corrected file:

```bash
echo "Pre-commit hook test passed." > hook-test.txt
git add hook-test.txt
git commit -m "chore: verify precommit hook"
```

### Demonstrate blocked commit-msg

Stage a harmless change, then try a short invalid message:

```bash
echo "Hook message test." >> hook-test.txt
git add hook-test.txt
git commit -m "bad"
```

It should be rejected. Now use a valid message:

```bash
git commit -m "docs: demonstrate commit message hook"
```

Capture both blocked and successful runs. The two demonstrations above create real commits; push them if your teacher expects all branch history to be on GitHub.

### 4–5 line analysis

Git hooks stored in `.git/hooks` are local to one clone and are not included in normal commits or pushes. Therefore, another collaborator does not automatically receive or run those hooks. A team can store hook scripts in a tracked `.githooks` directory and configure each clone with `git config core.hooksPath .githooks`. This makes the scripts shareable, although each clone still needs the configuration. The `git commit --no-verify` option bypasses client-side pre-commit checks, so it can allow mistakes or prohibited markers into the repository.

## Submission PDF checklist

- [ ] Q1 repository URL, remote output, push and pull screenshots.
- [ ] Q2 real PR URL and PR description screenshot with linked issue.
- [ ] Q3 review link, three inline comments, suggestion, your reply and merged PR link.
- [ ] Q4 five real conventional commits, tag output and published Release URL.
- [ ] Q5 both hook scripts, blocked and successful screenshots, 4–5 line analysis.
- [ ] One-line AI-use disclosure: `AI tools were used to understand commands and prepare a starter project; all Git/GitHub operations and evidence were generated and verified by me.`
