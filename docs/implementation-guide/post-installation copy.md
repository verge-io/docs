# Post-Installation Configuration Guide

## Introduction

After completing your VergeOS installation, there are a few essential steps to promote optimum functionality, performance, and reliability.  This page will guide you through key post-installation tasks, such as verifying system status, confirming core network configuration, and establishing system settings.


### 1. Initial System Access

* **Access the Web UI:**
   - Open a web browser and navigate to your VergeOS system's IP address
   - Log in using your admin credentials created during installation


* **Verify System Status:**
   - Check the dashboard for any warnings or alerts
   - Ensure all nodes are showing as online and healthy

### 2. **Confirm Networking Configuration:**

Verify - **Core Network Isolation:** Your VergeOS core network must be isolated from other traffic. When using dedicated core fabric switches (recommended whenever possible), core networks are automatically isolated. However, when using existing infrastructure switches,take additional precautions to ensure complete segregation of VergeOS core networks. it is important that new, *dedicated*, VLANs are assigned to each physical core network. 

Verify- **Core Network Redundancy:** Core redundancy depends on proper configuration of the physical networks. When using dedicated core fabric switches, important to realize that just b/c shows a connection does not mean that it is configured correctly (could have wrong MTU, etc.) test by uplugging connections from each switch - then the other or powering down a switch at a time.

### 3. BIOS/Firmware Settings

* **CPU Power Management:**

It’s generally recommended to configure VergeOS nodes in **High Performance mode**, rather than power-saving settings that throttle CPU speed or enable sleep states to reduce energy use and noise. VergeOS typically enforces high-performance settings automatically, though some BIOS platforms may require manual adjustment if overrides aren’t supported.
Disabling CPU power-saving features can be especially beneficial on newly deployed systems, where workloads are gradually added. In these cases, idle nodes must quickly respond as demand increases—something High Performance mode is designed to handle.

!!! tip "Different BIOS vendors often use slightly different terminology for what essentially amounts to High Performance mode. Several examples you might encounter across systems, include: - *Performance/High Performance/Max Performance, Optimized Defaults, CPU Performance Mode, Turbo Mode, Disable C-States, Disable CPU Power Saving*.
The exact label and location vary by manufacturer and BIOS version. Consult the motherboard manual or UEFI help text if unsure."
 
* **Security Mitigations**

BIOS-level security mitigations are hardware and firmware protections, such as: Secure Boot, TPM, and SMM Security Mitigation, that help defend against low-level attacks before the operating system loads. In environments where workloads are known and trusted, administrators may choose to disable some of these settings to optimize performance. However, this approach is strongly discouraged in service provider or third-party tenant environments, where guest workloads may be untrusted or vulnerable to exploitation. In such cases, it is important to keep mitigations enabled to protect system integrity and security boundaries.


### 7. Verify Network Configuration


1. **Core Network Testing:**
   - Test failover scenarios:
     * Simulate core/fabric connection loss
     * Test external connection loss on Node 1
   - Verify Core 1 and Core 2 VLANs:
     * Confirm they are not visible on other devices/ports
     * Verify they are not shared with another VergeOS system/site

2. **Firewall Configuration:**
      - Review network firewall rules
      - Enable required ports (e.g., 14201 on External for Site Syncs)
      - Add source locking to rules for enhanced security

3. **VLAN Configuration:**
      - Add any additional VLANs needed for your environment
      - Reference documentation at docs.verge.io for VLAN creation

!!! warning "Network Isolation"
    Proper network isolation is crucial. Ensure Core networks are completely isolated from other systems and properly configured for redundancy.

---

## Important Considerations

- Changes to swap settings require disk reformatting and are not applied in real-time
- When adding new nodes, ensure storage capacity matches across all nodes in a tier to maintain redundancy
- When enabling network rules, always implement source locking to ensure traffic security
- Regular testing of network redundancy and failover is recommended
- Document all configuration changes for future reference

## Network Security Best Practices

1. **Rule Implementation:**
      - Always source lock network rules
      - Limit access to specific traffic sources
      - Regularly review and audit network rules

2. **Monitoring:**
      - Regularly monitor network traffic patterns
      - Review logs for unauthorized access attempts
      - Keep documentation of network changes

---

## Troubleshooting & Support

If issues arise during post-installation configuration:

- Check the system logs for any errors
- Review the [Knowledge Base](/knowledge-base) for common solutions
- Contact [VergeOS Support](/support) for assistance

!!! tip "Documentation"
    Keep detailed records of all configuration changes and test results for future reference and troubleshooting.
