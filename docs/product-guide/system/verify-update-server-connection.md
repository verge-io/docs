# Verifying Your VergeOS Licensing

Valid licensing configuration must be in place to run workloads, start NAS services, and perform system updates. Normal licensing and updates will require connection and authentication to a VergeOS Update Server.

!!! note "For Air-gap licensing/updates see KB articles: [Requesting an Airgap License for VergeOS](/knowledge-base/requesting-an-airgap-license) and [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license)."


## Verify Connection to a VergeOS Update Server

1. Navigate to the **Updates Dashboard:** **System > Updates**.  
2. Click **Check For Updates** on the left menu.
3. Verify a green indicator in the ***Status*** field.  A failed connection will be indicated with a red status and an error message in the status field.  
4. If the status is NOT green:  
  - click **Edit Settings** on the left menu.   
  - Ensure there is a working **Internet connection** from the VergeOS system.   
  - Confirm **correct licensing User/Password**  (If you are unsure of your licensing username/password contact your VergeOS sales or support representative.)     
  - Verify **Update Source** (***"Verge.io Trial/NFR"*** for home labs and POC (Not-for-resale) installations; ***"Verge.io Updates"*** for normal production licenses)  
  
