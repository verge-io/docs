# API Keys

An API key is a unique alphanumeric string used to identify and authenticate API access. It acts like a digital passcode, that allows the provider (e.g. VergeOS or VergeIQ OpenAI router) to recognize who’s making the request and control access.  

??what about using oauth tokens or JWTs? instead of api keys for stoner security and session management?

??always used within authorization bearer token??


brief description of api keys, where they are used, why they are important, where they are used - AI router (openapi) and the Verge AI  ??any other use??

## Create a new API Key

Navigate to System > Users and click **View API Keys** on the left menu.
Existing API Keys will be displayed.
??Anything here about using existing rather than creating a new one? are there any considerations about having multiple? or too many, etc.?

Click **New** on the left menu.
Select a user to base the API key ??api key operates with the credentials of this user, any differences
Provide a **Name** for the new API key.  Use a descriptive name ?? username and application name, for example?? 
!!! tip "Clearly labeling API keys will allow easier rotation and tracking activities."
Optionally, a **Description** can be added to store more details about the credentials, purpose, etc. 
Define an **Expiration Date**: select specific date for key expiration or set to ***Never Expire*** to create a perpetual key.
Define IP Allow and/or IP Deny List to restrict access of the API key based on originating address.
* very highly recommended to use allow/deny lists to limit risks.
* can be a powerful mitigation in case an API key is compromised (e.g. developer error, etc.) 
Click **Submit** to save the API Key.
**Copy and Save the generated key: A pop-up will appear displaying the generated key.  Click **Copy** and paste the key to a ??valid storage space -OR- **Save** the key to a file to a .PAK file.




## API Key Best Practices

Treat each API key as a password:
  * Copy and securely store the API key ??does it need to be stored or just grab it from the verge ui when needed?? should you have it available in case you cannot reach your ui for some reason??
  * Avoid storing API keys directly in your code, especially in public repositories. API keys should be stored and loaded at runtime from: environment variables, secrets managers, or secured configuration files in controlled environments outside the repository. 
  * Never include the key in client-side code, ??unless restricted by public key??

Restrict API keys to needed IP addresses
  * use the allow disallow lists to be as restrictive as you can. 


Regularly Monitor API Key Usage  ??best way to do this??

Create API key based on minimal access necessary 


??Create multiple keys when there are varying degrees of access needed??

Rotate API keys periodically: Generate new keys and update necessary items with the newly-generated keys (e.g. environment variables, secure storage Delete the old keys after you have updated and verified applications.

??Have special users dedicated for API key access??

**Delete unused API keys** - To minimize risk, delete any keys that are no longer used. 





