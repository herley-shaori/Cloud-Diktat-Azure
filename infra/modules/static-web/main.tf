terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
    }
    random = {
      source  = "hashicorp/random"
    }
  }
}

resource "random_string" "suffix" {
  length  = 8
  lower   = true
  upper   = false
  numeric = true
  special = false
}

locals {
  storage_account_name = substr(lower("${var.name_prefix}${random_string.suffix.result}"), 0, 24)
  files                = fileset(var.source_dir, "**/*")
  content_type_map = {
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".ico"  = "image/x-icon"
    ".txt"  = "text/plain; charset=utf-8"
  }
}

resource "azurerm_storage_account" "this" {
  name                     = local.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
}

resource "azurerm_storage_account_static_website" "this" {
  storage_account_id = azurerm_storage_account.this.id
  index_document     = var.index_document
  error_404_document = var.error_document
}

resource "azurerm_storage_blob" "static" {
  for_each               = toset(local.files)
  name                   = each.value
  storage_account_name   = azurerm_storage_account.this.name
  storage_container_name = "$web"
  type                   = "Block"
  source                 = "${var.source_dir}/${each.value}"
  delete_ondestroy       = true

  content_type = lookup(
    local.content_type_map,
    lower(try(regex("\\.[^.]+$", each.value), "")),
    "application/octet-stream"
  )

  depends_on = [azurerm_storage_account_static_website.this]
}
