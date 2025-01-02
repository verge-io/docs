# VergeOS Guest OS Compatibility

VergeOS is compatible with x86-64 guest operating systems and therefore successfully works with most: Windows versions, Linux distributions, and various versions of FreeBSD.  

!!! info "**Only Common Versions Listed**"
    The following are not comprehensive lists of all compatible OS versions, but rather provide examples of the more commonly-used guest operating systems.  Typically, any x86-64-compatible operating system will readily work on VergeOS, without issue. If you are interested in running an OS version that is not specifically listed here, feel free to [reach out to us](/support) for assistance.

| **Microsoft Windows Commonly-Used Guest Versions** ||
|------------------------|-----------------------------|
| Windows 10 | Windows Server 2008 |
| Windows 11 | Windows Server 2012 |
| Windows 7 | Windows Server 2016 |
| Windows 8 | Windows Server 2019 |
| Windows Server 2003 | Windows Server 2022 |

!!! note "Additional VirtIO drivers may need to be installed for optimal performance"

---

| **Linux Commonly-Used Distributions** ||
|------------------------|----------------|
| AlmaLinux 8 | RancherOS v1.5 |
| AlmaLinux 9 | Red Hat Enterprise Linux 7 |
| CentOS 7 | Red Hat Enterprise Linux 8 |
| CentOS 8 | Red Hat Enterprise Linux 9 |
| CentOS Stream 8| RockyLinux 8 |
| CentOS Stream | RockyLinux 9 |
| Debian 10 | SUSE Linux Enterprise 11 |
| Debian 11 | SUSE Linux Enterprise 12 |
| Debian 11.5 | SUSE Linux Enterprise 15 |
| Debian 12 | Ubuntu 12.04 |
| Debian 8 | Ubuntu 14.04 |
| Debian 9 | Ubuntu 16.04 |
| Fedora CoreOS 32 | Ubuntu 18.04 |
| Oracle Linux 6 | Ubuntu 19.04 |
| Oracle Linux 7 | Ubuntu 20.04 |
| Oracle Linux 8 | Ubuntu 22.04 |
| Oracle Linux 9 | Ubuntu 24.04 |

---

| **FreeBSD Commonly-Used Versions** ||
|------------------------|-----------------|
| FreeBSD 9 |  FreeBSD 12 |
| FreeBSD 10 | FreeBSD 13 |
| FreeBSD 11 ||

---

!!! note "Additional Considerations"
    - Only 64-bit OS versions are officially supported. However, 32-bit versions may run using a PAE kernel.
    - Older operating systems may require use of the SATA/IDE disk interface (when VirtIO is not supported).
    - Operating systems with unique hardware compatibility requirements may also need specialized node hardware. Consult the operating system's documentation for guidance.  
