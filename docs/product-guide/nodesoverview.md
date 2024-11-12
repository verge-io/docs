A node is an individual server running VergeOS. There are several types of nodes:

- **Controller Nodes:** Manage the User Interface, Networking, and vSAN functions.
- **Compute and Storage (HCI) Nodes:** Expands storage, compute, networking within the VergeOS System
- **Compute-Only Nodes:** Expand compute resources within the VergeOS System
- **Storage-Only Nodes:** Expand storage resources within the VergeOS System

Nodes share workload with each other when they are in the same Cluster, and share orchestration with other Nodes inside the System. 

There is 1 special type of Node called a **Tenant Node** that is only created virtually when creating tenants. This special node acts as a container and 'hypervisor' for the tenant. A tenant can have multiple nodes, just as in a physical data center, allowing redundancy of their virtual nodes across physical nodes.
  !!!note
    See [Creating Tenants](https://docs.verge.io/product-guide/createtenants) for more information on Tenant Node configuration.
