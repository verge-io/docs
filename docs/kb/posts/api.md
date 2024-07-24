---
title: API Documentation
slug: api-documentation
description: 
published: true
date: 2023-08-21T19:00:54.373Z
tags: api, tables, schema, definitions, description, methods, development, dev, devops
categories:
  - API
editor: markdown
dateCreated: 2022-12-19T16:54:06.293Z
---

## API Introduction

The VeregOS system offers an API interface for custom development integration.  This document serves to outline use of the API.  Detailed information for the API can be found within the VeregOS UI, as a Swagger wiki page; the wiki page is created dynamically and will show a complete listing of VeregOS tables to access.  
<br>

### Swagger Interface

Customers can access the inline Swagger documentation by navigating following these steps:

1.  **Login** in to any VeregOS system with valid user credentials 
2.  From the Main Dashboard, click **System** on the left menu.
3.  Once inside the System Dashboard, at the **bottom left, there is a link to the API documentation.**

1.  **Click the link to launch the Swagger documentation wiki** (Note: The page may take a couple minutes to load.) The swagger page provides examples of each function, a list of operations for each, and an ability to test each.

1. **Click** an **individual table** in the line to access options:
![api1.png](/public/api1.png)

1. **Click** one of the **GET/POST/DELETE/PUT** options:
![api2.png](/public/api2.png)

1. **Specify** parameters and **click** the **Execute Button** to run the API Command
This will return the response which includes the response body and header. Included is a curl example to be used in your program.
![api3.png](/public/api3.png)
<br>

### Authentication

The following are ways to pass authentication through the API. Currently, VeregOS offers two methods: 

1.  Basic http authentication 
2.  API database table

For the basic http authentication, the API is only available through SSL.

For API Database table, this is done by

1.  Passing a database into the table 
2.  The table responds with a token 
3.  That token needs to pass in all subsequent functions in the header 

To get a login token, developers will need to post to the **/sys/tokens** table for the customer system. As an example, the API URL for a test tenant would be ***https://systemname.systemdomain.com/api/sys/tokens*** . Here is an example curl:

curl --header "X-JSON-Non-Compact: 1" --basic --data-ascii '{"login": "USERNAME", "password": "PASSWORD"}' --insecure --request "POST" --header 'Content-Type: application/json' 'https://test.cloud.Verge.io.com/api/sys/tokens’

Here is an example of what would be returned:

  {

   "location":"\\/sys\\/tokens\\/3a334563456378845634563b7b82d2efcadce9",

   "dbpath":"tokens\\/3a334563456378845634563b7b82d2efcadce9",

   "$row":1,

   "$key":"**3a334563456378845634563b7b82d2efcadce9**"

  }

Developers would now need to pass the value in "**$key**" in the HTTP header "**x-yottabyte-token**".  So in this example a developer would send the following header:

x-yottabyte-token: 3a334563456378845634563b7b82d2efcadce9

To issue a logout for this token/session, the API will need to send a DELETE HTTP Method to **/sys/tokens/3a334563456378845634563b7b82d2efcadce9**

Optionally, when sending API requests, developers can pass the header "**X-JSON-Non-Compact: 1**" to have all responses sent back as friendly-spaced JSON.
<br>

### API Helper Script

Developers can request a copy of the "yb-api" script which is a helper used to make API calls.  For help and a list of options developers can run "yb-api --help".  To run this, connect to a node in your cluster, either directly or through SSH. Then type in the commands there.

![api4.png](/public/api4.png)

Notes regarding yb-api helper script: 

The helper "yb-api" script uses wget, which may not automatically be installed on OSX.  

The helper "yb-api" script also uses curl on an upload function.

*The following are example commands using yb-api:* 

**Get a list of VMs (the filter will make this query exclude VM snapshots):**

yb-api --get --user=admin --server=10.0.0.100 --fields='name,$key,ram,machine#status#status as machine\_status' --filter='is\_snapshot eq false' /v4/vms

**Get a list of VMs Simple Dump (--server, --user, --filter, --fields are optional):**

yb-api --get /v4/vms

**Get most of the fields, including drives and nics, for VM 1 (this number would be the value of $key that is returned in the above query):**

yb-api --get --user=admin --server=10.0.0.100 --fields='most,machine\[most,drives\[most\],nics\[most\]\]' /v4/vms/1

**Change the name of VM 1:**

yb-api --put='{"name":"NEWNAME"}' --user=admin --server=10.0.0.100 /v4/vms/1

**Delete VM 1:**

yb-api --delete --user=admin --server=10.0.0.100 --fields='name,$key,ram' /v4/vms/1

**Create a new VM:**

yb-api --post='{"name":"NEWVM","enabled":true,"description":"test vm","os\_family":"linux","cpu\_cores":4,"ram":"8192"}' --user=admin --server=10.0.0.100 /v4/vms

**Get the VMs database table schema:**

yb-api --get --user=admin --server=10.0.0.100 '/v4/vms/$table'

**Clone VM 1:**

yb-api --get --user=admin --server=10.0.0.100 '/v4/vm\_actions' --post='{"vm":1, "action": "clone", "params": {"name": "NEW VM NAME"}}'

**Power on VM 1:**

yb-api --get --user=admin --server=10.0.0.100 '/v4/vm\_actions' --post='{"vm":1, "action": "poweron"}'
<br>

### API Basics

**Overview**

The yCenter API is [_RESTlike_](https://en.wikipedia.org/wiki/Representational_state_transfer). All API requests must be made over HTTPS and should be authenticated with [_Basic Access Authentication_](https://en.wikipedia.org/wiki/Basic_access_authentication). It is also possible to POST to /api/sys/tokens to create a session and pass that as the header "x-yottabyte-token" which needs to be deleted to log out.

**Resources**

Below is an example URL used to query a list of machines.

*Example: https://user1:xxxxxx@server1.verge.io/api/v4/machines?fields=all*

|     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| https:// | user | :   | password | @   | server | /api | /v4/machines | ?   | filter=&fields=all&sort=&limit= |
|     | User name |     | User Password |     | Server host name or IP |     | Resource location (URI) |     | These options are described below |

**GET Options**

**_Fields_**

-   **Specify which fields to return in the result set (may also be a view if there is one defined for the table schema)**
-   **all is a view for every field**
-   **most is a view for every field except for argument fields and rows**
-   **summary is the default value and only fields that have 'summary' set to 'true' in their schema will be returned**
-   ***fields=name,email,enabled,groups\[all\] as all\_groups,collapse(groups\[name\]) as first\_groups\_name***
-   **field functions:**
    -   **collapse**
    -   **datetime**
    -   **upper**
    -   **lower**
    -   **count**
    -   **diskspace**
    -   **display**
    -   **hex**
    -   **sha1**
    -   **sum**
    -   **avg**
    -   **min**
    -   **max**

**_Filter_**

-   **Filter result set by specified criteria**
-   **Similar to** [**OData**](https://msdn.microsoft.com/en-us/library/gg309461%28v=crm.7%29.aspx#BKMK_filter)
-   **filter=enabled eq true and size gt 1048576**
-   **filter=cputype eq 'qemu' or cputype eq 'kvm'**
-   **When creating a filter a field, it may not be required, make sure it is included in the** **fields list**

|     |     |
| --- | --- |
| **Operator** | **Description** |
| *eq* | Equal |
| *ne* | Not equal |
| *gt* | Greater than |
| *ge* | Greater than or equal |
| *lt* | Less than |
| *le* | Less than or equal |
| *bw* | Begins with |
| *ew* | Ends with |
| *and* | Logical and |
| *or* | Logical or |
| *cs* | Contains string (case sensitive) |
| *ct* | Contains text (case insensitive) |
| *rx* | Regex match |

**Sort**

-   **Sort results by the field specified**
-   ***sort=+name***
-   ***sort=-id ##***

**Limit**

-   **(*****integer*****) limit result set - value of 0 for unlimited**
-   **limit=*****1***

**Generic HTTP Response Codes**

-   **400 - Bad request**
-   **401 - Failed login / login required**
-   **403 - Permission denied**
-   **404 - Row or API doesn't exist**
-   **405 - Not permitted**
-   **409 - Row exists**
-   **422 - Failed validation / Invalid parameter**
-   **500 - Unhandled error code**

**Post Specific**

-   **201 – Created row**

**Websocket Specific (Used for VNC/SPICE)**

-   **101 – Switching protocol**

**PUT/GET/DELETE**

-   **200 – Success**
<br>

### Schema Table Definitions 

#### **Field types:** 

-   **bool**
-   **text**
-   **string**
-   **num**
-   **uint8**
-   **uint16**
-   **uint32**
-   **uint64**
-   **int8**
-   **int16**
-   **int32**
-   **int64**
-   **enabled**
-   **created**
-   **created\_ms**
-   **created\_us**
-   **modified**
-   **modified\_ms**
-   **modified\_us**
-   **filename**
-   **filesize**
-   **fileused**
-   **fileallocated**
-   **filemodified**
-   **json**
-   **row**
-   **rows**

**Schema Owner / Parent Field**

-   **owner field: if owner field is null then normal permissions apply, if owner field has value then permissions are replaced by a permission check to the owner**
-   **parent field: the permission check is applied to the row itself, and if permissions fail then permissions are also checked on the parent**
<br>

### Full Table Schema

To retrieve a table’s schema append *$table* to the URI: 

**/api/v4/machines/$table** (replace machines with the table name)

It will ask for your credentials, this does not support your other authentication methods and requires your VeregOS admin credentials. 

**Note:** The output is in JSON format. Firefox will display this by default in a nice readable format. For other browsers you may want to output to another program to view the JSON correctly.
<br>


### Example Errors

#### **Example Error from Server (HTTP Code 422)**

{  
    "err": "Validation error on field: 'dhcp\_start' - 'fails validation test'"  
}


<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }