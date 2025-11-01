# penghuot-lim-lab1

This repository is a small Node.js Express app used for CI/CD and testing exercises.

Canonical package manager
-------------------------
This project now uses npm as the canonical package manager. The repository includes a
`package-lock.json` and the GitHub Actions workflow runs `npm ci`.

If you previously used Yarn, please switch to npm to avoid lockfile mismatches.

Quick start (development)
-------------------------
1. Install dependencies:

```cmd
npm ci
```

2. Start the app locally:

```cmd
npm start
```

3. Open http://localhost:3000

Testing and coverage
--------------------
- Run tests:

```cmd
npm test
```

- Run tests with coverage (this uses nyc):

```cmd
npm run coverage
```

Notes about CI and Node 18
--------------------------
- The GitHub Actions workflow runs a matrix for Node 18.x and Node 20.x. Because the project
  is ESM (`type: module`), nyc needs Node's VM modules enabled on Node 18 to instrument ESM
  at runtime. The CI test step sets the environment variable:

```
NODE_OPTIONS="--experimental-vm-modules --enable-source-maps"
```

  This enables coverage collection on Node 18. Node 20 supports the needed features without
  the experimental flag, so it runs fine without it.

Pull request / merge
--------------------
- The branch `migrate-to-npm` contains the `package-lock.json`, removal of `yarn.lock`, CI update, and `REPORT.md`.
- Open the PR at: https://github.com/Huotsty/penghuot-lim-lab1/pull/new/migrate-to-npm
- Review, then merge. After merging, GitHub Actions will run on `main`, generate coverage artifacts,
  and trigger the Vercel deploy (since your `VERCEL_TOKEN` is already in GitHub secrets).

Contact
-------
If you want me to merge the PR automatically, install & authenticate the GitHub CLI (`gh`) and I can run the commands here; otherwise merge via the GitHub web UI.
