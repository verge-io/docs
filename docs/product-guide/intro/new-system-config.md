# Initial System Configuration


This page provides a guide for recommended configuration tasks in a new VergeOS system. 


 Before proceeding with these tasks, **verify system status** (all green status indicators) and **ensure correct networking configuration**. Refer to [Implementation Guide - Post-Installation](/implementation-guide/post-installation) - ***Networking Configuration and Testing*** section for guidance.


## New System Configuration List

- [ ] [Licensing/Updates](#licensingupdates) 
- [ ] [Configure SMTP](#configure-smtp)
- [ ] [Register a Server Certificate](#register-a-server-certificate)  
- [ ] [Review/Adjust Cluster Settings](#reviewadjust-cluster-settings)  
- [ ] [Establish Alerting/Reporting](#set-up-alerting-and-reporting)  
- [ ] [Verify Cloud Snapshot Settings](#verify-cloud-snapshot-settings)  
- [ ] [Configure Authentication/Authorization](#configure-authenticationauthorization)  

## Licensing/Updates

[Verify Licensing/Update Configuration](/product-guide/system/verify-license-and-updates) to ensure your system will be able to run workloads, start NAS services, and perform version updates.  

---
 
## Configure SMTP
SMTP is used for automatic subscription alerts and notifications. Configuration instructions can be found at [Product Guide - SMTP](/product-guide/system/smtp).

---

## Register a Server Certificate

By default, your VergeOS system is installed with a self-signed certificate. For public-facing and production systems it is important to install a trusted, CA-issued certificate to provide security and validate your system to browsers and other systems. See [Server Certificates](/product-guide/system/certificates) for related instructions. 

!!! tip "A CA-issued certificate may be less important for home labs, or other non-critical systems that are used solely within a private infrastructure."  

---

## Review/Adjust Cluster Settings

Review and adjust [Cluster settings](/product-guide/system/clusters-config-options) as necessary. 

---

## Set up Alerting and Reporting

[Subscriptions](/product-guide/system/subscriptions-overview) provide alerting and reporting to effectively monitor your system. 

---

## Verify Cloud Snapshot Settings
 
[Cloud Snapshots](/product-guide/backup-dr/cloud-snapshot-restore) create point-in-time backups of your entire system. Adjust the default frequency/retention of cloud snapshots if needed. 

!!! tip "After creating tenants, VMs and NAS volumes, you can also create individualized snapshot frequency and retention for these items where needed."  

---

## Configure Authentication/Authorization

### Third-party Authorization Sources

Configure an [Authorization Source](/product-guide/auth/auth-sources-overview) for any external identity service (such as Google SSO or Microsoft Entra ID) that will be utilized. 

### Multifactor Authentication (MFA)

Multifactor authentication (MFA) adds a critical security layer to your user accounts, ensuring that even if a password is compromised, unauthorized access is still extremely difficult. With cyber threats on the rise, enabling MFA helps protect your systems and data.  It is strongly advised that you require multifactor authentication for all user logins.  [Configure Multifactor authentication](/product-guide/auth/multifactor-auth), for direct VergeOS logins. 

!!! tip "When using external authorization sources (Google, Entra, etc.), consult the provider's related documentation for instructions on configuring MFA requirements in those systems."

### Password Complexity

The default password complexity requirement is minimum length of 8 characters. Additional requirements (demand for lower case, upper case, number, symbol) can also be added in [Advanced Settings](/product-guide/system/advanced-system-settings) - **Password Complexity Requirement**


!!! warning "User Security"
    Strong user security practices are essential for protecting systems and data from unauthorized access and potential breaches. By assigning unique accounts to each user, limiting permissions to only what's necessary, and regularly reviewing audit logs, organizations can reduce risks and ensure accountability across their environments.



