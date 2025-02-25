---
slug: determine-node-where-vm-runs
description: VM options that control where a VM will run (which node)
draft: false
date: 2025-02-16T22:25:43.163Z
tags:
  - virtual machine
  - vms
  - node affinity
  - VM-host affinity
  - VM-host anti-affinity
  - host separation
  - node separation
  - clusters
categories:
  - Virtual Machines
  - Automation
  - Clusters
editor: markdown
dateCreated: 2024-06-24T13:49:31.305Z
---

# Settings that Influence VM Node Selection

Each time a VM is powered on or migrated, the system decides where to run the VM based on user-specified VM options as well as balancing workloads across available nodes.  

**VM options used in deciding node selection for running a VM:**

* **HA Group**

    * **Node Affinity:** (value starts with a "+", e.g. "+commapp") The system attempts to run VMs with the same HA Group value on the same node. This is used to coalesce application-related workloads to a single physical node for performance optimization.
    * **Node Anti-affinity:** (value does NOT with "+", e.g. "webservers") VMs with the same HA Group value are run on separate nodes to provide high availability of applications or services.  

* **Preferred Node:** a specific node is selected as the first-choice
* **Preferred Cluster:** nodes in specified cluster used as first choice
* **Failover Cluster:** nodes in specified cluster used as next choice when preferred cluster is not available

!!! info "For more information about these and other VM options, see: [Product Guide - Virtual Machine Fields](/product-guide/virtual-machines/vm-field-descriptions)"
