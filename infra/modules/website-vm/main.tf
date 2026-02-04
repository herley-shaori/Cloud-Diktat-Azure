terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}

locals {
  vm_name       = "${var.name_prefix}-vm"
  vnet_name     = "${var.name_prefix}-vnet"
  subnet_name   = "${var.name_prefix}-subnet"
  nsg_name      = "${var.name_prefix}-nsg"
  pip_name      = "${var.name_prefix}-pip"
  nic_name      = "${var.name_prefix}-nic"
  computer_name = substr(var.name_prefix, 0, 15)
}

resource "azurerm_virtual_network" "this" {
  name                = local.vnet_name
  address_space       = ["10.10.0.0/16"]
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "this" {
  name                 = local.subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.10.1.0/24"]
}

resource "azurerm_network_security_group" "this" {
  name                = local.nsg_name
  location            = var.location
  resource_group_name = var.resource_group_name

  security_rule {
    name                       = "Allow-HTTP"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_public_ip" "this" {
  name                = local.pip_name
  location            = var.location
  resource_group_name = var.resource_group_name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_network_interface" "this" {
  name                = local.nic_name
  location            = var.location
  resource_group_name = var.resource_group_name

  ip_configuration {
    name                          = "primary"
    subnet_id                     = azurerm_subnet.this.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.this.id
  }
}

resource "azurerm_network_interface_security_group_association" "this" {
  network_interface_id      = azurerm_network_interface.this.id
  network_security_group_id = azurerm_network_security_group.this.id
}

resource "azurerm_linux_virtual_machine" "this" {
  name                = local.vm_name
  resource_group_name = var.resource_group_name
  location            = var.location
  size                = var.vm_size
  admin_username      = var.admin_username
  computer_name       = local.computer_name
  network_interface_ids = [
    azurerm_network_interface.this.id
  ]

  disable_password_authentication = false
  admin_password                  = var.admin_password

  custom_data = base64encode(
    templatefile("${path.module}/cloud-init.yaml", {
      index_b64  = base64encode(file("${var.source_dir}/index.html"))
      styles_b64 = base64encode(file("${var.source_dir}/styles.css"))
      app_b64    = base64encode(file("${var.source_dir}/app.js"))
    })
  )

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}
