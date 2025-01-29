# Repair Server (ioGuardian)

A repair server provides a potential repair mechanism after a system experiences a problem that extends beyond its redundancy tolerance (e.g. simultaneous, multiple drive failures spanning multiple nodes). Typically, a repair server is a sync destination that contains a fairly recent replication of the given system. A repair server will automatically attempt to pull back any needed blocks from the remote system, potentially avoiding the need to roll back using a snapshot. It is generally recommended that you have a repair server in place whenever possible.

!!! success "There is a higher chance of repair success when there is a good network connection, with relatively low latency, between the system and its repair server."

A repair server is created using the existing outgoing sync configuration: vSAN Host (address of the remote destination), vSAN Port, system-generated authorized username/password, and encryption setting enabled or disabled based on the associated sync configuration.

## Create a Repair Server from an Outgoing Sync (common method)

!!! info  "Repair servers may be auto-generated when [**Adding Sites to the Dashboard**](/product-guide/system/site-dashboard-add-sites)."

Typically, a repair server is created from an outgoing sync because the sync destination would contain a recent copy of the data. This is the recommended method in most cases.

1. From the outgoing sync dashboard, click **Create Repair Server** on the left menu.
2. Enter a **Name** for the repair server. Use a name that will be helpful for future administration, for example a name that includes that of the remote system.
3. Optionally, a **Description** can be entered to store additional information.
4. Click **Submit** to complete the creation.
A repair server is created using the outgoing sync configuration details, including: vSAN Host (address of the remote destination), vSAN Port, system-generated authorized username/password, and encryption setting.

## Create a Repair Server from the Repair Servers List Page

In instances where there is no current outgoing sync from which to configure the repair server (e.g. a three-way sync configuration or a previous sync destination that is no longer in use), the following instructions can be used:

1. From the Main Dashboard, select **Backup/DR** from the left menu.
2. Click **Repair Servers** on the left menu.
3. Click **New** on the left menu.
4. Enter a **Name** for the repair server. Use a name that will be helpful for future administration, for example a name that includes that of the remote system.
5. Optionally, a **Description** can be entered to store additional information.

### Automatic (Copy) Credentialling

Credentials can be copied from an existing outgoing sync:

- Select ***Copy*** in the **Credentialling** dropdown list
- Select **desired sync** in the **Copy Credentials from** dropdown list

### Manual Credentialling

To manually enter credential information:
select ***Manual*** in the **Credentialling** dropdown list.

### Credential Fields

- **vSAN Host** - url to the root level of the remote system
- **vSAN Port** - default 14201, a different port can be used but must also be configured on the remote side with ports open on intermediate firewall(s)
- **User**
- **Password** and **Confirm Password** for the specified VergeOS user
- **Encryption**

6. Click **Submit** to complete the creation.
