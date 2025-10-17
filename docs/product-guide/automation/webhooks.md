# Webhooks

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v25.2**

Webhooks provide the ability to automatically send push-based messages to another system when a specific event occurs.  A webhook sends an HTTP request (typically a POST) to a predefined URL, on-demand, when the defined trigger occurs.  This push mechanism is highly efficient for both notifications and workflow automation, as the receiving system doesn't have to constantly poll for updates.

## Webhook Usage Examples

VergeOS Webhooks allow high configurability for event-driven communication to third-party systems, providing a wide array of streamlining opportunities. 
These are a few basic examples displaying possible alert and workflow automation using webhooks: 

* Deliver a notification to an administrator Slack channel, if a sync operation produces an error, for immediate alerting 

* Upon bringing a tenant online, send a post to an accounting system to trigger an automatic charge posted to the customer's account

* When a particular VM is powered on, send a webhook to a Zapier system that kicks off a complete workflow process across various systems (e.g. creating real-time reports, delivering emails, sending notifications to applications, etc.) 


## Configuration Steps

Using a Webhook in VergeOS involves the following steps:

* [**Create a Webhook**](#create-a-webhook): specifying the URL, authorization settings, and any custom headers to send to the target external system
* [**Create a Task**](#create-a-task): defining the payload to deliver
* [**Create an Event**](#create-an-event): designating an occurrence that will activate the task

!!! tip "Modular Design"
    The *VergeOS Task Engine* enables flexible orchestration of webhooks, tasks, and events. You can assign multiple tasks or events to a single webhook, and a single task can be triggered by multiple distinct events. This mix-and-match architecture supports scalable, reusable workflows tailored to your system’s needs.

## Create a Webhook

1. Navigate to **System** > **Tasks**.
2. Click **New Webhook** on the left menu.
3. Configure Webhook:  

  * **Name**: Provide a descriptive name for the webhook.
  * **URL**: Enter the API endpoint exposed by the subject system to accepts HTTP POST requests.
!!! tip "Typically, you will need to grant your VergeOS system explicit access to this endpoint on the target system" 

  * **Authorization Type**
      - *Bearer Token* - Enter just the bearer token string (Do not include the word "Bearer")
      - *API Key* - Enter just the raw API key string. (Do not include any prefix or keyword)
      - *Basic* - Enter username and password.
      - *None*

  * **Headers**: 
      - By default, a header is included to specify a payload content-type: *application/json*. This header can be removed or edited as necessary, and additional headers can be configured as required or accommodated on the target system (e.g. for event routing, rate limiting, priority, etc.)
      - To change the order of custom headers: select the checkbox of desired header(s), and use the Up/Down arrow buttons
      - Use the Plus button to add additional headers
      - The pencil button toggles between content header/value pair entry and fully manual definition of all header syntax
  * **Allow Insecure Certificates**: This option is intended to accommodate self-signed certificates for test/development environments.  Utilizing insecure certificates for production systems and data (particularly public URLs) is risky and not recommended.  

  * **Timeout**: defines the maximum number of seconds the webhook will wait for a response from the target system (must be 3 or greater)
  * **Retries**: number of reattempts the webhook will make

4. Click **Submit** to save the webhook.

## Create a Task 

1. Navigate to **System** > **Tasks**.
2. Click **New Task** on the left menu.
3. Configure Task:
    * **Name**: Provide a descriptive name for the task.
    * **Description(optional)**: Additional information can be stored for the task, e.g. its purpose, expected outcome, etc.  
    * **Delete Task After Running**: Enable this option for a one-time activation; the system will delete the task after it has run. 
    * **Object Type**: *Webhook*
    * **Object:** Select the Webhook created above.
    * **Action**: *Send*
    * **Message**: Define the webhook payload to be sent to the external system.  The default message includes a simple key-value pair defining a string value of "Webhook" - delete or modify the default message as necessary to create desired payload.

!!! tip "Variables can be used within the message payload:"
    - ${DATE} - current date/time in full-string format (e.g. "Thu, 16 Oct 2025 11:38:07 EDT")
    - ${TIMESTAMP} - current date/time in numeric value; epoch time (e.g. "1760629087") 
    - ${RANDOM} - randomly-generated integer
    - ${NAME} - VergeOS object name
  
4. Click **Submit** to save the task.


## Create an Event

1. Navigate to **System** > **Tasks**.
2. Click **New Event** on the left menu.
3. Configure Event:
    * **Type**: Select the area of the VergeOS system. 
    * **Event**: The event list will change depending on the type selected above.  Select the desired event that will serve as the trigger.
    * **Select a specific Instance or Tag** to trigger the event: (Some selected Types, such as *Alarms*, will not provide options for tags or specific objects.)
        - Select a specific instance of the object type by selecting from the dropdown list (For example, if "Users" is the selected type, you select a particular user from the *User* dropdown list; when "Virtual Machines" is the selected type, you choose a particular VM from the *Virtual Machines* dropdown list.)  
        
        **OR**

        - Enable the **Use Tag** option and select an available tag from the dropdown list to base the event on objects with that corresponding tag.  (For example, if "Virtual Machines" is the selected type, and "production" is selected in the *Tag* dropdown list, the event trigger corresponds to any VMs assigned with the "production" tag.)    
        
    * **Task**: Select the task created above.
  
4. Click **Submit** to save the task. 



