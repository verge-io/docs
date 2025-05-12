# Initial System Configuration


This page provides a guide for typical configuration tasks necessary in a new VergeOS system. 


 Before proceeding with these tasks, **verify system status** (all green status indicators) and **ensure correct networking configuration**. Refer to [Implementation Guide - Post-Installation](/implementation-guide/post-installation) - ***Networking Configuration and Testing*** section for guidance.


## New System Configuration Task List

- [ ] [Licensing/Updates](#licensingupdates) 
- [ ] [Configure SMTP](#configure-smtp)
- [ ] [Register a Server Certificate](#register-a-server-certificate)  
- [ ] [Review/Adjust Cluster Settings](#reviewadjust-cluster-settings)  
- [ ] [Establish Alerting/Reporting](#set-up-alerting-and-reporting)  
- [ ] [Verify Cloud Snapshot Settings](#verify-cloud-snapshot-settings)  
- [ ] [Configure Authentication/Authorization](#configure-authenticationauthorization)  

## Licensing/Updates

Valid licensing configuration must be in place to run workloads and NAS services and to perform system updates.  Normal licensing and updates will require connection and authentication to a VergeOS Update Server. 

!!! note "For Air-gap licensing/updates see: KB articles: [Requesting an Airgap License for VergeOS](/knowledge-base/requesting-an-airgap-license) and [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license)."

### Verify Connection to a VergeOS Update Server

1. From the main dashboard, navigate to **System > Updates**.  This will bring you to the Updates Dashboard.  
2. Click **Check For Updates** on the left menu.
3. Verify a green indicator in the ***Status*** field.  A failed connection will be indicated with a red status and an error message in the status field.  
4. If the status is not green:  
  * click **Edit Settings** on the left menu.  
  * Verify **correct licensing User/Password**.  (If you are unsure of your licensing username/password contact your VergeOS sales or support representative.)   
  * Verify **Update Source**. (***Verge.io Trial/NFR*** for home labs and POC (Not-for-resale) installations ***Verge.io Updates*** for normal production) licenses
  * Verify Internet connection from the VergeOS system.

### Verify Installed Version is Latest

Running the most up-to-date version of VergeOS will ensure you have the all the latest features and improvements. See [Product Guide - Licensing and Updates](/product-guide/system/licensing-and-updates#update-process) for instructions on downloading and installing VergeOS updates.

!!! tip "The [VergeOS Release Notes Page](/release-notes/release-notes-overview) provides information about the current latest version."


## Configure SMTP
SMTP Configuration instructions can be found at [Product Guide - SMTP](/product-guide/system/smtp).


## Register a Server Certificate


By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and validate your system to browsers and other systems. See [Server Certificates](/product-guide/system/certificates) for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  


## Review/Adjust Cluster Settings

Review and adjust [Cluster settings](/product-guide/system/clusters-config-options) as necessary.  

## Set up Alerting and Reporting

It is important to configure [Subscriptions](/product-guide/system/subscriptions-overview), which provide alerting and reporting to effectively monitor your system. 

## Verify Cloud Snapshot Settings
 
[Cloud Snapshots](/product-guide/backup-dr/cloud-snapshot-restore) provide a point-in-time backup of your entire system. Adjust the default frequency/retention of cloud snapshots if needed. 


!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

## Configure Authentication/Authorization

### Third-party Authorization Sources

Configure [Authorization Sources](/product-guide/auth/auth-sources-overview) if an external identity service (such as Google SSO or Microsoft Entra ID) will be utilized. 


### Multifactor Authentication (MFA)

Multifactor authentication (MFA) adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is nearly impossible. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.

  - [Configure Multifactor authentication](/product-guide/auth/multifactor-auth), for direct VergeOS logins. 
  - When using external authorization sources (Google, Entra, etc.), consult the provider's related documentation for instructions on configuring MFA requirements in those systems.



### Password Complexity

The default password complexity requirement is minimum length of 8 characters. Additional requirements (demand for lower case, upper case, number, symbol) can also be added in [Advanced Settings](/product-guide/system-advanced-system-settings) - **Password Complexity Requirement**


!!! "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



