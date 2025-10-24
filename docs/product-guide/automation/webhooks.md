# Webhooks

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v26**

Webhooks provide for delivering push-based messages to another system when a specific event occurs.  A webhook sends an HTTP request (typically a POST) to a predefined URL when the defined trigger occurs.  This push mechanism is highly efficient for both notifications and workflow automation, as the receiving system doesn't have to constantly poll for updates.

## Webhook Usage Examples

VergeOS webhooks allow high configurability for event-driven communication to third-party systems, providing a wide array of streamlining opportunities. 
The following basic examples demonstrate possible alert and workflow automation using webhooks: 

- Send a Slack notification to an admin channel when a sync job produces an error
- Post to an accounting system when a VergeOS tenant comes online, triggering an automatic charge
- Trigger a Zapier workflow when a specific VM powers on, initiating cross-application actions (e.g., reporting, email, notifications, etc.)



## Configuration Steps

To put a webhook into action, follow these steps:

* [**Create a Webhook**](#create-a-webhook): defines the target URL, authentication method, and any custom headers required by the external system
* [**Create a Task**](#create-a-task): defines the payload to deliver
* [**Create an Event**](#create-an-event): designates an occurrence that will activate the task

!!! tip "Modular Design"
    The *VergeOS Task Engine* enables flexible orchestration of webhooks, tasks, and events. You can assign multiple tasks or events to a single webhook, and a single task can be triggered by multiple distinct events. This mix-and-match architecture supports scalable, reusable workflows tailored to your system’s needs.

## Create a Webhook

1. Navigate to **System** > **Tasks**.
2. Click **New Webhook** on the left menu.
3. Configure webhook:  

  * **Name**: Provide a descriptive name for the webhook.
  * **URL**: Enter the API endpoint exposed by the subject system to accept HTTP POST requests.
!!! tip "Typically, you will need to grant your VergeOS system explicit access to this endpoint on the target system" 

  * **Authorization Type**
      - *Bearer Token* - Enter just the bearer token string (Do not include the word "Bearer")
      - *API Key* - Enter just the raw API key string. (Do not include any prefix or keyword)
      - *Basic* - Enter username and password in provided entry fields.
      - *None*

  * **Headers**   
By default, a header is included to specify a payload *content-type: application/json*. This header can be removed or edited as necessary, and additional headers can be configured as required or accommodated on the target system (e.g. change content type, event routing, rate limiting, priority, etc.)
      - To change the order of custom headers: select the checkbox of desired header(s) and use the Up/Down arrow buttons
      - Use the Plus button to add additional headers
      - The pencil button toggles between header key/value pair entry and manual entry of full header syntax
  * **Allow Insecure Certificates**: This option is intended to accommodate self-signed certificates for test/development environments.  **Utilizing insecure certificates for production systems and data (particularly public URLs) is risky and not recommended.**  

  * **Timeout**: Defines the maximum number of seconds to wait for a response from the target system (must be 3 or greater)
  * **Retries**: Number of reattempts to make when no response or error returned from target system

4. Click **Submit** to save the webhook.

## Create a Task 

1. Navigate to **System** > **Tasks**.
2. Click **New Task** on the left menu.
3. Configure task:
    * **Name**: Provide a descriptive name for the task.
    * **Description(optional)**: Additional information can be stored for the task, e.g. its purpose, expected outcome, etc.  
    * **Delete Task After Running**: define a one-time activation; the system will automatically delete the task after it has run once. 
    * **Object Type**: *Webhook*
    * **Object:** Select the webhook created in previous step.
    * **Action**: *Send*
    * **Message**: Define the payload to be sent to the external system.  - The default payload includes a basic key-value pair with the string "Webhook" as its value; delete or modify as necessary to create desired payload.

!!! tip "Variables can be used within the message payload:"
    - **${DATE}** - current date/time in full-string format, e.g. *Thu, 16 Oct 2025 11:38:07 EDT*
    - **${TIMESTAMP}** - current date/time in numeric value (epoch time), e.g. *1760629087* 
    - **${RANDOM}** - randomly-generated integer
    - **${NAME}** - name of the applicable VergeOS object
  
4. Click **Submit** to save the task.


## Create an Event

1. Navigate to **System** > **Tasks**.
2. Click **New Event** on the left menu.
3. Configure event:
    * **Type**: Select the applicable area of the VergeOS system where the trigger will occur. 
    * **Event**: The event list will change depending on the type selected above.  Select the desired event that will serve as the trigger.
    * **Select a Specific Object Instance or Tag** to trigger the event: (Some selected types, such as *Alarms* apply on a generic level and do not provide options for tags or specific objects.)
        - Select a specific instance of the object type from the dropdown list (For example, "Users" is selected type - choose a particular user from the *User* dropdown list; "Virtual Machines" is the selected type - choose a particular VM from the *Virtual Machines* dropdown list.)  
        
        **OR**

        - Enable the **Use Tag** option and select an available tag from the dropdown list to base the event on objects with that corresponding tag.  (For example, if "Virtual Machines" is the selected type, and "production" is selected in the *Tag* dropdown list, the event trigger corresponds to any VMs assigned with the "production" tag.)    
        
    * **Task**: Select the task created in the previous step.
  
4. Click **Submit** to save the event. 



