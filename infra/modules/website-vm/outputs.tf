output "public_ip" {
  description = "Public IP address of the VM"
  value       = azurerm_public_ip.this.ip_address
}

output "http_url" {
  description = "Public URL for the hosted site"
  value       = "http://${azurerm_public_ip.this.ip_address}"
}
