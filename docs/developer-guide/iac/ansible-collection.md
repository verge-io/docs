# VergeOS Ansible Collection

## Overview

The VergeOS Ansible Collection lets you manage VergeOS virtualization infrastructure through Ansible playbooks and automation workflows. Built on top of the [VergeOS Python SDK](../sdks/python-sdk.md), it provides modules for VM lifecycle management, snapshot workflows, dynamic inventory across multiple sites, and tag-based organization.

Whether you're deploying VMs from OVA templates, automating snapshot schedules, or managing fleets across multiple VergeOS sites, this collection integrates VergeOS into your existing Ansible workflows.

!!! tip "GitHub Repository"
    Full source code, examples, and issue tracker are available at [github.com/verge-io/ansible-collection-vergeos](https://github.com/verge-io/ansible-collection-vergeos){target="_blank"}.

## Requirements

| Dependency | Version |
|------------|---------|
| Python | >= 3.9 |
| Ansible | >= 2.14.0 |
| pyvergeos (VergeOS Python SDK) | >= 1.0.1 |

## Installation

### 1. Install the pyvergeos SDK

The collection requires the VergeOS Python SDK:

```bash
pip install pyvergeos
```

### 2. Install the Collection

**From Ansible Galaxy:**

```bash
ansible-galaxy collection install vergeio.vergeos
```

**From source:**

```bash
ansible-galaxy collection build --force
ansible-galaxy collection install vergeio-vergeos-*.tar.gz --force
```

### 3. For Ansible Execution Environments

If you're using Ansible Execution Environments, add the SDK to your `requirements.txt`:

```
pyvergeos>=1.0.1
```

## Authentication

The simplest way to authenticate is with environment variables:

```bash
export VERGEOS_HOST="your-vergeos-host.example.com"
export VERGEOS_USERNAME="your-username"
export VERGEOS_PASSWORD="your-password"
export VERGEOS_INSECURE="false"  # Set to "true" for self-signed certificates
```

You can also pass credentials directly in your playbook tasks or inventory configuration — see the examples below.

## Usage Examples

### VM Deployment from OVA

Upload your OVA files to VergeOS, then configure and run the example playbooks included in the collection:

```bash
# Deploy a RHEL VM (cloud-init enabled OVA)
ansible-playbook examples/import_and_configure_vm.yml

# Deploy a Windows VM (sysprep generalized OVA)
ansible-playbook examples/import_and_configure_winvm.yml
```

### Snapshot Workflow

Automate VM snapshot creation and management:

```bash
ansible-playbook examples/snapshot_workflow.yml
```

### Snapshot All Production VMs

This example creates snapshots of all VMs tagged "production" across all configured sites:

```yaml
- hosts: tag_production
  connection: local
  gather_facts: false

  tasks:
    - name: Create VM snapshot
      vergeio.vergeos.vm_snapshot:
        host: "{{ vergeos_site_url }}"
        username: "{{ lookup('env', 'VERGEOS_USERNAME') }}"
        password: "{{ lookup('env', 'VERGEOS_PASSWORD') }}"
        name: "{{ vergeos_name }}"
        snapshot_name: "automated-{{ ansible_date_time.date }}"
        state: present
      delegate_to: localhost
```

## Dynamic Inventory

The collection includes a dynamic inventory plugin (`vergeos_vms`) that queries one or more VergeOS sites for VMs via the API.

!!! note "API-Only Inventory"
    This is an API-only inventory plugin. It does **not** set `ansible_host` and does not support direct SSH connections to VMs. Use it with VergeOS modules that operate through the API.

### Single-Site Configuration

Create a file named `inventory.vergeos_vms.yml`:

```yaml
plugin: vergeio.vergeos.vergeos_vms

sites:
  - name: production
    host: vergeos.example.com
    username: admin
    password: "{{ lookup('env', 'VERGEOS_PASSWORD') }}"
    # Or use API key:
    # api_key: "{{ lookup('env', 'VERGEOS_API_KEY') }}"
    insecure: false
```

### Multi-Site Configuration

Query multiple VergeOS sites concurrently:

```yaml
plugin: vergeio.vergeos.vergeos_vms

sites:
  - name: denver
    host: denver.vergeos.local
    username: admin
    password: "{{ lookup('env', 'DENVER_PASS') }}"
  - name: chicago
    host: chicago.vergeos.local
    api_key: "{{ lookup('env', 'CHICAGO_API_KEY') }}"
    insecure: true

# Group hosts by dimensions
group_by:
  - site      # site_denver, site_chicago
  - status    # status_running, status_stopped
  - tags      # tag_production, tag_web
  - tenant
  - os_family
  - cluster
  - node      # node_node1, node_node2

# Filter VMs
filters:
  status: running
  name_pattern: ".*web.*"

# Caching (recommended for production)
cache: true
cache_plugin: jsonfile
cache_connection: ~/.cache/vergeos_inventory
cache_timeout: 3600  # 1 hour
```

### Available Host Variables

Each host in the inventory includes these variables (prefixed with `vergeos_`):

| Variable | Description |
|----------|-------------|
| `vergeos_site` | Site name |
| `vergeos_site_url` | Site API URL |
| `vergeos_vm_id` | VM ID |
| `vergeos_name` | VM name |
| `vergeos_description` | VM description |
| `vergeos_status` | VM status (running, stopped, etc.) |
| `vergeos_ip` | First IP address |
| `vergeos_ram` | RAM in MB |
| `vergeos_cpu_cores` | Number of CPU cores |
| `vergeos_tags` | List of tag names |
| `vergeos_tenant` | Tenant name |
| `vergeos_cluster` | Cluster name |
| `vergeos_node_name` | Node running VM (None if stopped) |
| `vergeos_mac_addresses` | List of MAC addresses |
| `vergeos_nics` | List of NIC details |
| `vergeos_drives` | List of drive details |
| `vergeos_vm_data` | Full VM data dictionary |

### Inventory CLI Usage

```bash
# List all hosts
ansible-inventory -i inventory.vergeos_vms.yml --list

# Show inventory graph
ansible-inventory -i inventory.vergeos_vms.yml --graph

# Run a playbook with the inventory
ansible-playbook -i inventory.vergeos_vms.yml playbook.yml

# Target specific groups
ansible-playbook -i inventory.vergeos_vms.yml playbook.yml --limit tag_production
ansible-playbook -i inventory.vergeos_vms.yml playbook.yml --limit site_denver

# Refresh cached inventory
ansible-inventory -i inventory.vergeos_vms.yml --list --flush-cache
```

## Tag Management

The collection includes modules for creating tag categories, assigning tags, and organizing VMs — which integrates with the inventory plugin's `group_by: tags` feature.

### Create Tag Infrastructure

```yaml
# Create a tag category
- vergeio.vergeos.tag_category:
    host: "{{ vergeos_host }}"
    username: "{{ vergeos_username }}"
    password: "{{ vergeos_password }}"
    name: Environment
    description: "Environment classification"
    taggable_vms: true
    state: present

# Create a tag in the category
- vergeio.vergeos.tag:
    host: "{{ vergeos_host }}"
    username: "{{ vergeos_username }}"
    password: "{{ vergeos_password }}"
    name: Production
    category: Environment
    description: "Production servers"
    state: present
```

### Apply Tags to VMs

```yaml
- vergeio.vergeos.tag:
    host: "{{ vergeos_host }}"
    username: "{{ vergeos_username }}"
    password: "{{ vergeos_password }}"
    name: Production
    category: Environment
    vm_name: my-web-server
    state: present
```

### Tag Workflow Examples

```bash
# Set up tag infrastructure (categories and tags)
ansible-playbook examples/setup_tags.yml

# Apply tags to VMs based on name patterns
ansible-playbook -i inventory.vergeos_vms.yml examples/apply_tags.yml

# Snapshot VMs by tag
ansible-playbook -i inventory.vergeos_vms.yml examples/snapshot_by_tag.yml --limit tag_production
```

## Additional Resources

- [Ansible Documentation](https://docs.ansible.com/){target="_blank"}
- [Ansible Galaxy](https://galaxy.ansible.com/){target="_blank"}
- [VergeOS Python SDK](../sdks/python-sdk.md)
- [GitHub Repository & Issues](https://github.com/verge-io/ansible-collection-vergeos/issues){target="_blank"}
