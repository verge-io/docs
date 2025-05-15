---
title: Power monitoring in VergeOS
slug: power-monitoring-in-vergeos
description: A guide on implementing a power monitoring script to allow the automated shutdown of your Verge.io environment.
draft: false
date: 2025-05-08T14:37:37.000Z
tags:
  - power
  - automation
  - ups
categories:
  - Automation
  - Best Practices
  - Snapshot
  - System Administration
editor: markdown
dateCreated: 2025-05-08T13:37:37.000Z
---
# Verge.io Power monitoring and shutdown for PRTG and Grafana Integration

This guide explains how to integrate the Verge.io emergency shutdown script with PRTG and Grafana monitoring systems. This integration allows automated shutdown of your Verge.io environment based on predefined conditions or alerts.

This script performs the following actions:

1. Creates a timestamped cloud snapshot for backup/recovery
2. Hibernates all running VMs to preserve their state (This requires the Guest Agent to be installed)
3. Safely shuts down all clusters

!!! Critical Warning
    The emergency shutdown script is a powerful administrative tool. Improper usage can result in:
    - System outages
    - Service interruptions
    - Potential data loss
    
    Exercise extreme caution and ensure proper understanding before execution.

## Complete Script

Here is the complete script that you can use for emergency shutdown:

```bash
#!/bin/bash

# Define your variables
VERGE_HOST="your-verge-instance.com"  # Replace with your Verge.io instance hostname/IP
USERNAME="admin"                      # Replace with your username but don't include password

# SECURITY NOTE: Setting the password directly in the script is less secure 
# than using the interactive prompt. Only use this for automation where necessary.
# PASSWORD="your-password-here"       # Uncomment and set this for automated runs

SNAPSHOT_NAME="Pre-PowerOutage-Emergency-$(date +%Y%m%d%H%M)"
# Change the number in the next variable to how ever many days that you want to retain the cloud snapshot
SNAPSHOT_EXPIRATION="$(date -d "+7 days" +%s)"

# If PASSWORD is not set from the variable above, prompt for it
if [ -z "$PASSWORD" ]; then
  # Prompt for password securely (won't be displayed on screen)
  echo -n "Enter password for $USERNAME: "
  read -s PASSWORD
  echo ""  # Add a newline after password input
fi

# Get the API token
TOKEN_RESPONSE=$(curl -k --header "X-JSON-Non-Compact: 1" --basic --data-ascii "{\"login\": \"$USERNAME\", \"password\": \"$PASSWORD\"}" --request "POST" --header 'Content-Type: application/json' "https://$VERGE_HOST/api/sys/tokens")

# Clear the password from memory for security
PASSWORD=""

# Extract the token
TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"$key":"[^"]*"' | cut -d'"' -f4)

# Check if token was obtained
if [ -z "$TOKEN" ]; then
  echo "Failed to get token. Response was: $TOKEN_RESPONSE"
  exit 1
fi

# Take a cloud snapshot
echo "Creating cloud snapshot: $SNAPSHOT_NAME"
curl -k -X 'POST' "https://$VERGE_HOST/api/v4/cloud_snapshots" -H 'accept: application/json' -H "x-yottabyte-token: $TOKEN" -H 'Content-Type: application/json' -d "{\"name\": \"$SNAPSHOT_NAME\", \"expires_type\": \"date\", \"expires\": \"$SNAPSHOT_EXPIRATION\", \"description\": \"Snapshot taken before power outage shutdown\", \"private\": \"true\"}"
echo "Waiting for snapshot to complete..."
sleep 60

# Get all VMs without filtering
echo "Fetching all VMs and filtering client-side for running status..."
VM_RESPONSE=$(curl -k -X GET "https://$VERGE_HOST/api/v4/vms?fields=%24key,name,cpu_cores,ram,machine%23status%23status%20as%20status" -H "accept: application/json" -H "x-yottabyte-token: $TOKEN")

echo "Got VM response. Now extracting running VMs..."

# Extract VMs with "running" status to a temp file for easier processing
TEMP_FILE=$(mktemp)
echo "$VM_RESPONSE" > "$TEMP_FILE"

# Process the JSON manually to get running VMs
# First, replace opening and closing brackets with newlines to get each VM on its own line
sed -i 's/\[/\n/g; s/\]/\n/g; s/},{/}\n{/g' "$TEMP_FILE"

# Create a file of just the running VMs
RUNNING_FILE=$(mktemp)
grep '"status":"running"' "$TEMP_FILE" > "$RUNNING_FILE"

echo "Found running VMs:"
cat "$RUNNING_FILE"

# Count running VMs
VM_COUNT=$(grep -c '"status":"running"' "$RUNNING_FILE")
echo "Found $VM_COUNT running VMs to hibernate"

# If no running VMs, skip VM hibernate
if [ $VM_COUNT -eq 0 ]; then
  echo "No running VMs found to hibernate."
else
  # Process each running VM
  VM_NUM=0
  cat "$RUNNING_FILE" | while read -r VM_JSON; do
    # Skip empty lines
    if [ -z "$VM_JSON" ]; then
      continue
    fi
    
    VM_NUM=$((VM_NUM+1))
    
    # Extract key and name
    VM_KEY=$(echo "$VM_JSON" | grep -o '"$key":[0-9]*' | cut -d':' -f2)
    VM_NAME=$(echo "$VM_JSON" | grep -o '"name":"[^"]*"' | cut -d':' -f2 | tr -d '"}')
    
    echo -e "\n($VM_NUM/$VM_COUNT) Processing VM: $VM_NAME (ID: $VM_KEY)"
    
    if [ -n "$VM_KEY" ]; then
      echo "Sending hibernate command to VM: $VM_NAME (ID: $VM_KEY)"
      
      # Send the hibernate command to the VM
      HIBERNATE_RESPONSE=$(curl -k -X POST "https://$VERGE_HOST/api/v4/vm_actions" -H "Content-Type: application/json" -H "accept: application/json" -H "x-yottabyte-token: $TOKEN" -d "{\"vm\":\"$VM_KEY\", \"action\":\"hibernate\"}")
      
      echo "Response from API: $HIBERNATE_RESPONSE"
      echo "VM $VM_NAME hibernation command completed"
      
      # Clear the VM variables after each VM is processed
      VM_KEY=""
      VM_NAME=""
      HIBERNATE_RESPONSE=""
    else
      echo "Failed to extract VM key from: $VM_JSON"
    fi
  done
  
  echo -e "\nAll VM hibernation commands completed."
fi

# Clean up temp files
rm -f "$TEMP_FILE" "$RUNNING_FILE"

# Now get the list of clusters and shut them down
echo -e "\nGetting list of clusters..."
CLUSTERS_RESPONSE=$(curl -k -X GET "https://$VERGE_HOST/api/v4/clusters?fields=most" -H "accept: application/json" -H "x-yottabyte-token: $TOKEN")

# Save the response to a file for better processing
CLUSTERS_FILE=$(mktemp)
echo "$CLUSTERS_RESPONSE" > "$CLUSTERS_FILE"

# Extract cluster IDs (using $key as you indicated)
echo "Extracting cluster IDs..."
CLUSTER_KEYS=$(grep -o '"$key":[0-9]*' "$CLUSTERS_FILE" | cut -d':' -f2)
echo "Found clusters with IDs: $CLUSTER_KEYS"

# Ask for confirmation before proceeding
# Comment out this confirmation section when using in automated environments
# Uncomment for interactive use
# : '
# echo -e "\n⚠️  WARNING: You are about to power off all clusters! ⚠️"
# echo "This will shut down all nodes in your Verge.io environment."
# echo -n "Are you sure you want to proceed? (yes/no): "
# read CONFIRMATION

# For automated use, set CONFIRMATION to "yes" directly
CONFIRMATION="yes"

if [ "$CONFIRMATION" != "yes" ]; then
  echo "Cluster power off cancelled."
  exit 0
fi
'

# Process each cluster for shutdown
for CLUSTER_KEY in $CLUSTER_KEYS; do
  # Get the cluster name - looks for the name near the $key
  CLUSTER_NAME=$(grep -A5 "\"$key\":$CLUSTER_KEY" "$CLUSTERS_FILE" | grep -o '"name":"[^"]*"' | head -1 | cut -d':' -f2 | tr -d '"}')
  
  echo -e "\nSending shutdown command to cluster: $CLUSTER_NAME (ID: $CLUSTER_KEY)"
  
  # Send the confirmed working "shutdown" action
  SHUTDOWN_RESPONSE=$(curl -k -X POST "https://$VERGE_HOST/api/v4/cluster_actions" -H "Content-Type: application/json" -H "accept: application/json" -H "x-yottabyte-token: $TOKEN" -d "{\"cluster\":\"$CLUSTER_KEY\", \"action\":\"shutdown\"}")
  
  echo "Response from API: $SHUTDOWN_RESPONSE"
  echo "Cluster $CLUSTER_NAME shutdown command sent"
done

# All clusters have been processed
echo -e "\nAll cluster shutdown commands completed."
echo "The clusters should now be in the process of shutting down."
echo "For restart: Remember to power on Node1 first, followed by Node2, and then other nodes with a 1-minute interval between each."

# Clean up
rm -f "$CLUSTERS_FILE"

# Clear all variables at the end of the script for security
VERGE_HOST=""
USERNAME=""
# PASSWORD is already cleared earlier for security
SNAPSHOT_NAME=""
SNAPSHOT_EXPIRATION=""
TOKEN_RESPONSE=""
TOKEN=""
VM_RESPONSE=""
TEMP_FILE=""
RUNNING_FILE=""
VM_COUNT=""
VM_NUM=""
VM_JSON=""
CLUSTERS_RESPONSE=""
CLUSTERS_FILE=""
CLUSTER_KEYS=""
CLUSTER_KEY=""
CLUSTER_NAME=""
SHUTDOWN_RESPONSE=""
CONFIRMATION=""

echo "All sensitive variables have been cleared from memory."
```

Save this script as `vergeio_shutdown.sh` and make it executable with `chmod +x vergeio_shutdown.sh`.

## Script Modifications for Automation

When using the script in an automated environment like PRTG or Grafana, you need to make a few modifications:

1. **Enable hardcoded credentials**: Uncomment and set the PASSWORD variable at the top of the script
2. **Skip the interactive confirmation**: The script has already been modified to bypass the confirmation prompt
3. **Add automation-specific logging**: Consider adding logging to a file for tracking when triggered automatically

For production use, consider these additional security measures:

- Store the script with restricted permissions: `chmod 700 vergeio_shutdown.sh`
- Use a dedicated service account with limited permissions in Verge.io
- Consider using an external secret manager instead of hardcoding the password

## PRTG Integration

### Prerequisites

- PRTG Network Monitor installed
- SSH access to the server where the script will run
- Administrative access to Verge.io

### Setup Process

#### 1. Prepare the Script

1. Save the script from above to a file named `vergeio_shutdown.sh` on a server that can access your Verge.io environment
2. Make it executable: `chmod +x vergeio_shutdown.sh`
3. Edit the script to include your Verge.io environment details:
   ```bash
   VERGE_HOST="your-verge-instance.com"
   USERNAME="admin"
   PASSWORD="your-password-here"  # Uncomment for automated use
   ```

#### 2. Create a Custom SSH Script Sensor in PRTG

1. Log in to your PRTG web interface
2. Navigate to the device where you want to add the sensor
3. Click **Add Sensor**
4. Search for and select **SSH Script**
5. Configure the sensor:
   - **Name**: Verge.io Emergency Shutdown
   - **Tags**: vergeio, shutdown, emergency
   - **Priority**: 5 (highest)
   - **Script**: Select "Load file" and upload your script or paste its content
   - **Parameters**: Leave empty (script contains all necessary parameters)
   - **Script Return Value**: Select "Success message"
   - **Authentication**: Configure SSH credentials for the server hosting the script

6. Click **Create** to add the sensor

#### 3. Configure Notification Triggers

1. Go to **Setup > Account Settings > Notifications**
2. Create a new notification or edit an existing one
3. Configure the "Execute Program" action:
   - **Program File**: Path to your script
   - **Parameter**: (Leave empty, no parameters needed)
   - **Timeout**: 300 seconds (adjust based on your environment size)

4. Assign this notification to triggers or alerts that should initiate a shutdown

#### 4. Testing

Test the integration by:

1. Running the sensor manually from PRTG
2. Verifying script execution in the PRTG logs
3. Checking your Verge.io environment to confirm hibernation and shutdown

### Automated Operation

Once configured, this sensor can:

- Be triggered by threshold violations on other sensors (power, temperature, etc.)
- Be run manually during emergencies
- Execute on a schedule for planned maintenance

For maximum reliability, configure the script with hardcoded credentials and restrict file permissions to prevent unauthorized access.

## Grafana Integration

### Prerequisites

- Grafana installed and configured
- Appropriate data sources connected to Grafana
- Grafana Alert Manager configured

### Setup Process

#### 1. Prepare the Script

Prepare the script as described in the PRTG section, ensuring it's available on a server accessible by Grafana.

#### 2. Configure Webhook Endpoint

1. Set up a simple webhook endpoint using a lightweight web server like Flask or Express
2. Create a route that executes the shutdown script when called
3. Example Flask implementation:

```python
from flask import Flask, request
import subprocess
import os

app = Flask(__name__)

@app.route('/shutdown-vergeio', methods=['POST'])
def shutdown_vergeio():
    # Execute the script with automatic confirmation
    result = subprocess.run(
        ['/path/to/vergeio_shutdown.sh'],
        capture_output=True,
        text=True
    )
    return {"status": "initiated", "output": result.stdout}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

4. Secure this endpoint with proper authentication

#### 3. Configure Grafana Alert

1. In Grafana, navigate to **Alerting > Alert Rules**
2. Create a new alert rule or edit an existing one
3. Configure conditions based on your monitoring needs
4. Under **Notifications**:
   - Set up a new contact point using the Webhook type
   - URL: `http://your-server:5000/shutdown-vergeio`
   - HTTP Method: POST
   - Add any required authorization headers

5. Save the alert rule and notification policy

#### 4. Create Emergency Shutdown Dashboard

1. Create a dedicated dashboard for emergency operations
2. Add a button panel using a plugin like "Button Panel" or "Boom Table"
3. Configure the button to call your webhook endpoint
4. Add appropriate confirmation dialogs to prevent accidental activation

#### 5. Testing

Test the integration by:

1. Triggering the alert manually
2. Verifying script execution via logs
3. Confirming your Verge.io environment behaves as expected

### Advanced Configuration

For more robust implementations, consider:

- Implementing rate limiting to prevent multiple rapid shutdown attempts
- Adding status tracking to monitor the shutdown progress
- Creating a webhook that can also restore systems after conditions normalize

## Monitoring the Shutdown Process

When the shutdown process is initiated, both PRTG and Grafana can monitor its progress:

### PRTG Monitoring

1. Create a second SSH script sensor that checks for active VMs and clusters
2. Configure it to run periodically during the shutdown process
3. Set up appropriate thresholds to track progress

### Grafana Monitoring

1. Create a dashboard panel that queries the Verge.io API for system status
2. Use Grafana transformations to visualize the shutdown progress
3. Add annotations to mark key events in the shutdown sequence

## Troubleshooting

Common issues and solutions:

### Script Execution Failures

- Check file permissions: `chmod +x vergeio_shutdown.sh`
- Verify network connectivity to Verge.io
- Check credentials in the script

### Incomplete Shutdowns

- Increase script timeout values
- Check Verge.io logs for errors
- Verify API token permissions

### False Triggers

- Add confirmation mechanisms to prevent accidental shutdowns
- Implement alert debouncing
- Use multiple condition checks before triggering


This integration allows automatic or manual emergency shutdown of your Verge.io environment based on monitoring conditions. By properly configuring PRTG and Grafana, you can protect your infrastructure during power outages.

---

!!! note "Document Information"
    - Last Updated: 2025-05-08
    - VergeOS Version: 4.13.4