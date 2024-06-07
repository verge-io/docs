---
hide:
  - navigation
  - toc
---

# Welcome to VergeOS Documentation
Comprehensive guides, references, example code, and more for VergeOS, powered by Verge.io.

***

VergeOS is a software-defined data center (SDDC) solution that integrates virtualization, storage, and networking into a single platform, simplifying IT infrastructure management for private cloud environments. Built on a unified codebase and update system, VergeOS reduces complexity and costs, making it easier for IT teams to efficiently manage large-scale systems. Its ultra-converged infrastructure (UCI) design ensures better performance and resource utilization by treating storage and networking as integral components, outperforming traditional hyper-converged infrastructure (HCI) solutions.


<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Set up in 30 minutes__

    ---

    Install [`VergeOS`](#) and get up
    and running in minutes

    [:octicons-arrow-right-24: Getting started](implementation-guide/introduction/)

-   :fontawesome-solid-arrows-to-circle:{ .lg .middle } __Core concepts__

    ---

    Focus on your content and generate a responsive and searchable static site

    [:octicons-arrow-right-24: VergeOS concepts](implementation-guide/concepts/)

-   :fontawesome-solid-magnifying-glass:{ .lg .middle } __Product guides__

    ---

    Explore detailed guides to effectively use and manage VergeOS systems

    [:octicons-arrow-right-24: Product Guides](kb/category/api/)

-   :fontawesome-solid-atom:{ .lg .middle } __Knowledge Base__

    ---

    Access a wealth of information and articles to help you master VergeOS

    [:octicons-arrow-right-24: Knowledge base](kb/)

-   :fontawesome-solid-code:{ .lg .middle } __API references__

    ---

    Find comprehensive API documentation and examples for developers

    [:octicons-arrow-right-24: References](#)

-   :fontawesome-solid-dumpster-fire:{ .lg .middle } __Get support__

    ---

     Reach out for technical support and assistance with VergeOS

    [:octicons-arrow-right-24: Connect with us](support/)


</div>


## Latest Release Notes
***
## 4.12.5 - May 2024

### Features / Fixes
* Added the Windows key to the virtual keyboard toggle on the VM console page
* Fixed an issue where deleting a virtual IP address was automatically applying firewall rules
* BGP now handles graceful restarts more efficiently
* If you create multiple virtual IPs at once and assign them to a tenant (or delete them), only a single refresh is sent
* Network diagnostic queries will now clean themselves up if they become stale
* Sped up generating the NAS recipe
* Fixed an issue where creating a user with an invalid display name would leave a reference to the user in the database
* Increased the VM console paste limit to 1024 characters
* VMware backups will now make a copy of VMX files
* Fixed a false-positive error that could be logged during a VM migration
* Added an advanced network option to enable 802.1ad (QinQ)
* Optimized the machines dashboard API query
* If a node went unresponsive, you were unable to send diagnostic queries to the node until it was rebooted
* Changing a cluster's Target max ram pct will now update the overall cluster RAM usage
* Changed the maximum password length from 64 to 256
* Fixed an issue where max vxlan fdb entries might not get set to 0

### OS
* Fixed an issue where removing a tier of storage would not complete the process until node1 was rebooted
* Added the ability to delete a vSAN drive while the node was online (CLI only)
* Fixed a rare scenario where repairs could be found on the vSAN under certain conditions with certain CPUs
* Added support for additional NIC vendors and devices
* Added missing NFT counter module for firewall tracking in the 5.10 kernel
* Fixed an issue where PXE booted nodes were using the 5.10 kernel
* Fixed an issue partitioning and discovering disks
* Changed the timeout while partitioning disks to accomodate for systems with slow drive discovery


!!! note

    Need more Help? Email [support@verge.io](mailto:support@verge.io) or call us at [(855) 855-8300](tel:855-855-8300)

<br>
[ Get Started with VergeOS](https://www.verge.io/test-drive){ .md-button .md-button--primary }


