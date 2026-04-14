---
title: "VergeOS TypeScript SDK (tsvergeos)"
description: "tsvergeos is a TypeScript SDK for managing VergeOS infrastructure through the REST API, providing a zero-dependency, tree-shakeable, fully typed interface for automating VMs, networking, storage, tenants, and multi-site management."
semantic_keywords:
  - "VergeOS TypeScript SDK API client library"
  - "automate VergeOS infrastructure with TypeScript"
  - "tsvergeos VM networking storage automation"
  - "programmatic VergeOS management Node.js scripting"
use_cases:
  - infrastructure_automation
  - ci_cd_environment_provisioning
  - monitoring_and_reporting
  - backup_automation
  - multi_tenant_provisioning
  - multi_site_management
tags:
  - typescript
  - sdk
  - api
  - automation
  - tsvergeos
  - scripting
  - development
  - nodejs
categories:
  - Automation
---

# VergeOS TypeScript SDK (tsvergeos)

## Overview

tsvergeos is a TypeScript SDK for managing VergeOS infrastructure through the REST API. It provides a zero-dependency, tree-shakeable, fully typed interface for automating VM lifecycle, networking, storage, multi-tenant operations, and multi-site management, making it ideal for automation scripts, tooling development, and integrations.

## Key Features

- **Zero Dependencies**: Nothing to audit, nothing to break
- **Tree-Shakeable**: Import only the services you use; unused services are dead-code eliminated
- **Full Type Coverage**: Every resource, parameter, and response is typed with TSDoc documentation
- **84 Services**: Complete coverage of every VergeOS API endpoint
- **Multi-Site Built In**: Query and manage multiple VergeOS deployments from a single `SiteManager`
- **Cross-Platform**: Works in Node.js 18+, Deno, Bun, and modern browsers
- **Filtering**: OData filter support with both a fluent `Filter` builder and a functional `buildFilter` shorthand

## Requirements

- Node.js 18+ (also supports Deno and Bun)
- VergeOS 6.x (API v4)

## Installation

### From npm (Recommended)

```bash
npm install @vergeio/tsvergeos
```

### Using pnpm / yarn / bun

```bash
pnpm add @vergeio/tsvergeos
# or
yarn add @vergeio/tsvergeos
# or
bun add @vergeio/tsvergeos
```

## Authentication

The SDK supports multiple authentication methods:

### API Key (Recommended)

```typescript
import { VergeClient } from "@vergeio/tsvergeos";

const client = await VergeClient.connect({
  host: "192.168.1.100",
  apiKey: "your-api-key",
  verifySsl: false, // for self-signed certificates
});
```

!!! note "SSL Certificate Verification"
    Set `verifySsl: false` only for environments with self-signed certificates. For production environments with valid certificates, omit this parameter or set it to `true`.

### Username / Password

```typescript
const client = await VergeClient.connect({
  host: "192.168.1.100",
  username: "admin",
  password: "secret",
});
```

### Environment Variables

```bash
export VERGEOS_HOST=192.168.1.100
export VERGEOS_API_KEY=your-api-key
# Optional:
export VERGEOS_VERIFY_SSL=false
export VERGEOS_TIMEOUT=60
```

```typescript
const client = await VergeClient.connectFromEnv();
```

!!! tip "Recommended for Production"
    Using environment variables keeps credentials out of your source code and makes it easy to use different credentials across environments.

## Service Registration

The SDK uses tree-shakeable imports — services are registered via side-effect imports so unused services are dead-code eliminated from your bundle.

### Three Import Levels

```typescript
// 1. Default: ~40 most-used services (VMs, networks, tenants, storage, etc.)
import { VergeClient } from "@vergeio/tsvergeos";

// 2. Full: all 84 services (alarms, update settings, storage tiers, etc.)
import { VergeClient } from "@vergeio/tsvergeos";
import "@vergeio/tsvergeos/full";

// 3. Individual: pick exactly what you need
import { VergeClient } from "@vergeio/tsvergeos";
import "@vergeio/tsvergeos/services/alarm";
import "@vergeio/tsvergeos/services/storage-tier";
```

!!! warning "Unregistered Services"
    The default import does not include every service. If you access a service that isn't registered (e.g., `client.alarms` without importing it), you'll get `undefined`. For dashboards, admin tools, or backend scripts where bundle size doesn't matter, use `import '@vergeio/tsvergeos/full'` to register everything.

### Type-Only Imports

Type imports have zero bundle impact regardless of which services are registered:

```typescript
import type { VM, Alarm, Network, Tenant, Volume } from "@vergeio/tsvergeos/types";
```

## Available Resources

The SDK provides access to 84 services covering the full VergeOS API:

| Category | Resources |
|----------|-----------|
| **Compute** | VMs, drives, devices, NICs, snapshots, stats |
| **Networking** | Networks, rules, aliases, addresses, hosts, DNS zones/records/views |
| **VPN** | WireGuard interfaces and peers, IPSec connections and phases |
| **Storage** | Volumes, snapshots, CIFS/NFS shares, syncs, browser, storage tiers |
| **NAS** | NAS services, users, files |
| **Tenants** | Tenants, nodes, storage, snapshots, Layer 2 |
| **Recipes** | VM and tenant recipes, instances, catalogs, repositories |
| **Snapshots** | Snapshot profiles, periods, cloud snapshots |
| **Sites** | Sites, incoming/outgoing syncs, sync profile periods |
| **System** | System, clusters, nodes, settings, logs, tasks |
| **Monitoring** | Alarms, alarm types, webhooks, webhook URLs |
| **Auth** | Users, groups, members, permissions, API keys |
| **Tags** | Tags, categories, members |
| **Updates** | Update settings, sources, packages, branches |
| **Other** | Certificates, cloud-init, resource groups |

## Usage Examples

### Managing Virtual Machines

```typescript
import { VergeClient } from "@vergeio/tsvergeos";
import "@vergeio/tsvergeos/services/vm";

const client = await VergeClient.connect({
  host: "192.168.1.100",
  apiKey: "your-api-key",
});

// List all VMs
const vms = await client.vms.list();
for (const vm of vms) {
  console.log(`${vm.name}: ${vm.ram}MB RAM, ${vm.cpu_cores} cores`);
}

// Get a specific VM
const vm = await client.vms.get(42);
const vmByName = await client.vms.getByName("web-server");

// Create a VM
const newVm = await client.vms.create({
  name: "test-vm",
  machine_type: "q35",
  ram: 2048,
  cpu_cores: 2,
  os_family: "linux",
});

// Power operations
await client.vms.powerOn(newVm.$key);
await client.vms.powerOff(newVm.$key);

// Update a VM
await client.vms.update(newVm.$key, { ram: 4096 });

// Delete a VM
await client.vms.delete(newVm.$key);
```

### Filtering Resources

The SDK supports multiple filtering approaches:

=== "Fluent Filter Builder"

    ```typescript
    import { Filter } from "@vergeio/tsvergeos";

    const filter = new Filter()
      .eq("status", "running")
      .like("name", "web*")
      .gt("cpu_cores", 2)
      .build();

    const vms = await client.vms.list({ filter });
    ```

=== "Functional Shorthand"

    ```typescript
    import { buildFilter } from "@vergeio/tsvergeos";

    const vms = await client.vms.list({
      filter: buildFilter({
        status: "running",
        name: "web*",
        cpu_cores: { gt: 2 },
      }),
    });
    ```

=== "Pagination and Field Selection"

    ```typescript
    const page = await client.vms.list({
      limit: 10,
      offset: 20,
      sort: "-created",
      fields: ["name", "status", "ram"],
    });

    // Or fetch all pages automatically
    const allVms = await client.vms.listAll();
    ```

### Multi-Site Management

Manage multiple VergeOS deployments from a single entry point:

```typescript
import { SiteManager } from "@vergeio/tsvergeos";
import "@vergeio/tsvergeos/services/vm";

const manager = new SiteManager();

await manager.addSite({
  name: "dc-east",
  host: "10.0.1.1",
  apiKey: "key-east",
  tags: ["production"],
});

await manager.addSite({
  name: "dc-west",
  host: "10.0.2.1",
  apiKey: "key-west",
  tags: ["production"],
});

// Query a specific site
const eastVms = await manager.site("dc-east").vms.list();

// Fan out read queries across all sites
const allSiteVms = await manager.all.vms.list();
// → { data: SiteResource<VM>[], errors: SiteError[] }

for (const vm of allSiteVms.data) {
  console.log(`${vm.site}: ${vm.name}`);
}
```

!!! tip "Multi-Site Queries"
    The `SiteManager` fans out read queries across all registered sites in parallel and returns aggregated results along with any per-site errors.

## Error Handling

All errors extend `VergeError` with typed subclasses and type guard functions:

```typescript
import {
  isNotFoundError,
  isAuthError,
  isApiError,
  isValidationError,
} from "@vergeio/tsvergeos";

try {
  const vm = await client.vms.get(999);
} catch (err) {
  if (isNotFoundError(err)) {
    console.log("VM not found");
  } else if (isAuthError(err)) {
    console.log("Authentication failed");
  } else if (isApiError(err)) {
    console.log(`API error ${err.statusCode}: ${err.message}`);
  }
}
```

??? example "Available Error Types"
    | Error Class | Description |
    |-------------|-------------|
    | `VergeError` | Base error for all SDK errors |
    | `ApiError` | Any HTTP error from the API |
    | `NotFoundError` | Resource not found (404) |
    | `AuthError` | Authentication failure (401/403) |
    | `ConflictError` | Resource state conflict (409) |
    | `ValidationError` | Invalid client-side input |
    | `UnsupportedVersionError` | Server version too old |
    | `TaskError` | Async task failed |
    | `TaskTimeoutError` | Task exceeded wait timeout |
    | `SiteError` | Multi-site operation failure |

## Client Configuration

The full set of configuration options:

```typescript
interface ClientConfig {
  host: string;          // Server hostname or URL
  apiKey?: string;       // API key for bearer auth
  username?: string;     // Username for basic auth
  password?: string;     // Password for basic auth
  verifySsl?: boolean;   // TLS verification (default: true)
  timeout?: number;      // Request timeout in ms (default: 30000)
  retries?: number;      // Retry attempts (default: 3)
  retryBackoff?: number; // Backoff between retries in ms (default: 1000)
  fetch?: typeof fetch;  // Custom fetch implementation
  signal?: AbortSignal;  // Cancellation signal
}
```

## Common Use Cases

- **Infrastructure automation**: Provision VMs, networks, and storage programmatically
- **CI/CD integration**: Create and destroy test environments in pipelines
- **Monitoring and reporting**: Query resource status and generate inventory reports
- **Backup automation**: Schedule and manage snapshots and cloud backups
- **Multi-tenant provisioning**: Automate tenant creation and resource allocation
- **Multi-site orchestration**: Manage and query across multiple VergeOS deployments

## Documentation and Resources

For complete documentation, including the full API reference and detailed usage examples, visit the official repository:

- [GitHub Repository](https://github.com/verge-io/tsvergeos){target="_blank"}
- [npm Package](https://www.npmjs.com/package/@vergeio/tsvergeos){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/tsvergeos/issues](https://github.com/verge-io/tsvergeos/issues){target="_blank"}

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)
- [Python SDK](python-sdk.md) - Python alternative
- [Go SDK](go-sdk.md) - Go alternative
- [PowerShell Module](powershell-module.md) - PowerShell alternative
- [Terraform Provider](terraform-provider.md) - Infrastructure as code
