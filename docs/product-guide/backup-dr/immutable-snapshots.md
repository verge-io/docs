# Immutable Snapshots

## Overview

!!! danger "**Critical: Understand Risks Before Enabling**"
    **Immutable snapshots CANNOT be deleted for 7 days - even in emergencies.**
    
    **This means:**

    - If storage fills up, you CANNOT immediately free space by deleting these snapshots
    - There is NO emergency override for administrators or VergeOS support
    - Storage emergencies require 7-day advance planning or adding physical capacity
    
    **Before enabling, ensure:**

    - Storage utilization is below 70%
    - You have capacity monitoring and alerting configured
    - You understand your snapshot retention will consume X GB over 7 days
    
    **VergeOS recommends:** Use immutable snapshots only for short retention (3 hours default) in production systems, or use them in dedicated backup systems with ample capacity.

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

- Avoid operating too close to storage capacity limits where undeletable snapshots could cause issues
- Plan snapshot retention policies with the seven-day unlock delay in mind
- Consider storage growth and capacity planning as part of your backup strategy

## VergeOS Implementation

VergeOS implements immutable snapshots differently from many other solutions to provide enhanced security:

- **No immediate unlock capability**: Unlike other systems, VergeOS does not allow anyone (regardless of permission level) to remove an immutable flag from a snapshot immediately
- **Mandatory waiting period**: This prevents attacks using compromised administrator-level accounts to remove immutable attributes in order to immediately erase all snapshots
- **Enhanced threat protection**: The design specifically addresses sophisticated attacks that target administrative privileges

!!! note "**Default Behavior**"
    The default profile: *System Snapshots* is configured to set *Hourly for 3 hours* snapshots to *Immutable*, providing preconfigured baseline protection. 

## Managing Immutable Snapshots

### Enabling Immutable Protection ("Lock" a Snapshot)

1. Navigate to **System** > **System Snapshots**.
2. **Double-click** the **desired snapshot** from the listing.
3. Toggle the **Immutable** option to enabled (the button will move to the right).
4. Click **Submit** at the bottom of the page to save the change.
5. You are returned to the System Snapshots Listing. The snapshot will display a lock icon to indicate immutable protection is active.


### Automating Immutable Protection

To automatically enable immutable protection:
You can configure the profile used for taking system snapshots to automatically enable the immutable flag as snapshots are created.

1. Start at the snapshot profile's dashboard page: navigate to System > Snapshot Profiles > double-click the appropriate profile.
2. Click Profile Periods on the left menu
3. Double-click a period, toggle the Immutable option to enabled (the button will move to the right), and click Submit at the bottom of the page to save changes
4. The modified profile period will now display a checkmark in the Immutable column and snapshots created with this profile period will automatically be marked immutable
5. Repeat this process for each profile period where automatic immutable snapshots are desired


### Disabling Immutable Protection ("Unlock" a Snapshot)

**To disable immutable protection:**

1. Navigate to **System** > **System Snapshots**.
2. Double-click the desired snapshot from the listing.
3. Toggle the **Immutable** option to disabled (the button will move to the left). 
4. Click **Submit** at the bottom of the page to save changes.
5. Return to the System Snapshots listing — the snapshot will display *Unlocking* status and the scheduled unlock date.

The snapshot remains protected and undeletable until the displayed date (seven days from the unlock request or the snapshot's natural expiration date, whichever comes first).

## Troubleshooting

### Storage Emergency with Immutable Snapshots

**Symptom:** Storage at 90%+, cannot delete immutable snapshots

**Immediate actions:**

1. Request unlock for all immutable snapshots (begins 7-day countdown)
2. Stop all snapshot creation temporarily
3. Add physical storage capacity (only immediate solution)
4. Delete any non-immutable snapshots or VMs

**Prevention:** This is avoidable - maintain <70% storage utilization when using immutable snapshots.

**Contact [VergeOS support](/support)** if you need emergency capacity planning assistance.
