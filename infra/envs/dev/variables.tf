variable "subscription_id" {
  type        = string
  description = "Azure subscription ID for the current environment"
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
