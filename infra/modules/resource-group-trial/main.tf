resource "azurerm_resource_group" "trial" {
  name     = var.resource_group_name
  location = var.location
}
