---
title: "Verify Licensing and Update Server Configuration"
description: "How to verify connectivity to the VergeOS update server and troubleshoot licensing configuration issues, including credentials and update source selection."
semantic_keywords:
  - "VergeOS verify licensing update server connection"
  - "troubleshoot update server authentication credentials"
  - "check for updates green status indicator"
  - "update source trial NFR production"
  - "air-gap licensing offline environment"
use_cases:
  - verify_update_server_connectivity
  - troubleshoot_licensing_credentials
  - configure_update_source
tags:
  - licensing
  - updates
  - troubleshooting
  - configuration
  - connectivity
categories:
  - System Administration
---

# Verify Licensing and Update Server Configuration

Valid licensing configuration is required to run workloads and NAS services and to perform system updates.  Normal licensing and updates will require connection and authentication to a VergeOS Update Server. 

!!! note "For Air-gap licensing/updates see: KB articles: [Requesting an Airgap License for VergeOS](/knowledge-base/requesting-an-airgap-license) and [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license)."

## Verify Connection to a VergeOS Update Server

1. From the Main Dashboard, navigate to **System > Updates**.  This will bring you to the Updates Dashboard.  
2. Click **Check For Updates** on the left menu.
3. Verify a green indicator in the ***Status*** field.  A failed connection will be indicated with a red status and an error message in the status field.  
4. If the status is not green:  
    * click **Edit Settings** on the left menu.  
    * Verify **correct licensing User/Password**.  If you are unsure of your licensing credentials contact your VergeOS sales or support representative.  
    * Verify **Update Source** 
        - for home labs and POC (Not-for-resale) installations: ***Verge.io Trial/NFR***  
        - for normal production licenses: ***Verge.io Updates*** 
    * Verify **Internet connection** from the VergeOS system.
