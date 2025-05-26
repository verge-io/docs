# Post-Installation Configuration Guide

## Introduction

To ensure the stability, security, and peak performance of your new system, it's essential to follow the steps outlined in this guide. These procedures are particularly critical for production environments, where system reliability and efficiency directly impact operations. Verification, proper configuration, and post-installation optimizations will help prevent issues, enhance functionality, and maintain long-term system integrity. 

!!! "Before Proceeding"
    - 


Before proceeding with post-installation configuration, ensure:

* A successful VergeOS installation is completed <!--(what defines a successful installation?) -->
* You have admin access to the VergeOS web UI
* You have reviewed your organization's performance and security requirements - <!--more information needed here and why do you need to know this for these tasks?>
* You have documented your intended storage tier strategy - need more inforamiton here <!--vague - what is meant by this and how does it apply to these post installation tasks?>

Verify health of system/system status

1. **Access the Web UI:**
   - Open a web browser and navigate to your VergeOS system's IP address
   - Log in using your admin credentials created during installation

2. **Check Dashboards to Verify System Status**

   - **Main Dashboard** (home page): All status indicators should be green; ensure there are no yellow/red (warning/error) status icons.  Check the Logs section at the bottom of the page for any warnings or errors.
   - **System Dashboard** (click System on the left menu.): Review this page to verify all tiles show green statuses.  

!!! tip "Click on a section that display yellow/red (warning/error) to access more detailed information about the issue."  

BIOS settings Performance Optimization

1. **CPU Power Management:**
   - For high-performance environments:
     - Consider disabling CPU sleep states
     - Review CPU security mitigations
   
   - For dedicated controller nodes:
     - Consider disabling CPU security mitigations for performance
     - Only implement this in trusted environments with verified workloads


### 7. Network Configuration and Testing

Proper network configuration is crucial for the success of your VergeOS installation.  Verify correct networking before establishing production workloads on you new system.   

Core Network Redundancy
What is it important?  
The VergeOS Core Fabric is built for redundancy, to ensure resiliency and data integrity
Core 

- Test Core network redundancy:
 * Should be done during a maintenance window or prior to production workloads being initiated on the system,  in order to avoid potential workload disruptions caused by improper configuration or hardware malfunction)
      - simulate failure of one of the physical cores by?  unplugging? turning off switch???  
      - then put that core back in place and simulate failure of the other

- Verify isolation of core networks
      - each core network should be on its own isolated network - preferrably its own switch, but can be in its own vlan 
      - what happens when you have them on a company LAN and not completely isolated?  is it just a problem of possible network congestion or packet loss/bottlenecks, etc?? 
      - how can we effectively test this across the board?
      - very important that the core networks are isolated from any other VergeOS systems -- elaborate -- have we seen this problem when a customer is using same switch for multiple verge systems and they are both running cores as native??


- Reminder that when you make network changes - they should be reviewed and periodically check your core network redundancy
- extra caution about changing a switch configuration and the change does not actually take effect until a reboot??
- how do you confirm core 1 and core 2 vlans are not visible on other devices/ports?
- don't you typically run your core1 and core2 in native (no vlan?)



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
