# Task Manager

The **Task Manager** enables automated operations in VergeOS, triggered either by specific events or scheduled times. Tasks can run once or recur based on your configuration.


## Event-Based Task Examples

These tasks are triggered automatically when a defined event occurs:

- Send an email notification when a system update completes  
- Power on a specific virtual machine when a designated user logs into VergeOS  
- Use a webhook to notify an external alerting system when a sync error is detected  


## Schedule-Based Task Examples

These tasks run at predefined times or intervals:

- Check for and download system updates every Saturday at 5:00 PM  
- Disable a user account (e.g., for a temporary employee) 30 days after creation  
- Power off a tenant on a specific date  


## Task Manager Components

| Component       | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Tasks**       | Define the action to perform (e.g., power off a VM, send a notification)    |
| **Schedules**   | Specify when and how often a task should run (e.g., daily, weekly)          |
| **Events**      | Define the conditions that trigger a task (e.g., user login, sync failure)  |
| **Webhooks**    | Special tasks that push data to external systems in real time               |
| **Task Logs**   | Record task creation and execution history for auditing and troubleshooting |


## Modular Automation Architecture

The VergeOS Task Engine supports flexible orchestration of tasks, events, schedules, and webhooks. This modular design enables scalable, reusable automation tailored to your environment:

* **Assign multiple tasks or events to a single webhook** — for example, you can configure a webhook to notify an external system, and have it triggered by several different events such as sync failures, login attempts, or system alerts. This reduces duplication and centralizes external integrations.
* **Trigger a single task from multiple distinct events** — such as powering on a virtual machine when either a specific user logs in or when a scheduled maintenance window begins. This allows you to consolidate logic and reuse task definitions across scenarios.
* **Create a schedule once and apply it to multiple tasks** — for example, define a weekly maintenance window and link it to several update, alerting, or shutdown tasks. This promotes consistency and simplifies configuration management.


This modular design enables scalable, reusable automation tailored to your environment.

---

## Related Guides

- [Creating Tasks](/product-guide/automation/create-tasks)  
- [Using Webhooks](/product-guide/automation/webhooks) 
- [Defining Schedules](/product-guide/automation/schedules) 


---


