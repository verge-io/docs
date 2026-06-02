---
title: "Leostream Integration with VergeOS"
description: "Leostream Connection Broker integrates with VergeOS to deliver multi-protocol VDI and remote desktop access for compliant, mixed-platform, and GPU-accelerated workloads."
semantic_keywords:
  - "Leostream Connection Broker VergeOS integration"
  - "VDI broker multi-protocol remote desktop"
  - "compliant virtual desktop infrastructure HIPAA CUI"
  - "Leostream recipe provisioning VergeOS VMs"
  - "vendor-neutral connection broker mixed hypervisor"
use_cases:
  - virtual_desktop_deployment
  - compliant_vdi_workloads
  - multi_protocol_remote_desktop_brokering
  - mixed_hypervisor_vdi_brokering
  - gpu_accelerated_vdi
tags:
  - leostream
  - vdi
  - virtual-desktop
  - remote-access
  - broker
  - compliance
  - integrations
categories:
  - Automation
---

# Leostream Integration with VergeOS

## Overview

Leostream is a vendor-neutral connection broker for remote desktop and VDI environments. VergeOS works with Leostream as a supported desktop source, allowing the Leostream Connection Broker to provision, assign, and broker VergeOS-hosted virtual desktops from a single console, alongside any other platform Leostream supports, including physical workstations, public cloud, and other hypervisors.

The integration is the result of a [strategic partnership](https://www.verge.io/press-release/leostream-integrates-with-verge-io-for-highly-compliant-remote-desktops/){target="_blank"} announced in May 2022 and is positioned for organizations running compliant workloads (HIPAA, CUI) and for those consolidating mixed VDI estates onto a single broker.

## Key Capabilities

- **Multi-protocol display**: Leostream brokers connections using HP Anyware (PCoIP), Microsoft RDP, NoMachine, VNC, SSH, and other supported protocols. The choice of display protocol is independent of the VergeOS layer beneath it.
- **Mixed-platform brokering**: A single Leostream environment can broker desktops on VergeOS, other hypervisors, bare-metal workstations, and public cloud. VergeOS desktops sit in the same pools and policies as any other resource.
- **Recipe-based provisioning with payload**: From Leostream 2023.2 onward, the Connection Broker can provision VergeOS desktops from a VergeOS recipe with a payload specification, allowing per-desktop customization at create time.
- **Authentication, session oversight, and audit**: Leostream provides user authentication, role-based desktop assignment, session control, and logging suitable for HIPAA, CUI, and other regulated environments. VergeOS provides the underlying isolated tenancy.

## Architecture

A Leostream + VergeOS deployment uses Leostream's standard components, all hosted as VMs on VergeOS:

- **Leostream Connection Broker**: orchestrates desktop assignment, provisioning, and policy enforcement. Runs as a VM on VergeOS.
- **Leostream Gateway**: tunnels remote display traffic from external endpoints to internal desktops. Typically deployed as a VM on VergeOS in a DMZ network.
- **Leostream Agent**: installed inside guest desktops for session control, idle detection, and protocol negotiation. Required for some scenarios, optional for protocol-only brokering.
- **Leostream Connect client**: endpoint software on the user's device.
- **VergeOS**: hosts the broker, gateway, and desktop VMs, and exposes the REST API the Connection Broker uses to manage desktop lifecycle.

## Use Cases

- **Compliant remote access**: HIPAA, CUI, or other regulated workloads where session oversight, audit trails, and tenant isolation are required.
- **Mixed VDI estates**: brokering desktops across VergeOS, cloud, and physical hardware from one Connection Broker.
- **GPU-accelerated VDI**: VergeOS supports NVIDIA vGPU and MIG for guest desktops, see [NVIDIA GPU Virtualization](nvidia-gpu-virtualization.md). Leostream brokers GPU-attached desktops the same way as standard desktops.

## Configuration

Configuration is performed in the Leostream Connection Broker. VergeOS is registered as a desktop source, pools are defined against VergeOS recipes or existing VMs, and policies determine assignment and session behavior. Step-by-step setup is maintained by Leostream and may change between Connection Broker releases, see the [Leostream Platform Quick Starts and Guides](https://support.leostream.com/support/solutions/articles/66000513448-leostream-platform-quick-starts-and-guides){target="_blank"} for the current procedure.

The Connection Broker authenticates against VergeOS with a VergeOS username and password. Create a dedicated VergeOS user for the broker, scoped to the tenant or system where broker-managed VMs will live, and use those credentials when registering VergeOS in Leostream.

## Documentation and Resources

| Resource | Description |
|----------|-------------|
| [Leostream Platform Quick Starts and Guides](https://support.leostream.com/support/solutions/articles/66000513448-leostream-platform-quick-starts-and-guides){target="_blank"} | Connection Broker setup, hypervisor registration, Pools, Policies |
| [Leostream + VergeIO partner page](https://leostream.com/leostream-vergeio/){target="_blank"} | Joint solution overview |
| [Verge.io press release](https://www.verge.io/press-release/leostream-integrates-with-verge-io-for-highly-compliant-remote-desktops/){target="_blank"} | Partnership announcement (May 2022) |
| [NVIDIA GPU Virtualization](nvidia-gpu-virtualization.md) | vGPU and MIG options for VergeOS desktops |

## Support

- [Leostream Support](https://support.leostream.com/){target="_blank"}: Connection Broker, Gateway, and Agent issues
- [VergeOS Support](/support): VergeOS infrastructure issues
