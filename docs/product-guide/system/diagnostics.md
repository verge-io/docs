# System Diagnostics

The *System Diagnostics* feature allows quickly and easily gathering extensive system information into a single compressed file, capturing a point-in-time collection of system details, including: unfiltered logs, configuration information, network and state data, and other metrics useful for analyzing and troubleshooting.  While these information points can generally be easier to obtain from within the VergeOS UI, generating the System Diagnostics file can be a convenient way to collect all the informaiton and send directly to VergeIO Support for professional analysis.

## When to Run System Diagnostics

While working with Support on an issue, you may be asked to run System Diagnostics in order to easily gather comprehensive information to assist in troubleshooting.  A system diagnostics file can also be requested as a baseline when implementing a significant system change, with another triggered after the modification for comparison.

!!! warning "Impact Considerations"
    - Triggering System Diagnostics can affect performance as it probes hardware and gathers extensive information from each node.
    - Once triggered, a System Diagnostics build cannot be cancelled.

## Generate a System Diagnostics File

1. Navigate to **System** > **System Diagnostics**
2. Click **Build** on the left menu.
3. Provide a **Name** and **Description** for the diagnostic build.  If Name is left blank, the system will auto-generate a name with format:
[SYSTEMNAME]\_*diags*\_[yyyymmdd_hhmmss], e.g. Verge-Det_diags_20241113_121503 
!!! tip "Name/Description"
      - Always enter a explanatory name/description before sending directly to VergeIO Support.
      - An identifying name and description will help to easily distinguish between different diagnostic instances on the same system.
      - These fields can also be edited after the system diagnostics is done generating.

4. If working with Support and the system has internet connectivity, you can check the box to ***Send diagnostic information to Verge.io support***.  This option is also available after the file is done generating, using the *Edit* option.
!!! note "Sending directly to VergeIO Support"
    - System Diagnostics sent directly to Verge.io from the UI are encrypted during transmission.
    - The *Status* field will indicate when a report was sent directly to Support.

5. Click **Submit** to generate the file.
Information is retrieved from all online nodes in your system.  Depending on the number of nodes and size of the logs, this build may take a few to several minutes or more.  While building, the **Status** column will indicate the node it is currently working on and will show **Complete** when the diagnostics file has successfully finished generating.  

## Download 

For an air-gapped system or one otherwise unable to reach the internet: after the file has completed generating, select the diagnostic file and click *Download*.  Coordinate with your support contact to deliver the file for analysis. 

!!! warning "While System Diagnostics files never contain user data, potentially sensitive items such as IP addressing, network details, tenant and VM Names are included.  Use care in downloading and transporting a system diagnostic file to ensure that only authorized personnel have access."

## General File Information

### Layout 

- The top level of the file is arranaged by host node.  
- The controller node (typically node 1) folder contains more expanded information than other node folders.

### Contents

- **Tenant node logs** - system Logs from each tenant node
- **VergeOS Configuration Info** - VergeOS network and vSAN specifications, version, and other configuration settings 
- **SMART Reports** -  S.M.A.R.T diagnostic report from each physical drive
- **vNet Logs** - container logs (DMZ, core, external, maintenance, tenant networks)
- **Network Reports** - standard network utility outputs
- **vSAN Diagnostics** - vSAN command outputs
- **Block Device Lists** - structural and descriptive info about block devices (logical view of storage)
- **Kernel Logs** - typically empty, but can include entries when there are system crashes or hardware failures
- **Complete System Logs** - full current system log and up to 3 archived system logs from previous node power cycles
- **OS-Level Diagnostics** - standard Linux diagnostic command outputs
- **System Statistics** - a collection of performance monitoring reports produced from Linux sysstat
- **Low-level OS Info** - information about system resources, hardware, and active processes