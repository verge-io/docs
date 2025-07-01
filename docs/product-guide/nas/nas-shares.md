# Shares

Shares can be created to provide NFS and/or CIFS access to a NAS volume.

!!! success "Multiple shares can be created for a single volume to provide varying security or different access for separate sets of users."

## Create an NFS Share

1. From the Cloud Dashboard, select **NAS** from the left menu.
2. Select **Volumes** from the left menu.
3. Double-click the desired **Volume** in the list to display the volume dashboard.
4. Select **NFS Shares** from the left menu.
5. Select **New** from the left menu.
6. Enter a ***Name*** for the new NFS share (required).
7. Enter a ***Share Path*** (or leave blank to share the entire volume).
8. Enter a ***Description*** for the share (optional).
9. The ***Allow Everyone*** checkbox can be selected to allow all hosts
10. Specify one or more ***Allowed Hosts*** to grant access only from particular machines. Hosts can be specified by IP address or FQDN; wildcards can be used to allow entire domains, example: *.companyabc.com.
11. Optionally, a ***Filesystem ID*** can be specified.
12. Select desired ***Data Access*** from the dropdown list (Read Only or Read and Write).
13. Select ***User/Group Squashing*** option
    - ***No Squashing (default)***
    - ***Squash Root***
    - ***Squash All***
    
!!! info "User/Root Squashing is a security feature that denies special access rights based on UID of the user on the client machine; i.e. user ID on the client (connecting) computer does not dictate permissions on the share."
   
13. Specify ***Anonymous User ID*** (optional). Anonymously-connected users are given permission level of ID assigned here.
14. Specify ***Anonymous Group ID*** (optional). Anonymously-connected users operate as if they were in group assigned here.
15. The ***Asynchronous*** option can be selected to improve performance. However, in the event of an unclean server restart, there is a risk of data corruption/loss when the asynchronous option is enabled.
16. Optionally, the ***No ACLs*** option can be selected to disable ACLs (access-control lists).
17. Click **Submit** to save the settings and create the new NFS share.

## Create a CIFS Share

1. From the Cloud Dashboard, select **NAS** from the left menu.
2. Select **Volumes** from the left menu.
3. Select **CIFS Shares** from the left menu.
4. Select **New** from the left menu.
5. Enter a ***Name*** for the new CIFS share (required).
6. Enter a ***Share Path*** (or leave blank to share the entire volume).
7. Optionally, a ***Description*** can be entered for the share.
8. Enter a ***Comment*** for the share (optional).
9. Specify a ***Valid Users*** list (optional). List one user per line.
10. Specify a ***Valid Groups*** list (optional). List one group per line.
11. Specify an ***Allowed Hosts*** list (optional). One host per line. Hostname, IP address, domain name, netgroup, and subnet are all valid entries.
12. Specify a ***Denied Hosts*** list (optional). One host per line. Hostname, IP address, domain name, netgroup, and subnet are all valid entries.
13. The ***Read Only*** option can be selected to deny any write operations via this share.
14. The ***Browseable*** option can be selected to make the share visible in lists of available shares. This option is disabled by default.
15. Specify a list of ***Admin Users*** (optional).
16. A ***Force User Option / Force Group Option*** can be specified to define a user or group that will be used for all file operations performed via this share (regardless of the user account used to connect).
17. ***Advanced Configuration Options (advanced samba share options)*** can be specified to handle special-case scenarios. (Advanced use only; please consult with VergeOS Support for assistance.)
18. Click **Submit** to save the settings and create the new CIFS share.

