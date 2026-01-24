# Alarms

## Overview

The VergeOS alarm system provides proactive monitoring and alerting to notify of problems, concerns, and vulnerabilities within the system. Alarms are automatically generated notifications that make users aware of conditions requiring attention, such as:

- Missing or incorrect configuration settings
- Potentially vulnerable system configurations
- Hardware failures (missing or failed drives)
- Security concerns requiring immediate action
- System maintenance requirements

## Alarm Notifications

!!! tip "Default Administrator Email Notifications"
    By default, the built‑in admin user and the Administrators group receive automatic email notifications whenever a system alarm is raised or lowered (cleared)


### Top Bar Indicator

When active alarms are present in your system, a notification badge will appear next to the alarm icon <i class="bi bi-bell"></i> (bell) on the right side of the top navigation bar. This badge displays the total number of current, active, **non-snoozed** alarms requiring attention.

### Main Dashboard Card

The Main Dashboard includes a dedicated ***Alarms* card** that provides:  

* **Active alarm count**: Total number of unresolved system alarms
* **Visual status indicator**: Color-coded status (green: no alarms raised; yellow: warnings; red: error and/or critical alarms) 
* **Quick access**: Direct link to the Alarms Dashboard, providing a detailed view of current alarms

!!! info "Snoozed alarms are not included in the active alarm count displayed on the dashboard card."

### Contextual Dashboard Alerts

Many alarms also appear as contextual messages at the top of relevant dashboard pages. For example:  

* SMTP configuration alarms display on the SMTP settings dashboard
* Network-related alarms appear on applicable network configuration pages
* Storage alarms show on relevant storage management dashboards

## Viewing Alarm Details

### Accessing the Alarms List

To view a comprehensive list of all active alarms, use either method:

**1**: Click the **alarm icon** <i class="bi bi-bell"></i> (bell) in the top navigation bar

**2**: Navigate to **System** → **Alarms**


### Alarm Ownership Types

**System Alarms**

* Deal with core system functionality and security
* Affect overall system operation and stability
* Typically require administrative privileges to resolve

**User Alarms**  

* Specific to individual VergeOS user accounts
* Examples: Missing two-factor authentication configuration, personal settings issues
* Can often be resolved by the individual user

### Alarm Expiration

Most alarms display "Never" in the **Expires** field because they require specific resolution actions rather than automatic expiration. Alarms remain active until the underlying condition is addressed, or the alarm is manually snoozed.


## Resolving Alarms

Different alarm types require different resolution approaches:

1. **Configuration Issues**: Navigate to the relevant settings page to correct misconfigurations
2. **Hardware Problems**: Replace or repair faulty hardware components
3. **Security Concerns**: Update settings, apply patches, or implement security measures
4. **Maintenance Tasks**: Complete required system maintenance or updates

**To access resolution options:**  

  * Double-click any alarm in the list to navigate directly to the associated dashboard or configuration page
  * Review detailed information and access necessary tools from the target page

### Auto-Resolvable Alarms

Some alarms include built-in resolution actions that can be triggered directly from the alarm notification, streamlining the resolution process.  The following scenarios show examples of auto-resolvable alarms:


#### Example 1: Virtual Machine Restart Required 

   * **Issue**: A VM requires reboot/restart to complete configuration changes  
   * **Resolution**: Click the **Restart** button directly from the alarm notification

#### Example 2: Firewall Rules Pending Application

   * **Issue**: Network firewall rules have been configured but not yet applied
   * **Resolution**: Click the **Apply Rules** button to activate pending rule changes


## Snoozing Alarms

### When to Snooze Alarms

Snoozing allows you to temporarily suppress alarm notifications when:

* Waiting for replacement hardware to arrive
* Planning maintenance during scheduled downtime
* Coordinating with other team members before taking action
* Deferring non-critical (warning) issues to a more appropriate time

!!! warning "Always understand the alarm's purpose and implications before snoozing. Delaying resolution of more urgent issues (e.g. Error or Critical Level) can impact system stability and security."

### How to Snooze Alarms

1. **Access alarms**: Click the alarm icon in the top bar or navigate to **System** → **Alarms**
2. **Select alarms**: Choose the desired alarm(s) from the list
3. **Initiate snooze**: Click **Snooze** in the left menu
4. **Set duration**: Select the appropriate snooze duration from the dropdown menu
5. **Confirm**: Click **Snooze** to apply the setting

### Managing Snoozed Alarms

**Visual Indicators:**  

- **Snooze icon**: The "ZzZ" symbol appear at the far left of snoozed alarms
- **Snoozed field**: Shows "Yes" for currently snoozed items
- **Snoozed Until**: Indicates when the alarm will become active again
- **Modified**: Shows the date/time when snooze was implemented

**Modifying Snooze Duration:**  

To adjust an existing snooze period, follow the standard snooze process with the new desired duration. The system will update the snooze period accordingly.


## Best Practices

* Check Regularly for Alarms
* Before snoozing an Alarm: understand the importance of the alarm, and alert other VergeOS administrators
* Note the type of alarm, e.g. Critical/Error/Warning to better understand importance and urgency level
* Typically, it is not recommended that you snooze alarms marked as "Critical"; if you find it necessary to snooze a Critical alarm, **select a short snooze duration and verify other VergeOS administrators are aware of the alarm**


### Regular Monitoring
- **Daily checks**: Review active alarms at the start of each day
- **Priority focus**: Address critical and error-level alarms first

### Snooze Management
- **Understand before snoozing**: Always review alarm details and implications before deferring
- **Team communication**: Notify other administrators when snoozing shared system alarms
- **Critical alarm caution**: Avoid snoozing Critical alarms
- **Short durations for critical issues**: If you must snooze critical- or error-level alarms, use minimal durations

### Resolution Strategy
- **Severity-based prioritization**: Use alarm severity levels to guide response timing
- **Documentation**: Keep records of alarm resolutions for future reference
- **Proactive approach**: Address warning-level alarms before they escalate
- **Team coordination**: Ensure multiple administrators are aware of ongoing system alarm situations


## Troubleshooting

**Alarms not appearing**  

* Refresh the browser page  
* Verify user permissions for alarm viewing  
* Check if alarms are snoozed and hidden from active view

**Cannot resolve alarms** 
 
* Ensure you have appropriate administrative privileges  
* Verify the underlying issue has been properly addressed  
* Contact system administrators for assistance with system-level alarms  

---

**Version Compatibility**: This functionality is available in VergeOS 26.0 and later.
