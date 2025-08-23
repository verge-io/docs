# Immutable Snapshots

!!! info "**New Feature**"
    This page documents functionality added in **VergeOS v25.2**. 

## Overview

An immutable snapshot is a powerful safeguard feature designed to prevent tampering or deletion of saved data, even by administrators or automated processes. The immutable option provides a safety net against accidental or malicious erasure, ensuring that a snapshot remains available when needed for data recovery.

When a snapshot is marked as immutable, deletion is blocked for all users, including administrators and root users. This effectively locks the snapshot until it expires, or the immutable flag is removed with a mandatory waiting period.

!!! success "**Key Features**"
    - Complete deletion protection, even from privileged accounts
    - Seven-day unlock delay for enhanced security
    - Applies to system snapshots only
    - Built-in ransomware protection

## How Immutable Snapshots Protect Against Ransomware

Ransomware actors commonly delete all available snapshots to eliminate recovery options, forcing victims to pay the ransom. Immutable snapshots provide critical protection by:

- Preventing immediate deletion of secured snapshots
- Giving system administrators time to detect malicious activity
- Ensuring recovery options remain available during an attack
- Maintaining data protection even with compromised administrator accounts

## VergeOS Implementation

VergeOS implements immutable snapshots differently from many other solutions to provide enhanced security:

- **No immediate unlock capability**: Unlike other systems, VergeOS does not allow anyone (regardless of permission level) to remove an immutable flag from a snapshot immediately
- **Mandatory waiting period**: This prevents attacks using compromised administrator-level accounts to remove immutable attributes in order to immediately erase all snapshots
- **Enhanced threat protection**: The design specifically addresses sophisticated attacks that target administrative privileges

!!! note "**Default Behavior**"
    The default profile: *System Snapshots* is configured to set *Hourly for 3 hours* snapshots to *Immutable*, providing preconfigured baseline protection. If you have modified this profile or selected an alternate profile for system snapshots, you may need to reconfigure immutable snapshots.

## Managing Immutable Snapshots

### Enabling Immutable Protection ("Lock" a Snapshot)

!!! warning

    When the immutable flag has been enabled for a snapshot, it cannot be disabled for one week. The snapshot will not be deletable for seven days unless its expiration date occurs sooner.

**To enable immutable protection:**

1. From the Main Dashboard, navigate to **System** > **System Snapshots**.
2. **Double-click** the **desired snapshot** from the listing.
3. Toggle the **Immutable** option to enabled (the button will move to the right).
4. Click **Submit** at the bottom of the page to save the change.
5. You are returned to the System Snapshots Listing. The snapshot will display a lock icon to indicate immutable protection is active.


### Automating Immutable Protection

To automatically enable immutable protection:
You can configure the profile used for taking system snapshots to automatically enable the immutable flag as snapshots are created.

1. Start at the snapshot profile's dashboard page: navigate to System > Snapshot Profiles > double-click the appropriate profile.

!!! tip "System Snapshots is the name of the default snapshot profile used to take system-wide snapshots. If this default profile was renamed or a different profile has been selected for taking system snapshots, modify the selected snapshot profile. To confirm the profile being used for taking system snapshots: Navigate to System > Settings > Advanced Settings and search for 'System snapshot'."

2. Click Profile Periods on the left menu
3. Double-click a period, toggle the Immutable option to enabled (the button will move to the right), and click Submit at the bottom of the page to save changes
4. The modified profile period will now display a checkmark in the Immutable column and snapshots created with this profile period will automatically be marked immutable
5. Repeat this process for each profile period where automatic immutable snapshots are desired


### Disabling Immutable Protection ("Unlock" a Snapshot)

**To disable immutable protection:**

1. From the Main Dashboard, navigate to **System** > **System Snapshots**.
2. Double-click the desired snapshot from the listing.
3. Toggle the **Immutable** option to disabled (the button will move to the left). 
4. Click **Submit** at the bottom of the page to save changes.
5. Return to the System Snapshots listing — the snapshot will display *Unlocking* status and the scheduled unlock date.

The snapshot remains protected and undeletable until the displayed date (seven days from the unlock request or the snapshot's natural expiration date, whichever comes first).


## Best Practices and Recommendations

### Storage Capacity Planning

**Critical Considerations:**
- Plan for storage capacity carefully, as immutable snapshots cannot be deleted immediately to reclaim space
- Ensure you have an adequate storage buffer to account for the seven-day unlock delay
- If approaching storage limits, remember that clearing space through snapshot deletion requires advance planning

### Access Control

**Security Recommendations:**
- Restrict snapshot access to only users who need it and understand the implications
- Ensure users with snapshot access are trusted and properly trained
- Implement proper role-based access controls

### Operational Guidelines

**Best Practices:**
- Maintain at least one immutable snapshot at all times for baseline protection
- Avoid operating too close to storage capacity limits where undeletable snapshots could cause issues
- Plan snapshot retention policies with the seven-day unlock delay in mind
- Consider storage growth and capacity planning as part of your backup strategy

## Support

Contact VergeOS support if you need assistance designing your snapshot retention policy or have questions about implementing immutable snapshots in your environment.

## Summary

Immutable snapshots provide essential protection against data loss from both accidental deletion and malicious attacks. While the seven-day unlock delay requires careful capacity planning, this feature ensures your critical data remains recoverable even in worst-case scenarios. Proper implementation of immutable snapshots is a cornerstone of a robust data protection strategy.

