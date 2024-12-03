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
   - Review Storage Buffer per node
   - Review Target Max RAM Percent (Default 80% means 20% RAM reserved for VergeOS)

!!! warning "Resource Allocation Note"
    Changes to swap settings require disk reformatting and system restart. The Target Max RAM Percent setting directly affects the amount of RAM available for VMs.

### 3. Performance Optimization

1. **CPU Power Management:**
   - For high-performance environments:
     - Consider disabling CPU sleep states
     - Review CPU security mitigations
   
   - For dedicated controller nodes:
     - Consider disabling CPU security mitigations for performance
     - Only implement this in trusted environments with verified workloads

### 4. Location and URL Configuration

1. **Update System Settings:**
   - Navigate to System > Settings
   - Update location information (The Sites map uses Lat/Long coordinates for pin location)
   - Click edit settings and verify:
     * URL settings
     * vSAN hosts configuration
   
!!! note "URL Configuration"
    Correct URL and vSAN host configuration is crucial for setting up sites and backups properly.

### 5. SMTP Configuration

1. **Configure Email Settings:**
   - Navigate to System > SMTP
   - Configure SMTP settings
   - Send a test email to verify system notifications
   - Consider adding your own SMTP relay if test email fails

!!! tip "Email Configuration"
    Setting up a reliable SMTP configuration is essential for receiving system notifications and alerts.

### 6. Centralized Logging Configuration

1. **Access System Settings:**
   - Navigate to System > Settings > Advanced Settings
   - Search for "syslog" in the settings search

2. **Configure Remote Syslog Server:**
   - Locate "Remote syslog server" setting
   - Use the appropriate syntax for your protocol:
     * TCP format: `@@hostname/ip:port`
     * UDP format: `@hostname/ip:port`
   
   Example configurations:
   ```
   TCP: @@10.10.10.10:514
   UDP: @10.10.10.10:514
   ```

3. **Configure Syslog Template:**
   - Search for "syslog" again
   - Locate "Template to define for syslog server"
   - Enter a compatible template format

   Example template:
   ```
   GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.HOSTNAME_HERE %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
   ```

!!! note "Log Retention"
    VergeOS retains logs for 45 days by default. Configure third-party logging to retain logs for longer periods.

!!! tip "Template Configuration"
    Ensure your template format is compatible with your syslog server. Consult your syslog server's documentation for specific format requirements.

### 7. Network Configuration and Testing

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
- Review the [Knowledge Base](/docs/knowledge-base) for common solutions
- Contact [VergeOS Support](mailto:support@verge.io) for assistance

!!! tip "Documentation"
    Keep detailed records of all configuration changes and test results for future reference and troubleshooting.
