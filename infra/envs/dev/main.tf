module "resource_group_trial" {
  source = "../../modules/resource-group-trial"

  resource_group_name = "rg-trial-dev"
  location            = "indonesiacentral"
}
