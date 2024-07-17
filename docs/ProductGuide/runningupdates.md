

# Running Updates

> System Updates are **only run from the host system (top-level parent);** tenant systems are automatically updated from their host system.{.is-info}

VergeIO regularly publishes updates to provide enhancements and improvements. Administrators should aim to keep systems updated by scheduling auto updates or regularly checking and applying available updates. The update process can be initiated within the UI or via task scheduling. The update process is then handled by the system with changes automatically propagated to all nodes, rebooting and applying one node at a time. Updates can be performed without any downtime (provided there are adequate resources in place), as the system can automatically migrate workloads to other nodes before applying an update and restarting/rebooting a node.

<br>
<br>


## To Run a System Update (on-demand):
<br>


1.  From the Cloud Dashboard, click **System** on the left menu.
2.  Click **Updates** on the left menu. The **Updates Dashboard** Appears. 
<br>


### Check for Updates
3.  Click **Check For Updates** on the left menu.
4.  Click **Yes** to confirm. 

The Packages section will indicate if new version updates were discovered. A cloud icon  indicates a package has been found that can be downloaded for install. The currently installed version and available update version is displayed for each package.

<br>

### Download
5.  Click **Download** on the left menu.
6.  Click **Yes** to confirm the Download.
<br>

### Install
7.  Click **Install** on the left menu.
8.  Click **Yes** to confirm the Install.

After the updates have been distributed to all nodes and are ready to apply, the Status field (top left) will indicate "Idle - Reboot Required" and the Reboot option on the left menu will be enabled. (A reboot is not required for updating the help package.)

<br>

### Reboot (Apply)


> Updates that do not include an update of VergeOS package will not require full reboot of the nodes, but rather just a migration of workloads and restart of the application; however, this will still involve clicking the Reboot option to apply the update.{.is-success}

9.  Click **Reboot** on the left menu.
10.  Click **Yes** to confirm reboot and apply updates.

> The Cancel Reboot option allows you to halt the automatic reboots if needed (e.g. unexpected results, time needed to rebalance workloads, etc). {.is-info}


   The Status field (top left) will continue to reflect the current progress of the update operation. One node is handled at a time: node put into maintenance; workloads migrated off; application restarted/node rebooted, node taken out of maintenance. The Nodes Updated status (top right) will reflect the number of nodes that have completed the update. When the entire update process is complete, the Status field will display "Idle" (top left) and all nodes will show updated (top right).
<br>
<br>



## To Schedule Update(s):

1.  From the **Main Dashboard**, click **System** on the left menu.
2.  Click **Updates** on the left menu.
3.  Click **Tasks** on the left menu.
4.  Click **New** on the left menu.

#### Schedule
5.  By default, ***Repeat Every*** is set to **Does Not Repeat**.

![updates-scheduleonetime.png](/public/userguide-sshots/updates-scheduleonetime.png)


**Optionally,** the task can be configured to repeat on a regular basis, (for example each week, every 2 weeks, monthly, etc.).6.  Select desired ***Start Date*** and ***At*** time.
![updates-schedulerecurring.png](/public/userguide-sshots/updates-schedulerecurring.png)

7.  When a Task is set to recur, an ***Ends*** date/time can Optionally be selected.

#### Task
8.  Enter a ***Name*** for the Task (required).
9.  A ***Description*** can be entered to store additional administrative information.
10.  To schedule a complete update operation, select **Download, Install, and Reboot** in ***Task Type***
11.  **Optionally**, the ***Delete After Running*** checkbox can be selected to completely delete this task after it runs.
12.  When configured as desired, click **Submit** to save the Task.
The Form is closed and the Update Tasks list page appears displaying the update task.

<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
