# Webhooks

Webhooks provide the ability to automatically send push-based alerts to another system when a specific event occurs, or on a specified schedule.  A webhook sends an HTTP request (typically a POST) to a predefined URL, on-demand, when the defined trigger occurs.  This "push" mechanism is highly efficient for both notifications and workflow automation, as the receiving system doesn't have to constantly ask (poll) for updates.

## Webhook Usage Examples

* Deliver a notification to a specific Slack channel when a sync operation produces an error - to alert administrators immediately.

* Send a post to a billing system when a particular tenant storage threshold is met?

These are just a couple very basic examples of automating alerts and workflow.  WEbhooks provide a wide array of opportunities for streamlining processes.

## Webhook Configuration

Using a Webhook in VergeOS involves the following basic steps:

* **Create a webhook**: this defines the URL for the targeted external system, along with authorization settings and headers
* **Create a task**: the task defines the trigger and the payload to send to the target system

### Create a Webhook

1. Navigate to **System** > **Tasks**.
2. Click **New** on the left menu.
3. Configure Webhook fields:

* **Name**
* **URL**
* **Authorization Type**
automatically creates the token as appropriate
  * Bearer Token - enter the full bearer token
  * API Key - enter the full API key
  * Basic - enter username and password
  * None
* **Header**: By default, a header is included to specify a payload content-type: *application/json*. This header can be removed or edited as necessary. Additional headers can be configured as required on the target system for athentication event routing, rate limiting, etc.
* **Allow Insecure Certificates**
* **Timeout** and **Retries**

4. Click **Submit** to save the webhook.

### Create a Task (to trigger the webhook)

1. Navigate to **System** > **Tasks**.
2. Click **New** on the left menu.
3. Configure Task fields:
   * **Name**: Provide a descriptive name for the task.
   * **Description**: (optional) additional information can be stored for the task, e.g. its purpose, expected outcome, etc.  
   * **Object Type**: select *Webhooks*
   * **Message**: enter the webhook payload


!!! example "Payload Examples"

    === "Unordered List"

        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```

    === "Ordered List"

        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```   

??? example "Payload Examples"

    **Simple notification sent to a Slack Channel (Json)**  
    {
    "text": "Sync Job Error"
    }

    **Notification push to an external alerting system (Json)**  
    {
    "event": "new_notification",
    "data": {
    "message_id": "MSG-987654",
    "recipient": "admins-SQL",
    "message_body": "Server ABC is reporting high CPU utilization. Please investigate immediately.",
    "priority": "high",
    "timestamp": "2025-10-10T11:30:00Z"
    }
}

4. Click **Submit** to save the new task.

## Example Payload


=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```