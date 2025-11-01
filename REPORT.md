# CI/CD & Test Report

Date: 2025-11-01

Summary
-------
- Commit: 5d51acc (latest local changes)
- Branch: main (after merging)
- Tests: 7 passing
- Coverage:
  - Statements: 89.28%
  - Branches: 82.35%
  - Functions: 90%
  - Lines: 87.5%

What I changed
---------------
- Restored `server.js` exports (`PORT`, `createServer`) for tests while keeping `export default app` for Vercel.
- Updated GitHub Actions workflow to run the project's coverage script and switched CI to npm.
- Added `package-lock.json` (committed) so CI `npm ci` will be deterministic.

How to reproduce locally
------------------------
1. Install dependencies and generate lockfile (if needed):

```cmd
npm ci
```

2. Run tests with coverage:

```cmd
npm run coverage
```

3. Start dev server:

```cmd
npm start
```

CI / Vercel
------------
- The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pushes to `main`.
- The `build-and-test` job now uses `npm ci` and runs `npm run coverage`, which generates `coverage/` and `.nyc_output/` and uploads them as artifacts.
- The `deploy` job uses the Vercel CLI and will deploy to production using `VERCEL_TOKEN` stored in the repository secrets.

Next steps & notes
------------------
- If you want to keep using Yarn instead, we can revert the CI changes and run `yarn coverage` instead (CI will use `yarn.lock`).
- If you'd like, I can open the GitHub Actions run and Vercel logs and attach them here — paste the run URL or authorize the GitHub CLI if you'd like me to create/merge the PR automatically.

Prepared-by: Automated assistant