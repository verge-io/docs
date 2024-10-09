# Subscriptions

Subscriptions deliver emails for scheduled reporting and triggered alerting.

## Subscription Types

### On-Demand

Triggered alerts are based on threshold settings, warnings, or errors. These are intended to let administrators know as soon as there is a potential issue. Example triggers for On-Demand subscriptions:

* Storage reaches a specified % used
* Update packages available
* Errors/warnings
* Status Changes

### Scheduled

Specified information is sent based on configured times/intervals. These are intended to provide summaries of current system information. This can assist administrators in everyday supervision of systems, tracking trends, etc. Scheduled subscriptions provide dashboard or listing information to the Administrator. Examples of scheduled subscriptions include:

* System dashboard sent daily
* vSAN tier Dashboard sent weekly

!!! tip "Efficient Monitoring"
    Efficiently monitoring a VergeOS Cloud will involve creating **multiple *On-Demand* and *Scheduled* subscriptions**.

## Create a New Subscription

1. From the Cloud Dashboard, select **System** from the left menu.
2. Select **Subscriptions** from the left menu.
3. Select **New** from the left menu.
4. Select ***Owner Type***:
   * **User** (individual user)
   * **Group** (group of users)
5. Select ***Owner*** from the dropdown list. (Choose from the list of users or list of groups depending on selection in the *Owner Type* field.)
6. Select ***Target Type*** from the dropdown list. This defines the area of the system to report on.
7. Select ***Target*** from the dropdown list. This defines the specific instance, where applicable (for example, a particular storage tier when *Storage Tiers* is selected as Target Type; a single virtual network when *Network* is selected as the Target Type.).
8. Enter a ***Name*** for the subscription. This name displays in the subscriptions listing and in the email messages sent by this subscription.
9. Select the desired **Suspend** setting:
   * **Never** (default) - subscription continues perpetually until deleted or disabled.
   * **Set Date** - subscription does not execute again until the specified date/time.
10. Select the ***Type*** of notification:
    * **On-Demand** - alerts triggered by particular events or specific thresholds; these notifications only occur when specified criteria occurs.
    * **Scheduled** - reports that send at particular intervals/times (e.g. daily, weekly, monthly)
11. Select ***Subscription Profile*** from the dropdown list. (The options available will depend on the option selected in the ***Target*** field.) This defines the information to receive in the notification. A wide array of subscription profiles exist by default, providing the means to oversee all the different parts of your VergeOS Cloud, such as: physical hardware (host tenant only), storage utilization per tier, import jobs, system warnings and errors, and more. Additional [**Subscription Profiles**](/product-guide/subscriptionprofiles) can be defined if further notification/alert scenarios are needed.
12. **For On Demand Subscriptions** (alerts): Select a ***Reminder while active*** interval to define how often reminder alerts should be received until a resolved state (at which point, a resolved alert is sent.) This setting pertains to alerts based on error/warning statuses or thresholds. Applies to ***On-Demand* subscriptions only**.
13. **For On Demand Subscriptions**: specify a ***Throttle*** for the subscription alerts to define a limiting interval (in minutes) for how often this subscription will send alerts. For example: if a subscription is created for Main Dashboard Log Errors, and an error starts continually occurring in the log, the throttle will limit the rate that subscription alerts are sent (rather than sending a new alert for each time the error appears in the log.) *Applies to **On-Demand subscriptions only.***
14. **For Scheduled Subscriptions**: Specify ***Frequency*** and **scheduling options**, (such as time, day of week, etc. options will vary based on the frequency selected.)
15. Click **Submit** to save the subscription.

!!! note "Subscription Name in Email"
    The name defined for the subscription typically appears in the subject of the received email; however, when multiple subscriptions are received within a single email message (e.g. when more than one subscription is scheduled to the same owner at the same time) the name will not appear in the subject line, but will still appear as a heading within the body of the email.

!!! note "Multiple Scheduled Subscriptions"
    Multiple Scheduled subscriptions (to the same owner) set for the same time will be combined into a single email message.

## **Examples - Scheduled Subscriptions**

### **Example 1 - vSAN Tier Dashboard**

Receive a weekly summary (dashboard) for a particular vSAN Tier,  including tier status, usage, read / write stats, etc.
![subscription-vsantierdash.png](/product-guide/screenshots/subscription-vsantierdash.png)

### **Example 2 - Cloud Snapshots Recent**

Receive a daily report with an inventory of all your Current Cloud Snapshots.
![subscription-cloudsnaps-recent.png](/product-guide/screenshots/subscription-cloudsnaps-recent.png)

## **Examples - On-demand Subscriptions**

### **Example 3 - High Usage Alert for a Storage Tier**

Send an alert email to the admin User if Storage Tier 2 usage reaches the High Usage percentage  (**The High Usage Percentage is set to 80% by default**); Send a reminder every 12 hours while the high usage is still in place.  **Throttle alerts to only send 2 per minute**.
![subscriptions-highusagealert.png](/product-guide/screenshots/subscriptions-highusagealert.png)

!!! tip "A Separate Subscription can also be created for a Critical High Usage alert when a storage tier hits **90%**.  Typically, **you would have more frequent reminders** for a Critical High Usage alert."

### **Example 4 - Main Dashboard Status Warnings or Errors**

Send an alert email to all members of the SrvAdmin Group if any warning or error status changes occur on the Main Dashboard; send a Reminder email every **6 hours** while the Warning/Error condition is still in place; throttle the error messages to send only **1 per minute**.

**Configuration:**
![subscriptions-maindash-warnserrors.png](/product-guide/screenshots/subscriptions-maindash-warnserrors.png)

 A vSAN tiers warning and a clusters warning would bubble up to the Main Dashboard and trigger the alert.  Full Dashboard Data is sent within the alert email message.

Subscriptions based on Status errors and warnings will also automatically send a Resolved Message when the status error/warning is no longer in place.
