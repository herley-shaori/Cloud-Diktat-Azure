output "hello_world" {
  description = "Simple sanity output"
  value       = "hello world"
}

module "resource_group_trial" {
  source = "../../modules/resource-group-trial"

  resource_group_name = "rg-trial-dev"
  location            = "indonesiacentral"
}
