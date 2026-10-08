# Repository guidance


## Shared environment workflow (Dotenvx)

Read [ENVIRONMENT.md](ENVIRONMENT.md) before environment work. Commit only
reviewed Dotenvx ciphertext for shared environment files; never commit or print
`.env.keys`, private keys, plaintext secrets or reconciliation drafts. Keep
existing local overrides and deployment configuration until migration is
authorized and verified. Two-computer reconciliation uses latest verified edits
per variable; unknown conflicts require an owner decision, never a whole-file
timestamp guess. This documentation does not authorize secrets migration.
