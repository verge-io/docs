# Joining a NAS to a Windows AD Network

A NAS service can be joined to an existing Active Directory domain to provide AD integration.

## Join a NAS to a Domain

1. From the **Main Dashboard**, navigate to the **NAS** dashboard.
2. Click **NAS Services** (on the **left menu** or the **count box quick-link**).
3. **Double-click the NAS service** from the listing. (**Commonly, there is only one NAS service.**)
4. **Confirm** the NAS service is running by checking the **Status:** field in the top left of the dashboard.
5. Click **Edit CIFS Settings**.
6. Complete the following fields:

    - **Guest User Mapping**: Select desired behavior for invalid users/passwords used in access attempts:
        - *Invalid Users treated as a guest*
        - *Invalid passwords treated as a guest*
        - *Invalid Linux users treated as a guest*
        - *Invalid passwords rejected* (most secure option)
    - **Workgroup**: (this will be the **short form domain**, such as '**CompanyName**')
    - **Realm**: (this will be the **long form domain**, such as '**CompanyName.local**')
    - **Server Type**: ***Member***
    - **AD Username**: a **valid administrator** account on the AD domain with the ability to create objects.
    - **AD Password**: Active Directory password for the entered Username.  
    - **Confirm AD Password**: Repeat the Active Directory password above.

7. The following fields are **not required** to join and typically **should be left as is**. **It is highly recommended that you manage the following values within Active Directory - Users and Computers**, inside the Windows environment.

    - **User Principal Name**
    - **Organizational Unit** - If entered, the Organizational Unit (OU) must already exist in the Active Directory domain, and the administrator account used in **step 6** must have **rights to add objects** to this OU.
    - **Machine Password** - if entered, the password **must** meet the required password complexity requirements of the Active Directory domain.
    - **Operating System**
    - **Operating System Version**
    - **Extended ACL Support** (leave checked)
    - **Minimum Protocol Version** - default value "- None -" will not impose a minimum.
    - **Advanced Configuration Options** - allows for manually entering advanced usage parameters that may not be provided by input fields.  Consult Microsoft Active Directory documentation for specific parameters available in joining a server to AD.

8. **Wait** while the NAS VM joins the domain; it may take a few minutes.
9. If the NAS service successfully joins the domain, the CIFS settings on the NAS Service dashboard will display an AD Status of '**Joined**'.

!!! success "Windows AD administrators can confirm the NAS has joined by reviewing *Computer objects* in their Windows *Active Directory - Users and Computers*.  Note: The computer object will have the NAS hostname rather than the NAS VM Name."

## Troubleshooting Joining AD Issues

If a NAS service does not get a "**Joined**" AD Status:

### Check Error Messages

Check *Logs* at the bottom of the NAS Service dashboard page for error messages that may provide information about why the service failed to joined.  

### Verify specified AD user has adequate permissions to join computers to the domain

### Verify that the NAS service has a valid IP configuration

- NAS Service dashboard - check **Static vs. DHCP**
- If *Static*: verify correct settings for IP address, gateway, and DNS Servers.
- If *DHCP*: check the network to verify that the NAS VM has received a valid address.
!!! "Static or reserved DHCP IP address is recommended for a NAS service."

### Verify that the NAS has been placed on the correct network with the correct settings

- If the NAS service cannot reach the AD domain, **it will fail to join**.
- The NAS dashboard's Networks/VM NICs section will indicate the NIC network and Status.
- Click **Edit** on the **left menu** of the NAS Service dashboard to select a different network if necessary.

### Verify Workgroup/Realm

- If the Workgroup or Realm is **incorrectly entered**, it will **fail to join**.
- The Workgroup can typically be found on any domain member server by typing `whoami` at a command prompt. The result returned is **workgroup \ username**.
- The Realm can typically be found on any domain member server by reviewing the System properties. The value **Domain:** lists the entire Realm.
- Both properties can also be found using the `systeminfo` command from the command prompt.

### Verify that the NAS service can resolve the Domain/Realm (By name)

- If *Static*: verify correct settings for IP address, gateway, and DNS Servers.
- If *DHCP*: verify the network has been configured with correct DNS servers.

### Verify the creation of the Organizational Unit (OU)

- If an Organization Unit (OU) is specified within the VergeOS CIFS settings, that OU **must already exist within AD**. Create the OU within your Active Directory **before** attempting a join.
- If leaving the Organizational Unit (OU) field blank in VergeOS CIFS settings (**recommended**), verify that the specified AD account used has **permissions to create objects.**

### Verify Password Complexity meets Requirement

- This only applies if the Machine Password field is set. It is **recommended to leave this field blank**.
- If the password does not match the AD **password complexity requirements, it will fail to join**.
- Machine password is not a necessary field; it is best to remove the value if you are having problems joining AD
