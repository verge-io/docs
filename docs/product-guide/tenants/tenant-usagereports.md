# Tenant Usage Reports

VergeOS stores usage statistics per Tenant to accommodate 95th percentile billing. Additionally, max and average information are recorded.

## Run a History Report for an Individual Tenant

1. Navigate to the **individual Tenant Dashboard**. 
2. Click **History** on the left menu.
3. Select **Filter Period**. (Also enter from/to dates if the custom option is selected.)
4. Click **Apply** to run the reports for the selected period.
5. Graphs will show usage for the specified period. Scroll down the page to see the statistics listing of Average, Maximum, and 95th percentile.
6. Statistics can be exported to a comma delimited text file using the **Export CSV** menu option.  

## Receive Subscription Report (Email) of Tenant Usage

1. From the Main Dashboard, navigate to **System -> Subscriptions -> New**.
2. Configure fields as follows:  

   * **Target Type:** *Tenants Dashboard*
   * **Target:** *Tenants Dashboard*
   * **Type:** *Scheduled*
   * **Subscription Profile:** *Tenants Usage*

For full instructions on creating Subscriptions, see: [**Subscriptions-Overview**](/product-guide/system/subscriptions-overview)

!!! tip "API Usage"
    The [VergeOS API](/knowledge-base/verge-api-guide) can also be utilized to run Tenant usage reports and send to external systems for processing.