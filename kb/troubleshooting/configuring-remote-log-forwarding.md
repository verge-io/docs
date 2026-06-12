---
description: "How to configure VergeOS to forward system logs to a remote syslog server for centralized log management, archival, and compliance."
---

# Configuring Remote Log Forwarding (Syslog)

VergeOS can be configured to forward logs to a remote Syslog server, an important capability for organizations leveraging log aggregation for centralized management, log archival, and compliance.

{% hint style="success" %}
**Log Retention**

Logged activity is typically available within the VergeOS user interface for a maximum of **45 days**. Configure remote log forwarding to retain logs for longer periods.
{% endhint %}

## Prerequisites

- Network connectivity between VergeOS and the remote syslog server
- Appropriate firewall rules to allow syslog traffic (typically port 514)
- Access to VergeOS System Settings

## Configuration Steps

To configure log forwarding to a remote syslog server:

### 1. Navigate to Advanced Settings

Navigate to **System > Settings > Advanced Settings**.

### 2. Configure the Remote Syslog Server

1. Under the "Setting" column heading, type `syslog` and press ++enter++ to search
2. Select and edit **Remote syslog server (tcp: @@name/ip:port, udp: @name/ip:port)**
3. Configure this setting according to the syntax expected by your remote server:

{% hint style="info" %}
**Server Configuration Examples**

- **For TCP:** `@@10.10.10.10:514`
- **For UDP:** `@10.10.10.10:514`
{% endhint %}

4. Click **Submit** at the bottom of the page to save

### 3. Configure the Format Template

1. Search for `syslog` again in the settings
2. Select and edit **Template to define for syslog server (See rsyslog for format)**
3. Enter a syslog template format that is compatible with your remote syslog server

{% hint style="info" %}
**Template Example**

```plaintext
   GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.your-hostname-here %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
```
{% endhint %}

{% hint style="info" %}
Replace `your-hostname-here` with your actual hostname, or leave as `.HOSTNAME_HERE` to use the default system hostname.
{% endhint %}

4. Click **Submit** at the bottom of the page to save the format

## Additional Resources

For more information on syslog templates and formatting options, visit the [Rsyslog Documentation](https://www.rsyslog.com/doc/master/configuration/examples.html){target=_blank}.

## Verification

After completing the configuration, logs will begin forwarding to the specified syslog server. Check your remote server logs to verify that VergeOS logs are being received successfully.
