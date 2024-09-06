---
title: Troubleshooting NAS Shares
slug: troubleshooting-nas-shares
description: 
published: false
date: 2023-09-18T15:54:21.904Z
tags:
  - cifs
  - nas
  - nfs
  - shares
  - volumes
  - troubleshooting
  - troubleshoot
  - guest
  - lanmanager
  - smb
categories:
  - Troubleshooting
  - NAS
editor: markdown
dateCreated: 2023-09-18T15:20:34.352Z
---

# Troubleshooting NAS CIFS Shares

In this guide, we'll walk through common issues you might encounter with NAS CIFS shares and provide step-by-step solutions. Let's empower you to resolve these issues efficiently!

---

## Connectivity Errors

### Issue: Unable to Connect to CIFS Shares

If you're experiencing connectivity issues when trying to access CIFS shares, you may need to enable insecure guest logins for SMB shares on your Windows device.

#### Solution: Enable Insecure Guest Logins

1. **Open Local Group Policy Editor**
   - Press `Win + R` to open the Run dialog.
   - Type `gpedit.msc` and press `Enter` to open the Local Group Policy Editor.

2. **Navigate to Policy Path**
   - In the console tree, navigate to **Computer Configuration > Administrative Templates > Network > Lanman Workstation**.

3. **Edit Policy Setting**
   - Locate **Enable insecure guest logons** in the right pane.
   - Right-click on it and select **Edit**.

4. **Enable the Setting**
   - In the policy setting window, select **Enabled**.
   - Click **OK** to apply the changes.

5. **Restart Your Device**
   - Restart your Windows device to ensure the changes take effect.

By enabling insecure guest logins, you should be able to resolve connectivity issues with CIFS shares.

---

## Permission Denied Errors

### Issue: Access Denied When Accessing CIFS Share

If you encounter permission denied errors, it may be due to incorrect user permissions or share settings.

#### Solution: Verify Permissions and Share Settings

1. **Check User Permissions**
   - Ensure the user account has the necessary permissions to access the share.
   - Navigate to the NAS service and verify the user permissions for the specific share.

2. **Review Share Settings**
   - Ensure that the share settings are correctly configured.
   - Navigate to **NAS > Shares** and verify the settings for the specific share.
   - Ensure that the share is browseable and that the correct users or groups have access.

3. **Force User/Group Options**
   - If using the **Force User Option** or **Force Group Option**, ensure that the specified user or group has the correct access permissions.

---

## Slow Performance

### Issue: Slow Access to CIFS Shares

If accessing CIFS shares is slow, it might be due to network issues or incorrect configurations.

#### Solution: Optimize Performance Settings

1. **Check Network Connectivity**
   - Verify that your network is stable and that there are no connectivity issues.
   - Use tools like `ping` or `traceroute` to check network latency and packet loss.

2. **Adjust SMB Protocol Version**
   - Ensure you are using the optimal SMB protocol version.
   - Navigate to **NAS > Volumes**, select the volume, and verify the SMB protocol version under **Advanced Configuration Options**.

3. **Optimize NAS Configuration**
   - Review and optimize NAS configurations such as caching and buffering settings.
   - Consult VergeOS Support for advanced configuration options to improve performance.

---

## MacOS Issues

### Issue: Unable to Access CIFS Shares from MacOS

MacOS users may encounter issues when trying to access CIFS shares due to differences in SMB protocol versions or other configuration settings.

#### Solution: Adjust MacOS Settings

1. **Ensure SMB Compatibility**
   - Open the Terminal application on your Mac.
   - Use the following command to check the SMB protocol version:
     ```bash
     smbutil statshares -a
     ```
   - Ensure the server supports SMB2 or SMB3, as SMB1 is deprecated and may not be supported by MacOS.

2. **Modify `nsmb.conf`**
   - Create or edit the `nsmb.conf` file to force a specific SMB protocol version:
     ```bash
     sudo nano /etc/nsmb.conf
     ```
   - Add the following lines to force SMB3:
     ```ini
     [default]
     smb_neg=smb3_only
     ```
   - Save the file and exit the editor.

3. **Clear SMB Cache**
   - Use the following command to clear the SMB cache:
     ```bash
     sudo rm -rf /var/db/samba/*
     sudo rm -rf /var/db/smb/*
     ```

4. **Restart Your Mac**
   - Restart your Mac to apply the changes.

#### Solution: Verify Share Configuration

1. **Check Share Permissions**
   - Ensure the CIFS share permissions are correctly configured for the MacOS user.
   - Navigate to **NAS > Shares** and verify the settings for the specific share.

2. **Use Correct Credentials**
   - When prompted, ensure you are using the correct username and password to access the share.
   - If anonymous access is required, ensure the share allows guest access.

#### Solution: Add Advanced Configuration Options

For better support for MacOS clients, you can add specific configurations under "Advanced Configuration Options" in the CIFS settings.

1. **Navigate to NAS CIFS Settings**
   - Go to **NAS** and click on the **CIFS** box on the dashboard.

2. **Add Advanced Configuration Options**
   - Under **Advanced Configuration Options**, add the following settings:
     ```ini
     ea support = yes
     vfs objects = fruit streams_xattr
     fruit:metadata = stream
     fruit:model = MacSamba
     fruit:veto_appledouble = no
     fruit:nfs_aces = no
     fruit:posix_rename = yes
     fruit:zero_file_id = yes
     fruit:wipe_intentionally_left_blank_rfork = yes
     fruit:delete_empty_adfiles = yes
     ```

3. **Save and Apply Settings**
   - Save the changes and apply the new configuration settings.

By following these troubleshooting steps, you should be able to resolve common issues with NAS CIFS shares effectively. If you continue to experience problems, please consult VergeOS Support for further assistance.

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6
