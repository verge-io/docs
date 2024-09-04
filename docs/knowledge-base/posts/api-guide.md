---
title: API Guide
slug: verge-api-guide
description: A comprehensive guide to using the VergeOS API.
published: true
date: 2024-09-02T16:54:06.293Z
tags: api, tables, schema, definitions, description, methods, development, dev, devops
categories:
  - API
editor: markdown
dateCreated: 2024-09-02T16:54:06.293Z
---

# API Guide

## Overview

The VergeOS API allows developers to interact with the VergeOS system programmatically. It provides access to system operations such as creating virtual machines, managing resources, and interacting with billing and catalog repositories. The API uses standard REST-like conventions and supports multiple authentication methods. This guide provides an overview of the VergeOS API, endpoint documentation, example requests, and error handling.

This document outlines the usage of the API. Detailed information for the API can be found within the VergeOS UI as a Swagger documentation page, which is dynamically generated and shows a complete listing of available API tables and operations.

### Swagger Interface

To access the Swagger documentation in the VergeOS UI:

1. **Login** to the VergeOS system with valid credentials.
2. From the Main Dashboard, click **System** in the left menu.
3. In the System Dashboard, find the **API Documentation** link at the bottom left and click it.
4. The Swagger documentation page will open. This page provides detailed examples for each API operation, including the ability to test the API directly.
   
   ![Swagger Documentation Example](/docs/public/api1.png)
   
5. Select an individual table and choose one of the available **GET/POST/DELETE/PUT** options to view and test API actions.

   ![Swagger Documentation Example](/docs/public/api2.png)
   
6. Specify the parameters and click the **Execute Button** to run the API command. This will return the response, which includes the response body, header, and a curl example.

   ![Swagger Documentation Example](/docs/public/api3.png)


## API Basics

### HTTP Methods

The VergeOS API uses standard HTTP methods like GET, POST, PUT, and DELETE for resource manipulation.

### GET Parameters

- **fields**: Specify which fields to return in the result set.
- **filter**: Filter the result set based on certain criteria.
- **sort**: Sort the results by a specified field.
- **limit**: Limit the number of returned results.

### Authentication

All API requests must be made over HTTPS and require authentication using basic access authentication or a session token.

## Additional Notes

- **Rate Limits**: The API supports a maximum of 1000 requests per hour per API key.
- **Data Formats**: All responses are returned in JSON format.
- **Pagination**: Endpoints that return large sets of data support pagination using `offset` and `limit` query parameters.

---

## Authentication

VergeOS supports two methods of authentication:

1. **Basic HTTP Authentication**  
   The API is available only through SSL.

2. **Token-based Authentication**  
   Developers must request a token from the API by posting to the `/sys/tokens` endpoint. The token is then passed in subsequent API requests in the `x-yottabyte-token` header.

### Example Authentication Request

To obtain a token:
```bash
curl --header "X-JSON-Non-Compact: 1" --basic --data-ascii '{"login": "USERNAME", "password": "PASSWORD"}' --insecure --request "POST" --header 'Content-Type: application/json' 'https://your-verge-instance.com/api/sys/tokens'
```

Example response:
```json
{
   "location":"\\/sys\\/tokens\\/3a334563456378845634563b7b82d2efcadce9",
   "dbpath":"tokens\\/3a334563456378845634563b7b82d2efcadce9",
   "$row":1,
   "$key":"3a334563456378845634563b7b82d2efcadce9"
}
```

Use the token from the `"$key"` field in all subsequent requests:

```bash
x-yottabyte-token: 3a334563456378845634563b7b82d2efcadce9
```

To log out, send a DELETE request to the `/sys/tokens/{token}` endpoint.

### Example Logout Request

```bash
DELETE /sys/tokens/3a334563456378845634563b7b82d2efcadce9
```
---

### Example Virtual Machines

The **VMs** section of the VergeOS API allows users to manage virtual machines programmatically. It includes endpoints to list, create, modify, and delete VMs.

### Retrieve a List of Virtual Machines

**Endpoint**:  
`GET /v4/vms?fields=most`

**Description**:  
Retrieves a list of all VMs in the system with details such as CPU cores, RAM, machine type, and configuration details.

**Example Request**:
```bash
curl -X 'GET' \
  'https://your-verge-instance.com/api/v4/vms?fields=most' \
  -H 'accept: application/json' \
  -H 'x-yottabyte-token: <your-token>'
```

**Example Response**:
```json
[
  {
    "$key": 1,
    "name": "CentOS 7 (Latest) 1.0-7",
    "machine": 7,
    "cpu_cores": 2,
    "cpu_type": "Cascadelake-Server",
    "ram": 2048,
    "os_family": "linux",
    "is_snapshot": true,
    "boot_order": "cd",
    "rtc_base": "utc",
    "console": "vnc",
    "uefi": false,
    "secure_boot": false,
    "serial_port": true,
    "uuid": "d3914756-4ec5-9dfe-5c45-b28af2fd3d73",
    "created": 1724435418,
    "modified": 1724435418
  }
]
```

**Overview of the Data Returned**:

- **$key**: The unique identifier for the VM.
- **name**: The name of the virtual machine.
- **machine**: Machine ID associated with the VM.
- **cpu_cores**: Number of CPU cores allocated to the VM.
- **ram**: Amount of RAM allocated (in MB).
- **os_family**: Operating system type.
- **uuid**: Universally unique identifier (UUID) for the VM.
- **created**: The creation timestamp.
- **modified**: The last modified timestamp.

---

### Create a New Virtual Machine

**Endpoint**:  
`POST /v4/vms`

**Description**:  
Creates a new virtual machine with specific configuration details, such as CPU cores, RAM, machine type, boot order, etc.

**Example Request**:
```bash
curl -X 'POST' \
  'https://your-verge-instance.com/api/v4/vms' \
  -H 'accept: application/json' \
  -H 'x-yottabyte-token: <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "rest",
    "description": "test",
    "machine_type": "pc-q35-9.0",
    "allow_hotplug": true,
    "cpu_cores": 1,
    "cpu_type": "Broadwell",
    "ram": 1024,
    "os_family": "linux",
    "boot_order": "cd",
    "uefi": false,
    "note": "test vm"
  }'
```

**Example Response**:
```json
{
  "location": "/v4/vms/36",
  "dbpath": "vms/36",
  "$row": 36,
  "$key": "36"
}
```

**Overview of the Data Returned**:

- **location**: The location of the newly created VM resource.
- **dbpath**: Database path of the new VM.
- **$row**: Row ID of the VM.
- **$key**: Unique key for the VM.

---

### Example Virtual Networks (Vnets)

The **Vnets** section of the VergeOS API allows users to manage virtual networks (Vnets) programmatically. It includes endpoints to retrieve, create, and manage network resources, including internal and external networks, and allows advanced options like rate limiting.

### Retrieve Vnet Details

**Endpoint**:  
`GET /v4/vnets?fields=most`

**Description**:  
Retrieves a list of all Vnets in the system with details such as network type, MTU, DHCP settings, and DNS configuration.

**Example Request**:
```bash
curl -X 'GET' \
  'https://your-verge-instance.com/api/v4/vnets?fields=most' \
  -H 'accept: application/json' \
  -H 'x-yottabyte-token: <your-token>'
```

**Example Response**:
```json
[
  {
    "$key": 6,
    "name": "Internal Test 1",
    "advanced_options": {
      "dnsmasq": [
        "--dhcp-boot=netboot.xyz.kpxe,,192.168.10.20",
        "--dhcp-match=set:efi-x86,option:client-arch,6",
        "--dhcp-boot=tag:efi-x86,netboot.xyz.efi,,192.168.10.20",
        "--dhcp-match=set:efi-x86_64,option:client-arch,7",
        "--dhcp-boot=tag:efi-x86_64,netboot.xyz.efi,,192.168.10.20",
        "--dhcp-match=set:efi-x86_64,option:client-arch,9",
        "--dhcp-boot=tag:efi-x86_64,netboot.xyz.efi,,192.168.10.20"
      ]
    },
    "type": "internal",
    "layer2_type": "vxlan",
    "network": "192.168.100.0/24",
    "mtu": 9000,
    "dhcp_enabled": true,
    "dhcp_start": "192.168.100.100",
    "dhcp_stop": "192.168.100.200",
    "rate_limit": 0,
    "rate_limit_type": "mbytes/second",
    "gateway": ""
  }
]
```

**Overview of the Data Returned**:

- **$key**: The unique identifier for the Vnet.
- **name**: Name of the virtual network.
- **advanced_options**: Advanced options to be passed to services running inside the network, in this example netboot flags for dnsmasq
- **type**: Network type (e.g., "internal").
- **layer2_type**: The type of Layer 2 networking, such as VXLAN.
- **network**: Network CIDR block.
- **mtu**: Maximum Transmission Unit (MTU) size.
- **dhcp_enabled**: Indicates whether DHCP is enabled for this network.
- **dhcp_start**: Starting IP address for the DHCP pool.
- **dhcp_stop**: Ending IP address for the DHCP pool.
- **rate_limit**: Rate limit for the network (in mbytes/second).
- **gateway**: The default gateway for the network.

---

### Create an Internal Network with Rate Limiting

**Endpoint**:  
`POST /v4/vnets`

**Description**:  
Creates a new internal virtual network with rate limiting and DHCP settings.

**Example Request**:
```bash
curl -X 'POST' \
  'https://your-verge-instance.com/api/v4/vnets' \
  -H 'accept: application/json' \
  -H 'x-yottabyte-token: <your-token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"int1",
    "description":"workloads",
    "type":"internal",
    "mtu":"9000",
    "network":"192.168.80.0/24",
    "gateway":"192.168.80.1",
    "dnslist":"1.1.1.1",
    "dhcp_enabled": true,
    "rate_limit": 100,
    "rate_limit_burst": 500,
    "dhcp_start":"192.168.80.100",
    "dhcp_stop":"192.168.80.200"
  }'
```

**Example Response**:
```json
{
  "location": "/v4/vnets/8",
  "dbpath": "vnets/8",
  "$row": 8,
  "$key": "8"
}
```

**Overview of the Data Returned**:
- **location**: The location of the newly created Vnet resource.
- **dbpath**: Database path of the new Vnet.
- **$row**: Row ID of the Vnet.
- **$key**: Unique key for the Vnet.

---

Here's the **Resources** section formatted for the API guide:


## Resources

Below is an example URL used to query a list of machines.

*Example: https://user1:xxxxxx@server1.verge.io/api/v4/machines?fields=all*

|     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| https:// | user | :   | password | @   | server | /api | /v4/machines | ?   | filter=&fields=all&sort=&limit= |
|     | User name |     | User Password |     | Server host name or IP |     | Resource location (URI) |     | These options are described below |

### GET Options

#### Fields

- **Specify which fields to return in the result set (may also be a view if there is one defined for the table schema)**.
- **all** returns every field.
- **most** returns most fields except for argument fields and rows.
- **summary** returns fields marked as 'summary' in their schema.
- Example: `fields=name,email,enabled,groups[all] as all_groups,collapse(groups[name]) as first_groups_name`

Field functions:
- **collapse**
- **datetime**
- **upper**
- **lower**
- **count**
- **diskspace**
- **display**
- **hex**
- **sha1**
- **sum**
- **avg**
- **min**
- **max**

#### Filter

- Filter result sets by specified criteria.
- Similar to [OData](https://msdn.microsoft.com/en-us/library/gg309461%28v=crm.7%29.aspx#BKMK_filter).
- Example: `filter=enabled eq true and size gt 1048576`.
- Example: `filter=cputype eq 'qemu' or cputype eq 'kvm'`.

| Operator | Description          |
| -------- | -------------------- |
| *eq*     | Equal                |
| *ne*     | Not equal            |
| *gt*     | Greater than         |
| *ge*     | Greater than or equal|
| *lt*     | Less than            |
| *le*     | Less than or equal   |
| *bw*     | Begins with          |
| *ew*     | Ends with            |
| *and*    | Logical and          |
| *or*     | Logical or           |
| *cs*     | Contains string (case sensitive)|
| *ct*     | Contains text (case insensitive)|
| *rx*     | Regex match          |

#### Sort

- Sort results by the specified field.
- Example: `sort=+name`.
- Example: `sort=-id`.

#### Limit

- **limit** (integer) limits the result set to a specified number of entries. A value of 0 means unlimited.
- Example: `limit=1`.

### Generic HTTP Response Codes

- **400 - Bad Request**: The request was invalid.
- **401 - Failed Login / Login Required**: Authentication failed or is required.
- **403 - Permission Denied**: You lack the required permissions.
- **404 - Resource Not Found**: The requested row or API does not exist.
- **405 - Not Permitted**: The operation is not allowed.
- **409 - Row Exists**: The resource already exists.
- **422 - Failed Validation / Invalid Parameter**: Validation failed.
- **500 - Internal Server Error**: An unhandled error occurred.

#### POST-Specific

- **201 - Created**: A new row/resource was successfully created.

#### Websocket-Specific (Used for VNC/SPICE)

- **101 - Switching Protocols**: The protocol was successfully switched.

#### PUT/GET/DELETE

- **200 - Success**: The operation completed successfully.

---

### Schema Table Definitions 

#### Field Types

- **bool**
- **text**
- **string**
- **num**
- **uint8**
- **uint16**
- **uint32**
- **uint64**
- **int8**
- **int16**
- **int32**
- **int64**
- **enabled**
- **created**
- **created_ms**
- **created_us**
- **modified**
- **modified_ms**
- **modified_us**
- **filename**
- **filesize**
- **fileused**
- **fileallocated**
- **filemodified**
- **json**
- **row**
- **rows**

#### Schema Owner / Parent Field

- **Owner Field**: If the owner field is null, normal permissions apply. If the owner field has a value, permissions are replaced by a permission check to the owner.
- **Parent Field**: The permission check is applied to the row itself, and if permissions fail, permissions are also checked on the parent row.

---

### Full Table Schema

To retrieve a table’s schema, append **$table** to the URI:

**/api/v4/machines/$table** (replace "machines" with the table name).

You will be prompted for your credentials; this requires VergeOS admin credentials. The output will be in JSON format. Firefox displays this in a readable format by default, but other browsers may require exporting the JSON to an external program for better readability.

---

### Example Errors

#### Example Error (HTTP Code 422)

```json
{
  "err": "Validation error on field: 'dhcp_start' - 'fails validation test'"
}
```


VergeOS uses standard HTTP status codes to indicate the result of an API request.

- **400 Bad Request**: The request is invalid or cannot be processed.
- **401 Unauthorized**: The API key is missing or invalid.
- **403 Forbidden**: The API key lacks the required permissions.
- **404 Not Found**: The resource does not exist.
- **500 Internal Server Error**: A server error occurred.


