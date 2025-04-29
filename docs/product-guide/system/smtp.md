# SMTP


Reliable SMTP configuration is crucial for receiving system notifications and alerts.  This page provides instructions for configuration and administration of SMTP in a VergeOS system.


## SMTP Configuration

VergeOS SMTP can be configured to send from the native, built-in SMTP server or through a relay email server.  Direct sending from your own environment (rather than using a relay) can involve complex and error-prone configuration, e.g. SMTP settings, firewall rules, DKIM and reverse DNS records, etc. Many customers find using a commercial email relay service to be a preferred alternative for ease of use and improved deliverability, security, and compliance reasons.  

1. From the Main Dashboard, navigate to **System > SMTP**
2. Select **Edit Settings** from the left menu.
3. Establish settings:
    * **Use TLS:** enables/disables TLS encryption; must be set to correspond with relaying system settings when using an email relay host
    * **Hostname:** When using the built-in SMTP server, be sure to use a valid FQDN that clearly identifies its purpose and ensure the hostname resolves to the correct IP using DNS and proper reverse DNS records are in place for the hostname; this may also be important when using a relay, depending on the configuration and polices of the relay server. 
    * **From Name:** the display from name to appear in email messages
    * **From Address:** the source email address to appear in email messages
    * **Relay Host:** address of the email relay server (blank for sending direct)
    * **Relay Port:** TCP port used by relay host, ex. 25 (unencrypted), 587 (TLS), 465 (SSL/legacy-deprecated); (blank for sending direct)
    * **Use SASL Authorization:** enable to enter authentication settings for a relay host.
4. Click **Submit** to save the configuration.


## SMTP Queue Management

The SMTP Queue contains email messages created but not yet sent.  

### Delete the SMTP Queue

Deleting the SMTP queue might be necessary in situations related to email delivery, such as a large backlog after a prolonged SMTP outage or when troubleshooting, to start with a clean slate.  The following instructions will wipe out all entries in the email queue and those entries will not be regenerated. Assess the messages in the queue to be sure before deleting them.

1. From the Main Dashboard, navigate to **System > SMTP**
2. Click **Delete Queue** on the left menu.
3. Click **Yes** to confirm the operation.

### Flush (Expedite) the SMTP Queue

Flushing the SMTP queue expedites sending messages by forcing the mail server to re-evalute and attempt sending each entry in the queue.  This is often used when there were numerous messages stuck from a previous issue (e.g. misconfiguration, network outage, service delay, etc.) that now may be resolved.  Flushing the queue does not delete messages, but rather, expedites the sending process. 

1. From the Main Dashboard, navigate to **System > SMTP**
2. Click **Flush Queue** on the left menu.
3. Click **Yes** to confirm the operation.




## SMTP Logs 

### View a Log of Sent Messages (Mail Log)
1. Start at the SMTP Dashboard (Home > System > Settings).
2. View the most recent entries in the **Mail Log** section of the dashboard.
3. To view a larger number of entries (going farther back), select **Mail Log** from the left menu.  Next/Prev buttons at the bottom of the page allow you to scroll through 
large logs. 


### View SMTP System Events
1. Start at the **SMTP Dashboard (Home > System > Settings)**.
2. View the most recent entries in the **Logs** section at the bottom of the dashboard.
3. To view a larger number of entries (going farther back), select **Logs** from the left menu.  **Next/Prev** buttons at the bottom of the page allow you to scroll through 
large logs. 


## SMTP Reports

SMTP reports provide a summary of SMTP activity, with information such as the number of messages by recipients and senders, warnings, errors, bytes sent/received, etc. 
Use the left menu options to run **Today's Report** or **Yesterday's Report**. 



