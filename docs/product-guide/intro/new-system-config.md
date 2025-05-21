# Initial System Configuration


This page provides a guide for typical configuration tasks necessary in a new VergeOS system. 


 Before proceeding with these tasks, **verify system status** (all green status indicators) and **ensure correct networking configuration**. Refer to [Implementation Guide - Post-Installation](/implementation-guide/post-installation) - ***Networking Configuration and Testing*** section for guidance.


## New System Task List

- [ ] [Licensing/Updates](#licensingupdates) 
- [ ] [Configure SMTP](#smtp)
- [ ] [Register a Server Certificate](#server-certificate)  
- [ ] [Review/Adjust Cluster Settings](#cluster-settings)  
- [ ] [Establish Alerting/Reporting](#alerting-and-reporting)  
- [ ] [Verify Cloud Snapshot Settings](#cloud-snapshot-settings)  
- [ ] [Configure Authorization/Authentication Settings](#authenticationauthorization-settings)  

## Licensing/Updates

   - **Verify Licensing:** Without proper licensing, your system will be unable to run VMs, start NAS services, or run updates.  See: [Verifying Your VergeOS Licensing](/product-guide/system/verify-update-server-connection) for instructions.

   - **Verify the Latest Version is Installed:** Running the most up-to-date version of VergeOS will ensure you have all the latest features and improvements.  [VergeOS Release Notes](/release-notes/release-notes-overview) provides information about the current latest version.  
   Step-by-step instructions for downloading and installing VergeOS updates can be found in the following KB article: [Updating the VergeOS System](/knowledge-base/updating-vergeos-system) 


## SMTP
See the [SMTP Product Guide ](/product-guide/system/smtp) for configuration instructions.


## Server Certificate

By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and validate your system to browsers and other systems. See [Server Certificates](/product-guide/system/certificates) for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  


## Cluster Settings

Review and adjust [Cluster settings](/product-guide/system/clusters-config-options) as necessary.  

## Alerting and Reporting

Configure [Subscriptions](/product-guide/system/subscriptions-overview) for alerting and reporting to effectively monitor your system. 

## Cloud Snapshot Settings
 
Cloud Snapshots provide a point-in-time backup of your entire system. See [Cloud Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore#automated-cloud-snapshots) for guidance on adjusting the default frequency and retention of cloud snapshots if needed.   


!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

## Authentication/Authorization Settings

   - **Third-party Authorization Sources:** Configure [Authorization Sources](/product-guide/auth/auth-sources-overview) if an external identity service (such as Google SSO or Microsoft Entra ID) is to be utilized. 

   - **Multifactor Authentication (MFA):** Multifactor authentication (MFA) adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is nearly impossible. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.  [Configure Multifactor authentication](/product-guide/auth/multi-factor-auth), for direct VergeOS logins.  
!!! info "When using external authorization sources (Google, Entra, etc.), multifactor authentication should be configured within those systems; consult the provider's related documentation for instructions."  

   - **Password Complexity:** The default password complexity requirement is minimum length of 8 characters. Additional requirements (demand for lower case, upper case, number, symbol) can also be added in [Advanced Settings](/product-guide/system/advanced-system-settings) - ***Password Complexity Requirement***


!!! warning "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



