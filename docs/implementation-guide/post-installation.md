# VergeOS Post-Installation Guide

## Overview

After installing VergeOS, there are several important configurations and tweaks you should consider. This guide will walk you through the essential post-installation steps to optimize your VergeOS environment.

## Steps

1. Log into the VergeOS UI

2. Navigate to System Settings
   - Go to System > Cluster

3. Review and Adjust Cluster Settings
   - Check the maximum RAM allocation for VMs
   - Verify the maximum number of cores allowed
   - Review swap settings
   - Review Storage Buffer per node
   - Review Target Max Ram Percent (Default 80% means 20% RAM reserved for Verge)

4. Configure Performance Settings
   - For high-performance environments, consider disabling CPU sleep states
   - For edge deployments or power-saving scenarios, you may want to use balanced performance settings

5. Adjust Advanced Settings
   - Go to System > Settings > Advanced Settings
   - Review and modify as needed:
     - Default tiers for drives
     - Default MTU
     - Default network schemes for internal networks
     - Default media file tier (e.g., change to Tier 3 for ISOs)

6. Configure Storage Tiers
   - Ensure proper configuration of storage tiers based on your hardware
   - Remember that tiers should ideally range from Tier 1 (highest performance) to Tier 5 (lowest performance)
   - Note: The system will use the closest available tier if a specified tier is not available

7. Review Security Settings
   - For dedicated controller nodes, consider disabling CPU security mitigations for performance
   - Only disable if you trust all workloads in the environment

8. Update Location and URL Settings
   - Go to System > Settings
   - Update the location information if necessary (The Sites map uses Lat/Long coordinates for the pin location)
   - Click edit settings and ensure the URL and VSAN hosts are correct. This is important for setting up sites/backups

9. Review STMP setup
   - Go to System > SMTP
   - Send a test email to verify you are receiving emails from VergeOS
   - Consider adding your own SMTP relay, especially if the test email fails

10. Networking Setup/testing
   - Test what happens when either core/fabric connection is lost
   - Test what happens when you unplug one of the externals on Node 1
   - Confirm Core 1 and Core 2 vlans are not visible on any other device/port
   - Confirm Core networks are not shared with another VergeOS system/site
   - Check your network firewall rules for any rules you want to enable (Ex. 14201 on External is used for Site Syncs)
   - Add any extra VLANS needed for your environment: https://docs.verge.io/public/ProductGuide/createvlan/


## Important Considerations

- Changes to swap settings require disk reformatting and are not applied in real-time
- When adding new nodes, ensure storage capacity matches across all nodes in a tier to maintain redundancy
- The Target Max RAM Percent setting affects the amount of RAM available for VMs
- If enabling any network rules, you should source lock the rule to ensure only specific traffic can get to that destination

## Troubleshooting

If you encounter issues or have questions about these post-installation steps, please contact our support team for assistance.

---

!!! note "Document Information"
    - Last Updated: 2024-11-22
    - VergeOS Version: 4.13.1
