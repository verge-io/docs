# VergeOS Homelab Reference Architecture

## Overview
VergeOS is an ideal solution for homelab enthusiasts, providing a robust and flexible virtualization platform. This reference architecture covers three configurations suitable for various homelab setups: a single-node VM host, a two-node cluster, and a production-grade homelab cluster with multi-tiered storage.

### Hardware Recommendations
Homelab users have a variety of options for VergeOS hardware. Many opt for older-generation enterprise servers (e.g., Dell, HP, Supermicro) due to their reliability and expandability.

Compact devices like Intel NUCs or similar mini PCs are also popular choices, particularly those offering dual 2.5GbE networking, NVMe slots, and 2.5” SSD bays.

**Key Considerations:**

- **RAID Configuration:** VergeOS requires direct access to disks, so if using a RAID controller, ensure it supports JBOD/IT mode or use an HBA instead.
- **IPMI Requirements:** While VergeOS recommends IPMI, homelab setups can often skip this. However, some NVIDIA GPUs or GPU passthrough setups may disable console access, so IPMI can be beneficial for managing these configurations.

---

## Scenarios

### 1. Single-Node VM Host

A straightforward configuration ideal for test environments, a single-node VM host is suited for users exploring VergeOS features, experimenting with VMs, and developing new recipes.

!!! note "Storage Consideration"
    VergeOS's vSAN is configured as N+1, providing redundancy. This setup reduces available storage to 50% of raw capacity, so storage requirements should be planned accordingly.

**Network Configuration:**  

Since this setup does not involve additional VergeOS nodes, use the same network for both core and external communication to simplify configuration.

**Use Cases:**

- Hosting test VMs
- Testing VergeOS recipes and configurations
- General homelab experimentation

---

### 2. Two-Node Cluster

This configuration adds redundancy by introducing a second server, ensuring service continuity during reboots and upgrades.

!!! warning "Network Requirements"
    Two network interfaces per server are required, with a core network speed of at least 2.5Gbps for optimal performance. Although 1Gbps is feasible, it may limit vSAN performance.

**Use Cases:**

- Running VM environments with increased uptime
- Development and testing in a clustered environment
- Enhanced storage and network redundancy

---

### 3. Home Production Cluster

A production-grade two-node cluster suitable for advanced homelab users, this configuration not only enhances storage capabilities with multiple storage tiers but also enables robust network management, NAS deployment, and GPU support for home and homelab environments.

This setup allows VergeOS to serve as a powerful central hub, managing network traffic, NAS services, GPU resources, and providing secure, streamlined access across the network.

**Storage Tiers:**

- **Tier 1 (NVMe):** Fast storage for VM workloads requiring high I/O performance.
- **Tier 3 (SSD):** Mid-speed storage for NAS use, high-demand data, or shared VM storage.
- **Tier 5 (HDD):** High-capacity storage for NAS and backup server VMs.

**Network and VLAN Configuration:**  

Utilize VergeOS as the main router and network manager for your lab and home LAN. This setup requires a VLAN-capable switch where you can assign your ISP network a VLAN (e.g., VLAN 50) and configure your LAN as the default VLAN or as additional VLANs as needed.


   - **External WAN:** Connects to the ISP, assigned as a VLAN.
   - **External (LAN):** Serves as the homelab and personal network, allowing devices within the home network to access resources within the VergeOS environment.

!!! tip "Installation Note"
    During installation, use your **LAN** network as the initial external network. Once installation is complete, add the WAN network for internet connectivity. For detailed instructions, refer to the [Knowledge Base article on creating an external network](https://docs.verge.io/knowledge-base/create-external-network/).


**NAS Service:**  

To set up a robust NAS for your home environment, VergeOS offers a built-in NAS service, perfect for managing shared storage with high capacity and redundancy.

For step-by-step instructions on configuring and deploying the NAS service, see the [NAS Service Product Guide](/product-guide/nas/nas-service). Additional configuration options and troubleshooting steps are covered in the [Knowledge Base](https://docs.verge.io/knowledge-base/category/nas/#troubleshooting-nas-cifs-shares).

**GPU Support:**  

For users who need enhanced graphics capabilities, VergeOS supports both GPU Passthrough and NVIDIA vGPU. These options allow virtual machines to utilize either dedicated or shared GPU resources:

   - **GPU Passthrough:** Provides a direct GPU connection to a VM for high-performance applications. See the [PCI Passthrough Product Guide](/product-guide/system/generic-pci-passthrough).
   - **NVIDIA vGPU:** Allows shared GPU access for multiple VMs, enabling efficient use of GPU resources for less-intensive tasks. Refer to the [NVIDIA vGPU Product Guide](/product-guide/system/nvidia-vgpu).

**Use Cases:**

- Hosting multi-tiered VM environments
- **Redundant, high-capacity NAS setup** for centralized, reliable file storage
- Serving as a home network router and firewall, providing security and centralized management for all connected devices
- High-performance VM applications with dedicated GPU resources or shared vGPU for scalable graphics processing

---

## Useful Links

- [VM Recipes](/product-guide/automation/vm-recipes)
- [System Snapshots](/product-guide/backup-dr/system-snapshots)
- [vSAN Preferred Tiers](/product-guide/storage/preferred-tiers)
- [VPN](/product-guide/vpn/vpn-overview)
- [Network Overview](/product-guide/networks/network-overview)
- [Licensing](/product-guide/system/licensing-and-updates)

Each of these configurations is adaptable to specific homelab needs, allowing flexibility based on available hardware and individual use cases.
