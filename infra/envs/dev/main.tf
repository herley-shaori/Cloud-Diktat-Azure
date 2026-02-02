module "resource_group_trial" {
  source = "../../modules/resource-group-trial"

  resource_group_name = "rg-trial-dev"
  location            = "indonesiacentral"
}

module "static_web" {
  source = "../../modules/static-web"

  resource_group_name = "rg-trial-dev"
  location            = "indonesiacentral"
  source_dir          = "${path.module}/../../../app/frontend/public"
  name_prefix         = "clouddiktatdev"

  depends_on = [module.resource_group_trial]
}

output "static_web_url" {
  description = "Public URL for the static website"
  value       = module.static_web.web_endpoint
}
