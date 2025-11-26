# Server Certificates

The VergeOS web server requires HTTPS and must be configured with at least one TLS certificate. By default, the system installs with a self-signed certificate. VergeOS also includes built-in functionality to request and apply a free TLS certificate from **Let’s Encrypt**.  You can also manually install a certificate from any other Certificate Authority (CA).

!!! tip "New in VergeOS v26"
    VergeOS now supports multiple server certificates per system, allowing greater flexibility, security and resiliency


### Default Self-Signed Certificate

Upon installation, VergeOS automatically generates a self-signed certificate:

- Assigned to the **Verge-API** interface (used for local console access)
- This certificate should be kept in place for local access and recovery or fallback scenarios.


## Request and Apply a Let’s Encrypt (or Other ACME-Based) Certificate


These steps guide you through generating and applying an ACME-based certificate (defaulting to Let’s Encrypt) directly from the VergeOS interface.  

!!! tip "***Let's Encrypt*** is a globally trusted, open Certificate Authority providing free TLS certificates to secure websites; its root certificate is trusted by nearly all modern browsers and operating systems."

### Steps:

!!! info "Public Access Required"
    Certificates from *Let’s Encrypt*, and other ACME-based providers, require a publicly accessible domain name.

1. Navigate to **System** > **Certificates**.
2. Click **New** in the left menu.
3. In the **Certificate Type** dropdown, select **Let’s Encrypt**.
4. Enter the **Domain** name (e.g., `verge.abcco.com`).
5. Select a **Contact User** from the dropdown. The certificate will be registered using the email address associated with this user. To verify a user’s email, go to **System** > **Users**, then double-click the user entry.
6. Review the [Let’s Encrypt Terms of Service](http://letsencrypt.org/repository) and check **Agree to TOS** to proceed. When using a non–Let’s Encrypt ACME server, you must review and accept that provider’s terms of service.

!!! tip "Force Renewal"
    When enabled, the certificate request is sent immediately. If disabled, it will be processed during the next automatic renewal cycle (typically once per day)

7. **Using an Alternate ACME-based Provider** (providers other than Let's Encrypt)
    * Select the **Use Custom ACME Server** option.
    * Provide the **ACME Server** full directory URL (e.g., `https://ca.smallstep.com/acme/acme/directory`)  
    * Refer to the given provider's documentation for guidance on additional ACME server settings, e.g. *Key Identifier for External Account Binding*, *HMAC key for External Account Binding*, *Key Type*


8. Click **Submit** to request and apply the certificate.


## Install an Existing Certificate from Another CA (Manual Entry)

Use this method to install a certificate issued by a CA other than Let’s Encrypt/ACME-compatible providers.

### Steps:

1. Go to **System** > **Certificates**.
2. Click **New** in the left menu.
3. In the **Certificate Type** dropdown, select **Manual**.
4. (Optional) Enter a **Description** (e.g., domain name, purpose).
5. Paste the **Public Key** and **Private Key** text into their respective fields.
6. If the certificate includes a chain of trust (e.g., intermediate CA certificates), paste the full chain (e.g. content from `chain.pem` or `fullchain.pem`) into the **Chain Key** field.
7. Click **Submit** to apply the certificate.

---

## Listeners

**Available in VergeOS v26.0 and later**

Listeners define the ports and cipher settings used by VergeOS to accept incoming connections.

### Default Listeners

VergeOS includes two default listeners:

- `default_443`: Listens on TCP port 443 using the default TLS cipher suite
- `default_80`: Listens on TCP port 80 and redirects to HTTPS (443)

!!! warning  "Proceed with Caution if Modifying Default Listeners" 
    - Only change default listener entries if required to meet organizational requirements
    - **Changing ports:** Ensure your external network firewall rules allow access to the new port  
    - **Modifying cipher settings:** Review the warning below

### Add a Custom Listener

1. Go to **System** > **Certificates**.
2. Click **Listeners** in the left menu.
3. Click **New**.
4. Enter a **Name** for the listener.
5. (Optional) Add a **Description**.
6. Enter the desired **Port** number.
7. (Optional) Define a custom **Cipher** string. See [OpenSSL Cipher Documentation](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html).

!!! warning "Cipher Settings - Advanced Configuration Required"
    * Default cipher settings follow current OpenSSL recommendations for strong security and broad compatibility.  
    * You may override these settings to enforce stricter policies, but doing so requires deep knowledge of TLS cipher behavior.  
    * Misconfigured cipher suites can weaken security — for example, by enabling outdated algorithms or disabling forward secrecy.  Always validate changes against best practices and test across client environments before deployment.

---

## Register a Custom Root CA

**Available in VergeOS v26.0 and later**

This feature allows you to add a trusted root Certificate Authority (CA) to the VergeOS system’s trust store. This is useful for internal enterprise CAs, development environments, or syncing with systems using private certificates.

**Common Use Case**: To enable secure site syncs without allowing insecure certificates, register your internal CA as a Root CA.

### Add a Trusted Root CA 

1. Go to **System** > **Certificates**.
2. Click **Root CAs** in the left menu.
3. Click **New**.
4. Paste the root certificate text into the **Certificate** field.
5. Click **Submit** to save.

---

