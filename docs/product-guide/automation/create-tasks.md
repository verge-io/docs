# Creating Tasks

This page provides general instructions for creating tasks in VergeOS, including how to configure schedule-based and event-based triggers. 


## Create a New Task

1. Navigate to **System** > **Tasks**.
2. Click **New Task** in the left-hand menu.
3. Configure the task fields:
   - **Name**: Enter a descriptive name for the task.
   - **Description** *(optional)*: Add administrative notes or context.
   - **Object Type**: Select the relevant section of the application.
   - **Object**: Choose the specific target (e.g., VM, tenant, network) the task will apply to.
   - **Action**: Select the operation to perform on the target object.
   - **Settings**: Configure any applicable options. These vary by object and action. Some actions (e.g., power on/off) may not require settings.

   !!! tip "New tasks are *Enabled* by default. You can disable a task if you need time to verify its configuration or delay deployment."

4. Click **Submit** at the bottom of the page to save the task.  
   The task dashboard will appear.

---

## Putting a Task into Action

To activate a task, define one or more **[Event](/product-guide/automation/events) Triggers** and/or **[Schedule](/automation/schedules) Triggers**.

!!! tip "The instructions below begin at the task dashboard, which appears immediately after task creation. To return to the dashboard later: go to **System** > **Tasks** > **Tasks**, then **double-click** the task in the list."


### Defining an Event Trigger

Event triggers allow tasks to run in response to specific system occurrences.

1. Click the **Event Triggers** card on the task dashboard.  
   !!! tip "The card displays the number of event triggers currently associated with the task."

2. Complete the event configuration:
   - **Type**: Select the object class (e.g., alarms, virtual machines, tenants).
   - **Event**: Choose the event type that will trigger the task. Available options depend on the selected object type.
   - **Object Instance or Filter Settings**:
     - **Object Instance**: Specify a particular object (e.g., a specific VM or tenant).
     - **Filters** *(optional)*: For general types like *Logs* or *Alarms*, you can narrow the trigger:
       - Alarms: filter by severity (e.g., *Error*).
       - Logs: filter by log type and level (e.g., *Critical*, *Audit*, *Warning*).

3. Click **Submit** to save the event trigger.  
   It will now be associated with the selected task.


### Defining a Schedule Trigger

Schedule triggers allow tasks to run at specific times or on a recurring basis.

1. Click the **Schedule Triggers** card on the task dashboard.  
   !!! tip "The card displays the number of schedules currently associated with the task."

2. Select a **Schedule** from the dropdown list.  
   VergeOS includes several pre-installed schedules. To create a custom schedule, see the [Schedules Guide](/product-guide/automation/schedules).

3. Click **Submit** to save the schedule trigger.

---

