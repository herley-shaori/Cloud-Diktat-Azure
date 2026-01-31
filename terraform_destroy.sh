#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <dev|prod> [terraform destroy args]" >&2
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

require_env() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    echo "Missing required env var: $name (check $CREDENTIALS_FILE)" >&2
    exit 1
  fi
}

require_env ARM_CLIENT_ID
require_env ARM_CLIENT_SECRET
require_env ARM_TENANT_ID
require_env ARM_SUBSCRIPTION_ID

# Ensure Terraform picks up the subscription explicitly
export TF_VAR_subscription_id="$ARM_SUBSCRIPTION_ID"

cd "$ENV_DIR"
terraform init -upgrade
terraform destroy -auto-approve "$@"
