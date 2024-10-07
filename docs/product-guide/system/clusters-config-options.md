# VergeOS Cluster Configuration Options

This page provides a detailed explanation of all configuration options available when creating or editing a cluster in VergeOS.

## General Settings

- **Enabled**: Toggle to enable or disable the cluster.
- **Name**: Enter a unique name for the cluster.
- **Description**: Provide a brief description of the cluster's purpose or characteristics.
- **Site**: Specify the site where the cluster is located (if applicable).

## Compute Settings

- **Default CPU Type**: Select the default CPU type for the cluster.

    !!! tip
        The recommended CPU type is shown below this field.

- **Max RAM per machine**: Set the maximum amount of RAM allowed per machine in the cluster (in GB).
- **Max cores per machine**: Set the maximum number of CPU cores allowed per machine in the cluster.
- **Target max ram pct**: Set the target maximum RAM percentage for the cluster.
- **% of reserve RAM for machines**: Specify the percentage of RAM to reserve for machines in the cluster.
- **Compute**: Toggle to enable or disable compute functionality for the cluster.

## Storage Settings

- **Storage**: Toggle to enable or disable storage functionality for the cluster.
- **Storage buffer per node**: Set the storage buffer size per node (in GB).
- **Allocate hugepages for storage**: Toggle to enable or disable hugepages for storage.
- **Storage cache size**: Set the cache size for storage (in GB).
- **Tier used for swap**: Specify the storage tier to be used for swap space (-1 to disable).
- **Swap per drive**: Set the amount of swap space per drive (in MB).

## CPU Settings

- **Disable CPU Security Mitigations**: Toggle to disable CPU security mitigations.

    !!! warning
        Only enable this if you trust all of the guests running in this cluster.

- **Disable Speculative Store Bypass**: Toggle to disable Speculative Store Bypass.

    !!! note
        Disabling this will have a performance impact (refer to full mitigation notes to disable SMT).

- **Disable SMT**: Toggle to disable Simultaneous Multi-Threading.

    !!! info
        This will disable hyper-threading (refer to BIOS for the recommended way to disable SMT).

- **Disable sleep states for CPUs**: Toggle to disable sleep states for CPUs.

    !!! caution
        Enabling this will increase temperatures and power usage.

- **Enable Split Lock Detection**: Toggle to enable Split Lock Detection.

    !!! note
        Enabling this can have a performance impact on Virtual Machines that trigger a split lock.

## Virtualization Settings

- **Nested Virtualization**: Toggle to enable or disable nested virtualization.

    !!! info
        This allows you to run a virtual machine (VM) inside another VM while still using hardware acceleration from the host.

- **Allow Nested Virtualization Live Migration**: Toggle to allow live migration of VMs with nested virtualization enabled.

## Performance Settings

- **Energy Performance Policy**: Choose the energy performance policy for the cluster (e.g., Balance Performance, Performance).
- **CPU Scaling Governor**: Select the CPU scaling governor for the cluster (e.g., Performance).

## Temperature Settings

- **Maximum Core Temperature**: Set the maximum allowed core temperature (in Celsius). Choose between Custom, Hardware, or Disable.
- **Maximum Core Temperature Warning Threshold %**: Set the warning threshold for core temperature as a percentage of the maximum temperature.
- **Critical Core Temperature**: Set the critical core temperature (in Celsius). Choose between Custom, Hardware, or Disable.

## Logging

- **System Log Filter**: Specify the system log filter string to control logging verbosity.

## Advanced Settings

- **Cost per Unit**: Set the cost per unit for the cluster (if applicable).
- **Price per Unit**: Set the price per unit for the cluster (if applicable).

!!! tip "Configuration Best Practices"
    When creating or editing a cluster, refer to these configuration options to customize the cluster according to your specific requirements. Each option plays a crucial role in determining the behavior, performance, and capabilities of your VergeOS cluster.
