#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <dev|prod> [terraform apply args]" >&2
}

if [ "${1:-}" = "" ]; then
  usage
  exit 1
fi

ENV_NAME="$1"
shift

ROOT_DIR="$(dirname "$0")"
ENV_DIR="$ROOT_DIR/infra/envs/$ENV_NAME"
CREDENTIALS_FILE="$ENV_DIR/credentials.env"

if [ ! -d "$ENV_DIR" ]; then
  echo "Unknown environment: $ENV_NAME" >&2
  usage
  exit 1
fi

if [ ! -f "$CREDENTIALS_FILE" ]; then
  echo "Missing credentials file: $CREDENTIALS_FILE" >&2
  exit 1
fi

# Load Azure credentials for Terraform
source "$CREDENTIALS_FILE"

cd "$ENV_DIR"
terraform init -upgrade
terraform apply "$@"
