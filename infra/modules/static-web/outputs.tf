output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.this.name
}

output "web_endpoint" {
  description = "Primary web endpoint for the static website"
  value       = azurerm_storage_account.this.primary_web_endpoint
}
