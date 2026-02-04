variable "resource_group_name" {
  type        = string
  description = "Resource group for the VM"
}

variable "location" {
  type        = string
  description = "Azure region for the VM"
}

variable "admin_username" {
  type        = string
  description = "Admin username for the VM"
  default     = "azureuser"
}

variable "admin_password" {
  type        = string
  description = "Admin password for the VM"
  sensitive   = true
}

variable "vm_size" {
  type        = string
  description = "Azure VM size"
  default     = "Standard_B1s"
}

variable "name_prefix" {
  type        = string
  description = "Prefix for VM-related resources"
}

variable "source_dir" {
  type        = string
  description = "Local directory containing static site assets"
}
