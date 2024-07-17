

# Creating Tasks

This page includes general directions for creating a schedule-based task and an event-based task,  followed by specific, common-use examples.

<br>
<br>

## Create a Schedule-based Task

1.  From the ***Main Dashboard***, click **System** on the left menu.
2.  Click **Tasks/Events** on the left menu.
3.  Click **New** on the left menu.
4.  In ***Task Triggered by:*** select **Schedule**.
5.  By Default, a scheduled task is configured to run one time. Optionally, the ***Repeat Every*** setting can be configured to create a recurring task, run at a frequency based on: **day(s), hour(s), minute(s), month(s), week(s), year(s)** .
6.  If a repeat interval was specified, corresponding frequency criteria should be configured. For example, if day(s) specified, select the number of days or days of the week.
7.  Select a ***Start Date*** for the task to begin.
8.  Select time **hour / minute** settings for the scheduled task to start. (These settings do not apply to tasks that run at an hour or minute repeat intervals.)
9.  Specify a descriptive ***Name*** for the task.
10.  **Optionally**, additional information about the task can be entered in the ***Description*** field.
11.  Select the desired ***Section*** from the dropdown list; this is the category of object on which to perform the task; (e.g. user, virtual machine, tenant, etc.)
12.  **Additional** ***Settings*** **are needed for some selected types, such as SMTP. These will appear in the lower left or far right area of the screen**.
13.  **Most selected Sections** will include a dropdown list from which a **specific object** is selected; for example: the particular user or particular virtual machine to perform the task on.
14.  Select the desired ***Task Type***. The tasks available in this dropdown will be **specific to the Section selected** ; for example: for Virtual Machines, available Types would be operations such as: Power On; Power Off, Take Snapshot, Reset, Clone, etc. *(Note: for Section **type=SMTP**, there is **no Task Type** field)*.
15.  The ***Delete Task After Running*** option can be selected to automatically delete the task once completed. If the task is configured to repeat, the task would be deleted after the date/time defined in the **Ends** field.
16.  Click **Submit** to create the new task.


<br>
<br>

## Create an Event-based Task

1.  From the ***Main Dashboard***, click **System** on the left menu.
2.  Click **Tasks/Events** on the left menu.
3.  Click **New** on the left menu.
4.  In ***Task Triggered by:*** select **Event**.
5.  In the first dialog area, select the ***Section*** and ***Event*** that will be used to trigger the task. The ***Event*** dropdown list will vary depending on the ***Section*** selected. For example, for Section="User", Event options will include: *Logged In* and *Logged Out*.
6.  Select the specific ***Object*** that will trigger the task (for example, the particular user or virtual machine).
7.  Specify a descriptive ***Name*** for the task.
8.  Optionally, additional information about the task can be entered in the ***Description*** field.
9.  In the second dialog area, select a ***Section*** from the dropdown list to choose the category of object on which to perform the task; for example: Users, Virtual Machines, Tenants,etc.
10.  **Additional** ***Settings*** **are required for some selections ,such as SMTP. These will appear in the lower left or far right area of the screen**.
11.  Most selections will include a dropdown list from which a **specific object** is specified; for example: the particular user or particular virtual machine on which the task will be performed.
12.  Select the desired ***Task Type***. The tasks available in this dropdown will be specific to the **Section** selected; for example: for Virtual Machines, available Types would be operations such as: Power On; Power Off, Take Snapshot, Reset, Clone, etc. *(Note: for Section **type=SMTP**, there is **no Task Type** field)*.
13.  Optionally, the ***Delete Task After Running*** option can be selected to delete the task after it has completed once.
14.  Click **Submit** to create the new task.

<br>
<br>

## Example Task - Disable a User on a Specific Date

This type of task can be useful to automatically disable accounts when no longer needed (e.g. temporary projects, contract workers, etc.)

-   *Task Triggered by:* **Schedule**
-   *Repeat Every:*: **Does Not Repeat**
-   **Specific** ***Date/Time*** **to disable the account**
-   *Name*: **a descriptive name for the task**, such as "Disable-contractor-account"
-   *Description*: **(optional)** further information about the task that would be helpful for future administration
-   *Section*: **Users**
-   *Users*: **specific user account to be disabled**
-   *Task Type*: **Disable**
-   *Delete Task After Running*: **checked** (since the task will no longer be needed after it runs).
![task-disableuser.png](/public/userguide-sshots/task-disableuser.png)
<br>
<br>


## Example Task - Send Notification When a System Update Completes
This task allows for sending applicable personnel a notification when an update process is completely finished across all nodes.

-   *Task Triggered by:* **Event**
-   *Section*: **System Update**
-   *Event*: **Update Completed**
-   *Name*: **a descriptive name for the task**, ex: "Email-updatecomplete"
-   *Description*: **(optional)** further information about the task that would be helpful for future administration
-   *Section*: **SMTP**
-   *SMTP* field is **automatically set to the from address configured in SMTP global settings**.
-   *From Address*: from address for the email; **Can be left blank** to default to the the From Address defined in SMTP global settings.
-   *From Name*: from display name for the email; **Can be left blank** to default to the the From Name defined in SMTP global settings.
-   *To List*: **list of one or more email addresses to receive the alert; The semicolon [;] is used to separate multiple addresses.**
-   *CC List*: **(optional)** list of one or more email addresses to be copied on the alert; The semicolon [;] is used to separate multiple addresses.
-   *BCC List*: **(optional)** list of one or more email addresses to be blind copied on the alert; The semicolon [;] is used to separate multiple addresses.
-   *Subject*: **email subject line text**
-   *Body*: **email content text**
![task-update-notify.png](/public/userguide-sshots/task-update-notify.png)

<br>
<br>

## Example Task - Power on a VM When a Specific User Logs in

This task will power on a VM every time the specified user logs into the Verge.io system. A task can also be created to power down the VM each time the user logs off. Using the two automatic tasks can reserve resources by running the VM only when needed.

-   *Task Triggered by:* **Event**
-   *Section*: **User**
-   *Event*: **Logged In**
-   *Object*: **user to power on VM for**
-   *Name*: **a descriptive name** for the task, ex: "Power on CTApp VM for bswanson"
-   *Description*: **(optional)** further text about the task that would be helpful for future administration
-   *Section*: **Virtual Machines**
-   *Virtual Machines*: **VM to start up**
-   *Task Type*: **Power On**
![task-poweron.png](/public/userguide-sshots/task-poweron.png)

<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>