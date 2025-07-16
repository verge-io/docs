# Initial System Configuration


This page provides a guide to prepare your installed VergeOS system for production, that includes steps to ensure optimum performance, security, and reliability.  Refer to the [Implementation Guide](/implementation-guide/intro) for thorough instructions on planning and completing a VergeOS installation. 


!!! note "Before proceeding with these tasks"  
    - **Verify system status** (all green status indicators) 
    - **Ensure correct networking configuration**. Refer to [Implementation Guide - Post-Installation](/implementation-guide/post-installation) (***Networking Configuration and Testing*** section)


## New System Task List

- [ ] [Review/Adjust Cluster Settings](#cluster-settings) 
- [ ] [Confirm Licensing/Updates](#licensingupdates) 
- [ ] [Configure SMTP](#smtp)
- [ ] [Register a Server Certificate](#server-certificate)  
- [ ] [Establish Alerting/Reporting](#alerting-and-reporting)  
- [ ] [Verify Cloud Snapshot Settings](#cloud-snapshot-settings)  
- [ ] [Configure Authorization/Authentication Settings](#authenticationauthorization-settings)
- [ ] [Optional - Enable Third-party Logging](/knowledge-base/enabling-external-log-collection)


## Cluster Settings

For each cluster, it's advisable to review and **[fine-tune cluster settings](/product-guide/system/cluster-settings)** during initial configuration because: 

   * Most cluster changes require node reboots  
   * Some cluster settings will be important to establish before putting your system into production

!!! tip "See the [Clusters Overview Guide](/product-guide/system/clusters-overview) to learn the basics of VergeOS clusters."


## Licensing/Updates
   
1. **[Verify Your VergeOS Licensing](/product-guide/system/verify-update-server-connection)**: This will ensure your system will be able to run VMs, start NAS services, and run updates.

2. **[Update your System](/knowledge-base/updating-vergeos-system)**: Perform an update if your system is not running the most up-to-date version. Running the newest version of VergeOS will guarantee you have all the latest features and improvements.  

!!! tip "**[VergeOS Release Notes](/release-notes/release-notes-overview)** provides information about the current latest version."  


## SMTP
Proper SMTP configuration is necessary for receiving email-based reports and alerts. See the **[SMTP Product Guide ](/product-guide/system/smtp)** for instructions.


## Server Certificate

By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and ensure trust between your system, browsers, and external platforms. See **[Server Certificates](/product-guide/system/certificates)** for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  


## Alerting and Reporting

Configure **[Subscriptions](/product-guide/system/subscriptions-overview)** will allow you to receive alerts and reports to effectively monitor your system. Alerts are essential for immediate notification when specific events occur (e.g. high storage usage percentage, drive warnings, system log errors, etc.), allowing for rapid response. Reports enable you to receive summarized information for selected areas of the system on a specified schedule.

## Cloud Snapshot Settings
 
Cloud Snapshots provide a point-in-time backup of your entire system.  By default, your VergeOS system is configured to perform regular cloud snapshots.  You can customize this schedule to align with your organizational needs. See **[Cloud Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore#automated-cloud-snapshots)** for instructions on adjusting the default frequency and retention of cloud snapshots.   


!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

## Authentication/Authorization Settings

   - **Third-party Authorization Sources:** Configure an **[Authorization Source](/product-guide/auth/auth-sources-overview)** for any external identity service (such as Google SSO or Microsoft Entra ID) you wish to utilize for VergeOS logins. 

   - **Multifactor Authentication (MFA):** MFA adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is nearly impossible. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.  **[Configure Multifactor Authentication](/product-guide/auth/multi-factor-auth)**, for direct VergeOS logins.  
!!! info "When using external authorization sources (Google, Entra, etc.) for VergeOS, multifactor authentication should also be configured within those systems to ensure secure logins; consult the provider's related documentation for instructions."  

   - **Password Complexity:** The default password complexity requirement is a minimum length of 8 characters. Additional requirements (e.g.lowercase letters, uppercase letters, numbers, symbols) can also be added in **[Advanced Settings](/product-guide/system/advanced-system-settings)** - ***Password Complexity Requirement***


!!! warning "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



