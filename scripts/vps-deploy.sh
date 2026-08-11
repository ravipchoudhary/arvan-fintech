#!/usr/bin/env bash
set -euo pipefail

# vps-deploy.sh
# Helper to prepare and build the app on an Ubuntu VPS.
# Usage: sudo bash scripts/vps-deploy.sh /path/to/app

APP_DIR=${1:-/www/wwwroot/arvan-fintech}
if [ ! -d "$APP_DIR" ]; then
  echo "App directory $APP_DIR not found"
  exit 1
fi

echo "Installing system packages (requires sudo)..."
if command -v apt >/dev/null 2>&1; then
  sudo apt update
  sudo apt install -y build-essential python3 pkg-config libsqlite3-dev git
else
  echo "Non-Debian system: ensure build tools and sqlite dev libs are installed." >&2
fi

cd "$APP_DIR"

echo "Removing node_modules and lockfile to ensure native builds match current Node..."
rm -rf node_modules package-lock.json

echo "Installing npm dependencies..."
npm ci

echo "Generating Prisma client and rebuilding native binaries..."
npx prisma generate
echo "Applying Prisma migrations (production)"
npx prisma migrate deploy || true

npm rebuild better-sqlite3 --update-binary || true

echo "Building app..."
npm run build

echo "Done. If you use systemd, restart the service: sudo systemctl restart arvan-fintech"