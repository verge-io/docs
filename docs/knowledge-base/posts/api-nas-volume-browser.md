---
title: NAS Volume Browser API Reference
slug: nas-volume-browser-api
description: How to use the VergeOS volume_browser API to browse NAS volume contents programmatically
author: VergeOS Documentation Team
published: true
date: 2026-01-23
tags: [api, nas, volumes, automation]
categories:
  - API Reference
  - NAS
editor: markdown
dateCreated: 2026-01-23
---

# NAS Volume Browser API Reference

## Overview

!!! info "Key Points"
    - The volume_browser API is **asynchronous** - create a job, then poll for results
    - You **must** include `?fields=id,status,result` when polling or the result won't be returned
    - Use empty string `""` for the root directory path (not `/`)
    - The NAS service VM must be running to browse volumes

The `volume_browser` API provides file system browsing capabilities for NAS volumes. This is useful for automation, integrations, and building custom file management tools.

## Prerequisites

- A running NAS service with at least one online volume
- API access with appropriate permissions
- The volume's SHA1 key identifier (found in the volume dashboard URL or API)

## How It Works

Browsing a volume is a two-step process:

1. **POST** to `/api/v4/volume_browser` to create a browse job
2. **GET** to `/api/v4/volume_browser/{job_id}?fields=id,status,result` to poll for results

## Step 1: Create a Browse Request

### Endpoint

```
POST /api/v4/volume_browser
```

### Request Body

```json
{
  "volume": "62db5fcd888082246b9346c0e65311334d91ed2c",
  "query": "get-dir",
  "params": {
    "dir": "",
    "limit": 1000,
    "offset": null,
    "filter": {
      "extensions": ""
    },
    "volume": "62db5fcd888082246b9346c0e65311334d91ed2c",
    "sort": ""
  }
}
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `volume` | string | Yes | Volume key (SHA1 hash identifier) |
| `query` | string | Yes | Operation type: `get-dir`, `rename`, `delete`, `paste` |
| `params` | object | Yes | Query parameters (see below) |

### Params Object

| Field | Type | Description |
|-------|------|-------------|
| `dir` | string | Directory path to browse. Use `""` for root. |
| `limit` | integer | Maximum number of entries to return (e.g., 1000) |
| `offset` | integer/null | Pagination offset, `null` for first page |
| `filter.extensions` | string | Filter by file extensions (empty string for all) |
| `volume` | string | Volume key (must match top-level `volume`) |
| `sort` | string | Sort field (empty string for default) |

### Response

```json
{
  "location": "/v4/volume_browser/9a00434b882b9933512cc9d3abfd557a182d8fd3",
  "dbpath": "volume_browser/9a00434b882b9933512cc9d3abfd557a182d8fd3",
  "$row": 1,
  "$key": "9a00434b882b9933512cc9d3abfd557a182d8fd3"
}
```

The `$key` field contains the job ID needed for polling.

## Step 2: Poll for Results

### Endpoint

```
GET /api/v4/volume_browser/{job_id}?fields=id,status,result
```

!!! danger "Critical: Request the Result Field"
    The `result` field is **NOT returned by default**. You must explicitly request it with `?fields=id,status,result`. Without this parameter, you will only receive status information.

**Without `?fields=id,status,result`:**
```json
{
  "id": "9a00434b882b9933512cc9d3abfd557a182d8fd3",
  "query": "get-dir",
  "status": "complete",
  "command": ""
}
```

**With `?fields=id,status,result`:**
```json
{
  "id": "9a00434b882b9933512cc9d3abfd557a182d8fd3",
  "status": "complete",
  "result": [
    {"name": "documents", "size": 4096, "date": 1706120819, "type": "directory"},
    {"name": "file.txt", "size": 1024, "date": 1769198797, "type": "file"}
  ]
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `running` | Job is still processing |
| `complete` | Job finished successfully |
| `error` | Job failed (check `result` for error message) |

### Polling Strategy

```
1. POST to create job
2. Wait 200-500ms
3. GET with ?fields=id,status,result
4. If status == "running", wait and retry (up to 30 attempts)
5. If status == "complete", process result
6. If status == "error", handle error
```

## Result Format

When `status` is `complete`, the `result` field contains an array of file/directory entries:

```json
[
  {
    "name": "document.pdf",
    "n_name": "document.pdf",
    "size": 102400,
    "date": 1769136871,
    "type": "file"
  },
  {
    "name": "images",
    "n_name": "images",
    "size": 4096,
    "date": 1769197982,
    "type": "directory"
  }
]
```

### Entry Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | File or directory name |
| `n_name` | string | Normalized name (lowercase) |
| `size` | integer | Size in bytes |
| `date` | integer | Modification time (Unix timestamp) |
| `type` | string | `"file"` or `"directory"` |

### Empty Directories

For empty directories, `result` will be an empty array:

```json
{
  "id": "8cb12559b689f5a52472bd8882dde1c095b2ab64",
  "status": "complete",
  "result": []
}
```

## Examples

### cURL

```bash
# Step 1: Create browse job
JOB_ID=$(curl -s -X POST "https://your-vergeos.example.com/api/v4/volume_browser" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "volume": "62db5fcd888082246b9346c0e65311334d91ed2c",
    "query": "get-dir",
    "params": {
      "dir": "",
      "limit": 1000,
      "offset": null,
      "filter": {"extensions": ""},
      "volume": "62db5fcd888082246b9346c0e65311334d91ed2c",
      "sort": ""
    }
  }' | jq -r '."$key"')

# Step 2: Poll for results (IMPORTANT: include fields parameter)
sleep 1
curl -s "https://your-vergeos.example.com/api/v4/volume_browser/${JOB_ID}?fields=id,status,result" \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Python

```python
import requests
import time

def browse_volume(base_url, token, volume_key, path=""):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # Step 1: Create browse job
    payload = {
        "volume": volume_key,
        "query": "get-dir",
        "params": {
            "dir": path,  # Use "" for root
            "limit": 1000,
            "offset": None,
            "filter": {"extensions": ""},
            "volume": volume_key,
            "sort": ""
        }
    }

    response = requests.post(
        f"{base_url}/api/v4/volume_browser",
        headers=headers,
        json=payload,
        verify=False
    )
    job_id = response.json()["$key"]

    # Step 2: Poll for results
    for _ in range(30):
        time.sleep(0.5)

        # IMPORTANT: Request the result field explicitly
        response = requests.get(
            f"{base_url}/api/v4/volume_browser/{job_id}?fields=id,status,result",
            headers=headers,
            verify=False
        )
        data = response.json()

        if data["status"] == "complete":
            return data.get("result") or []
        elif data["status"] == "error":
            raise Exception(f"Browse failed: {data.get('result')}")

    raise TimeoutError("Browse operation timed out")
```

## Troubleshooting

!!! warning "Common Issues"

    **Result field is empty or missing**

    - You must include `?fields=id,status,result` in your GET request
    - Without this parameter, only status information is returned

    **"VM must be in running state to issue a query"**

    - The NAS service VM is not running
    - Navigate to NAS > NAS Services and start the service

    **"Error getting volumes VM service: No such file or directory"**

    - The volume's NAS service doesn't exist or was deleted
    - Verify the volume is associated with a valid NAS service

    **"Resource '/v4/volume_browser/' not found"**

    - Empty job ID in poll request
    - Ensure you extract `$key` correctly from the POST response

### Common Mistakes

1. **Using `path` instead of `dir`** - The field is named `dir`, not `path`
2. **Sending params as JSON string** - The `params` field must be an object, not a JSON-encoded string
3. **Missing params fields** - All fields in the params object are expected
4. **Forgetting `?fields=id,status,result`** - Without this, no file data is returned

## Requirements

- The NAS service VM must be running to browse volumes
- The volume must be online (mounted)
- User must have read permissions on the volume

## Additional Resources

- [NAS Overview](/product-guide/nas/overview/)
- [NAS Local Volumes](/product-guide/nas/nas-local-volumes/)
- [API Keys](/product-guide/system/api-keys/)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).
