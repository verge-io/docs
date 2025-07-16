# Post-Installation Configuration Guide

## Introduction

After completing your VergeOS installation, there are a few essential steps to verify and optimize your system.  This page will guide you through key post-installation steps to be completed after installing initial VergeOS nodes. 

---

## 1. Verify System Status

* **Access the Web UI:**  

    * Open a web browser and navigate to your VergeOS system's IP address.  
    * Log in using your admin credentials created during installation.

* **Confirm System Health:**  

    * Check the Main Dashboard (home page) for any warnings or alerts, including scrolling to the bottom of the page to view the system *Logs* section.   
    * Ensure all nodes are showing as online and healthy. The *Nodes* tile on the Main Dashboard should display all nodes online with a green status. 

---

## 2. Verify Network Configuration

The Core Fabric Network at the heart of VergeOS is designed with redundancy and resiliency in mind. For this architecture to function as intended, administrators must verify two key attributes: redundancy and isolation of the core networks.  Proper verification at this stage helps to ensure expected fault tolerance and performance as you move into production. 

* **Test Core Network Redundancy**  
To ensure the system can tolerate hardware or link failures without impacting workloads or data integrity:

    * Physically disconnect cables or power down one of the core switches to simulate a failure.
    * Within the VergeOS UI, navigate to *Nodes*.  Wait several minutes to verify that all nodes appear as "Running"/green status. 
    * After restoring the failed link or switch, repeat the test on the other physical core network.

* **Verify Isolation of Core Networks**  
To maintain data integrity and prevent inter-system interference:  

    * Verify each physical core network operates on its own isolated switch or, at minimum, a dedicated VLAN.
    * Ensure that no other VergeOS systems share these networks. For example, if running multiple VergeOS host systems within shared infrastructure, each system would need two unique and exclusive VLAN IDs. 

!!! warning "Avoid using VLANs 1 and 100-102 which are reserved for VergeOS internal system traffic."

* **Verify External Connection Redundancy**  
Ensure external redundancy for remote connectivity: 

    * Simulate external connection loss to node 1 (disconnecting network cable, etc.)
    * Confirm you still have remote access to the VergeOS user interface 

### Important Considerations

- Regular testing of network redundancy and failover is recommended.
- Document all configuration changes for future reference.

---

## 3. System Configuration

VergeOS provides configuration options for you to secure and maximize the benefits of your new system.  Follow the **[New System Configuration Checklist](/product-guide/intro/new-system-configuration)** in the Product Guide to finish preparing your environment for production.

---

## Troubleshooting & Support

If issues arise during post-installation configuration:

- Check the system logs for any errors
- Review the [Knowledge Base](/knowledge-base) for common solutions
- Contact [VergeOS Support](/support) for assistance

