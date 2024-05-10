# Getting Started with VergeIO
***

## This should be an informational page about vergeIO and not technical

!!! warning
    Think of this like an extra home page

``` mermaid
graph TB
    subgraph vergeOS_Cluster
        direction LR
        subgraph "Control Nodes (HA Pair)"
            CN1["Control Node 1"]
            CN2["Control Node 2"]
        end

        subgraph "Compute Nodes"
            CNP["Compute Nodes (5)"]
        end

        subgraph "Storage Nodes"
            S["Storage Nodes (5)"]
        end

        subgraph "GPU Compute Nodes"
            CG["Compute Nodes with GPUs (5)"]
        end

        CN1 -- "Orchestrate" --> CNP
        CN1 -- "Orchestrate" --> S
        CN1 -- "Orchestrate" --> CG
        CN2 -- "Orchestrate" --> CNP
        CN2 -- "Orchestrate" --> S
        CN2 -- "Orchestrate" --> CG

        S <--> CNP
        S <--> CG
    end

```

***


!!! note

    Need more Help? Email [support@verge.io](mailto:support@verge.io) or call us at [(855) 855-8300](tel:855-855-8300)

<br>
[🚗 Take a Test Drive Today!](https://www.verge.io/test-drive){ .md-button .md-button--primary }

