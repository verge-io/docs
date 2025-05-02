# SMTP

Reliable SMTP configuration is crucial for receiving system notifications and alerts.  This page provides instructions for configuration and administration of SMTP in a VergeOS system.

!!! info "Send direct or via an SMTP Relay" 
    SMTP can be configured to send email directly from the built-in VergeOS mail server -OR- through a relay email server. 

!!! tip 
    Because SMTP can involve inherently complex and error-prone configuration (DKM and revers DNS records, firewall rules, etc.) some customers opt to use a commercial email relay service for ease of use, improved deliverability, security, and compliance reasons.  

## SMTP Configuration
1. From the **Main Dashboard**, navigate to **System > SMTP**
2. Select **Edit Settings** from the left menu.
3. Configure **settings:**
    * **Use TLS:** enables/disables TLS encryption; must be set to correspond with relaying system settings when using an email relay host
    * **Hostname:** When using the built-in SMTP server, be sure to use a valid FQDN that clearly identifies its purpose, ensure the hostname resolves to the correct IP using DNS, and verify proper reverse DNS records are in place for the hostname; this may also be important when using a relay, depending on the configuration and polices of the relay server. 
    * **From Name:** the display from name to appear in email messages
    * **From Address:** the source email address to appear in email messages
    * **Relay Host:** address of the email relay server (blank for direct sending)
    * **Relay Port:** TCP port used by relay host, ex. 25 (unencrypted), 587 (TLS), 465 (SSL/legacy-deprecated); blank for direct sending
    * **Use SASL Authorization:** Typically, valid authentication credentials will be required when using a relay host; enable this option to enter username/password needed to access the relay server.
4. Click **Submit** to save the configuration.

## SMTP Queue Management

The **Mail Queue** contains email messages created but not yet sent.  

### Delete the SMTP Queue

Deleting the SMTP queue might be necessary in situations related to email delivery, such as a large backlog after a prolonged SMTP outage or when troubleshooting, to start with a clean slate.  The following instructions will wipe out all entries in the email queue and those entries will not be regenerated. Assess the messages in the queue to be sure before deleting.

1. From the **Main Dashboard**, navigate to **System > SMTP**
2. **Assess queue entries before deleting:** the most recent entries queue entries are displayed in the **Mail Queue section of this dashboard**; to view a larger queue, click the **Mail Queue** entry on the left menu. 

### Flush (Expedite) the SMTP Queue

Flushing the SMTP queue expedites sending messages by forcing the mail server to re-evaluate and attempt sending each entry in the queue.  This is often used when there were numerous messages stuck from a previous issue (e.g. misconfiguration, network outage, service delay, etc.) that may now be resolved.  Flushing the queue does not delete messages, but rather, expedites the sending process. 

1. Start at the **SMTP Dashboard (Home > System > Settings)**.
2. Click **Flush Queue** on the left menu.
3. Click **Yes** to confirm the operation.

## SMTP Logs 

### View a Log of Sent Messages (Mail Log)
1. Start at the **SMTP Dashboard (Home > System > Settings)**.
2. View the most recent entries in the **Mail Log** section of the dashboard.
3. To view an expanded number of entries (going farther back), select **Mail Log** from the left menu.  **Next/Prev** buttons at the bottom of the page allow you to scroll through pages of large logs. 

### View SMTP System Events
1. Start at the **SMTP Dashboard (Home > System > Settings)**.
2. View the most recent entries in the **Logs** section at the bottom of the dashboard.
3. To view an expanded number of entries (going farther back), select **Logs** from the left menu.  **Next/Prev** buttons at the bottom of the page allow you to scroll through 
pages of large logs. 

## SMTP Reports

SMTP reports provide a summary of recent SMTP activity, with information such as warnings, errors, bytes sent/received, number of messages by recipients and senders, etc. 
Use the left menu options to run **Today's Report** or **Yesterday's Report**. 



