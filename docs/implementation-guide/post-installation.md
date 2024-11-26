# Post-Installation Configuration Guide

## Introduction

Welcome to the Post-Installation Configuration Guide for VergeOS. This guide provides step-by-step instructions for optimizing your newly installed VergeOS environment. Following these configuration steps will ensure your system is properly tuned for your specific use case and ready for production workloads.

---

## Prerequisites

Before proceeding with post-installation configuration, ensure:

* A successful VergeOS installation is completed
* You have admin access to the VergeOS web UI
* You have reviewed your organization's performance and security requirements
* You have documented your intended storage tier strategy

---

## Configuration Steps

### 1. Initial System Access

1. **Access the Web UI:**
   - Open a web browser and navigate to your VergeOS system's IP address
   - Log in using your admin credentials created during installation

2. **Verify System Status:**
   - Check the dashboard for any warnings or alerts
   - Ensure all nodes are showing as online and healthy

### 2. Cluster Configuration

1. **Navigate to Cluster Settings:**
   - Go to System > Cluster
   - Review the current configuration

2. **Adjust Resource Allocations:**
   - Set maximum RAM allocation for VMs
   - Configure maximum CPU core limits
   - Review and adjust swap settings if necessary

!!! warning "Swap Configuration Changes"
    Changes to swap settings require disk reformatting and system restart. Plan these changes during maintenance windows.

### 3. Performance Optimization

1. **CPU Power Management:**
   - For high-performance environments:
     - Consider disabling CPU sleep states
     - Review CPU security mitigations
   
   - For edge/power-saving deployments:
     - Enable balanced performance settings
     - Keep default CPU power management

!!! info "Security Note"
    Only disable CPU security mitigations in trusted environments where all workloads are verified.

### 4. Storage Configuration

1. **Configure Storage Tiers:**
   - Review current tier assignments
   - Assign appropriate drives to tiers based on performance requirements:
     * Tier 0: Highest performance (NVMe recommended)
     * Tier 1-3: Mixed workload tiers
     * Tier 4-5: Archive/backup storage

2. **Verify Tier Redundancy:**
   - Ensure matching storage capacity across nodes within each tier
   - Verify proper redundancy settings for each tier

!!! tip "Storage Planning"
    When planning storage tiers, consider both performance requirements and redundancy needs. The system will automatically use the closest available tier if a specified tier isn't available.

### 5. Network Configuration

1. **Review Network Settings:**
   - Verify MTU settings for all networks
   - Configure default network schemes for internal networks
   - Review external network configurations

2. **Optimize Network Performance:**
   - Adjust buffer sizes if needed
   - Configure jumbo frames where appropriate
   - Review and optimize routing configurations

### 6. Security Settings

1. **Access Control:**
   - Review and configure authentication sources
   - Set up additional admin accounts if needed
   - Configure password policies

2. **Network Security:**
   - Review firewall rules
   - Configure network isolation as needed
   - Set up VLANs if required

---

## Post-Configuration Verification

After completing the configuration steps:

1. **System Health Check:**
   - Verify all nodes are healthy
   - Check storage tier status
   - Review network connectivity

2. **Performance Testing:**
   - Run basic performance tests
   - Verify storage tier performance
   - Test network throughput

3. **Security Verification:**
   - Test authentication
   - Verify network isolation
   - Check access controls

---

## Troubleshooting & Support

If issues arise during post-installation configuration:

- Check the system logs for any errors
- Review the [Knowledge Base](/knowledge-base) for common solutions
- Contact [VergeOS Support](/support) for assistance

!!! tip "Best Practice"
    Document all configuration changes made during this process for future reference and compliance purposes.
