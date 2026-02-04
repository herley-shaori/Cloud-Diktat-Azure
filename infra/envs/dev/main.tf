output "hello_world" {
  description = "Simple sanity output"
  value       = "hello world"
}

locals {
  location            = "indonesiacentral"
  resource_group_name = "rg-web-vm-dev"
}

module "resource_group_web" {
  source = "../../modules/resource-group-trial"

  resource_group_name = local.resource_group_name
  location            = local.location
}

module "website_vm" {
  source = "../../modules/website-vm"

  resource_group_name = local.resource_group_name
  location            = local.location
  admin_username      = var.admin_username
  admin_password      = var.admin_password
  vm_size             = "Standard_A1_v2"
  source_dir          = "${path.module}/../../../app/frontend/public"
  name_prefix         = "clouddiktatdev"

  depends_on = [module.resource_group_web]
}

output "website_vm_public_ip" {
  description = "Public IP address for the website VM"
  value       = module.website_vm.public_ip
}

output "website_vm_url" {
  description = "Public URL for the hosted site"
  value       = module.website_vm.http_url
}
