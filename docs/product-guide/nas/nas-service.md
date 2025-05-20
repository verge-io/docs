# Add a NAS Service

The NAS feature provides file-level storage/access within a VergeOS system. NAS functionality can be added by downloading and implementing an instance of the standard NAS VM Recipe.

## Implement an instance of the NAS VM Recipe

1. From the Cloud Dashboard, select **NAS** from the left menu.
2. Select **New NAS Service** from the left menu.
3. If the Recipe requires a download: a message will appear including a download link; **Click the Link to download** the NAS VM Recipe. Select **Download** from the left menu. Click the **Yes** button to Confirm downloading this VM Recipe. The status will display as "Downloading" while it is in progress. When the download is complete, the status will display "Online" and the "Downloaded" checkbox will display as checked.
4. Enter a ***Name*** for the new NAS Service.

    !!! info
        The New NAS Service will be a VM; therefore it cannot have a name that is in use by another VM in the same VergeOS Cloud.

5. The default setting for ***Cores*** is 4; this setting is suitable for typical, general-purpose NAS workloads. Heavy antivirus operations and/or frequent sync activity may affect core needs.

    !!! tip
        There can be many factors involved in NAS Service resource needs; consult VergeOS Implementation Services or VergeOS Support if guidance is needed.

6. The default setting for ***RAM*** is 4 GB; this setting is suitable for typical, general-purpose NAS workloads. Heavy file caching operations can affect RAM needs.
7. The system-defined-default ***Cluster*** is automatically selected. If desired, a different Cluster can be selected on which to run the NAS Service.
8. Select the ***Network*** on which the NAS should run.
    - Options will include Internal and External networks defined in this VergeOS Cloud.

9. Select ***IP Address Type*** for the NAS Service. Options include **DHCP** and **Static**
    - If the NAS service is hosted on a VergeOS Internal network, it is generally recommended that you select DHCP and define a static IP address for the NAS VM within the network's IP settings.
    - For networks controlled externally, Static vs DHCP would be selected, depending upon factors of the particular network.
    - When utilizing DHCP, it is recommended to configure a static reservation so that the IP address will remain constant.
    - When utilizing a Static address, care should be used to avoid conflicting with other static IP addresses or DHCP lease scope
    - When **Static** is selected, ***IP Address***, ***Gateway***, and ***DNS Server list*** should also be specified.

10. Define a ***Hostname*** for the NAS Service VM. (Hostname defaults to "nas")
!!! tip "Hostname tips:"
    - Typically, it is best to use the same value for *Hostname* and *Name* to avoid confusion in future administration.
    - When a NAS service is joined to a Windows AD Domain, the computer object will appear with its hostname (rather than NAS name) in AD Computers and Users.
11. Enter a ***domain (optional).*** CIFS/Samba functionality will require a domain. If the Domain field is left blank, the system will default the domain to "workgroup". If the NAS Service will be used to serve out CIFS shares, the AD Domain in use should be specified.
12. ***Timezone*** will default to the default time zone for the VergeOS Cloud. If needed, a different timezone can be defined for the NAS Service.
13. Generally, the **default** ***NTP Servers*** setting is recommended. This defines the Network Time Protocol(NTP) servers list (used for keeping the NAS service time synchronized.) If needed, the default NTP server list can be overridden, in order to explicitly define the NTP server list to be used.
14. (Optional) Enter the address of a ***Remote Syslog server.***
15. (Optional) Enter a ***Remote Syslog Template.***
16. Click **Submit** to save the settings and create the New NAS Service.
17. The new NAS will now appear in the **NAS Service list**. **Double-click the Service** within the list to bring up the Dashboard for the Service.
18. Select **Power On** from the left menu to start the NAS.
19. Click the **Yes** button to confirm power on.
20. To utilize the NAS service, at least one **Volume** will need to be implemented. Information regarding Volumes along with links to instructional pages provided below.

## Volumes

A NAS service will consist of one or more volumes. Each volume is a separate directory structure with its own settings for security, snapshots, storage tier, max size, antivirus, and sharing.

- **Local Volumes** are file systems stored within VergeOS and consume storage in the VergeOS vSAN.

    See [**NAS Local Volumes**](/product-guide/nas/nas-local-volumes) for instructions on creating Local Volumes.

- **Remote Volumes** are external file systems that are mounted to the VergeOS system and presented as if local.

    See [**NAS Remote Volumes**](/product-guide/nas/nas-remote-volumes) for instructions on creating Local Volumes.
