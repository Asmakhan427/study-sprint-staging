#!/usr/bin/env bash
# deploy_staging.sh
# Mimics a basic CI/CD pipeline: install -> build -> start -> health check.

set -e

export APP_ENV=staging
export PORT=4000

echo "==> [1/4] Installing dependencies..."
npm install

echo "==> [2/4] Building for environment: $APP_ENV"
node build.js

echo "==> [3/4] Starting server on port $PORT..."
node server.js &
SERVER_PID=$!

# Give the server a moment to boot
sleep 2

echo "==> [4/4] Running health check..."
HEALTH_RESPONSE=$(curl -s "http://localhost:$PORT/health")
echo "Health check response: $HEALTH_RESPONSE"

if echo "$HEALTH_RESPONSE" | grep -q "\"status\":\"ok\""; then
  echo "Deployment to staging succeeded. Server is healthy (PID $SERVER_PID)."
else
  echo "Deployment failed health check. Stopping server."
  kill "$SERVER_PID"
  exit 1
fi
