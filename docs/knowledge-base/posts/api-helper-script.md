---
title: API Helper Script
slug: api-helper-script
description: A guide to using the VergeOS API helper script, yb-api, for managing VMs and making API calls.
draft: false
date: 2024-08-03T16:30:00.000Z
tags:
  - api
  - helper script
  - development
  - vergeos
  - vm management
categories:
  - API
  - Development
  - Virtual Machines
editor: markdown
dateCreated: 2024-08-03T16:30:00.000Z
---

# API Helper Script

The `yb-api` helper script provides an easy way for developers to interact with the VergeOS API. It simplifies making API calls, such as retrieving virtual machines, updating configurations, and managing resources. This guide will outline the key commands and usage of the `yb-api` script.

## Prerequisites

- Access to a VergeOS system.
- Access to the cluster via SSH or direct connection.
- **wget** and **curl** must be installed on the system for certain operations.

### Running the Helper Script

To get help or view the available options, run:

```bash
yb-api --help
```

Connect to the node and execute this command to begin using the API helper.

![yb-api Example](/product-guide/screenshots/api-helper.png)

## Example Commands

Below are examples of how to use `yb-api` for various VM management tasks.

### Get a List of Virtual Machines (excluding snapshots)

Retrieve a list of VMs and filter out snapshots.

```bash
yb-api --get --user=admin --server=10.0.0.100 \
--fields='name,$key,ram,machine#status#status as machine_status' \
--filter='is_snapshot eq false' /v4/vms
```

### Simple Dump of All VMs

This command retrieves a list of all VMs. The `--server`, `--user`, `--filter`, and `--fields` flags are optional in this case.

```bash
yb-api --get /v4/vms
```

### Get Detailed VM Information

Retrieve most of the fields, including drive and NIC information, for a specific VM (VM 1 in this case).

```bash
yb-api --get --user=admin --server=10.0.0.100 \
--fields='most,machine[most,drives[most],nics[most]]' /v4/vms/1
```

### Rename a Virtual Machine

Change the name of an existing virtual machine (VM 1) to "NEWNAME".

```bash
yb-api --put='{"name":"NEWNAME"}' --user=admin --server=10.0.0.100 /v4/vms/1
```

### Delete a Virtual Machine

Delete a specific VM (VM 1), using its `$key`.

```bash
yb-api --delete --user=admin --server=10.0.0.100 \
--fields='name,$key,ram' /v4/vms/1
```

### Create a New Virtual Machine

Create a new VM with specific configurations (name, CPU cores, RAM, etc.).

```bash
yb-api --post='{"name":"NEWVM","enabled":true,"description":"test vm",\
"os_family":"linux","cpu_cores":4,"ram":"8192"}' --user=admin \
--server=10.0.0.100 /v4/vms
```

### Get the VM Database Table Schema

Retrieve the schema for the VMs database table.

```bash
yb-api --get --user=admin --server=10.0.0.100 '/v4/vms/$table'
```

### Clone a Virtual Machine

Clone an existing VM (VM 1) and give it a new name.

```bash
yb-api --get --user=admin --server=10.0.0.100 '/v4/vm_actions' \
--post='{"vm":1, "action": "clone", "params": {"name": "NEW VM NAME"}}'
```

### Power On a Virtual Machine

Power on an existing VM (VM 1).

```bash
yb-api --get --user=admin --server=10.0.0.100 '/v4/vm_actions' \
--post='{"vm":1, "action": "poweron"}'
```

## Notes About `yb-api`

- The `yb-api` script relies on **wget**, which may not be installed by default on macOS. Make sure to install it if necessary.
- **curl** is used for the upload function in certain API calls, such as posting data to create new VMs.

---

By using the `yb-api` helper script, developers can simplify interaction with the VergeOS API and manage virtual machines more efficiently. Let us know if you need assistance with further commands or options.



---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6
