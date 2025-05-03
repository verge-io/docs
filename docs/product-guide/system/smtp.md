# SMTP

This page provides instructions for configuration and administration of SMTP in a VergeOS system. [Subscriptions](/product-guide/system/subscriptions-overview) (used for system alerts and notifications) rely on effective SMTP configuration. 

!!! info "Send direct or via an SMTP Relay" 
    SMTP can be configured to send email directly from the built-in VergeOS mail server -OR- through a relay email server. 

!!! tip 
    Because SMTP can involve inherently complex and error-prone configuration (DNS, reverse DNS records, firewall rules, etc.) some customers opt to use a commercial email relay service for ease of use, security, and compliance reasons.  The provider of this service can supply the proper relay settings for your SMTP configuration. 

## SMTP Configuration

1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. Click **Edit Settings** on the left menu.
3. Configure **settings:**
    * **Use TLS:** enables/disables TLS encryption; must be set to correspond with target system requirements when using an email relay host
    * **Hostname:** When using the built-in SMTP server, be sure to use a valid FQDN that clearly identifies its purpose, ensure the hostname resolves to the correct IP using DNS, and verify proper SPF, DMARC, and reverse DNS records are in place for the hostname. Specific hostname may also be important when using a relay, depending on requirements and policies of the relaying server. 
    * **From Name:** the display from name to appear in email messages
    * **From Address:** the source email address to appear in email messages
    * **Relay Host:** address of the email relay server (blank for direct sending)
    * **Relay Port:** TCP port used by relay host, e.g. 25 (unencrypted), 587 (TLS), 465 (SSL/legacy-deprecated); blank for direct sending
    * **Use SASL Authorization:** Typically, valid authentication credentials will be required when using a relay host; enable this option to enter username/password needed to access the relay server.
4. Click **Submit** to save the configuration.

## Test SMTP Configuration

1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. Click **Send Test Email** on the left menu.
3. Enter an **email address** to send to.  
4. Click **Send**.
5. Refer to the [Troubleshooting](#smtp-troubleshooting) section if the test message is not received. 

## SMTP Queue Management

The **Mail Queue** contains email messages waiting to be sent.  

### Delete the SMTP Queue

Deleting the SMTP queue might be necessary in situations related to email delivery, such as a large backlog after a prolonged SMTP outage or when troubleshooting, to start with a clean slate.  The following instructions will wipe out all entries in the email queue and those entries will not be regenerated.

1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. **Assess queue entries before deleting:** the most recent entries are displayed in the ***Mail Queue*** section of this page; to view a larger queue, click the **Mail Queue** entry on the left menu. 
3. Click **Delete Queue** on the left menu.

### Flush (Expedite) the SMTP Queue

Flushing the SMTP queue expedites sending messages by forcing the mail server to re-evaluate and attempt sending each entry in the queue.  This is often used when there were numerous messages stuck from a previous issue (misconfiguration, network outage, service delay, etc.) that may now be resolved.  Flushing the queue does not delete messages, but rather, expedites the sending process. 

1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. Click **Flush Queue** on the left menu.
3. Click **Yes** to confirm the operation.

## SMTP Logs 

### View a Log of Sent Messages (Mail Log)
1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. View the most recent entries in the **Mail Log** section of the dashboard.
3. To view more entries (going farther back), click **Mail Log** on the left menu.  **Next/Prev** buttons at the bottom of the page allow you to scroll through pages of large logs. 

### View SMTP System Events
1. Start at the **SMTP Dashboard (Home > System > SMTP)**.
2. View the most recent entries in the **Logs** section at the bottom of the dashboard.
3. To view more entries (going farther back), click **Logs** on the left menu.  **Next/Prev** buttons at the bottom of the page allow you to scroll through 
pages of large logs. 

## SMTP Reports

SMTP reports provide a **summary of recent SMTP activity**, containing information such as warnings, errors, bytes sent/received, number of messages by recipients and senders, etc. Use the left menu options to run **Today's Report** or **Yesterday's Report**. 

## SMTP Troubleshooting

### Check SPAM folders

Verify messages are not being sent to the recipient's SPAM/Junk folder.   

### Check Logs 

Error messages in the SMTP log can provide information when email messages fail, such as warnings about incorrect SMTP settings or STMP disabled, etc. Check the ***Logs* section at the bottom** of the SMTP page.

### Verify Appropriate Firewall Rules and Network Policies

Outgoing SMTP connections are commonly blocked by default.  Make sure port 25, 587, or 465 (depending on your configuration) are open and allowed; in some cases, this may require contacting your service provider.  

### Using a Relay: 

**Confirm Relay settings**

* Some email servers require explicit relay permissions.  Ensure the email server allows your VergeOS system to relay messages, typically by enabling authentication or whitelisting IP addresses. 

* Confirm the correct server address and port are configured for the relay server. Verify you are using the name/address expected by the relaying mail system.

* Confirm TLS setting conforms to relay server requirements.  Many email servers require a TLS secure connection.
!!! tip "Some email servers will utilize STARTTLS where the connection starts unencrypted on a standard SMTP port (25 or 587) with encryption negotiated after the connection is established." 


### Sending Direct:

**Verify SPF/ DMARC/ reverse DNS records**  
If emails are marked as spam or fail to deliver, ensure proper reverse DNS records and that your domain has correct SPF (Sender Policy Framework) and DMARC (Domain-based Message Authentication, Reporting & Conformance) records.  When these records do not correspond correctly to your system, attempted messages can be detected as impersonation, resulting in delivery failures and/or emails flagged as suspicious. Repeated impersonation can get your domain/IP blacklisted which can affect future email deliveries. 