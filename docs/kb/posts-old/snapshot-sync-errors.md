---
title: Snapshot Synchronization Errors Explained
description: 
published: true
date: 2023-01-24T19:17:04.187Z
tags: snapshot, error
editor: markdown
dateCreated: 2022-09-02T15:54:31.531Z
---

## Common Snapshot Synchronization Error Messages Explained

The VergeIO platform provides a feature known as Site Syncs to replicate a copy of a cloud snapshot.

> **NOTE:** For more information on Snapshots, please review the inline help within the category titled, Glossary. For more information on Site Sync, please review the inline help within the category titled, Site Syncs.
{.is-info}

Occasionally, the system may generate a system alert from a new Message Log entry related to the Site Sync functionality. Below is a list of common errors along with a brief explanation:
<br>

### ybvsan: Error walking tier 3 refs: (2) No such file or directory
- This error can occur if the VergeIO software version is mismatched between the sending side and the destination side.
<br>
### Unable to delete snapshot that no longer exists: Resource '/v4/cloud_snapshots/1' not found during delete
- This error is usually the result of a timing issue for a snapshot being deleted and the reference being deleted in the metadata of the system.
<br>
   
### Error notifying client with 'notify_complete' Error (403) while communicating with server
- The snapshot successfully synchronized, but this error appeared during the sync clean-up process. If this error occurs on multiple snapshot synchronizations, the handshake credentials between the two systems may have stopped working. In that case, consult with VergeIO support for assistance.
<br>

### Error - Sync back not found and no registration code supplied.

- This error is the result of requesting a snapshot back from the destination site to the source site. If this message appears, then Sync Back is not configured between the two systems.  Please refer to the inline help category titled, Site Syncs, under the section labeled 'Syncing Back' for information on setting up Sync-Back between the two systems.
<br>

### Error - Sync Request for 'system name' Error notifying client with 'notify_start' Connection timed out.
- This error is the result of requesting a snapshot back from the destination site to the source site.  If this message appears, then Sync Back is not configured between the two systems.  Please refer to the inline help category titled, Site Syncs, under the section labeled 'Syncing Back' for information on setting up Sync-Back between the two systems.
<br>

### An error has occurred while syncing 'snapshot name': Resource temporarily unavailable. Retrying 1 of 10
- This error is typically the result of an interruption of the transfer connection between the source site and the destination site.  The sync will automatically retry to transfer data following the Retry interval setting and the retry numbers will increase until the connection is re-established or until the maximum Queue retry count has been reached.
<br>

### Error- Unable to create tenant snapshot 'snapshotinterval_yyyymmdd': This name already exists.
- The local snapshot schedule is naming the snapshots that it creates the same name as the inbound snapshots coming from a site sync.  The simplest fix is to rename the origin (sending) side snapshot by editing the auto sync configuration for the snapshots sending and use the field 'Prefix the snapshot name with this on the destination' and add something unique such as 'remote-'.
<br>

### Unable to update cloud snapshot: No such file or directory
- This error indicates a possible timing issue on snapshots, review the Outgoing Sync configuration on the sending site for any setting mismatches.
<br>

### Error notifying client with 'notify_start' Connection timed out
- The sync task was unable to start, the connection timed out.  Typically, this error message is the result of requesting a snapshot back from the destination side to the original sending side.  In most cases, either a firewall is blocking the traffic or the destination side is missing the required traffic rules.  The required rules can be found in the inline help within the category titled 'Site Syncs' under the section labeled 'Sync Configuration'.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>