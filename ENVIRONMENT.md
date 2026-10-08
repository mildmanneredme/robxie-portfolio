# Shared environment files with Dotenvx

Workflow agreed 8 October 2026 (Asia/Bangkok). This guide and the ignore rules
sync through Git. **Documentation is installed; secrets migration is pending.**
Existing local environment files, application commands, dependency versions and
deployment configuration have not been converted by this documentation change.

## Repository notes

No local environment file was found in the inspected application directories. Create no secret file merely to adopt this guide.

This is a Next.js portfolio. Preserve existing package commands and Vercel configuration; public build variables are not secrets.

## What goes in Git

| Item | Policy |
| --- | --- |
| Shared `.env` (or an explicitly selected component/environment file) | Commit only after Dotenvx encryption and a private inspection confirm no plaintext secrets remain. |
| `.env.keys` and `.env.keys.*` | Private decryption material; ignored at every directory level; never stage, commit, upload in artifacts, or paste into chat. |
| `.env.example` | Variable names and empty or obviously fake placeholders only; retain existing templates. |
| Machine-specific overrides and `.secrets-sync/` | Local only; keep ignored. Reconciliation drafts and metadata must not enter Git. |

Use a separate key pair for each repository and environment. Development and
production credentials stay separate. Git distributes ciphertext; transfer the
matching private key once to each authorized computer using a password manager
or another authenticated, encrypted channel. Back it up securely. A Git pull
does not provision a private key or update a hosting provider's secret settings.

## First reconcile the two manually maintained copies

Do this before replacing either computer's working file. Agents must obtain
explicit authorization for the actual migration; this guide alone is not it.

1. Identify the same repository, component, environment and account on both
   computers. Make protected local snapshots of every `.env` variant and existing
   key file. Keep snapshots outside the repository or in its ignored
   `.secrets-sync/` folder; preserve the originals until both computers validate.
2. Compare privately, with a dotenv-aware parser/editor that preserves multiline
   values and quoting. Reports contain variable names and statuses only:
   identical, only on A, only on B, conflicting, or intentionally machine-local.
   Do not print values, value fragments, connection strings, keys or value hashes.
3. Apply **latest verified edit priority per variable**, not per whole file.
   Prefer secret-manager/provider change records or a known edit history. A
   copied file's modification time and a later Git commit do not prove that each
   credential in it is newer. Manual files usually have no per-variable history:
   unknown or tied conflicts need an owner choice and remain unresolved until then.
4. Retain keys present on only one computer unless their deletion is confirmed.
   Keep machine paths and ports local. Resolve related credential bundles
   together (for example client ID/secret, database URL/user/password and service
   account fields); do not combine incompatible halves from different accounts.
   A confirmed revocation overrides timestamp priority. Validate selected
   credentials with a non-writing check where possible; do not trigger paid jobs,
   trades, emails, migrations or production writes just to test a secret.
5. Keep a local decision record with key names, selected computer, verified edit
   time/timezone if known, reason and unresolved status, never values. Confirm the
   resulting set and all deletions with the owner, then encrypt it once with one
   canonical key pair. Provision that matching key on the other computer. Do not
   independently encrypt divergent copies and hope Git will reconcile the keys.

## One-time adoption after reconciliation

Install the official CLI on each computer if needed. For a Node-equipped machine:

```powershell
npm install --global @dotenvx/dotenvx
dotenvx --version
```

The official installation guide also supplies a Windows installer. Agree a tested
CLI version on both machines; application dependency installation is separate.
Run the following from the directory containing the chosen shared `.env`:

```powershell
git check-ignore --no-index .env.keys .env.keys.backup
git ls-files -- .env.keys '.env.keys.*'
dotenvx encrypt -f .env
```

The ignore check must list both files, and the tracked-files check must be empty.
For nested files repeat these checks using their repository-relative paths from
the root. If the CLI offers key custody choices, choose Local / File `.env.keys`.
Do not put real secrets into command arguments in an agent session or recorded
terminal. Inspect the resulting file privately: nonempty secret values must be
Dotenvx-generated `encrypted:` ciphertext; private keys never belong in it.
Comments, variable names, allowed plaintext values and `_PLAIN` exceptions can
remain readable, so the presence of a public key alone is not a safety check.

Existing broad `.env` exclusions are deliberately retained. After checking the
specific file, stage that encrypted file explicitly; never force-add a directory:

```powershell
git add -f -- .env
git diff --cached --name-only
git diff --cached --check
```

Review staged contents privately for plaintext secrets, private keys and
unrelated changes, then commit/push using the repository's normal branch and
review policy. Do not paste that diff into chat. Never use `git add .` for a
secrets migration. Files already tracked are unaffected by ignore rules.

## Other computer and everyday use

Before the first pull containing a newly tracked encrypted `.env`, preserve and
move aside the old ignored plaintext file at that exact path. An ignored file can
be overwritten when Git starts tracking the same path. Do not discard its values
until reconciliation and validation are complete. Resolve code changes separately.

Once the canonical encrypted file is tracked and unchanged locally:

```powershell
git pull --ff-only
dotenvx run -f .env -- YOUR_EXISTING_COMMAND
```

Replace `YOUR_EXISTING_COMMAND` with the project's documented command; it is a
placeholder, not a program. For a component project, first enter that directory,
where its matching `.env.keys` belongs. For `.env.production`, use `-f
.env.production`; its private variable is `DOTENV_PRIVATE_KEY_PRODUCTION`.

After pulling ciphertext updates, restart running processes to reload values.
Retain the same private key unless a coordinated rotation occurred. Ordinary
dotenv loaders cannot decrypt ciphertext: wrap the real development/build/server
command with `dotenvx run`, and verify loader precedence before adopting this in
package scripts. Existing process variables and framework `.env.local` files can
shadow shared values. Keep local overrides deliberate and documented; do not
erase them or use `--overload` blindly. Browser-exposed variables such as
`NEXT_PUBLIC_*` and `VITE_*` remain public after a build even if encrypted in Git.

## Editing, Git conflicts and key rotation

Pull before editing. Dotenvx provides `set` for an encrypted single-variable
update; use it only in a private terminal/input workflow that avoids history and
logs containing the secret. Alternatively prepare an ignored, protected local
draft and re-encrypt with the existing matching key pair, then replace the shared
file with reviewed ciphertext. Do not generate a new key pair for routine edits.
Privately check the result, stage only the selected encrypted file, and push.

On a conflict, preserve both versions. Git cannot decide which ciphertext is the
right credential, and re-encryption can change ciphertext without changing the
value. Compare locally with the appropriate keys and the reconciliation rules
above. Keep nonoverlapping variable edits; choose the latest verified edit for
overlapping keys, or ask the owner when unknown. Never resolve the entire file
with blanket ours/theirs, commit conflict markers, or replace its public key while
leaving ciphertext encrypted for a different private key.

For a planned key rotation, coordinate both computers and any deployment first,
re-encrypt the complete environment, distribute the new key securely, and verify
every consumer before retiring the old key. If a key or plaintext secret has ever
been committed, ignoring/removing the file does not clean Git history: rotate
affected secrets and arrange a separate coordinated history cleanup. Do not
rewrite history or force-push as part of ordinary synchronization.

## Agents and deployments

Never read or print `.env.keys` or decrypted values for documentation work. Use
names/counts/statuses for diagnostics. Do not run `decrypt`, `get`, verbose secret
logging, or plaintext export in a recorded session. Avoid copying keys into
Docker build contexts, CI artifacts, screenshots or model prompts.

Current deployment secret stores remain authoritative until a separately
validated migration. If deploying through Dotenvx, provision the matching
`DOTENV_PRIVATE_KEY` through the host/CI secret store and wrap the actual consumer
command; never commit that key. Do not replace Vercel, Firebase, AWS or other
provider configuration merely because this guide exists. A scheduled check or
automatic pull is not installed by this documentation.

## Official references

- [Installation](https://dotenvx.com/docs/install/)
- [Encrypted environment format](https://dotenvx.com/docs/encrypted-env-file/)
- [Local key custody](https://dotenvx.com/docs/custody/env-keys/)
- [Encrypt command](https://dotenvx.com/docs/cli/encrypt/)
- [Set command](https://dotenvx.com/docs/cli/set/)
- [Run command and precedence options](https://dotenvx.com/docs/cli/run/)
