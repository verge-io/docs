# VergeOS Clusters User Guide

## Introduction

This guide will help you understand and manage [Clusters](/glossary/#cluster) in VergeOS.

## Accessing Clusters

To view and manage clusters:

1. Log into the VergeOS dashboard.
2. Navigate to "System" in the left sidebar.
3. Click on "Clusters".

You'll see a list of all clusters in your environment.

[... rest of the content remains unchanged ...]

## Clusters Overview

The Clusters page displays key information for each cluster, including:

- Name
- Status
- Description
- Number of nodes
- Available resources (CPU, RAM, Storage)
- Configuration settings

## Creating a New Cluster

To create a new cluster:

1. Click "New" on the Clusters page.
2. Fill in the required information:
    - Name
    - Description (optional)
    - Compute settings (CPU overcommit ratio, max RAM per machine, etc.)
    - Storage settings (if applicable)
3. Click "Submit" to create the cluster.

## Viewing Cluster Details

To view details of a specific cluster:

1. Click on the cluster name in the list.
2. The Cluster Details page shows:
    - General information
    - Resource usage statistics
    - Compute and storage settings
    - List of nodes
    - Storage tiers (if applicable)

## Editing Cluster Settings

To modify cluster settings:

1. On the Cluster Details page, click "Edit" in the left sidebar.
2. Update the desired settings.
3. Click "Submit" to save changes.

## Cluster Statistics

To view detailed statistics:

1. On the Cluster Details page, click "History" in the left sidebar.
2. View graphs for RAM usage, CPU usage, node count, and running machines.
3. Use filters to adjust the time range.

## Managing Nodes

Nodes are managed at the cluster level:

1. On the Cluster Details page, scroll to the "Nodes" section.
2. View information about each node, including status and resource usage.

## Storage Tiers

If storage is enabled:

1. On the Cluster Details page, scroll to the "Tiers" section.
2. View information about each storage tier, including capacity and performance metrics.

## Permissions

To manage cluster permissions:

1. On the Clusters page, click "Permissions" in the left sidebar.
2. Set up or modify access control for users or groups.

## Cluster Configuration Options

Key configuration options include:

- CPU overcommit ratio
- Max RAM per machine
- Max cores per machine
- Storage settings (if applicable)

## Troubleshooting

If you encounter issues:

1. Check the cluster status and error messages on the Cluster Details page.
2. Review the cluster history for unusual patterns.
3. Verify that all nodes are online and functioning.
4. Ensure storage tiers have sufficient capacity.
5. Review system logs for relevant messages.

Contact [VergeOS Support](/support) for further assistance.
