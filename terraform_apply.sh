#!/usr/bin/env bash
set -euo pipefail

# Load Azure credentials for Terraform
source "$(dirname "$0")/infra/envs/dev/credentials.env"

terraform apply "$@"
