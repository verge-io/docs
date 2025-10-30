# API Keys

## Overview

API keys provide authentication for programmatic access to the VergeOS REST API and integrated services. Each API key is associated with a specific user account and inherits that user's permissions and access levels. This allows applications, scripts, and third-party tools to interact with VergeOS without requiring interactive login sessions.

**Common uses for API keys:**

- REST API authentication for automation and integration
- OpenAI-compatible AI router access
- Third-party tool integration (monitoring, orchestration, IaC tools)
- CI/CD pipeline authentication

## Understanding API Key Authentication

API keys in VergeOS function as Bearer tokens in the HTTP Authorization header. Unlike session tokens generated during UI login (which expire after inactivity), API keys remain valid until their configured expiration date or manual deletion.

Each API key inherits all permissions from its associated user account. An API key created for a Tenant Admin user will have Tenant Admin privileges, while a key for a System Admin will have system-wide access.

!!! info "API Keys vs. Session Tokens"
    Session tokens are temporary credentials that expire after inactivity. API keys are designed for long-lived programmatic access and remain valid until expiration or deletion.

## Creating an API Key

### Navigate to API Key Management

1. From the VergeOS main menu, navigate to **System > Users**
2. Select the user account that will own the API key
3. In the user dashboard, click the **API Keys** widget to view existing keys

The API Keys section displays a table with:

- **Name**: Descriptive identifier for each key
- **Last Logged In**: Most recent authentication timestamp
- **Last Logged In IP**: Source IP of last authentication
- **Expires**: Days remaining until expiration
- **Created**: Key generation timestamp

### Create New API Key

1. Click **+ New API Key** at the bottom of the API Keys table
2. The form opens with two panels: **API Key** (left) and **Access** (right)

### Configure API Key Settings

**Name** (Required)
Enter a descriptive identifier for the API key. Clear naming helps with tracking and key management.

**Description** (Optional)
Add additional context about the key's purpose, requester, or related systems.

**Expiration Type**
Choose how the key's validity period is managed:

- **Set Date**: Define a specific expiration date (recommended for security)
- **Never Expire**: Create a perpetual key (use with caution)

**Expires** (When "Set Date" is selected)
Use the date/time picker to set when the key should expire. Common expiration periods are 30, 60, or 90 days.

### Configure Access Controls

**IP Allow List**
Restrict the API key to specific IP addresses or CIDR ranges. Only listed addresses can authenticate with this key.

1. Click the **+ (plus)** icon to add an entry
2. Enter an IP address (e.g., `192.168.1.100`) or CIDR range (e.g., `192.168.1.0/24`)
3. Check the checkbox to enable the entry
4. Add additional entries as needed

**IP Deny List**
Block specific IP addresses or ranges from using this key while allowing all others.

1. Click the **+ (plus)** icon to add an entry
2. Enter the IP address or CIDR range to block
3. Check the checkbox to enable the entry

!!! note "Allow vs. Deny List Priority"
    When both lists are configured, the IP Allow List takes precedence. If an address appears in both lists, the Allow List determines access.

### Save and Retrieve the API Key

1. Review all settings for accuracy
2. Click **Submit** to generate the API key

A popup displays the generated API key with two options:

- **Copy**: Click to copy the full key string to your clipboard
- **Save**: Click to download the key as a `.PAK` (Protected API Key) file

!!! danger "One-Time Display"
    The complete API key is only shown at creation time. Once you close this popup, the full key cannot be retrieved. If you lose the key, you must delete it and create a new one.

After securing the key, close the popup. The new API key appears in the API Keys table.

## Managing Existing API Keys

### Edit an API Key

1. In the API Keys table, locate the key you want to modify
2. Click the **Edit** (pencil) icon next to the key name
3. Update the settings (name, description, expiration, IP lists)
4. Click **Submit** to save changes

!!! note "Key String Cannot Be Changed"
    Editing an API key only updates its metadata and access controls. The actual key string cannot be modified. To change the key string, you must create a new API key and delete the old one.

### Delete an API Key

1. In the API Keys table, locate the key you want to remove
2. Click the **Delete** (trash) icon next to the key name
3. Confirm the deletion

!!! warning "Immediate Revocation"
    Deleting an API key immediately revokes all access. Any applications or scripts using the deleted key will fail authentication.

## Using API Keys

### Authentication Format

API keys are used in the HTTP Authorization header as Bearer tokens:

```
Authorization: Bearer <your-api-key-string>
```

### Example API Request

```bash
curl -X GET "https://your-vergeos-instance/api/v4/system" \
  -H "Authorization: Bearer your-api-key-string-here" \
  -H "Content-Type: application/json"
```

### Environment Variable Storage

For security, load API keys from environment variables rather than hardcoding them:

```bash
# Set environment variable
export VERGEOS_API_KEY="your-api-key-string"

# Use in API request
curl -X GET "https://your-vergeos-instance/api/v4/system" \
  -H "Authorization: Bearer ${VERGEOS_API_KEY}"
```

## Security Considerations

**Treat API Keys Like Passwords**
API keys provide full authentication as the associated user. Protect them with the same care as passwords.

**Use IP Restrictions**
Configure IP Allow Lists whenever possible to limit where the key can be used. This significantly reduces risk if a key is compromised.

**Set Expiration Dates**
Avoid perpetual keys when possible. Regular expiration forces key rotation and limits exposure windows.

**Monitor Key Usage**
Review the "Last Logged In" and "Last Logged In IP" fields regularly to identify unexpected access patterns.

**Delete Unused Keys**
Remove API keys that are no longer needed to minimize your attack surface.

## Troubleshooting

**API Key Authentication Fails**

Verify the key is included correctly in the Authorization header as a Bearer token. Check for extra spaces or truncation.

**Access Denied from Valid Key**

Check the IP Allow/Deny lists. Your source IP may not be permitted, or may be on the Deny list.

**Key Expired**

Check the "Expires" column in the API Keys table. Create a new key if the old one has expired.

**Cannot Retrieve Lost Key**

API keys cannot be recovered after the initial creation popup is closed. Delete the lost key and create a new one.

## Related Resources

- [VergeOS REST API Documentation](/knowledge-base/category/api-reference/) - Complete API reference and endpoints