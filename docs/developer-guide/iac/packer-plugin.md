# VergeOS Packer Plugin

## Overview

The VergeOS Packer Plugin lets you build automated, repeatable VM templates on VergeOS using [HashiCorp Packer](https://www.packer.io/){target="_blank"}. Instead of manually creating and configuring golden images, you define your template builds as code — making them version-controlled, shareable, and reproducible across environments.

The plugin handles the full lifecycle: creating a VM, waiting for disk imports, establishing SSH or WinRM connectivity, running your provisioners, and producing a clean template ready for deployment.

!!! tip "GitHub Repository"
    Full source code, examples, and issue tracker are available at [github.com/verge-io/packer-plugin-vergeio](https://github.com/verge-io/packer-plugin-vergeio){target="_blank"}.

## Requirements

| Dependency | Version |
|------------|---------|
| Packer | >= 1.10.2 |
| VergeOS | Recent release with API v4 |

## Installation

Install the plugin directly from the Packer plugin registry:

```bash
packer plugins install github.com/verge-io/vergeio
```

## Builder Configuration

The `vergeio-vm` builder creates a new VM on your VergeOS environment, provisions it, and outputs a template. Here's a basic example:

```hcl
packer {
  required_plugins {
    vergeio = {
      source  = "github.com/verge-io/vergeio"
      version = "~> 0.1"
    }
  }
}

source "vergeio-vm" "ubuntu-template" {
  vergeos_host     = "your-vergeos-host"
  vergeos_username = "your-username"
  vergeos_password = "your-password"

  vm_name          = "packer-ubuntu-2404"
  vm_description   = "Ubuntu 24.04 base template"
  vm_cpus          = 2
  vm_ram           = 2048
  vm_os_family     = "linux"
  vm_machine_type  = "q35"

  ssh_username     = "ubuntu"
  ssh_timeout      = "10m"
}

build {
  sources = ["source.vergeio-vm.ubuntu-template"]

  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y cloud-init"
    ]
  }
}
```

!!! note "Credentials"
    Avoid hardcoding credentials in your Packer templates. Use environment variables or a variables file instead:

    ```hcl
    variable "vergeos_host" {
      type = string
    }

    variable "vergeos_password" {
      type      = string
      sensitive = true
    }
    ```

## Key Features

### Intelligent Power Management

The plugin manages VM power states throughout the build process — powering on the VM when needed, waiting for it to become ready, and performing a graceful shutdown when provisioning is complete.

### Automatic Disk Import Waiting

When a VM references disk images that need to be imported, the plugin automatically waits for those imports to complete before proceeding. This is especially useful when building templates from ISO images or imported virtual disks.

### SSH and WinRM Connectivity

The plugin supports both SSH (Linux) and WinRM (Windows) communicators, so you can build templates for any guest operating system. It waits for the communicator to become available before running provisioners.

### Static IP via Cloud-Init

For environments that use cloud-init, the plugin can configure static IP addresses on the VM during the build process. This ensures reliable network connectivity without depending on DHCP.

### Graceful Shutdown

After provisioning completes, the plugin performs a graceful shutdown of the VM — ensuring the filesystem is clean and the template is in a consistent state.

## Next Steps

- Browse the [GitHub repository](https://github.com/verge-io/packer-plugin-vergeio){target="_blank"} for full configuration reference and additional examples
- Learn about [Terraform Provider](terraform-provider.md) for deploying VMs from your Packer-built templates
- Explore the [Ansible Collection](ansible-collection.md) to combine image building with configuration management
