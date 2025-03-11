# System Diagnostics

The *System Diagnostics* feature allows you to quickly and easily gather comprehensive information about your VergeOS system into a single compressed file.
A System Diagnostics file captures a point-in-time collection of system details, including: unfiltered logs, configuration information, network and state data, and other
 metrics useful for analyzing and troubleshooting. This file is typically directly sent to VergeIO Support for professional analysis; it can also be downloaded for
  manual delivery and/or local inspection.

## When to Run System Diagnostics

When working with Support on an issue, you may be asked to run System Diagnostics in order to easily gather comprehensive information about your system.  
You may also consider running system diagnostics to provide a baseline for comparison after implementing a significant system change, e.g. triggering one before making
 the modification and another after it the change is in place.

!!! warning "Impact Considerations"
    - Triggering System Diagnostics can affect performance as it probes hardware and gathers information from each node.
    - Once triggered, a System Diagnostics cannot be cancelled.

## Steps to Generate a System Diagnostics File

1. Navigate to **System** > **System Diagnostics**
2. Click **Build** on the left menu.
3. Provide a name and description for the diagnostic build.  When a name is not entered, the system will auto-generate a name for the format with format:
SYSTEMNAME_diags_yyyymmdd_hhmmss.  
!!! tip "While they are optional fields, it is best to enter name and description to help easily distinguish between different diagnostic instances later on.
Name and Description can also be edited after the system diagnostics is done generating."

4. If working with Support and the system has internet connectivity, you can select the option to "Send diagnostic information to Verge.io support"
This option is also available after the file is done generating, using the *Edit* option.
!!! note "System Diagnostics sent directly to Verge.io from the UI are encrypted during transmission."

5. Click **Submit** to generate the file.
Information is retrieved from all online nodes in your system.  Depending on the number of nodes and size of the logs, this build may take a few to several minutes or
 more.  The *Status* column will indicate the node that it is currently working on while building and will show "Complete" when the diagnostics file has successfully finished building.  A completed file can be downloaded by selecting the file and clicking *Download* on the left menu.

## Downloading

For an air-gapped system or one otherwise unable to reach the internet: after the file has completed generating, select the diagnostic file and click *Download*.  

!!! warning "While System Diagnostics files never contain user data, items such as IP addressing, network details, tenant and VM Names are included.
  Use care in downloading and transporting a system diagnostic file to ensure that only authorized personnel have access."

## Additional Resources

- [Reading a Systems Diagnostics File](/knowledge-base/read-system-diagnostics)