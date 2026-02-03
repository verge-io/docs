# Tenant Crash Cart

## Overview
The **Tenant Crash Cart** is a utility virtual machine designed to provide emergency access to a tenant’s VergeOS environment when the tenant’s external network is misconfigured or otherwise unreachable. By attaching directly to the tenant’s core network, the Crash Cart allows parent-system administrators to log into the tenant UI even when normal access paths are unavailable.

This tool is especially useful during recovery scenarios where tenant operators cannot reach their own UI due to network issues, firewall misconfigurations, or incorrect external IP settings.

## When to Use a Crash Cart
A Crash Cart is appropriate when:

- The tenant UI cannot be reached through its normal external URL.
- External network settings were misconfigured and need correction.
- Firewall rules were changed in a way that blocks UI access.
- The tenant’s external network is powered off or not functioning as expected.
- You need a direct, internal path into the tenant environment for troubleshooting.

## Key Characteristics
- Available as a **recipe** in the Marketplace.
- Provides a connection path from the **parent system** into the tenant.
- Requires sufficient parent‑system permissions to access recipes, deploy a VM, and attach it to a tenant network.
- Does **not** bypass tenant authentication — valid tenant admin credentials are still required.
- Contains no special tools; its purpose is to present the tenant UI internally.

---

## Prerequisites
- Ability to create and start VMs on the parent system.
- Access to the **Services (Marketplace)** catalog.
- Tenant administrator‑level credentials for the tenant you intend to repair.
- Basic understanding of tenant networking and external network configuration.

---

## Deploying a Tenant Crash Cart

### 1. Create the Crash Cart VM
1. Navigate to **Virtual Machines** > **+ New VM**.
2. In the first section, choose **Services (Marketplace)**.
3. Select **Tenant Crash Cart**, then click **Next**.
4. Provide a **Name** for the VM. 
5. Select a **Cluster** (or leave the default).
6. Under **Select the tenant to attach to**, choose the tenant the Crash Cart should connect to.
7. Click **Submit** to create the VM instance.

The VM will be created and automatically attached to the tenant’s core network.

---

### 2. Power On and Access the Crash Cart Console
1. From the VM dashboard, click **Power On**.
2. Open the console using **Remote Console** or the console button in the top left.
3. Log into the OS shell using the username and password shown in the VM’s **Note** section.

!!! tip "Upon boot, the VM may auto‑login to the OS shell. The Crash Cart never auto‑logs into the VergeOS UI."

---

### 3. Log Into the Tenant VergeOS UI
Once the VM boots, it presents a browser session directed at the tenant’s VergeOS UI.

1. Enter your **tenant administrator credentials**.
2. Proceed with the necessary repairs to the tenant’s external network configuration.

The Crash Cart provides internal access even when the tenant’s external network is unreachable.

---

## Common Troubleshooting Scenarios
The Crash Cart is the right tool for resolving issues such as:

- Incorrectly updated tenant URL or external IP address
- Firewall rules blocking UI access (e.g., ports 80/443 disabled)
- External network powered off or failing to start automatically
- Other tenant external network issues that prevent normal UI connectivity

---

## Best Practices
- **Keep a Crash Cart VM powered off for reuse** to avoid delays during urgent recovery.
- If reusing:
  - Power off the VM.
  - Edit the VM’s recipe instance to set it to **--None--** to detach it.
  - When needed again, edit the recipe instance to select the desired tenant and power it on.

---

## Cleanup and Reuse Options
After completing repairs, you may:

### Recommended: Keep the VM for Future Use
- Power off the Crash Cart VM.
- Select **Edit Recipe Instance** on the left menu; Under **Select the tenant to attach to**, choose ***--None--***; **Submit** to save the change. 
- Leave the VM available for rapid redeployment.
- Reassign it to a different tenant later by editing the recipe instance.

### Alternative: Delete the VM
- If you prefer a clean environment, you may delete the VM entirely.
- The recipe will still be available within the *Marketplace* to create a new instance for any future need.

---