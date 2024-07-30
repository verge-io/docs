

# Subscriptions

Subscriptions deliver emails for scheduled reporting and triggered alerting.

<br>
<br>

### Subscription Types

- **On-Demand**

    Triggered alerts are based on threshold settings, warnings, or errors. These are intended to let administrators as soon as there is a potential issue. Example triggers for On-Demand subscriptions:

    -   Storage reaches a specified % used
    -   Update packages available
    -   Errors/warnings
    -   Status Changes

<br>

- **Scheduled**

  Specified information is sent based on configured times/intervals These are intended to provide summaries of current system information. This can assist administrators in everyday supervision of systems, tracking trends, etc. Scheduled subscriptions provide dashboard or listing information to the Administrator.  Examples of scheduled subscriptions includes:
  
     - System dashboard sent daily
     - vSAN tier Dashboard sent weekly
     
<br>

> Efficiently monitoring a VeregOS Cloud will involve creating **multiple ***On-Demand***  and multiple ***Scheduled*** subscriptions** {.is-info}

.<br>
<br>


## Create a New Subscription

1.  From the Cloud Dashboard, select **System** from the left menu.
2.  Select **Subscriptions** from the left menu.
3.  Select **New** from the left menu.
4.  Select ***Owner Type***:
    -   **User** (individual user)
    -   **Group** (group of users)
5.  Select ***Owner*** from the dropdown list. (Choose from the list of users or list of groups depending on selection in the *Owner Type* field.)
6.  Select ***Target Type*** from the dropdown list. This defines the area of the system to report on.
7.  Select ***Target*** from the dropdown list. This defines the specific instance, where applicable (for example, a particular storage tier when *Storage Tiers* is selected as Target Type; a single virtual network when *Network* is selected as the Target Type.).
8.  Enter a ***Name*** for the subscription. This name displays in the subscriptions listing and in the email messages sent by this subscription.
> The name defined for the subscription typically appears in the subject of the received email; however, when multiple subscriptions are received within a single email message (e.g. when more than one subscription is scheduled to the same owner at the same time,) the subscription Name will not appear in the subject line, but will still appear as a heading within the body of the email.{.is-info}

9.  Select the desired **Suspend** setting:
    -   **Never** (default) - subscription continues perpetually until deleted or disabled.
    -   **Set Date** - subscription does not execute again until the specified date/time.
10.  Select the ***Type*** of notification:

   -  **On-Demand** - alerts triggered by particular events or specific thresholds; these notifications only occur when specified criteria occurs.
   -   **Scheduled** - reports that send at particular intervals/times (e.g. daily, weekly, monthly) 
   
> Multiple Scheduled subscriptions (to the same owner) set for the same time will be combined into a single email message. {.is-success}
   
   
11.  Select ***Subscription Profile*** from the dropdown list. (The options available will depend on the option selected in the ***Target*** field.) defines the information to receive in the notification. A wide array of subscription profiles exist by default, providing the means to oversee all the different parts of your VeregOS Cloud, such as: physical hardware (host tenant only), storage utilization per tier, import jobs, system warnings and errors, and more. Additional [**Subscription Profiles**](/product-guide/subscriptionprofiles) can be defined if further notification/alert scenarios are needed.  

12. **For On Demand Subscriptions** (alerts): Select a ***Reminder while active*** interval from the dropdown list to define how often reminder alerts should be received until a Resolved state (at which point, a Resolved alert is sent.) This setting pertains to alerts based on error/warning statuses or thresholds. *Applies to **On-Demand subscriptions only.***  
          <br>
          
       ### Reminder - Example 1:

     **Configuration:**

     -   Target Type: vSAN Tier
     -   Target: 1
     -   Type: On Demand
     -   Profile: vSAN Tier High Usage (80%)
     -   Reminder while active: Daily
    
    <br>
  
     **In Action:**

    - vSAN tier-1 hits 80% usage, triggering an alert email.
    - The next day tier-1 is still greater than 80% usage, so a Reminder alert is emailed.
    - The following day, tier-1 is still greater than 80% so a Reminder alert is emailed again.
    - By the third day, the system engineer has scaled up the vSAN, taking the usage down to 60%.
    - A "Resolved" message is sent because the storage no longer hits the alert criteria and reminder alerts cease.
    
    <br>

    ### Reminder - Example 2:
     
    **Configuration:**
    -   Target Type/Target: System Dashboard
    -   Type: On Demand
    -   Profile: System Dashboard Status Warnings or Errors
    -   Reminder while active: hourly
    
    <br>
    
    **In Action:**

    - A tenant Error occurs and automatically bubbles up to the Main Dashboard, triggering this subscription to send an alert email.
    - An hour later the error is still there, so a Reminder alert is triggered.
    - Each hour, Reminder alerts are sent.
    - When the error is fixed and no longer shows an Error Status, a Resolved email message is sent and reminder alerts cease.


<br>
    

13. **For On Demand Subscriptions**: specify a ***Throttle*** for the subscription alerts to define a limiting interval (in minutes) for how often this subscription will send alerts. For example: if a subscription is created for Main Dashboard Log Errors, and an error starts continually occurring in the log, the throttle will limit the rate that subscription alerts are sent (rather than sending a new alert for each time the error appears in the log.) *Applies to **On-Demand subscriptions only.***


14. **For Scheduled Subscriptions**: 
Specify ***Frequency*** and **scheduling options**, (such as time, day of week, etc. options will vary based on the frequency selected.)

1.  Click **Submit** to save the subscription.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }