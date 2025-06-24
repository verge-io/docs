# Initial System Configuration


This page provides a guide for configuring a new VergeOS system. 


 Before proceeding with these tasks, **verify system status** (all green status indicators) and **ensure correct networking configuration**. Refer to [Implementation Guide - Post-Installation](/implementation-guide/post-installation) (***Networking Configuration and Testing*** section) for guidance.


## New System Task List

- [ ] [Confirm Licensing/Updates](#licensingupdates) 
- [ ] [Configure SMTP](#smtp)
- [ ] [Register a Server Certificate](#server-certificate)  
- [ ] [Review/Adjust Cluster Settings](#cluster-settings)  
- [ ] [Establish Alerting/Reporting](#alerting-and-reporting)  
- [ ] [Verify Cloud Snapshot Settings](#cloud-snapshot-settings)  
- [ ] [Configure Authorization/Authentication Settings](#authenticationauthorization-settings)
- [ ] [Optional - Enable Third-party Logging](/knowledge-base/enabling-external-log-collection)

## Licensing/Updates

   - **Verify Licensing:** Without proper licensing, your system will be unable to run VMs, start NAS services, or run updates.  See: [Verifying Your VergeOS Licensing](/product-guide/system/verify-update-server-connection)

   - **Verify the Latest Version is Installed:** Running the most up-to-date version of VergeOS will ensure you have all the latest features and improvements.  [VergeOS Release Notes](/release-notes/release-notes-overview) provides information about the current latest version.  
   Step-by-step instructions for downloading and installing VergeOS updates can be found in the following KB article: [Updating the VergeOS System](/knowledge-base/updating-vergeos-system) 


## SMTP
Proper SMTP configuration is necessary for receiving email-based reports and alerts. See the [SMTP Product Guide ](/product-guide/system/smtp) for instructions.


## Server Certificate

By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and validate your system to browsers and other systems. See [Server Certificates](/product-guide/system/certificates) for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  


## Cluster Settings

Cluster Configuration

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

See the [Cluster settings Product Guide](/product-guide/system/clusters-config-options) for additional information about configuring cluster settings

## Alerting and Reporting

Configure [Subscriptions](/product-guide/system/subscriptions-overview) for alerting and reporting to effectively monitor your system. Alerts are essential because they ensure you're immediately notified when specific events happen (e.g. high storage usage percentage, drive warnings, system log errors, etc.), allowing for rapid response. Reports will allow you to receive summarized information for selected areas of the system on a specified schedule.

## Cloud Snapshot Settings
 
Cloud Snapshots provide a point-in-time backup of your entire system. See [Cloud Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore#automated-cloud-snapshots) for instructions on adjusting the default frequency and retention of cloud snapshots, if needed.   


!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

## Authentication/Authorization Settings

   - **Third-party Authorization Sources:** Configure an [Authorization Source](/product-guide/auth/auth-sources-overview) for any external identity service (such as Google SSO or Microsoft Entra ID) to be utilized. 

   - **Multifactor Authentication (MFA):** Multifactor authentication (MFA) adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is nearly impossible. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.  [Configure Multifactor authentication](/product-guide/auth/multi-factor-auth), for direct VergeOS logins.  
!!! info "When using external authorization sources (Google, Entra, etc.), multifactor authentication should also be configured within those systems; consult the provider's related documentation for instructions."  

   - **Password Complexity:** The default password complexity requirement is a minimum length of 8 characters. Additional requirements (demand for lower case, upper case, number, symbol) can also be added in [Advanced Settings](/product-guide/system/advanced-system-settings) - ***Password Complexity Requirement***


!!! warning "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



