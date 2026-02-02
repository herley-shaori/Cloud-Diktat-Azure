variable "resource_group_name" {
  type        = string
  description = "Resource group for the static website storage account"
}

variable "location" {
  type        = string
  description = "Azure region for the storage account"
}

variable "source_dir" {
  type        = string
  description = "Local directory containing static website assets"
}

variable "index_document" {
  type        = string
  default     = "index.html"
  description = "Default index document"
}

variable "error_document" {
  type        = string
  default     = "404.html"
  description = "Default error document"
}

variable "name_prefix" {
  type        = string
  default     = "clouddiktat"
  description = "Prefix for the storage account name"
}
