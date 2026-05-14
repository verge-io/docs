---
title: "PXE Boot Setup Guide"
description: "Configure VergeOS to PXE boot nodes for installation or every-boot runtime. Covers External vNet setup, VLAN/DHCP requirements, and boot configuration."
semantic_keywords:
  - "VergeOS PXE boot setup"
  - "diskless compute node PXE"
  - "PXE install VergeOS nodes"
  - "ybos PXE option"
use_cases:
  - pxe_boot_node_installation
  - diskless_compute_node_deployment
  - mass_node_provisioning
tags:
  - installation
  - pxe
  - networking
  - diskless
---


# PXE Boot Setup Guide

**Audience:** System administrators and support engineers that want to implement a PXE network for installing VergeOS nodes from the network and/or deploying nodes without boot disks


## Overview

VergeOS has a built-in PXE boot service that allows optionally installing nodes from the network (replacing USB installers, remote BMC ISO mounting, etc.) and network boot of registered, diskless nodes.  These are two distinct scenarios:

| Scenario | Use case |
|----------|----------|
| **First-time install via PXE** | The VergeOS install is initiated from the network providing an alternative to USB installer, IPMI virtual media, etc. Node PXE-boots to the installer, you select Scale-Out / Compute / Storage, installer completes and node joins the cluster |
| **Every-boot PXE (diskless)** | Node has no local drives (or none configured as bootable). Every reboot pulls the running VergeOS image from the cluster over PXE. Common  |

Both use the same underlying service: the provider cluster runs dnsmasq on a designated vNet and serves the VergeOS boot image over the network.


##  Prerequisites

- An **operational VergeOS cluster** (at minimum, controller node up and reachable for pxe-installing, two controllers up and running for pxe node every-boot)
- **Dedicated PXE NIC (recommended)** — the PXE network should be on a separate NIC on each node, dedicated to PXE booting. Typically implemented as a maintenance network, isolated from production data paths so that PXE traffic doesn't compete with other network roles on the same interface
- **Switch configuration** allowing the target PXE NIC to reach the Verge PXE network. Using a dedicated, inexpensive, basic switch for this network to serve pxe and provide out-of-band maintenance is recommended. 
- **Native VLAN match** — the native/access VLAN on the target node's switch port (or vNIC, if applicable) **must match the VLAN of the Verge PXE network**. PXE boot broadcasts leave the NIC untagged, so they land on whatever VLAN the port treats as native. If the native VLAN doesn't match where Verge is serving PXE, the boot request never reaches Verge's dnsmasq and the node will get no PXE response.
- **BIOS/UEFI or boot policy** on the target node configured to boot from NIC/LAN
- **No competing DHCP** on the PXE segment (this is the #1 cause of silent PXE failures)


## Network Configuration

The PXE service runs on a VergeOS **External vNet** with DHCP enabled and a specific PXE option set.

1. **Networks → New External** (or edit an existing External vNet)
2. Configure basic network settings:  
    - **Name** — a descriptive name, such as "pxe-boot" or "pxe"
    - **Layer 2 Type** — set to *none*;* or *vLan* and **Layer 2 ID** — your VLAN ID (e.g. 50)
    - **Interface Network** — the physical network backing this vNet 
    - **IP Address Type** — *Static*
    - **IP Address** — the router IP for this network e.g. 10.50.5.10
    - **Network Address** — CIDR, e.g. 10.50.5.0/24
3. Enable DHCP (VergeOS's dnsmasq will be the authoritative DHCP for this segment)
    - Check the **DHCP** option
    - Set **DHCP Start Address** and **DHCP Stop Address** for the address pool
    - Check the **Dynamic DHCP** option
    - **Gateway setting** — leave the DHCP **Gateway** field blank (VergeOS defaults it to the vNet's own router IP. Do NOT set it to an upstream/off-segment gateway — that makes PXE clients try to route their TFTP/HTTP fetches off-network, and installs a default route that can conflict with the production networks the node will use after install
4. Set the **PXE Boot** option to ***ybos***
5. Power on the vNet
    - **Submit** the form
    - On the resulting dashboard, click **Power On**
    - Verify the network status is *Running*



## First-time node install via PXE

1. Target node boots → PXE menu appears showing `Verge.io OS PXE`
2. Auto-boot countdown starts (default 1 second — press any key to interrupt)
3. Installer loads
4. Select install type:
   - **Scale-Out** — node contributes both compute and vSAN storage
   - **Compute** — compute only, no local storage in vSAN
   - **Storage** — vSAN storage only
5. Follow the installer prompts (cluster selection, NIC identification, disk selection, etc.) — same flow as USB installer
6. Node reboots, joins cluster


## Every-boot PXE (diskless nodes)

Use case: compute nodes with no local disks, or nodes that should always pull a fresh OS image from the cluster.

### Boot Flow
1. Node powers on → boot policy → LAN Boot
2. NIC sends DHCP on the pxe network
3. Verge's dnsmasq responds with IP + 'next-server` + boot filename
4. Node downloads the VergeOS boot image from Verge
5. VergeOS loads into RAM, node rejoins the cluster
6. Reboot → repeat from step 1

No per-node customization. Scale identically across N nodes with the same configuration.

See KB article: [Configuring a Node for Diskless PXE Boot (PXE every-boot)](/knowledge-base/pxe-every-boot-node-config) for step-by-step instructions. 


## Considerations

- **PXE server must be up for the node to boot** — if the Verge cluster is down during a node reboot, the node hangs waiting for PXE response. Healthy cluster = never a problem, but worth noting for DR scenarios
- **Boot policy retry behavior** — check the platform's "reboot on boot failure" settings to avoid stuck-in-loop scenarios
- **No per-node image management** — when the cluster is updated on the provider side, nodes pick up the new VergeOS version at their next reboot. You don't maintain separate OS images per node

---

### Changing a node's NIC configuration (caution)

!!! warning 
    **Changing the NIC or interface used by a PXE-booting node can break its ability to boot.** Proceed carefully, especially for every-boot PXE (diskless) nodes that depend on PXE for every startup.

The PXE boot path is tied to a specific NIC and interface:
- **Node identity is tied to the MAC address of the NIC used during install** — this MAC must remain constant for the life of the node. If it changes, the cluster sees the node as new/unknown and it will not rejoin automatically
- Managed boot policies (where applicable) reference a specific vNIC by name
- BIOS/UEFI boot order points at a specific physical NIC
- The switch port (or vNIC, where applicable) carries a specific native VLAN matching the PXE network

Any change to that chain can prevent PXE from working on the next reboot.

#### What to watch out for

- **Replacing the physical NIC** — new hardware = new MAC. VergeOS may not recognize the node, and any MAC-based DHCP reservations will no longer match
- **Swapping which vNIC is used for LAN Boot** — the new vNIC needs the correct native VLAN (or Boot VLAN set in the boot policy) to reach the Verge PXE network
- **Rebuilding a managed service profile** — unless MACs are preserved (via a MAC pool or explicit assignment), the node will get a new MAC and Verge will see it as a new node
- **Moving the cable to a different switch port** — the new port must carry the same native VLAN as the PXE network
- **Changing bond configuration or NIC teaming** — PXE boots before the OS forms the bond, so it uses a single physical NIC; make sure that NIC is still on the PXE VLAN

#### Before making the change

1. Note the current MAC address and which NIC/vNIC is used for boot
2. If possible, have console/IPMI access during the first reboot after the change — in case PXE fails and you need to intervene
3. If the node is part of a running cluster, consider putting it in maintenance / draining VMs first so you can take your time troubleshooting if needed
4. For every-boot PXE nodes: verify after the change that the node successfully PXE-boots once before declaring the change complete

####  If the node fails to boot after a NIC change

Start by verifying the basics:

- Check console output for PXE error codes
- Verify the new NIC/vNIC is on the correct VLAN (native VLAN on the vNIC, or access VLAN on the switch)
- If using a managed boot policy, verify it still references a valid vNIC

If the hardware side looks correct but the cluster still references the old MAC, you have two ways to update VergeOS's view of the node:

**Option 1 — Refresh Drives and NICs (node is running / bootable):**
On the node's dashboard in the provider UI, run the **Refresh → Drives and NICs** action. The cluster re-detects the current hardware and picks up the new MAC automatically.

**Option 2 — Manually edit the NIC's MAC (node is down, same NIC slot, new MAC):**
Useful when the NIC hardware / slot hasn't changed but the MAC did — for example, a vNIC rebuild or service profile change on a managed platform. With the node offline:  

- Navigate to the node's dashboard → NICs  
- Edit the NIC entry corresponding to the PXE network  
- Update the stored MAC to match the new one  
- **Reboot the PXE network** (power-cycle the External vNet) so dnsmasq picks up the new MAC-to-config mapping  
- The node should boot correctly on the next attempt  

If neither option resolves it, contact support.

---

## Troubleshooting

### Common things to verify

Work through this list first when PXE isn't behaving. Most failures trace back to one of these:

- **Did the node get a DHCP lease?** Watch the boot console — it should show "DHCP..." followed by an IP. If no IP, the DHCP phase itself is failing.
- **Is the IP in the expected subnet?** If the node gets a lease but the IP isn't from the pool you configured on the Verge External vNet, a different DHCP server answered. A rogue/corporate DHCP on the same L2 will usually win the race.
- **No competing DHCP server on the segment?** This is the #1 cause of silent PXE failures. Verge's dnsmasq must be the only DHCP on the VLAN. 
- **PXE option set to *ybos*** on the External vNet? Without this, Verge answers DHCP but doesn't hand out the PXE boot filename.
- **DHCP enabled on the vNet** (not just configured)? The checkbox must be checked and the network powered on.
- **Gateway on the DHCP scope is sensible?** Blank or the vNet's own router IP is fine; an upstream/off-segment gateway will make PXE clients try to route off-network. 
- **Native VLAN match?** The switch port (or vNIC) carrying the node's PXE NIC must have the Verge PXE VLAN as its native/access VLAN. PXE broadcasts are untagged. 
- **Correct NIC configured for PXE?** BIOS/UEFI boot order (or the boot policy on managed platforms) must point at the NIC actually cabled to the PXE network.
- **Physical connectivity?** Link lights on both ends, cable seated, switch port not administratively down or error-disabled.
- **External vNet status is "Running"** If the vNet is stopped/initializing, dnsmasq isn't answering.
- **VergeOS cluster is healthy?** A cluster that's degraded or with controllers down may not be serving PXE properly. Check the main dashboard.
- **MAC registration (for nodes previously joined)?** If a NIC was swapped or a Service Profile rebuilt, the new MAC may not be recognized. See *Changing a node's NIC configuration* above. 
- **Try forcing the correct NIC via the BIOS boot manager.** If the persistent boot order isn't picking the right NIC, use the server's one-time boot manager (typically F11/F12 at POST, or a one-time boot override in the BMC / management controller) to explicitly select the PXE NIC. This isolates whether the issue is boot-order selection vs. something downstream like DHCP or PXE serving.

### Specific error codes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Node gets DHCP lease, no PXE menu | Competing DHCP on segment, OR PXE option not set to `ybos` | Verify only Verge DHCP is on the VLAN; verify the vNet's PXE option |
| `PXE-E53: No boot filename received` | PXE option missing or DHCP not enabled on the vNet | Enable DHCP; set PXE option to `ybos` |
| `PXE-E32: TFTP open timeout` | Firewall or VLAN isolation between node and Verge | Check L2 path from node to the Verge vNet |
| Boot loops | BIOS/boot order issue — node booting from empty local disk | Fix boot order, or remove Local Disk from the boot policy |
| Node hangs at "PXE-MOF: Exiting..." | Usually a boot order issue — PXE succeeded but machine tried to fall through to another boot device that isn't bootable | Set PXE as the only boot option, or ensure local disk is actually bootable post-install |
| Node gets IP but from the wrong subnet | Rogue/competing DHCP server answered first | Isolate the PXE VLAN; disable other DHCP on the segment |
| No DHCP lease at all | Native VLAN mismatch, cable issue, NIC not configured for PXE/LAN Boot | Verify switch port native VLAN matches Verge PXE VLAN; check physical link; enable PXE/network boot on the NIC |
| After a diskless install completes, the node only PXE-boots back into the installer (not the running OS) | PXE server's state hasn't refreshed post-install — it's still serving the install image for that node | Reboot the PXE network (power-cycle the External vNet) and apply rules. On next boot, the node should get the running OS image |

---

## Related Resources

- [Configuring a Node for Diskless PXE Boot (PXE every-boot)](/knowledge-base/pxe-every-boot-node-config/)
- [Connect VergeOS to an Existing LAN/WAN](https://docs.verge.io/product-guide/networks/connect-lan-wan/)
- [Installation Guide](https://docs.verge.io/implementation-guide/installation-guide/)
- [Scale-out Node Installation Guide](https://docs.verge.io/implementation-guide/scale-out-nodes/)
