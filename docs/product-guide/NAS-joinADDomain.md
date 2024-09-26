# Joining a NAS to a Windows AD Network
A NAS service can be joined to an existing Active Directory domain to provide AD integration.  


## To Join a NAS to a Domain:
1. From the **Main Dashboard**, navigate to the **NAS** dashboard.
2. Click **NAS Services** (on the **left menu** or the **count box quick-link**).
3. **Double-click the NAS service** from the listing. (**Commonly, there is only one NAS service.**)  
4. **Confirm** the NAS service is running by checking the **Status:** field in the top left of the dashboard. 
5. Click **Edit CIFS Settings**.

6. Complete the following fields:  

* **Guest User Mapping**: Select desired behavior for invalid users/passwords used in access attempts:
    * Invalid Users treated as a guest
    * Invalid passwords treated as a guest
    * Invalid Linux users treated as a guest
    * Invalid passwords rejected
* **Workgroup**:  (this will be the **short form domain**, such as ‘**CompanyName**’)
* **Realm**: (this will be the **long form domain**, such as ‘**CompanyName.local**’)
* **AD User/Password**: a **valid administrator** account on the domain (with the ability to create objects), and **account password**. The format for inputting the string is **useraccount%password**.  Example: administrator%password123

7. The following fields are **not required** to join and typically **should be left as is**.  Managing the following values within **Active Directory - Users and Computers** inside the Windows environment is **highly recommended**.  
  
    * **Server Type** (leave at **-Default-**)
    * **User Principal Name**
    * **Organizational Unit** -If entered, the Organizational Unit (OU) must already exist in the Active Directory domain, and the administrator account used in **step 6** must have **rights to add objects** to this OU.
    * **Machine Password** - if entered, the password **must** meet the required password complexity requirements of the Active Directory domain.
    * **Operating System**
    * **Operating System Version**
    * **Extended ACL Support (leave checked)**

!!! info "Special Configuration Needs: For any specific needs that aren’t addressed with the fields above, configuration options can be added to the Advanced Configuration Options.  Contact VergeIO Support for assistance with advanced configuration." 

8. **Wait** while the NAS VM joins the domain.
9. If the NAS service successfully joins the domain, the CIFS settings on the NAS Service dashboard will display an AD Status of ‘**Joined**’.

Windows AD administrators can confirm that the NAS has joined by reviewing Computer objects in their Windows **Active Directory - Users and Computers**.


</br >

## Troubleshooting Joining AD Issues

If a NAS service does not get a “**Joined**” AD Status:  

* **Verify the creation of the Organizational Unit (OU)**  

    * If an Organization Unit(OU) is specified within the VergeOS CIFS settings, that OU **must already exist within AD**. Create the OU within your Active Directory **before** attempting a join.
    * If leaving the Organizational Unit (OU) field blank in VergeOS CIFS settings (**recommended**), verify that the specified AD account used has **permissions to create objects.** 

* **Verify Password Complexity meets Requirement**  

    * This only applies If the Machine Password field is set. It is **recommended to leave this field blank**. If the password does not match the AD **password complexity requirements, it will fail to join**. Machine password is not a necessary field; it is best to remove the value if you are having problems joining AD. 

* **Verify Workgroup/Realm**
    * If the Workgroup or Realm is **incorrectly entered**, it will **fail to join**.
    * The Workgroup can typically be found on any domain member server by typing <kbd>whoami</kbd> at a command prompt. The result returned is **workgroup \ username**.
    * The Realm can typically be found on any domain member server by reviewing the System properties. The value **Domain:** lists the entire Realm.
    * Both properties can also be found using the <kbd>systeminfo</kbd> command from the command prompt.

* **Verify that the NAS has been placed on the correct network with the correct settings.**
    * If the NAS service cannot reach the AD domain, **it will fail to join**. The NAS dashboard's Networks/VM NICs section will indicate the NIC network and Status.
    * Click **Edit** on the **left menu** of the NAS Service dashboard to select a different network if necessary.  

* **Verify that the NAS service has a valid IP configuration.**
    * NAS Service dashboard - check **Static vs. DHCP**
    * If *Static*: verify correct settings for IP address, gateway, and DNS Servers.
    * If *DHCP*: check the network to verify that the NAS VM has received a valid address.  

* **Verify that the NAS service can resolve the Domain/Realm. (By name)**
    * If *Static*: verify correct settings for IP address, gateway, and DNS Servers.
    * If *DHCP*: verify the network has been configured with correct DNS servers.

* **Verify specified AD user has adequate permissions to join computers to the domain.**  
