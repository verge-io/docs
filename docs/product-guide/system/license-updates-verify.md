# Verify Licensing and Update Server Configuration

Valid licensing configuration is required to run workloads and NAS services and to perform system updates.  Normal licensing and updates will require connection and authentication to a VergeOS Update Server. 

!!! note "For Air-gap licensing/updates see: KB articles: [Requesting an Airgap License for VergeOS](/knowledge-base/requesting-an-airgap-license) and [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license)."

## Verify Connection to a VergeOS Update Server

1. From the top menu, navigate to **System > Updates**.  This will bring you to the Updates Dashboard.  
2. Click **Check For Updates** on the left menu.
3. Verify a green indicator in the ***Status*** field.  A failed connection will be indicated with a red status and an error message in the status field.  
4. If the status is not green:  
    * click **Edit Settings** on the left menu.  
    * Verify **correct licensing User/Password**.  If you are unsure of your licensing credentials contact your VergeOS sales or support representative.  
    * Verify **Update Source** 
        - for home labs and POC (Not-for-resale) installations: ***Verge.io Trial/NFR***  
        - for normal production licenses: ***Verge.io Updates*** 
    * Verify **Internet connection** from the VergeOS system.

