# VergeOS Terraform Provider

## Overview

The VergeOS Terraform Provider enables infrastructure-as-code management of your VergeOS environment. This provider allows you to define, deploy, and manage VergeOS resources using Terraform configurations, providing automation capabilities for your virtual infrastructure management.

## Key Features

- Automated provisioning of VergeOS virtual machines, networks, drives, and users
- Infrastructure-as-code workflows for VergeOS environments
- Version-controlled infrastructure deployments
- Integration with existing Terraform and OpenTofu workflows
- Reproducible environment creation and management

## Installation and Configuration

To use the VergeOS Terraform Provider, add the following to your Terraform configuration:

```hcl
terraform {
  required_providers {
    vergeio = {
      source = "verge-io/vergeio"
      version = "~> 0.1.0"
    }
  }
}

provider "vergeio" {
  host     = "your-vergeos-ip-or-hostname"
  username = "your-username"
  password = "your-password"
}
```

For OpenTofu users, the configuration remains the same:

```hcl
terraform {
  required_providers {
    vergeio = {
      source = "verge-io/vergeio"
      version = "~> 0.1.0"
    }
  }
}
```

## Available Resources

The provider supports management of the following VergeOS resources:

- `vergeio_vm` - Create and manage virtual machines
- `vergeio_network` - Configure and manage virtual networks
- `vergeio_user` - Provision and manage storage resources

## Usage Examples

### Creating a Virtual Machine

```hcl
resource "vergeio_vm" "example" {
  name        = "example-vm"
  cpu_cores   = 2
  ram         = 4096  # MB
  description = "Example VM created by Terraform"

  
  vergeio_drive {
    disksize            = 20  #GB
    interface           = "virtio-scsi"
    preferred_tier      = 2
  }
  
  vergeio_nic {
    vnet       = vergeio_network.example.id
    interface  = "virtio"
  }
}
```

### Configuring a Network

```hcl
resource "vergeio_network" "example" {
  name             = "example-internal-network"
  network_address  = "192.168.1.0/24"
  dns_server_list  = ["8.8.8.8", "8.8.4.4"]
  dhcp_enabled     = true
  dhcp_start       = "192.168.1.100"
  dhcp_end         = "192.168.1.200"
  }
}
```

## Documentation and Resources

For complete documentation, including all supported resources, data sources, and detailed usage examples, please visit the official provider documentation:

- [Terraform Registry Documentation](https://registry.terraform.io/providers/verge-io/vergeio/latest/docs){target="_blank"}
- [OpenTofu Registry Documentation](https://search.opentofu.org/provider/verge-io/vergeio/latest){target="_blank"}
- [GitHub Repository](https://github.com/verge-io/terraform-provider-vergeio)

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/terraform-provider-vergeio/issues](https://github.com/verge-io/terraform-provider-vergeio/issues)

## Additional Resources

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs){target="_blank"}
- [OpenTofu Documentation](https://opentofu.org/docs/){target="_blank"}
- [Infrastructure as Code Best Practices](https://www.hashicorp.com/resources/what-is-infrastructure-as-code){target="_blank"}
