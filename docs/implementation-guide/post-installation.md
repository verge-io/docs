# Post-Installation Configuration Guide

## Introduction

After completing your VergeOS installation, there are a few essential steps to promote optimum functionality, performance, and reliability.  This page will guide you through key post-installation tasks, such as verifying system status, confirming core network configuration, and establishing necessary system settings.
<!-- something about this is after a "successful" install of all initial nodes -->

### 1. Initial System Access

* **Access the Web UI:**
   - Open a web browser and navigate to your VergeOS system's IP address
   - Log in using your admin credentials created during installation

* **Verify System Status:**
   - Check the dashboard for any warnings or alerts
   - Ensure all nodes are showing as online and healthy. (The Node tile on the Main Dashboard should display all cloud nodes online with a green status.)  

### 2. Verify Network Configuration

The Core Fabric at the heart of VergeOS is designed with redundancy and resiliency in mind. For this architecture to function as intended, administrators must verify two key attributes: redundancy and isolation of the core networks.  Proper verification at this stage helps to ensure expected fault tolerance and performance as you move into production. 

* **Test Core Network Redundancy**
To ensure the system can tolerate hardware or link failures without impacting workloads:
- Physically disconnect cables or power down one of the core switches to simulate a failure.
- Within the VergeOS UI, navigate to Nodes.  Wait several minutes to verify that all nodes appear as "Running"/green status. 
- After restoring the failed link or switch. Repeat the test on the other physical core network.

* **Verify Isolation of Core Networks**
To maintain data integrity and prevent inter-system interference:
- Each physical core network should operate on its own isolated switch or, at minimum, a dedicated VLAN.
- Also ensure that no other VergeOS systems share these networks. For example, if running multiple VergeOS host systems within shared infrastructure, each system would need two unique and exclusive VLAN IDs.

<!-- mention vlan ids that should not/cannot be used for core networks??>

<!-- simulate external loss to node 1? -->

### Important Considerations

- Regular testing of network redundancy and failover is recommended
- Document all configuration changes for future reference

### 3. BIOS/Firmware Settings

* **CPU Power Management:**

It’s generally recommended to configure VergeOS nodes in **High Performance mode**, rather than power-saving settings that throttle CPU speed or enable sleep states to reduce energy use and noise. VergeOS typically enforces high-performance settings automatically, though some BIOS platforms may require manual adjustment if overrides aren’t supported.  Disabling CPU power-saving features can be especially beneficial on newly deployed systems, where workloads are gradually added. In these cases, idle nodes must quickly respond as demand increases, something High Performance mode is designed to handle.

!!! tip "Different BIOS vendors often use slightly different terminology for what essentially amounts to High Performance mode. Several examples you might encounter across systems, include: - *Performance/High Performance/Max Performance, Optimized Defaults, CPU Performance Mode, Turbo Mode, Disable C-States, Disable CPU Power Saving*.
The exact label and location vary by manufacturer and BIOS version. Consult the motherboard manual or UEFI help text if unsure."
 
* **Security Mitigations**

BIOS-level security mitigations are hardware and firmware protections, such as: Secure Boot, TPM, and SMM Security Mitigation, that help defend against low-level attacks before the operating system loads. In environments where workloads are known and trusted, administrators may choose to disable some of these settings to optimize performance. However, this approach is strongly discouraged in service provider or third-party tenant environments, where guest workloads may be untrusted or vulnerable to exploitation. In such cases, it is important to keep mitigations enabled to protect system integrity and security boundaries.

!!! warning "Only consider disabling of security mitigations when all workloads are known and trusted."

4. System Configuration

Refer to the [Initial System Configuration Checklist](/product-guide/intro/new-system-configuration) in the VergeOS Product Guide to finish preparing your system for production. 

## Troubleshooting & Support

If issues arise during post-installation configuration:

- Check the system logs for any errors
- Review the [Knowledge Base](/knowledge-base) for common solutions
- Contact [VergeOS Support](/support) for assistance

