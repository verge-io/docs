---
title: "PXE Boot Setup Guide"
description: "Configure VergeOS to PXE boot nodes for installation or every-boot runtime — no USB installer required. Covers External vNet setup, VLAN/DHCP requirements, and boot configuration for virtualized-NIC platforms."
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

# PXE Boot Guide for VergeOS Nodes

**Status:** DRAFT — working version
**Audience:** System administrators and support engineers deploying VergeOS nodes without creating USB installers or having boot disks
**Covers:** First-time PXE installs AND every-boot PXE for diskless compute nodes

> TODO flags throughout mark places that need verification against real config or screenshots.

---

## 1. Overview

VergeOS has a built-in PXE boot service that lets you install and/or run nodes without creating USB installers. Two distinct scenarios:

| Scenario | Use case |
|----------|----------|
| **First-time install via PXE** | Alternative to USB installer. Node PXE-boots to the installer, you select Scale-Out / Compute / Storage, installer completes and node joins the cluster |
| **Every-boot PXE (diskless)** | Node has no local drives (or none configured as bootable). Every reboot pulls the running VergeOS image from the cluster over PXE. Common pattern for diskless compute blades |

Both use the same underlying service: the provider cluster runs dnsmasq on a designated vNet, serves the iPXE loader over TFTP, and the full VergeOS image over HTTP.

---

## 2. Prerequisites

- An **operational VergeOS cluster** (at minimum, controller node up and reachable)
- An **External network** in VergeOS that will carry the PXE install traffic
- **Switch configuration** allowing the target PXE NIC to reach the Verge PXE network
- **Native VLAN match** — the native/access VLAN on the target node's switch port (or vNIC, if applicable) **must match the VLAN of the Verge PXE network**. PXE boot broadcasts leave the NIC untagged, so they land on whatever VLAN the port treats as native. If the native VLAN doesn't match where Verge is serving PXE, the boot request never reaches Verge's dnsmasq and the node will get no PXE response.
- **BIOS/UEFI or boot policy** on the target node configured to boot from NIC/LAN
- **No competing DHCP** on the PXE segment (see §4 below — this is the #1 cause of silent PXE failures)

---

## 3. Configure VergeOS to serve PXE

The PXE service runs on a VergeOS **External vNet** with DHCP enabled and a specific PXE option set.

### 3.1 Create or pick the External vNet

1. **Networks → New External** (or edit an existing External vNet)
2. Configure basic network settings:
   - **Name** — something like `pxe-install` or `install-vlan-505`
   - **Layer 2 Type** — `vLan` (typically)
   - **Layer 2 ID** — your VLAN ID (e.g. `505`)
   - **Interface Network** — the physical network backing this vNet (typically `External Bond 1`)
   - **IP Address Type** — `Static`
   - **IP Address** — the router IP for this network (clients will use this as gateway), e.g. `10.50.5.10`
   - **Network Address** — CIDR, e.g. `10.50.5.0/24`

### 3.2 Enable DHCP

- Check the **DHCP** option
- Set **DHCP Start Address** and **DHCP Stop Address** for the install pool
- VergeOS's dnsmasq will be the authoritative DHCP for this segment
- **Do NOT set a client Gateway** on this DHCP scope — leave the **Gateway** field blank. The PXE network should be a flat, self-contained install segment. Handing out a gateway causes PXE clients to try routing their TFTP/HTTP fetches off-network, and installs a default route that can conflict with the production networks the node will use after install

### 3.3 Set the PXE option to `ybos`

TODO: confirm exact UI location of the PXE option (is it on the External vNet form itself, or on an advanced settings tab?). The value must be the literal string `ybos` — this is what tells Verge to serve the VergeOS installer/runtime over PXE.

### 3.4 Power on the vNet

- **Submit** the form
- On the resulting dashboard, click **Power On**
- Verify the network status is `Running`

---

## 4. Network considerations (critical)

### 4.1 No competing DHCP on the segment

**This is the #1 cause of silent PXE failures.** If any other DHCP server is reachable on the VLAN where Verge is serving PXE (corporate DHCP, router DHCP, another hypervisor's DHCP), the two servers race. Whichever answers first wins. If the competing server wins, the node gets an IP but no `next-server` / `filename` PXE options — it boots but never finds the installer.

Symptoms of a competing DHCP:
- Node gets an IP lease but no PXE boot menu appears
- `PXE-E53: No boot filename received`
- Boot hangs at "Searching for boot server..."

Recommended pattern: **dedicated install VLAN**, isolated at L2 from any other DHCP source.

### 4.2 VLAN planning

Pick a VLAN that:
- Is trunked from your switch fabric to the physical nodes (or upstream fabric interconnects / blade chassis if applicable)
- Has Verge as the only DHCP source
- Is reachable from the Verge cluster's External network

### 4.3 Redundant switch ports

TODO: recommendations for bonded/redundant NICs on the install VLAN vs single-path.

---

## 5. Configure the node to PXE boot

### 5.1 Generic BIOS/UEFI

1. Enter BIOS/UEFI setup
2. Set **Boot Order** so the PXE NIC is first (or only)
3. Ensure **PXE / Network Boot** is enabled on the NIC
4. Save and reboot

### 5.2 Managed / virtualized NIC platforms (if applicable)

Some hardware platforms (blade chassis, converged infrastructure, virtualized environments) present NICs as **vNICs** configured through a management layer rather than per-blade BIOS. In these cases, the configuration lives in a service profile and boot policy, not in per-node BIOS.

**Boot policy:**
- Add a **LAN Boot** entry
- Set it as the primary (or only) boot entry
- For diskless nodes that need to PXE every boot: do NOT add a Local Disk entry, OR leave it lower priority with no bootable content

**vNIC / VLAN for PXE** — two options:

1. **Native VLAN on the vNIC** — edit the boot vNIC in its service profile, add VLAN 505 to the allowed list, and mark 505 as the native VLAN. Untagged PXE broadcasts hit VLAN 505.
2. **Boot VLAN on the LAN Boot entry** — set the VLAN explicitly in the boot policy's LAN Boot configuration. The platform tags the PXE boot request regardless of the vNIC's native VLAN.

Use option 1 if the node is dedicated to this network. Use option 2 if the node will run production on a different native VLAN post-install.

### 5.3 Other vendors

TODO: Dell iDRAC / HPE iLO / Supermicro BMC notes.

---

## 6. First-time install via PXE

(Alternative to USB installer)

1. Target node boots → PXE menu appears showing `Verge.io OS PXE`
2. Auto-boot countdown starts (default 1 second — press any key to interrupt)
3. Installer loads
4. Select install type:
   - **Scale-Out** — node contributes both compute and vSAN storage
   - **Compute** — compute only, no local storage in vSAN
   - **Storage** — vSAN storage only
5. Follow the installer prompts (cluster selection, NIC identification, disk selection, etc.) — same flow as USB installer
6. Node reboots, joins cluster

---

## 7. Every-boot PXE (diskless nodes)

Use case: compute nodes with no local disks, or nodes that should always pull a fresh OS image from the cluster.

### 7.1 Boot flow

1. Node powers on → boot policy → LAN Boot
2. NIC sends DHCP on the install VLAN
3. Verge's dnsmasq responds with IP + `next-server` + boot filename
4. Node TFTPs the iPXE loader from Verge
5. iPXE pulls the full VergeOS image over HTTP
6. VergeOS loads into RAM, node rejoins the cluster
7. Reboot → repeat from step 1

No local storage, no per-node customization. Scale identically across N nodes with the same boot policy / service profile.

### 7.2 Considerations

- **PXE server must be up for the node to boot** — if the Verge cluster is down during a node reboot, the node hangs waiting for PXE response. Healthy cluster = never a problem, but worth noting for DR scenarios
- **Boot policy retry behavior** — check the platform's "reboot on boot failure" settings to avoid stuck-in-loop scenarios
- **All nodes share the same image** — what the provider serves, all nodes boot. Updates to the provider propagate to all nodes at their next reboot

---

## 8. Changing a node's NIC configuration (caution)

> ⚠️ **Changing the NIC or interface used by a PXE-booting node can break its ability to boot.** Proceed carefully, especially for every-boot PXE (diskless) nodes that depend on PXE for every startup.

The PXE boot path is tied to a specific NIC and interface:
- VergeOS identifies and registers nodes by MAC address
- Managed boot policies (where applicable) reference a specific vNIC by name
- BIOS/UEFI boot order points at a specific physical NIC
- The switch port (or vNIC, where applicable) carries a specific native VLAN matching the PXE network

Any change to that chain can prevent PXE from working on the next reboot.

### What to watch out for

- **Replacing the physical NIC** — new hardware = new MAC. VergeOS may not recognize the node, and any MAC-based DHCP reservations will no longer match
- **Swapping which vNIC is used for LAN Boot** — the new vNIC needs the correct native VLAN (or Boot VLAN set in the boot policy) to reach the Verge PXE network
- **Rebuilding a managed service profile** — unless MACs are preserved (via a MAC pool or explicit assignment), the node will get a new MAC and Verge will see it as a new node
- **Moving the cable to a different switch port** — the new port must carry the same native VLAN as the PXE network
- **Changing bond configuration or NIC teaming** — PXE boots before the OS forms the bond, so it uses a single physical NIC; make sure that NIC is still on the PXE VLAN

### Before making the change

1. Note the current MAC address and which NIC/vNIC is used for boot
2. If possible, have console/IPMI access during the first reboot after the change — in case PXE fails and you need to intervene
3. If the node is part of a running cluster, consider putting it in maintenance / draining VMs first so you can take your time troubleshooting if needed
4. For every-boot PXE nodes: verify after the change that the node successfully PXE-boots once before declaring the change complete

### If the node fails to boot after a NIC change

- Check console output for PXE error codes
- Verify the new NIC/vNIC is on the correct VLAN (native VLAN on the vNIC, or access VLAN on the switch)
- Check VergeOS infrastructure → Nodes for the new MAC; if it's not registered, the node may need to be re-added
- If using a managed boot policy, verify it still references a valid vNIC

---

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Node gets DHCP lease, no PXE menu | Competing DHCP on segment, OR PXE option not set to `ybos` | Verify only Verge DHCP is on the VLAN; verify the vNet's PXE option |
| `PXE-E53: No boot filename received` | PXE option missing or DHCP not enabled on the vNet | Enable DHCP; set PXE option to `ybos` |
| `PXE-E32: TFTP open timeout` | Firewall or VLAN isolation between node and Verge | Check L2 path from node to the Verge vNet |
| Boot loops | BIOS/boot order issue — node booting from empty local disk | Fix boot order, or remove Local Disk from the boot policy |
| Node hangs at "PXE-MOF: Exiting..." | Usually a boot order issue — PXE succeeded but machine tried to fall through to another boot device that isn't bootable | Set PXE as the only boot option, or ensure local disk is actually bootable post-install |

---

## 10. Related

- [Connect VergeOS to an Existing LAN/WAN](https://docs.verge.io/product-guide/networks/connect-lan-wan/)
- [Installation Guide](https://docs.verge.io/implementation-guide/installation-guide/)
- [Scale-out Node Installation Guide](https://docs.verge.io/implementation-guide/scale-out-nodes/)
- Docs issue for this guide: [verge-io/docs#435](https://github.com/verge-io/docs/issues/435)

---

## Open questions / TODOs

- [ ] Verify exact UI location and label for the PXE option (is it literally "PXE" dropdown with `ybos` as a choice? Text field? Advanced setting?)
- [ ] Screenshots for each major step (PXE vNet form, boot policy config, the `Verge.io OS PXE` boot menu)
- [ ] iPXE config boot — 4.12.6 release notes mentioned support for "iPXE config boot"; figure out what this means and when/why you'd use it
- [ ] Recommended minimum VergeOS version for PXE install of new nodes (any version caveats?)
- [ ] Document the actual packets on the wire for someone troubleshooting (what DHCP options Verge sets, what the iPXE script looks like)
- [ ] Add Dell iDRAC / HPE iLO / Supermicro BMC boot-order notes to §5.3
- [ ] Redundant NIC recommendations for the install VLAN in §4.3
