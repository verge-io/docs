---
title: "Viewing Import Jobs"
description: "Instructions for viewing and monitoring VM import job status, child jobs, and imported VM listings in VergeOS."
semantic_keywords:
  - "view VM import job status and progress"
  - "monitor import child jobs and logs"
  - "list VMs imported from import job"
  - "check import job dashboard details"
use_cases:
  - monitor_import_job_progress
  - view_imported_vm_listing
  - troubleshoot_import_job_status
tags:
  - virtual-machines
  - import
  - monitoring
  - jobs
  - migration
  - dashboard
categories:
  - Virtual Machines
---

# Viewing Import Jobs

## View All Import Jobs

1. Navigate to **Virtual Machines** > **List** from the top menu.
3. Select **Import Jobs** on the left menu.
4. A listing of all submitted import jobs is displayed; double-click a particular job in the list to access the import job's dashboard with detailed information, such as individual child import jobs, logs, etc.

## See a Listing of the VMs Imported via an Import Job

1. Navigate to **Virtual Machines** > **List** from the top menu.
2. Click **Import Jobs** on the left menu.
3. All import jobs appear in the listing; **Double-click the desired import job**.
4. Child import jobs are displayed on the import job dashboard that appears. The VM column will display the names of the imported VMs.  

!!! success "A *--View More--* link is available at the bottom of the *Child Import Jobs* section to view additional child jobs when all do not fit on a single page."

!!! info "A UUID (rather than the VM name) displayed in the VM field indicates that a VM with that unique identifier already existed in the VergeOS system (e.g. previously imported). If a UUID is displayed, the VM was imported as a [snapshot](/product-guide/backup-dr/snapshots-overview) to avoid inadvertently overwriting an existing VergeOS VM."
