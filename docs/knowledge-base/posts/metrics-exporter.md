---
title: Metrics Exporter
slug: metrics-exporter
description: Operational and sizing guide for deploying the VergeOS Prometheus exporter with Prometheus and Grafana for metrics collection, alerting, and visualization.
author: Verge.io
published: true
date: 2026-05-06
tags:
  - prometheus
  - grafana
  - monitoring
  - metrics
  - exporter
  - sizing
  - capacity planning
  - alerting
  - observability
categories:
  - System Administration
  - Best Practices
---

# VergeOS Metrics Exporter Sizing and Operations Guide

## Overview

!!! info "Key Points"
    - The bundled Docker Compose stack is a **reference example** to get you started — production deployments need additional security and operational work (see the warning below).
    - The VergeOS Exporter publishes VSAN, cluster, node, drive, network, and system metrics in Prometheus format.
    - A single Docker Compose stack (exporter + Prometheus + Grafana) handles up to ~1,000 VMs from one VergeOS cloud.
    - Multi-cloud monitoring is achieved by running one exporter container per cloud and pointing a shared Prometheus at all of them.
    - Sizing is driven primarily by VM count and scrape interval; SSD storage matters more than extra RAM.

This guide covers deployment, sizing, security, alerting, and ongoing operations for the VergeOS metrics monitoring stack. It is intended for administrators standing up Prometheus/Grafana against one or more VergeOS clouds and operating it day to day.

The deployment described here is the `examples/docker-compose/` stack in the [vergeos-exporter repository](https://github.com/verge-io/vergeos-exporter), which bundles the exporter, Prometheus, Grafana, and a pre-built dashboard.

!!! warning "Reference deployment, not a turnkey production stack"
    The bundled Docker Compose stack is provided as an **example and starting point** to get you collecting metrics quickly. It is intentionally simple — single host, default ports bound to all interfaces, file-based credentials, no external TLS termination, no high availability.

    Production deployments will need additional work appropriate to your environment, including but not limited to:

    - Hardened secret management (Vault, cloud secret manager, Docker/Kubernetes secrets) instead of `.env` files
    - TLS for Grafana, Prometheus, and the exporter, typically via a reverse proxy
    - SSO or directory-backed authentication for Grafana, with the default admin disabled
    - Network segmentation, firewall rules, and host-based access controls
    - Backup, retention, and disaster-recovery procedures aligned to your RPO/RTO
    - High availability or remote-write to a long-term store (Thanos, Mimir) where uptime requirements demand it
    - Compliance, logging, and audit requirements specific to your organization

    Treat the sections below as a baseline. Validate every choice against your own security, compliance, and availability standards before deploying in production.

## Prerequisites

### VergeOS user setup

Create a dedicated monitoring user in **each** VergeOS cloud you want to scrape:

- **Permissions:** List and read access to the cloud
- **User type:** Normal or API user
- **MFA:** Must be disabled (the exporter uses HTTP basic auth)
- **Scope:** No admin or privileged permissions are required

!!! warning "Do not use admin credentials"
    The exporter only needs read access. Using an admin or root account expands the blast radius of a credential leak with no operational benefit. Create a dedicated `prom-monitor` user per cloud.

### Connectivity

Open the following paths between components:

| From | To | Port | Protocol | Purpose |
|------|------|------|----------|---------|
| Exporter host | VergeOS cloud | 443 | HTTPS | API scraping |
| Prometheus | Exporter | 9888 | HTTP | Metrics scrape |
| Grafana | Prometheus | 9090 | HTTP | Queries |
| Users | Grafana | 3000 | HTTP/HTTPS | Dashboard access |

### Topology options

| Pattern | When to use |
|---------|-------------|
| **Single-host stack** | One VergeOS cloud, up to ~1,000 VMs |
| **Single Prometheus, multiple exporters** | Multiple VergeOS clouds, centralized metrics |
| **Federated Prometheus** | Multiple sites with local Prometheus, aggregated centrally |
| **Remote write (Thanos / Mimir)** | Long-term retention beyond 15 days |

## Deployment Walkthrough

### Clone and configure

```bash
git clone https://github.com/verge-io/vergeos-exporter.git
cd vergeos-exporter/examples/docker-compose
cp .env.example .env  # if template exists, else edit .env in place
```

### `.env` configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `VERGE_URL` | VergeOS cloud URL | `https://vergeos.example.com` |
| `VERGE_USERNAME` | Monitoring user | `prom-monitor` |
| `VERGE_PASSWORD` | Monitoring password | `<strong-password>` |
| `INSECURE` | Skip TLS verify (self-signed) | `true` or omit |
| `EXPORTER_VERSION` | Exporter image tag | `latest` or `2.0.2` |
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin password | `<strong-password>` |

### Startup

```bash
docker compose pull
docker compose up -d
```

Or use the convenience script:

```bash
./start.sh    # Linux/macOS
.\start.ps1   # Windows
```

### Verification

```bash
# Confirm the exporter authenticated successfully
docker compose logs vergeos-exporter | grep "Successfully connected"

# Verify the metrics endpoint
curl -s http://localhost:9888/metrics | grep -c "^vergeos_"

# Confirm Prometheus is scraping
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | select(.labels.job=="vergeos") | {instance, health, lastError}'

# Confirm system data is in Prometheus
curl -s http://localhost:9090/api/v1/label/system_name/values
```

!!! tip "Pro Tip"
    The `system_name` label is populated automatically from the VergeOS cloud name. If `/api/v1/label/system_name/values` returns your cloud name, the entire path (cloud → exporter → Prometheus) is healthy.

## Sizing and Resource Planning

### CPU and RAM sizing

| VM count | Prometheus | Grafana | Exporter | Host minimum |
|----------|-----------|---------|----------|--------------|
| < 100 | 1 core / 1 GB | 1 core / 512 MB | 1 core / 256 MB | 2 cores / 4 GB |
| 100 – 500 | 1 core / 2 GB | 1 core / 512 MB | 1 core / 256 MB | 2 cores / 4 GB |
| 500 – 1,000 | 2 cores / 4 GB | 1 core / 512 MB | 1 core / 512 MB | 4 cores / 8 GB |
| 1,000+ | 4 cores / 8 GB | 2 cores / 1 GB | 2 cores / 1 GB | 8 cores / 16 GB |

!!! tip "Storage beats RAM"
    SSD storage is more important than extra RAM — Prometheus does a lot of random reads during queries. Spend the budget on fast disks before adding memory.

### Storage sizing

Daily data generated depends on the active series count, which scales with VM count:

| VM count (per cloud) | Series | MB/day | 15-day retention |
|----------------------|--------|--------|------------------|
| < 100 | ~1,000 | ~2 MB | ~30 MB |
| ~500 | ~15,000 | ~30 MB | ~450 MB |
| ~1,000 | ~36,000 | ~75 MB | ~1.1 GB |

For multi-cloud deployments, sum the per-cloud estimates.

### Retention configuration

In `docker-compose.yml`, under the `prometheus` service:

```yaml
command:
  - --storage.tsdb.retention.time=15d
  - --storage.tsdb.retention.size=30GB
```

Whichever limit is hit first triggers pruning. Prometheus does not downsample — it keeps full-resolution samples and deletes old blocks.

!!! info "Need longer retention?"
    Prometheus is not designed for multi-month retention at full resolution. For longer horizons, configure `remote_write` to a long-term store such as Thanos or Grafana Mimir.

### Scrape interval trade-offs

| Interval | Resolution | API load | Use case |
|----------|-----------|----------|----------|
| 15s | High | High | Small environments, real-time ops |
| 30s | Good | Medium | Standard deployments |
| **60s** | **Acceptable** | **Low** | **Recommended for 500+ VMs** |
| 120s | Coarse | Very low | Long-term trending, very large clouds |

Set `scrape_timeout` greater than or equal to `scrape_interval`. For environments with 1,000+ VMs, `scrape_timeout: 60s` is recommended — exporter scrapes can spike to 30 seconds during heavy collection cycles.

```yaml
global:
  scrape_interval: 60s
scrape_configs:
  - job_name: vergeos
    scrape_timeout: 60s
    static_configs:
      - targets: ['vergeos-exporter:9888']
```

## Security Hardening

The items below are the **minimum** hardening steps for the reference stack. They do not constitute a complete production security posture — see the callout in [Overview](#overview) for the broader scope production deployments must address.

### Credential management

- Store credentials in `.env` with filesystem permissions `600`.
- Never commit `.env` to version control — add it to `.gitignore`.
- For production, consider Docker secrets or external secret managers (Vault, AWS Secrets Manager).
- Rotate VergeOS monitoring passwords periodically.
- Use separate credentials per environment (dev, staging, prod).

### Least privilege

- The monitoring user requires only list and read permissions to the cloud.
- Do not use admin or root accounts for the exporter.
- Create a dedicated `prom-monitor` or `verge-monitoring` user per VergeOS cloud.

### Network exposure

By default, the stack binds all services to `0.0.0.0`. For production:

- Restrict Grafana (port 3000) to trusted networks via firewall.
- Put Grafana behind a reverse proxy with TLS (nginx, Caddy, Traefik).
- Keep Prometheus (9090) and the exporter (9888) internal-only.
- Change the default Grafana admin password before first login.
- Disable Grafana anonymous access (default behavior — verify it remains off).

### Image pinning

Replace `:latest` tags with specific versions for reproducibility:

```yaml
prometheus:
  image: prom/prometheus:v2.54.1
grafana:
  image: grafana/grafana-oss:11.3.0
vergeos-exporter:
  image: ghcr.io/verge-io/vergeos-exporter:2.0.2
```

!!! warning "Review pins quarterly"
    Pinned images do not auto-update. Review and bump pins quarterly or when CVEs are published against Prometheus, Grafana, or the exporter base image.

## Multi-Tenant and Multi-Site Patterns

For monitoring multiple VergeOS clouds, run one exporter container per cloud and point a single Prometheus at all of them.

### `docker-compose.yml` — additional exporter service

```yaml
vergeos-exporter-site2:
  image: ghcr.io/verge-io/vergeos-exporter:${EXPORTER_VERSION:-latest}
  container_name: vergeos-exporter-site2
  restart: unless-stopped
  command:
    - "-verge.url=https://cloud2.example.com"
    - "-verge.username=${SITE2_USERNAME}"
    - "-verge.password=${SITE2_PASSWORD}"
    - "-web.listen-address=:9888"
    - "-insecure=${SITE2_INSECURE:-false}"
  ports:
    - "9889:9888"
  networks:
    - monitoring
```

### `prometheus.yml` — multi-target scrape config

```yaml
scrape_configs:
  - job_name: vergeos
    scrape_interval: 60s
    scrape_timeout: 60s
    static_configs:
      - targets:
          - vergeos-exporter:9888
          - vergeos-exporter-site2:9888
          - vergeos-exporter-site3:9888
```

The bundled Grafana dashboards filter by the `system_name` label — populated by the exporter from each VergeOS cloud name — so all sites appear in the same dashboard with a site selector.

## Alerting Baseline

Configure these rules in the Grafana UI under **Alerting**, or in a Prometheus rules file:

| Alert | Condition | Severity | Notes |
|-------|-----------|----------|-------|
| VSAN fill critical | `vergeos_vsan_tier_used_pct > 90` | Critical | Data loss risk |
| VSAN fill warning | `vergeos_vsan_tier_used_pct > 75` | Warning | Plan expansion |
| VSAN not redundant | `vergeos_vsan_redundant == 0` | Critical | No fault tolerance |
| Bad drives detected | `vergeos_vsan_bad_drives > 0` | Warning | Schedule replacement |
| Cluster offline | `vergeos_cluster_status == 0` | Critical | Immediate action |
| Node offline | `vergeos_cluster_online_nodes < vergeos_cluster_total_nodes` | Warning | Investigate node |
| CPU overcommit | `(vergeos_cluster_used_cores / vergeos_cluster_online_cores) * 100 > 300` | Warning | Performance impact |
| RAM N+1 violation | `vergeos_cluster_used_ram / vergeos_cluster_total_ram > 0.85` | Warning | Lose a node = tight fit |
| Scrape failing | `up{job="vergeos"} == 0` | Critical | Monitoring blind spot |
| Scrape duration high | `scrape_duration_seconds{job="vergeos"} > 30` | Warning | API slow or stack undersized |
| Drive temperature high | `vergeos_drive_temperature > 55` | Warning | Cooling issue |
| Drive repairs active | `vergeos_vsan_tier_repairs > 0` | Info | Rebuild in progress |

!!! info "No Alertmanager required"
    Grafana's built-in alerting handles rule evaluation, routing, and notifications via email, Slack, PagerDuty, webhook, and more. A separate Alertmanager deployment is not required for the bundled stack.

## Troubleshooting

### Useful commands

```bash
# Service status
docker compose ps

# Logs
docker compose logs -f vergeos-exporter
docker compose logs -f prometheus
docker compose logs -f grafana

# Exporter metrics endpoint
curl -s http://localhost:9888/metrics | grep -c "^vergeos_"

# Prometheus targets and errors
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {instance, health, lastError, lastScrapeDuration}'

# Which systems are reporting
curl -s http://localhost:9090/api/v1/label/system_name/values

# Scrape duration stats (last hour)
curl -s 'http://localhost:9090/api/v1/query?query=scrape_duration_seconds{job="vergeos"}'

# Force reload Prometheus config (requires --web.enable-lifecycle)
curl -X POST http://localhost:9090/-/reload

# Restart a single service
docker compose restart vergeos-exporter
```

### Common issues

!!! warning "Common Issues"
    | Symptom | Likely cause | Fix |
    |---------|--------------|-----|
    | Exporter logs `Authentication failed` | Bad creds or MFA enabled | Verify `.env`, disable MFA on monitoring user |
    | Exporter logs TLS verification error | Self-signed certificate | Set `INSECURE=true` in `.env` |
    | Prometheus target shows `health=down` | Network, DNS, or firewall | Check `docker compose logs prometheus` and the exporter URL |
    | Grafana shows "Datasource not found" | Datasource UID mismatch | Verify the datasource UID matches dashboard references |
    | Grafana panels empty | Wrong time range or system variable | Check that dashboard variables default to "All" |
    | Scrape timeouts / data gaps | Large environment, slow API | Increase `scrape_interval` and `scrape_timeout` to 60s |
    | Grafana edits revert | Provisioned `updateIntervalSeconds` re-applies file | Raise the interval, or accept the provisioned file as source of truth |
    | Panels show literal `${DS_PROMETHEUS}` | Imported via provisioning without substitution | Use the entrypoint sed pattern or import manually |
    | Volume not persisting after `down -v` | Expected — `-v` removes volumes | Omit `-v` unless you want a clean slate |
    | No data after `down -v` | All TSDB data wiped | Restore from backup or wait for new data to accumulate |

## Upgrade Procedure

### Routine upgrade (minor version)

```bash
# Pull latest images
docker compose pull

# Apply (rolling, near-zero downtime)
docker compose up -d
```

Grafana and Prometheus handle in-place upgrades cleanly. The exporter restarts and reconnects automatically.

### Major version upgrade

```bash
# 1. Take a backup (see the next section)
# 2. Review release notes for breaking changes
# 3. Pin the new version in docker-compose.yml or .env
EXPORTER_VERSION=3.0.0

# 4. Pull and apply
docker compose pull
docker compose up -d

# 5. Verify
docker compose logs -f vergeos-exporter
curl -s http://localhost:9888/metrics | head
```

### Rollback

```bash
# Set previous version in .env
EXPORTER_VERSION=2.0.2
docker compose pull vergeos-exporter
docker compose up -d vergeos-exporter
```

!!! danger "Prometheus rollback caveat"
    The Prometheus TSDB format is backward-compatible within the same major version but **not** forward-compatible. Rolling Prometheus itself back to an older major version may require restoring from backup.

## Backup and Restore

### What to back up

- **Prometheus data** — `/prometheus` (TSDB blocks + WAL + head chunks)
- **Grafana data** — `/var/lib/grafana` (custom dashboards, users, settings)
- **Configuration** — `.env`, `docker-compose.yml`, `prometheus/`, `grafana/provisioning/` — all committed to version control

### Full backup (recommended)

Stops the stack briefly but captures a consistent state, including the WAL:

```bash
# Stop services
docker compose stop prometheus grafana

# Copy data out of containers
docker cp prometheus:/prometheus ./backup/prometheus-$(date +%Y%m%d)
docker cp grafana:/var/lib/grafana ./backup/grafana-$(date +%Y%m%d)

# Restart services
docker compose start prometheus grafana

# Compress and store
tar -czf backup-$(date +%Y%m%d).tar.gz backup/
```

### Snapshot backup (zero downtime, blocks only)

Requires `--web.enable-admin-api` on Prometheus (add to `command:` in `docker-compose.yml`). Captures compacted blocks but **not** the WAL — may miss the last ~2 hours of data.

```bash
# Trigger snapshot (Prometheus writes to /prometheus/snapshots/<name>/)
SNAP=$(curl -s -X POST http://localhost:9090/api/v1/admin/tsdb/snapshot | jq -r '.data.name')

# Copy it out
docker cp prometheus:/prometheus/snapshots/$SNAP ./backup/$SNAP
```

### Restore

!!! danger "Stop services before restoring"
    Copying data into a running Prometheus container risks TSDB corruption. Always stop the service first.

```bash
# Stop services
docker compose stop prometheus grafana

# Clear existing data (optional — or let restore merge with existing blocks)
docker compose down -v    # wipes volumes
docker compose up -d --no-start prometheus grafana

# Copy data back in
docker cp ./backup/prometheus-20260410/. prometheus:/prometheus/
docker cp ./backup/grafana-20260410/. grafana:/var/lib/grafana/

# Start services
docker compose start prometheus grafana

# Verify
curl -s http://localhost:9090/api/v1/label/system_name/values
```

### Migration to a new host

1. Take a full backup on the source host.
2. Copy the backup archive and configuration files (`.env`, `docker-compose.yml`, provisioning directories) to the target host.
3. Install Docker and Docker Compose on the target.
4. Restore data per the **Restore** section.
5. Update DNS or external references to point to the new host.
6. Verify scraping and dashboards before decommissioning the source.

### Backup schedule

| Frequency | Method | Retention |
|-----------|--------|-----------|
| Daily | Full backup (stop services) during a maintenance window | 7 days |
| Weekly | Full backup, archive offsite | 4 weeks |
| Monthly | Full backup, archive offsite | 12 months |
| Before upgrade | Full backup | Until upgrade is validated |

## Additional Resources

- [VergeOS Exporter on GitHub](https://github.com/verge-io/vergeos-exporter) — source, releases, and Docker Compose example
- [CPU Overprovisioning and Resource Planning](/knowledge-base/cpu-overprovisioning-guide/) — companion sizing guidance for the cluster itself
- [API Guide](/knowledge-base/verge-api-guide/) — the API the exporter calls under the hood
- [Permissions](/product-guide/system/permissions/) — creating the dedicated monitoring user

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).
