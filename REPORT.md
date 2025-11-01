# DevOps Lab 1 Report

## Project Overview

GitHub Repository: [penghuot-lim-lab1](https://github.com/Huotsty/penghuot-lim-lab1)

This project demonstrates the implementation of a complete CI/CD pipeline using GitHub Actions, including automated testing, code coverage reporting, and deployment to Vercel.

## CI/CD Pipeline Implementation

### Key Components

1. **GitHub Actions Workflow**
   - Located in `.github/workflows/ci.yml`
   - Tests run on multiple Node.js versions (18.x, 20.x)
   - Includes linting, testing, and code coverage reporting
   - Automated deployment to Vercel

2. **Testing Infrastructure**
   - Test framework: Mocha with @babel/register
   - Code coverage tool: c8 (migrated from nyc for better ESM support)
   - Coverage thresholds:
     - Statements: 90%
     - Branches: 70%
     - Functions: 100%
     - Lines: 90%

3. **Package Management**
   - Successfully migrated from Yarn to npm
   - Implemented proper lockfile management (package-lock.json)

## Current Status

### Test Results

- All 7 tests passing successfully
- Latest coverage metrics:

```text
--------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files          |      90 |       70 |     100 |      90 |                  
 app.js            |     100 |      100 |     100 |     100 |                  
 server.js         |   83.87 |    57.14 |     100 |   83.87 | 27-31           
--------------------|---------|----------|---------|---------|-------------------
```

### Deployment Status

- CI workflow running on main branch
- Successful deployment via Vercel
- Environment: Production
- Build Status: Success

## Reflection (295 words)

### Challenges Faced

One of the most significant challenges we encountered was achieving accurate code coverage reporting with Node.js 18.x. Initially, we faced issues with coverage reporting showing 0%, despite tests passing successfully. This challenge was compounded by the transition from CommonJS to ESM modules and the need to maintain compatibility across different Node.js versions.

Another challenge was managing the migration from Yarn to npm, ensuring all dependencies were properly tracked and the build process remained consistent. This required careful attention to lockfile management and script compatibility.

### Debugging Workflow Failures

To debug workflow failures, we implemented several strategies:

1. Added detailed debugging steps in the CI workflow to expose Node.js version and environment information
2. Utilized GitHub Actions' build logs to identify specific failure points
3. Replicated the CI environment locally to test solutions before pushing changes
4. Implemented parallel testing across Node.js versions to catch version-specific issues early

### Key Learnings

This project provided valuable insights into modern CI/CD practices:

1. The importance of proper tooling selection - switching from nyc to c8 for better ESM support
2. The value of comprehensive test coverage in catching issues before deployment
3. The significance of maintaining consistent development environments through proper package management
4. The power of automated workflows in enforcing code quality standards

### Areas for Improvement

Potential improvements for the future:

1. Implement automated rollback mechanisms for failed deployments
2. Add performance testing to the CI pipeline
3. Enhance branch coverage to reach the 80% threshold
4. Implement automated dependency updates with security scanning
5. Add end-to-end testing to complement current unit tests

## How to Run Locally

1. Install dependencies:

   ```cmd
   npm ci
   ```

1. Run tests with coverage:

   ```cmd
   npm run coverage
   ```

1. Start development server:

   ```cmd
   npm start
   ```
