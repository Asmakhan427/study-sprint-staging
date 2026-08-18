# Study Sprint — Staging Deployment

A small Express app demonstrating how to deploy the same codebase to separate **staging** and **production** environments using only environment variables (`APP_ENV`, `PORT`) — no code changes required.

## How it works

- **`build.js`** stamps the target environment (`APP_ENV`) into the static HTML output at build time.
- **`server.js`** is a single Express server shared by both staging and production; behavior is controlled entirely by env vars.
- **`package.json`** defines separate scripts for building/starting each environment.
- **`deploy_staging.sh`** automates install → build → start → health check, mirroring a basic CI/CD pipeline.

## Output
<img width="1891" height="867" alt="image" src="https://github.com/user-attachments/assets/f018be8d-0d88-4cd4-a03d-aa02a43122ea" />


## Getting started

```bash
npm install
```

### Staging
```bash
npm run build:staging
npm run start:staging   # runs on http://localhost:4000
```

### Production
```bash
npm run build:production
npm run start:production   # runs on http://localhost:3000
```

### One-shot deploy (staging)
```bash
chmod +x deploy_staging.sh
./deploy_staging.sh
```

## Verify it's running

```bash
curl http://localhost:4000/health
# {"status":"ok","environment":"staging"}

curl http://localhost:4000/
# HTML page showing "Running in: staging"
```

## Tech stack

- Node.js
- Express
- cross-env (for cross-platform env var scripts)
