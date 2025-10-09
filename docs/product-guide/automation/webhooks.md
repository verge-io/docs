# Webhooks

Webhooks provide the ability to automatically send push-based alerts to another system when a specific event occurs.  A webhook sends an HTTP request (typically a POST) to a predefined URL on-demand, when the defined trigger occurs. 


## Configuration

Using a Webhook in VergeOS involves the following basic steps:

* **Create a webhook** to send request to an external system
* **Create a task** (event or scheduled?) associated to the webhook, defining the webhook message

### Create a Webhook

1. Navigate to **System** > **Webhooks**.
2. Click **New** on the left menu.
3. Configure Webhook fields:
  * **Name**
  * **URL**
  * **Header**
  default header 
    One or more headers can be created to include in your webhook. 
    a header is typically used for authentication and verification (e.g. bearer tokens, API keys)
    Some target systems may also expect routers for event routing, ate limiting, metadata, etc. 

  * **Allow Insecure Certificates**
  * **Timeout** and **Retries**
4. Click **Submit** to save the webhook.


### Create a Task (to initiate the webhook)

1. Navigate to **System** > **Tasks/Events**.
2. Click **New** on the left menu.
3. Configure Webhook fields:
