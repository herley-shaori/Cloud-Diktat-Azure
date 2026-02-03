output "resource_group_id" {
  description = "ID of the trial resource group"
  value       = azurerm_resource_group.trial.id
}

output "resource_group_name" {
  description = "Name of the trial resource group"
  value       = azurerm_resource_group.trial.name
}

output "resource_group_location" {
  description = "Location of the trial resource group"
  value       = azurerm_resource_group.trial.location
}
