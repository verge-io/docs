# Licensing Overview

This guide explains how VergeOS licensing works, including System IDs, license types, and what to expect during common scenarios like reinstallation.

## How VergeOS Licensing Works

Every VergeOS installation is identified by a unique **System ID**. Your license is tied directly to this System ID — not to hardware, user accounts, or individual nodes. As long as the System ID remains the same, the license is valid regardless of hardware changes within the cluster.

### System-Level Licensing

A single VergeOS license covers the entire system, including all nodes in the cluster. You do not need separate licenses for each node. When you add or remove nodes from a cluster, the existing license continues to apply because the System ID does not change.

## Finding Your System ID

The System ID is displayed in two locations:

1. **System Settings**: Navigate to **System** > **Settings**. The **ID** field in the General section shows your System ID.
2. **Advanced Settings**: Navigate to **System** > **Settings** > **Advanced**. The **System ID** field is listed in the settings table.

!!! warning "Do Not Change Your System ID"
    Modifying the System ID in Advanced Settings will invalidate your current license, which can prevent the system from running workloads. Only change this setting under direct guidance from VergeOS support.

## License Types

VergeOS offers two primary license types, each with a different update source:

| License Type | Update Source | Use Case |
|---|---|---|
| **Production** | Verge.io Updates | Production deployments with full support |
| **Trial / NFR** | Verge.io Trial/NFR | Proof-of-concept labs, demos, and not-for-resale environments |

Both license types require authentication credentials provided by the VergeIO team. The license type determines which update server your system connects to for software updates and license validation.

!!! note
    Valid licensing configuration is required for core system functionality, including running virtual machines and NAS services — not just software updates.

## License Details

You can view your current license information under **System** > **Settings** in the **License** section:

- **Name** and **Description**: Identifies the license
- **Valid From / Until**: The license validity period
- **Auto-Renewal**: Whether the license renews automatically
- **Key**: The license key (click **Copy** to copy it)

## Reinstallation and License Reactivation

When you reinstall VergeOS, the installation process generates a **new System ID**. Because your license is tied to the previous System ID, it will not automatically transfer to the new installation.

### How to Reactivate After a Reinstall

1. Note your **new System ID** from **System** > **Settings** after the fresh installation.
2. Contact [VergeOS Support](/support) and provide both the old and new System IDs.
3. The support team will deactivate the license on the old System ID and activate it on the new one.
4. Once activated, configure your update settings with your credentials and verify connectivity by navigating to **System** > **Updates** and clicking **Check For Updates**.

!!! tip
    Before reinstalling, record your current System ID and licensing credentials. This speeds up the reactivation process.

## Air-Gap Licensing

For environments without outbound internet access, VergeOS supports air-gap licensing. This involves generating a license request file from the system and emailing it to the VergeOS licensing team for manual activation.

For detailed instructions, see:

- [Requesting an Airgap License](/knowledge-base/requesting-an-airgap-license/)
- [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license/)

## Additional Resources

- [Licensing and Software Updates](/product-guide/system/licensing-and-updates/) — Managing updates and update server configuration
- [Verify Licensing and Update Server Configuration](/product-guide/system/license-updates-verify/) — Troubleshooting licensing connectivity
- [System Settings Overview](/product-guide/system/settings-overview/) — General system settings reference
