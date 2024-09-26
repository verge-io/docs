# Manual VM Migration

Migrating a VM moves it from running on one host node to run on another, while keeping the VM running. Migration operations are handled automatically during VergeOS updates and when nodes are put into maintenance mode (provided there are adequate systems resources). VMs can also be manually migrated, when needed.

## To Migrate a Single VM:

1. Navigate to the individual **VM dashboard**.
2. Click **Migrate** (under Actions) from the left menu.
3. The default selection of --auto-- will automatically select a target node for migration based on resource balancing. You can also select a preferred node to select a specific node to which you would like to migrate.

4. Click the **Migrate** button to begin the process.

While the VM is migrating, the status field (top left) on the VM dashboard will reflect the migration progress.  The status will return to "Running" after it has migrated to the destination. Additionally, the *Host Node* field will update to reflect the new node.
  


## To Migrate Multiple VMs Simultaneously

1. Navigate to Machines > Virtual Machines (This brings up the VM listing.)
2. Select the desired VM(s). (Selected VMs will display a check mark.)
3. Click the **Migrate** button to begin the process.

4. The default selection of --auto-- will automatically migrate the VMs to nodes based on resource balancing. You can also select a preferred node. (When migrating multiple VMs at once, it may be likely that they will not all be able to migrate to a single preferred node.)

5. Click the **Migrate** button to begin the process.

The status field column (far left) will indicate when a VM is *Migrating* along with a progress percentage. The status will return to *Running* when a VM has finished migrating to the destination. The *Host Node* field (far right) also updates to reflect the new node on which the VM is running. 