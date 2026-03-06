# Replacing a Node

Instructions for replacing a failed or end-of-life node with new hardware
using VergeOS ISO

# Prerequisites

Existing VergeOS cluster
Replacement server node with compatible hardware
VergeOS ISO installer 


- what are the requirements for installer version?
- what are the requirements for compatible node hardware? what needs to be the same?
- what do you have to be careful with? what are potential gotchas?
- how do you actually run through the steps? what is the sequence?
YC_INSTALL_TYPe=replace?

Only replace one node at a time?
does it require downtime?
if you are replacing an end-of-life node that is still detected in the system, how is it different than replacing one that has failed completely and no longer detected?
- post-replacement verification steps?
- common problems and troubleshooting tips

warning per Larry:
if you do a node 1 replacement, and it fails but the node+vsan connected, DO NOT TRY AGAIN .. unless you wait for a full journal walk with either node1 connected, or not .. ideally you dont want node1's vsan to connect and then disconnect without a full journal walk

run thru test on virtual - clone the node to take out and replace, change its mac addresses

