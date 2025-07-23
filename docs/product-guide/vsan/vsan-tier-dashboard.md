# VergeOS vSAN Tier Status Guide

## Overview

This page is designed to help you understand VergeFS status metrics provided on the vSAN Tier Dashboard. These data points supply information related to **Journal Walks**, the processes that continually monitor and support vSAN data integrity. 

## Journal Walks

VergeFS employs a process called Journal Walk to continually verify storage fidelity and safeguard against risks like hardware failures, silent bitrot, power disruptions, and misleading write confirmations. These walks are automatically triggered to scan for missing data blocks, which may result from device issues, planned node reboots, or environmental disruptions. When discrepancies are detected, VergeFS proactively performs repairs to restore consistency. 

The system supports three walk types:

* **Normal Journal Walks** target recently changed data for quicker validation
* **Full Journal Walks** scan all data across all nodes 
* **Mixed Journal Walks** occur when a non-controller node reboots and only that node is fully scanned


## Accessing vSAN Tier Status Information

From the **Main Dashboard**, navigate to **vSAN Tiers** and **double-click the desired tier**. This displays the dashboard for the selected vSAN tier. Refer to the Status tile on the page. 

## Status Data 

* **Redundant:** *(checkbox)* Reflects whether the vSAN tier is currently verified as redundant. If unchecked, node maintenance mode will be disabled to prevent disruption. The box may appear unchecked during a full Journal Walk until redundancy is confirmed. It also remains unchecked if redundancy cannot be verified—such as when a node is offline after the Journal Walk completes.

* **Encrypted:** *(checkbox)* Shows whether data in the vSAN tier is encrypted. Encryption status is set during installation and remains fixed—this setting cannot be modified after deployment.

* **Working:** *(checkbox)* Indicates that a Journal Walk is actively running for this tier. If no snapshots or data changes are occurring, walks may complete too quickly to register as “working” in the UI.

* **Full Walk:** *(checkbox)* Flags whether a full Journal Walk is in progress. Full walks are triggered by events such as controller startup, topology changes (e.g., node offline, added, or drive failure).

!!! note "When a non-controller node reboots, a Mixed Walk is triggered instead."

* **Walk Progress:** Displays the current Journal Walk’s progress as a percentage, or shows “Idle” if no walk is active.

* **Last Walk Time (ms):** Duration in milliseconds of the most recent Journal Walk.

* **Last Full Walk Time (ms):** Duration in milliseconds of the most recent full Journal Walk.

* **Current Transaction:** A unique ID representing the latest transaction. This value increments with each Journal Walk, whether full, mixed, or partial.

* **Transaction Start Time:** Timestamp indicating when the current or most recent Journal Walk began. Useful for diagnosing prolonged or stalled operations.

!!! tip "The duration of a full walk will be significantly longer than a normal journal walk." 

* **Repairs:** Displays the current count of missing data blocks detected on the tier. It’s normal to see a non-zero value after events such as node failures, maintenance operations, or updates. VergeFS journal walks automatically identify and attempt to correct these repairs using redundant data stored on other nodes. If redundancy fails (e.g. double node failure), the system will try to retrieve blocks from a configured repair server. Persistent repair counts may indicate unrecoverable blocks; manual resolution may be needed, and contacting VergeIO Support is recommended in such cases.

!!! tip "If missing data blocks have already been detected and a repair server isn’t yet configured, it’s not too late. Setting up a repair server now allows VergeFS to automatically attempt recovery of those blocks during subsequent journal walks."

* **Bad Drives:** Indicates the number of drives missing since the current Journal Walk began. It’s common to see a non-zero value here after node reboots, maintenance, or updates; this doesn’t automatically signal a drive failure. Missing drives are typically related to offline nodes or detection delays at walk start. If no nodes are offline and this field shows a count, review drive and node status via the Main Dashboard for further insight.

 
force full walk - reboot active controller node or a diagnostic command

## Monitoring Tips

transaction number should be incrementing



<!-- none of these would necessarily be an indicator on its own of attention needed. provides overall information and baselines to aid troubleshooting and diagnostics. >

## Understanding vSAN Tier Health


*  Regular Checks
- **Daily**: Review status indicators for any changes
- **Weekly**: Monitor walk completion times for performance trends
- **Monthly**: Analyze repair and bad drive metrics for patterns

*  Performance Baselines
- **Walk Times**: Establish baseline walk completion times
- **Transaction Duration**: Monitor typical transaction completion times
- **Repair Frequency**: Track repair occurrences over time

*  Alert Conditions
Set up monitoring alerts for:
- Redundancy status changes
- Drive failures (bad drives > 0)
- Increased repair activity
- Significantly longer walk times
- Long-running transactions (> normal baseline)

## Troubleshooting Common Issues

*  Redundancy Disabled
**Symptoms**: Redundant status shows unchecked
**Possible Causes**:
- Insufficient drives in tier
- Drive failures reducing available redundancy
- Configuration changes

**Actions**:
1. Check drive count and status
2. Verify tier configuration
3. Replace any failed drives
4. Reconfigure redundancy if needed

*  High Repair Count
**Symptoms**: Repairs > 0 and increasing
**Possible Causes**:
- Drive degradation
- Hardware issues
- Environmental factors

**Actions**:
1. Identify which drives are experiencing issues
2. Check hardware health and environmental conditions
3. Consider proactive drive replacement
4. Monitor repair trends

*  Slow Walk Performance
**Symptoms**: Walk times significantly longer than baseline
**Possible Causes**:
- High system load
- Drive performance degradation
- Network issues (in distributed configurations)

**Actions**:
1. Check system resource utilization
2. Verify drive performance metrics
3. Test network connectivity and performance
4. Consider scheduling walks during low-activity periods

## Configuration Recommendations

*  For Production Environments
- **Redundancy**: Always enable redundancy for data protection
- **Encryption**: Enable for sensitive data environments
- **Monitoring**: Implement automated monitoring and alerting
- **Maintenance Windows**: Schedule full walks during off-peak hours

*  For Development/Test Environments
- **Redundancy**: May be disabled to maximize available storage
- **Encryption**: Optional based on data sensitivity
- **Monitoring**: Basic monitoring sufficient
- **Maintenance**: More flexible scheduling acceptable

## Related Documentation

- **vSAN Configuration Guide**: For setting up and configuring vSAN tiers
- **Storage Performance Tuning**: For optimizing storage performance
- **Backup and Recovery**: For data protection strategies
- **System Monitoring**: For comprehensive infrastructure monitoring
- **Hardware Maintenance**: For drive replacement and maintenance procedures

## Version Information

This status information is current as of VergeOS version 25.2.0.dev-161-gfb00558. Status indicators and metrics may vary based on system configuration and version.