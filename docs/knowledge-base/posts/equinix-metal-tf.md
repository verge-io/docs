---
title: Deploying VergeOS on Equinix Metal Using Terraform
slug: deploying-vergeos-equinix-metal-terraform
description: Detailed steps to deploy VergeOS on Equinix Metal using Terraform
draft: false
date: 2024-11-11T19:15:40.203Z
tags:
  - automation
  - devops
  - equinix metal
  - terraform
  - deployment
categories:
  - Automation
  - Development
  - Installation
  - System Administration
editor: markdown
dateCreated: 2024-12-11T10:30:00.000Z
---

# Deploying VergeOS on Equinix Metal Using Terraform

This guide provides a comprehensive walkthrough for deploying VergeOS on Equinix Metal, ensuring that both network and compute resources are correctly configured.

## Prerequisites

1. **Terraform**: Ensure Terraform is installed on your local machine. For installation instructions, visit the [Terraform Installation Guide](https://learn.hashicorp.com/tutorials/terraform/install-cli).

2. **Equinix Metal Account**: You need an active Equinix Metal account with the necessary API access permissions.

3. **Access Tokens**: Obtain your Equinix API token and ensure you have a project ID where resources will be created.

4. **Networking Setup on Equinix Metal**:
   
    - **/29 IP Range**: Go to Equinix Metal's Networking -> IPs section and request a > /29 IP range.
    - **Layer 2 VLANs**: Navigate to Networking -> Layer 2 VLAN and create two VLANs. One for core traffic (VLAN 2) and one for external traffic (VLAN 3).
    - **Metal Gateway**: Configure a gateway by visiting Networking -> Metal Gateway, using the IP range and linking it with the EXTERNAL VLAN created earlier.

## Step-by-Step Deployment Guide

### Step 1: Prepare Your Terraform File

Create a `main.tf` file and incorporate the following configuration, adjusted for your environment:

```hcl
terraform {
  required_providers {
    equinix = {
      source = "equinix/equinix"
    }
  }
}

provider "equinix" {
  auth_token = "your_api_token"
}

resource "equinix_metal_device" "node1" {
  hostname         = "node1"
  plan             = "m3.small.x86"
  metro            = "da"
  operating_system = "custom_ipxe"
  ipxe_script_url  = "https://updates.verge.io/public/verge-io-install-4.12.6-equinix.ipxe"
  always_pxe       = "false"
  billing_cycle    = "hourly"
  project_id       = "your_project_id"
  user_data = <<EOF
#!/bin/bash
YC_HOSTNAME="node1"
YC_CLOUD_NAME="EQCloud"
YC_TIMEZONE="America/Chicago"
YC_UPDATES_USER="your_email@domain.com"
YC_UPDATES_PASSWORD="your-update-password"
YC_USER_EMAIL="your_email@domain.com"
YC_USER_NAME="admin"
YC_USER_PASSWORD="your_password"
EOF
}

resource "time_sleep" "wait_90_seconds" {
  depends_on = [equinix_metal_device.node1]
  create_duration = "90s"
}

resource "equinix_metal_device_network_type" "l2bond" {
  device_id = equinix_metal_device.node1.id
  type      = "layer2-bonded"
  depends_on = [time_sleep.wait_90_seconds]
}

resource "equinix_metal_port_vlan_attachment" "external" {
  device_id = equinix_metal_device_network_type.l2bond.id
  port_name = "bond0"
  vlan_vnid = 3
}

resource "equinix_metal_port_vlan_attachment" "core" {
  device_id = equinix_metal_device_network_type.l2bond.id
  port_name = "bond0"
  vlan_vnid = 2
  native    = true
  depends_on = ["equinix_metal_port_vlan_attachment.external"]
}
```

!!! note
    Replace the placeholders with your specific details, including `your_api_token`, `your_project_id`, `your_email@domain.com`, and `your_password`.

### Step 2: Initialize and Apply the Configuration

1. **Initialize Terraform**:

    Run the following command within your directory to initialize:

    ```bash
    terraform init
    ```

2. **Apply the Configuration**:

    Deploy the infrastructure by executing:

    ```bash
    terraform apply
    ```

    Review the plan and confirm with `yes` to proceed with the deployment.


