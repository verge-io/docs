# Server Certificates

The VergeOS web server requires HTTPS and therefore requires a certificate; by default, the system is installed with a self-signed certificate. There is built-in functionality to register and apply a free TLS certificate from the Authority **Let's Encrypt**. This is the recommended approach for a CA certificate on systems that will employ a public web address. Alternatively, a certificate issued from a different Certificate Authority (CA) can be applied, if desired.

## Request and apply a "Let's Encrypt" CA-Signed or ACME Server-signed Certificate

These instructions allow you to generate, register and configure a Let's Encrypt-signed certificate directly from the VergeOS interface.

!!! info "Certificates from *Let's Encrypt* require a publicly available web address."

1. From the top menu, select **System** > **Certificates**.
2. **Click the existing certificate**; when selected it will appear with a colored background and left-menu options will be enabled.
3. Click **Edit** on the left menu.
4. In the **Certificate Type** dropdown list, select ***Let's Encrypt***.
5. Enter the appropriate **Domain** for which to create the certificate. This should be the domain where the VergeOS user interface will reside, e.g. verge.abcco.com.
6. The ***Cipher List*** field allows for optionally defining non-default settings for the Let's Encrypt certificate. Information about possible values can be found at [https://www.openssl.org/docs/man1.1.1/man1/ciphers.html](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html).
7. Select the ***Contact User*** from the dropdown list; the cert will be registered with the email address associated with this user. The selected user must have a valid email address in their account profile, or the certificate will fail to register correctly. (To validate if a user's account is tied to an appropriate email address, navigate to System > Users and double-click on the given user.)
8. View the ***Let's Encrypt Terms of service*** at `http://letsencrypt.org/repository` (link also provided on the Certificate input form); the terms must be agreed (checked ***Agree to TOS*** checkbox) in order to generate and register the Let's Encrypt certificate.
9. For ACME Server-signed certificates, enter the full URL of the ***ACME server*** (e.g. `https://acme-v02.api.letsencrypt.org/directory`). The VergeOS system must be able to reach the ACME server URL.
10. Click ***Submit*** to send the Let's Encrypt request.

## Implement an Existing Certificate from a Different Authority (Not Let's Encrypt/ACME)

1. From the top menu, select **System** > **Certificates**.
2. **Click the existing certificate**; when selected it will appear with a colored background and left-menu options will be enabled.
3. Click **Edit** on the left menu.
4. In the **Certificate Type** dropdown list select ***Manual***
5. The **Cipher List** field allows for optionally defining non-default settings for the certificate. Information about possible values can be found at [https://www.openssl.org/docs/man1.1.1/man1/ciphers.html](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html).
6. In the **Public Key** field, paste in the appropriate key, overwriting the existing value.
7. In the **Private Key** field, check the **Modify checkbox** and paste in the coordinating private key.
!!! info "For security reasons, the existing private key does not display."

8. If the key involves a chain of trust (i.e., certificate containing an ordered list of certificates, including the end-user certificate and intermediate CA certificates), paste the complete chain into the **Chain Key** field.
9. Click **Submit** to implement the new key.
