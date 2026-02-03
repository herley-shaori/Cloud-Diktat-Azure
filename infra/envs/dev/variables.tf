variable "subscription_id" {
  type        = string
  description = "Azure subscription ID for the current environment"
}

variable "admin_username" {
  type        = string
  description = "Admin username for the VM"
  default     = "azureuser"
}

variable "ssh_public_key" {
  type        = string
  description = "SSH public key for the VM"
}
