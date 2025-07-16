# New System Configuration


This page will guide you through preparing your installed VergeOS system for production; including configuration steps to ensure optimum performance, security, and reliability.  For instructions on planning and completing an installation, refer to the [VergeOS Implementation Guide](/implementation-guide/intro).


## System and Network Verification
!!! note "Before proceeding:" 
    - **Verify system status** (all green status indicators) 
    - **Ensure correct networking configuration** 

    Refer to **[Implementation Guide - Post-Installation](/implementation-guide/post-installation)** for instructions on verifying system status and networking.   


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

For each cluster, it's advisable to review and fine-tune settings during initial configuration because: 

   * Most cluster changes require node reboots  
   * Some cluster settings will be important to establish before putting your system into production

 The **[Cluster Settings Guide](/product-guide/system/cluster-settings)** provides detailed information regarding available settings.

!!! tip "Learn about **VergeOS Cluster Basics** here: [Clusters Overview Guide](/product-guide/system/clusters-overview)"


## Licensing/Updates
   
1. **[Verify Your VergeOS Licensing](/product-guide/system/license-updates-verify)**: This will ensure your system will be able to run VMs, start NAS services, and run updates.

2. **[Update your System](/knowledge-base/updating-vergeos-system)**: Perform an update if your system is not running the most up-to-date version. Running the newest version of VergeOS will guarantee you have all the latest features and improvements.  

!!! tip "**[VergeOS Release Notes](/release-notes/release-notes-overview)** provides information about the current latest version."  


## SMTP
Proper SMTP configuration is necessary for receiving email-based reports and alerts. See the **[SMTP Product Guide ](/product-guide/system/smtp)** for instructions.


## Server Certificate

By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and ensure trust between your system, browsers, and external platforms (for integrations). See **[Server Certificates](/product-guide/system/certificates)** for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  


## Alerting and Reporting

Configuring **[Subscriptions](/product-guide/system/subscriptions-overview)** allows you to receive alerts and reports for effective system monitoring. Alerts (on-demand subscriptions) are essential for immediate notification when specific events occur (e.g. high storage usage percentage, drive warnings, system log errors, etc.), allowing for rapid response. Reports (scheduled subscriptions) enable you to receive summarized information on a specified schedule.

## Cloud Snapshot Settings
 
Cloud Snapshots provide a point-in-time backup of your entire system.  By default, your VergeOS system is configured to perform regular cloud snapshots.  You can customize this schedule to align with your organizational needs. See **[Cloud Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore)** for instructions on adjusting the default frequency and retention of cloud snapshots.   


!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

## Authentication/Authorization Settings

   1. **Third-party Authorization Sources:** **[Configure an Authorization Source](/product-guide/auth/auth-sources-overview)** for any external identity service (such as Google SSO or Microsoft Entra ID) you wish to utilize for VergeOS logins. 

   2. **Multifactor Authentication (MFA):** MFA adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is nearly impossible. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.  **[Configure Multifactor Authentication for direct VergeOS logins](/product-guide/auth/multifactor-auth)**.  
!!! info "When using external authorization sources (Google, Entra, etc.) for VergeOS, multifactor authentication should also be configured within those systems to ensure secure logins; consult the provider's related documentation for instructions."  

   3. **Password Complexity:** The default password complexity requirement is a minimum length of 8 characters. Additional requirements (e.g.lowercase letters, uppercase letters, numbers, symbols) can also be added in **[Advanced Settings](/product-guide/system/advanced-system-settings)** - ***Password Complexity Requirement***


!!! warning "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



