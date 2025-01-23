---
title: Remote Syslog
slug: remote-syslog
description: Configuring remote syslog with examples for Graylog, Splunk, ELK Stack, and Fluentd.
author: Larry
published: true
date: 2025-01-23
tags: [syslog, VergeOS, Graylog, Splunk, ELK, Fluentd]
categories:
  - Logging
  - Monitoring
editor: markdown
dateCreated: 2025-01-23
---

# Remote Syslog Ingestion in VergeOS

## Overview

!!! info "Key Points"
\- Configure remote syslog in VergeOS.
\- Use rsyslog templates for custom log formatting.
\- Example configurations for Graylog, Splunk, ELK Stack, and Fluentd.

This article provides instructions for setting up remote syslog logging in VergeOS, using rsyslog templates for log formatting, and integrating with logging tools like Graylog, Splunk, ELK Stack, and Fluentd.

## Prerequisites

- VergeOS environment with admin access.
- A remote syslog server (e.g., Graylog, Splunk, ELK Stack, Fluentd).
- Knowledge of rsyslog templates (see examples below).
- Network access between VergeOS and the logging server.

## Configuring Remote Syslog in VergeOS

### Steps

1. **Access System Settings**

   - Navigate to **System > Settings > Advanced Settings** in the VergeOS UI.

2. **Set the Remote Syslog Server**

   - Enter the remote syslog server details in the following format:
     - **TCP**: `@@name_or_ip:port`
     - **UDP**: `@name_or_ip:port`
       Example:
     ```
     @192.168.100.10:5142;GRAYLOGRFC5424
     ```

3. **Define Syslog Templates**

   - Under **Template to define for syslog server**, configure the rsyslog format template.
   - Example rsyslog template:
     ```
     GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.cloud.io %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
     ```
   - Refer to the [rsyslog documentation](https://www.rsyslog.com/doc/) for advanced template configurations.

4. **Save Settings**

   - Click **Save** to apply the changes.

!!! tip "Pro Tip"
Test the configuration by generating syslog messages in VergeOS and verifying them on the remote syslog server.

## Examples

### Sample Logs from VergeOS

#### Log 1:

```
2024-12-07T10:00:01.282985-05:00 node1 appserver[14019]: (node1) [Tenant 'HYPGMS-01'] Discovered snapshot 'Hourly for 3 hours_20241207_10'
```

- **Timestamp**: `2024-12-07T10:00:01.282985-05:00`
- **Hostname**: `node1`
- **Application**: `appserver`
- **PID**: `[14019]`
- **Message**: `Discovered snapshot 'Hourly for 3 hours_20241207_10'`

#### Log 2:

```
2024-12-01T10:05:29.885009+00:00 node1 appserver[13793]: (node1) [Node 'node4'] Status is now 'Unresponsive'
```

- **Timestamp**: `2024-12-01T10:05:29.885009+00:00`
- **Hostname**: `node1`
- **Application**: `appserver`
- **PID**: `[13793]`
- **Message**: `[Node 'node4'] Status is now 'Unresponsive'`

---

## Integrating with Other Logging Tools

### Graylog

1. **Create a Syslog Input**

   - Navigate to **System > Inputs** in Graylog.
   - Select **Syslog UDP** or **Syslog TCP** and configure the input with the desired port and bind address.
   - Start the input.

2. **Parse Logs**

   - Configure extractors or pipelines to parse fields such as hostname, application name, and message.
   - Updated extractor regex to accommodate the VergeOS rsyslog template:
     ```regex
     ^<(?P<pri>\d+)>(?P<protocol_version>\d+) (?P<timestamp>\S+) (?P<hostname>\S+) (?P<app_name>\S+) (?P<proc_id>\S+) (?P<msg_id>\S+) (?P<structured_data>\[.*?\]) (?P<message>.*)$
     ```
   - This extracts:
     - `PROTOCOL-VERSION` as `protocol_version`
     - `MSGID` as `msg_id`
     - `STRUCTURED-DATA` as `structured_data`
     - `message` for the main log content.

### Splunk

1. **Set Up a Data Input**

   - Navigate to **Settings > Data Inputs** in Splunk.
   - Select **UDP** or **TCP**, configure the port, and set the source type to `syslog`.

2. **Search and Parse Logs**

   - Use Splunk SPL for parsing VergeOS logs with the updated rsyslog template:
     ```spl
     rex field=_raw "<(?<pri>\d+)>(?<protocol_version>\d+) (?<timestamp>\S+) (?<hostname>\S+) (?<app_name>\S+) (?<proc_id>\S+) (?<msg_id>\S+) (?<structured_data>\[.*?\]) (?<message>.*)"
     ```

### ELK Stack

1. **Configure Logstash**

   - Add the syslog input configuration:
     ```
     input {
         udp {
             port => 514
             type => "syslog"
         }
     }
     ```

2. **Add Grok Filters**

   - Parse logs with Grok to match the VergeOS rsyslog template:
     ```
     filter {
         grok {
             match => { "message" => "<%{INT:pri}>%{INT:protocol_version} %{TIMESTAMP_ISO8601:timestamp} %{DATA:hostname} %{DATA:app_name} %{DATA:proc_id} %{DATA:msg_id} %{DATA:structured_data} %{GREEDYDATA:log_message}" }
         }
     }
     ```

3. **Output Logs to Elasticsearch**

   ```
   output {
       elasticsearch {
           hosts => ["http://localhost:9200"]
       }
   }
   ```

### Fluentd

1. **Configure Syslog Input Plugin**

   - Add the syslog source configuration:
     ```
     <source>
       @type syslog
       port 514
       bind 0.0.0.0
     </source>
     ```

2. **Transform Records**

   - Use the record transformer to extract the VergeOS-specific fields:
     ```xml
     <filter **>
       @type record_transformer
       <record>
         pri ${record["message"].scan(/<\d+>/)[0]}
         protocol_version ${record["message"].scan(/>(\d+) /)[0]}
         structured_data ${record["message"].scan(/\[(.*?)\]/)[0]}
       </record>
     </filter>
     ```

3. **Define Output to Elasticsearch**

   ```
   <match **>
     @type elasticsearch
     host localhost
     port 9200
     logstash_format true
   </match>
   ```

!!! tip "Pro Tip"
Use test logs to validate configurations before deploying in production.

---

## Troubleshooting

!!! warning "Common Issues"
\- **Logs Not Appearing**: Verify the VergeOS syslog server configuration and network connectivity.
\- **Parsing Issues**: Ensure rsyslog templates are correctly defined and match the expected format on the remote server.

## Additional Resources

- [rsyslog Documentation](https://www.rsyslog.com/doc/)
- [Graylog Documentation](https://docs.graylog.org/)
- [Splunk Documentation](https://docs.splunk.com/)
- [ELK Stack Documentation](https://www.elastic.co/guide/)
- [Fluentd Documentation](https://docs.fluentd.org/)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: 2025-01-23
    - VergeOS Version: 1.0.0
