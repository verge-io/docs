---
title: Product Guide - Server Certficates
description: Instructions for implementing a server certificate (Let's Encrypt/ACME is the default, but certificates from other authorities can be applied.)
published: true
date: 2023-06-26T12:28:26.212Z
tags: 
editor: markdown
dateCreated: 2023-03-23T18:56:44.584Z
---

# Server Certificates

The VergeIO web server requires HTTPS and therefore requires a certificate; by default, the system is installed with a self-signed certificate. There is built-in functionality to register and apply a free TLS certificate from the Authority **Let's Encrypt**; this is the recommended approach for a CA certificate on systems that will employ a public web address. Alternatively, a certificate issued from a different Certificate Authority (CA) can be applied, if desired.

<br>
<br>

### To Request and apply a "Let's Encrypt" CA-Signed or ACME Server-signed Certificate:

These instructions allow you to generate, register and configure a Let's Encrypt-signed certificate directly from the VergeIO interface.

> Certificates from **Let's Encrypt** require a publicly available web address. {.is-info}

1.  From the main dashboard click **System** on the left menu.
2.  Click **Certificates** on the left menu.
3.  **Click the existing certificate**; when selected it will appear with a colored background and left-menu options will be enabled.
4.  Click **Edit** on the left menu.
5.  In the ***Certificate Type*** dropdown list, select **Let's Encrypt**.
6.  Enter the appropriate ***Domain*** for which to create the certificate. (This should be the domain where the VergeIO user interface will reside, e.g. <span>verge.abcco.com</span>).
7.  The ***Cipher List*** field allows for optionally defining non-default settings for the Let's Encrypt certificate. Information about possible values can be found at [https://www.openssl.org/docs/man1.1.1/man1/ciphers.html](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html).
8.  Select the ***Contact User*** from the dropdown list; the cert will be registered with the email address associated with this user. The selected user must have a valid email address in their account profile, or the certificate will fail to register correctly. (To validate if a user's account is tied to an appropriate email address, navigate to System -> Users and double-click on the given user.)
9.  View the ***Let's Encrypt Terms of service*** at http://letsencrypt.org/repository (link also provided on the Certificate input form); the terms must be agreed (i.e checked ***Agree to TOS*** checkbox) in order to generate and register the Let's Encrypt certificate .
10.  For ACME Server-signed certificates, enter the full URL of the ***ACME server*** (e.g. https://acme-v02.api.letsencrypt.org/directory). The VergeIO system must be able to reach the ACME server URL.
11.  Click ***Submit*** to send the Let's Encrypt request.


<br>
<br>

### To Implement an Existing Certificate from a different Authority (Not Let's Encrypt/ACME)

1.  From the main dashboard click **System** on the left menu.
2.  Click **Certificates** on the left menu.
3.  **Click the existing certificate**; when selected it will appear with a colored background and left-menu options will be enabled.
4.  Click **Edit** on the left menu.
5.  In the ***Certificate Type*** dropdown list select **Manual**
6.  The ***Cipher List*** field allows for optionally defining non-default settings for the certificate. (Information about possible values can be found at [https://www.openssl.org/docs/man1.1.1/man1/ciphers.html](https://www.openssl.org/docs/man1.1.1/man1/ciphers.html).
7.  In the ***Public Key*** field, paste in the appropriate key, overwriting the existing value.
8.  In the Private Key field, check the Modify checkbox and paste in the coordinating private key. 
> For security reasons, the existing private key does not display. {.is-info}
9.  If the key involves a chain of trust (i.e., certificate containing an ordered list of certificates, including the end-user certificate and intermediate CA certificates), paste the complete chain into the ***Chain Key*** field.
10.  Click ***Submit*** to implement the new key.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }