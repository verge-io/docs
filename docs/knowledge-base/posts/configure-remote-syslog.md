### 6. Centralized Logging Configuration

1. **Access System Settings:**
      - Navigate to System > Settings > Advanced Settings
      - Search for "syslog" in the settings search

2. **Configure Remote Syslog Server:**
      - Locate "Remote syslog server" setting
      - Use the appropriate syntax for your protocol:
         * TCP format: `@@hostname/ip:port`
         * UDP format: `@hostname/ip:port`
   
   Example configurations:
   ```
   TCP: @@10.10.10.10:514
   UDP: @10.10.10.10:514
   ```

3. **Configure Syslog Template:**
      - Search for "syslog" again
      - Locate "Template to define for syslog server"
      - Enter a compatible template format

   Example template:
   ```
   GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.HOSTNAME_HERE %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
   ```

!!! note "Log Retention"
    VergeOS retains logs for 45 days by default. Configure third-party logging to retain logs for longer periods.

!!! tip "Template Configuration"
    Ensure your template format is compatible with your syslog server. Consult your syslog server's documentation for specific format requirements.
