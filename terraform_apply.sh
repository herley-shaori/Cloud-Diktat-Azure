#!/usr/bin/env bash
set -euo pipefail

if [ -z "${BASH_VERSION:-}" ]; then
  exec /usr/bin/env bash "$0" "$@"
fi

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
PASSWORD_FILE="$ENV_DIR/admin_password.env"

if [ ! -d "$ENV_DIR" ]; then
  echo "Unknown environment: $ENV_NAME" >&2
  usage
  exit 1
fi

if [ ! -f "$CREDENTIALS_FILE" ]; then
  echo "Missing credentials file: $CREDENTIALS_FILE" >&2
  exit 1
fi

if [ -f "$PASSWORD_FILE" ]; then
  # shellcheck disable=SC1090
  . "$PASSWORD_FILE"
fi

# Load Azure credentials for Terraform
source "$CREDENTIALS_FILE"

require_env() {
  local name="$1"
  local hint="$2"
  if [ -z "${!name:-}" ]; then
    echo "Missing required env var: $name (check $hint)" >&2
    exit 1
  fi
}

require_env ARM_CLIENT_ID "$CREDENTIALS_FILE"
require_env ARM_CLIENT_SECRET "$CREDENTIALS_FILE"
require_env ARM_TENANT_ID "$CREDENTIALS_FILE"
require_env ARM_SUBSCRIPTION_ID "$CREDENTIALS_FILE"

require_env TF_VAR_admin_password "$PASSWORD_FILE"

# Ensure Terraform picks up the subscription explicitly
export TF_VAR_subscription_id="$ARM_SUBSCRIPTION_ID"

cd "$ENV_DIR"
terraform init -upgrade
terraform apply -auto-approve "$@"
