---
title: Glossary
description: Specific Terms Used by VergeIO
published: true
date: 2023-01-27T21:49:43.555Z
tags: auth, catalog, cluster, host, media, images, network, nested, multi tenancy, tenant, node, recipe, repository, scale out, scale up, snapshot, profile, tier, storage, subscription, sync, physical, core, dmz, external, internal, maintenance
editor: markdown
dateCreated: 2022-02-15T16:19:49.652Z
---

<details>
  
  <summary>Auth Source</summary>
  
  An auth source defines a user management authority (GitLab, Google, OpenID) for a VergeIO environment. This allows a single sign-on experience for users as credentials from the defined auth source can be appointed for users to login to a VergeIO envrironment.

  </details>
  <details>
  
  <summary>Breadcrumbs</summary>
  
  Breadcrumbs are links at the top of the screen that reflect the recent history of selected sections; these links provide quick access back to previous screens.
  </details>
  <details>
  
  <summary>Catalog</summary>
  
  A catalog is a group of related recipes. For example one catalog may contain many varied Windows vm recipes, while another catalog in the same repository could contain all Linux based vm recipes. Administrators can group recipes into catalogs in whatever way makes sense for their particular organization.
  
  </details>
  <details>
  
  <summary>Cluster</summary>
  
  A cluster is a group of nodes consisting of like hardware resources, used as a pool for storage, compute or HCI functions. A single VergeIO environment can contain different types of clusters to provide an array of performance/costing options. The resources of a single cluster can be divided up among multiple tenants and a single tenant can be given resources to multiple clusters within the same environment.
</details>
<details>
  
  <summary>Host</summary>
  Refers to the top-level Virtual Data Center (VDC), aka "root", which is created during the initial VergeIO install on physical hardware. The host has direct control over the hardware, whereas tenants/subtentants will have resources assigned to them, but no visibility into the underlying infrastructure.

  </details>
  <details>
  
  <summary>Media Images</summary>
  
  Media images are files uploaded to the VergeIO vSAN to make available inside the VergeIO environment. Common files uploaded are those used for installing new virtual machines (e.g. \*.iso) or importing Machines or drives from existing systems (e.g. \*.ova, \*.ovf, \*.raw, \*.qcow, \*.vmdk, etc).
  
  </details>
  <details>

  <summary>Nested Multi-Tenancy</summary>
  
  Nested Multi-Tenancy provides individual layers of secure tenancy. The host can allocate any portion of its physical resources to child tenants and those child tenants can then divide and apportion any of its resources down to its own child tenants.
  
  </details>
  <details>

  <summary>Network</summary>
  
  - #### Core
  	The core network is a highly available virtual network used to handle all inter-node communication. Every VergeIO environment has 1 core network, which is created automatically during installation on the host or at the point of tenant creation (for each tenant).
  - #### DMZ
	The dmz network is a virtual network used to connect all networks with each other. Every VergeIO environment has 1 dmz network, which is created automatically during installation on the host or at the point of tenant creation (for each tenant).
  - #### External
	An external network is a network that exists outside of the VergeIO environment. Any pre-existing network that will be interfaced with VergeIO (e.g. company LAN, direct WAN connections, wi-fi networks) is considered to be an external network. In a VergeIO system there is at least one external that is used to communicate to the UI and send traffic out of the environment.
  - #### Internal
	An internal network is a virtual network originated within VergeIO. Any number of internal networks can be created. An internal network is created default-secure; with built-in VergeIO networking functionality allowing for opening up access between internal networks and/or external networks as needed.
  - #### Maintenance
	A maintenance network is an external network that can be created to handle IPMI access to physical nodes and optional PXE boot.
  - #### Physical
	A physical network is a representation of each isolated layer 2 network. Physical networks are typically configured during install. The system automatically appends " Switch" to the end of the user-supplied name during install, for ex: for name "PXE", the system will give the physical network the name "PXE Switch".
  
  </details>
  <details>
      
  <summary>Node</summary>
  
  - #### Physical
	Physical nodes are actual hardware servers that host the base VergeIO environment
  - #### Tenant
	Tenant nodes are virtual servers that simulate physical nodes. Each tenant is assigned at least one tenant node with the ability to add more tenant nodes on the fly for scale and/or to accommodate clustering software.
  
  </details>
  <details>
  
<summary>Recipe</summary>
  
  - #### VM 
	Enables the ability to create a virtual machine using a set of predefined questions to automate a number of tasks that would normally be done manually.
  - #### Tenant
	Enables the ability to create entire tenants with specific workloads, network settings, and/or other custom configurations already created in them using a set of predefined questions.
  
  </details>
  <details>
  
  <summary>Repository</summary>
  
  A repository is a site collection of recipe catalogs. Typically, a tenant has access to a repository provided by its service provider. Each tenant can also create a local repository to store its own recipe catalogs. The VergeIO repository is also included by default on a VergeIO installation. The VergeIO repository includes the standard NAS Service VM and a "30 Day Trial POC" tenant.
  
  </details>
  <details>

  <summary>Scale Out</summary>
  
  Scale out is the process of adding net new additional resources to an environment. I.E, adding another storage or compute node would be considered a scale out process.
  
  </details>
  <details>
  
  <summary>Scale Up</summary>
  
  Scale up is the process of adding hardware into already existing nodes of an environment. I.E, adding more drives to a storage node or increasing RAM in a compute node would be considered a scale up process.
  
  </details>
  <details>
  
  <summary>Snapshot</summary>
  
  A snapshot captures the state of an entity at a particular point in time. Snapshots can be used to create a point-in-time capture of an entire environment, tenant, individual virtual machine, or a NAS volume. Snapshots allow "rolling back" a system, which can be helpful for recovery, development and testing purposes. 
  
  </details>
  <details>
  
  <summary>Snapshot Profile</summary>
  
  A snapshot profile defines a schedule for snapshot creation and cleanup.
  
  </details>
  <details>
  
  <summary>Storage Tier</summary>
  
  A storage tier is a pool of storage with equivalent underlying physical storage devices. Storage tiering is a feature built into the VergeIO vSAN allowing splitting data between different types of physical media based on requirements for performance, accessibility, capacity and cost. Storage tiering can dramatically reduce costs by taking better advantage of more expensive disk where it's most needed while using less expensive (e.g. spinning disk) for cold storage.
  
  </details>
  <details>
  
<summary>Subscriptions</summary>
  
  Subscriptions allow for monitoring a system (or components of a system) by defining system information to send to users via email.
  
  </details>
  <details>
  
  <summary>Subscription Profiles</summary>
  
  Subscription profiles define the aspects of a subscription (on demand/scheduled, trigger criteria/schedule). Many subscription profiles are pre-loaded by default with the VergeIO install. Custom subscription profiles can also be created with knowledge of the API.
  
  </details>
  <details>
  
  <summary>Sync</summary>
  The process of syncronizing blocks of data between two VergeIO environments to facilitate DR capabilities or archive backups.
  
  </details>
  <details>
  
  <summary>Tenant</summary>
  A tenant is a completely separate Virtual Data Center, running its own instance of VergeIO. Child tenants are apportioned from a parent VergeIO environment. The nested, multi-tenancy infrastructure allows each VergeIO environment to divide any portion of its resources to provide multiple, sub-divisions of resources. Each tenant is allocated its own storage, networking, and compute resources. Tenants are isolated from each other, with each being individually managed by its own UI. This provides the mechanism for service providers or IT departments to allocate and administer resources dynamically.
  
  </details>
  <details>
  <summary>Virtual Wire</summary>
  A virtual wire is the logical process of plugging a cable into a switch. Creating a virtual wire enables the ability to pass a layer 2 network into a tenant.

  </details>
  <br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>