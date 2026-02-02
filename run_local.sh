#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

( cd "$ROOT_DIR/app/backend" && (npx --yes nodemon --watch server.js server.js || node --watch server.js || npm start) ) &
BACKEND_PID=$!

( cd "$ROOT_DIR/app/frontend" && (npx --yes nodemon --watch server.js --watch public server.js || node --watch server.js || npm start) ) &
FRONTEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}
trap cleanup EXIT

wait "$BACKEND_PID" "$FRONTEND_PID"
