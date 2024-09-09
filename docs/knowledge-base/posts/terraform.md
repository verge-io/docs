---
title: Terraform VergeIO Provider
slug: terraform-vergeio-provider
description: Learn how to use the VergeIO Terraform Provider to manage VergeOS resources programmatically.
author: VergeOS Documentation Team
draft: false
date: 2024-09-01T14:20:54.833Z
tags:
  - terraform
  - automation
  - infrastructure
categories:
  - System Administration
  - Automation
  - Development
  - API
editor: markdown
dateCreated: 2024-09-01T14:20:54.833Z
---

# Terraform VergeIO Provider

The **Terraform VergeIO Provider** enables the integration and automation of VergeOS infrastructure with **Terraform**. It allows users to define, manage, and scale VergeOS resources as part of Infrastructure as Code (IaC) workflows.

For the latest provider documentation and examples, please refer to the following:

- [GitHub Repository](https://github.com/verge-io/terraform-provider-vergeio) for the VergeIO Terraform Provider.
- [Terraform Registry Documentation](https://registry.terraform.io/providers/verge-io/vergeio/latest) for official usage and updates.

---

## Example Usage

For more detailed usage examples, check the [docs folder](https://github.com/verge-io/terraform-provider-vergeio/tree/main/docs) in the GitHub repository.

### Example Configuration

```hcl
provider "vergeio" {
  host     = "https://some_url_or_ip"
  username = "my_user"
  password = "my_password"
  insecure = false  # Use true if using self-signed SSL certificates
}

resource "vergeio_vm" "new_vm" {
  name        = "NEW VM"
  description = "NEW TF VM"
  enabled     = true
  os_family   = "linux"
  cpu_cores   = 4
  machine_type = "q35"
  ram         = 8192
}
```

### Initializing and Applying

To apply the configuration:

```bash
terraform init && terraform apply
```

Configuration Reference

    host (Required): URL or IP address for the VergeOS system or tenant.
    username (Required): Username for the VergeOS system or tenant.
    password (Required): Password for the provided username.
    insecure (Optional): Set to true for systems using self-signed SSL certificates.

### Resources

The following VergeOS resources can be managed via Terraform:

    vergeio_drive
    vergeio_member
    vergeio_network
    vergeio_nic
    vergeio_user
    vergeio_vm

### Data Sources

The following data sources are available for querying VergeOS resources:

    vergeio_clusters
    vergeio_groups
    vergeio_mediasources
    vergeio_networks
    vergeio_nodes
    vergeio_version
    vergeio_vms

## Testing a Sample Configuration

To test your configuration, create a main.tf file in your Terraform workspace:

```hcl

terraform {
  required_providers {
    vergeio = {
      source = "vergeio/cloud/vergeio"
    }
  }
}

provider "vergeio" {
  host     = "https://someURLorIP"
  username = "username"
  password = "password"
}

resource "vergeio_vm" "new_vm" {
  name        = "NEW VM"
  description = "NEW TF VM"
  enabled     = true
  os_family   = "linux"
  cpu_cores   = 4
  machine_type = "q35"
  ram         = 8192
}
```

Then, run the following command:

```bash

terraform init && terraform apply
```

---

!!! note "Document Information" 
    - Last Updated: 2024-09-03 
    - VergeOS Version: 4.12.6
