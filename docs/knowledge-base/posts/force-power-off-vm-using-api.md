---
title: Force Power Off a VM Using the API
slug: force-power-off-vm-using-api
description: How to force power off a non-responsive virtual machine using the VergeOS API
draft: false
date: 2025-01-28T00:00:00.000Z
tags:
  - api
  - vm
  - power management
  - swagger
  - troubleshooting
  - force power off
  - virtual machine
categories:
  - API
  - VM
  - Troubleshooting
editor: markdown
dateCreated: 2025-01-28T00:00:00.000Z
---

# Force Power Off a VM Using the API

## Overview

!!! info "Key Points"
    - Use the VergeOS API to force power off a stuck VM
    - Requires API/Swagger access
    - Process involves multiple API calls to ensure accurate targeting
    - Should only be used when normal power off methods fail

This guide explains how to force power off a non-responsive virtual machine (VM) using the VergeOS API when standard power-off methods are unsuccessful.

## Prerequisites

- Access to the VergeOS UI with administrative privileges
- The name of the stuck/non-responsive VM
- Basic understanding of API operations

!!! warning "Important"
    This procedure should only be used when standard power-off methods have failed. Forcing a VM to power off can lead to data loss or corruption if not used carefully.

## Steps

### 1. Access the API Documentation

1. Navigate to **System** in the VergeOS UI
2. Click on **API Documentation** (also known as Swagger)

### 2. Locate the VM ID

1. In the API interface, locate and expand the **VMs** table
2. Click the blue **GET** button
3. In the parameters section:
   - Use filter `name eq your_vm_name` to find a specific VM
4. Click **Execute**
5. Note the `Machine` number from the response

### 3. Get Machine Status ID

1. Navigate to the **machines** table
2. Click the blue **GEt /machines/{id}**
3. In the parameters:
   - Set `id` to the `Machine number from the previous response`
   - Set `fields` to `status`
5. Click **Execute**
6. From the response, note the `status` value

### 4. Verify Machine Status

1. Go to the **machine_status** table
2. Click the blue **GET /machine_stats/{id}**
3. In the parameters:
   - Set `id` to `status_number` (using the status value from step 3)
   - Set `fields` to `most`
4. Click **Execute**
5. Verify this is the correct VM by checking:
   - Number of cores
   - RAM allocation
   - Status information
   - Machine number

### 5. Force Power Off

1. In the **machine_status** table, click **PUT**
2. Enter the status number as the `id` **resource id**
3. In the request body, enter the following JSON:

```json
{
    "running": false,
    "migratable": true,
    "status": "stopped",
    "state": "offline"
}
```

4. Click **Execute**

### 6. Verify Power Off

1. Return to the VergeOS UI
2. Verify that the VM shows as powered off

## Troubleshooting

!!! warning "Common Issues"
    - If the VM doesn't show as powered off after the API call, wait a few minutes for the status to update
    - If the status doesn't update, verify that all IDs were correct in the previous steps
    - In case of errors, check the API response for specific error messages

## Additional Notes

- Always document the VM's ID and status values before making changes
- Consider taking a snapshot of the VM before forcing power off if possible
- Monitor the VM after forcing power off to ensure it starts properly when needed

---
## Feedback

!!! question "Need Help?"
    If you do not feel confortable with this process, please reach out to our support team for assistance.

---
!!! note "Document Information"
    - Last Updated: 2024-01-28
    - VergeOS Version: All
