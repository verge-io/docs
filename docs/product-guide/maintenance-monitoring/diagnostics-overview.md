# VergeOS Diagnostics Overview

VergeOS provides comprehensive diagnostic tools integrated throughout the platform to help system administrators monitor, troubleshoot, and maintain optimal performance across all virtualization components.

## Component-Specific Diagnostics

<div class="grid cards" markdown>

-   :fontawesome-solid-network-wired:{ .lg .middle } __Network Diagnostics__

    ---

    Network infrastructure troubleshooting and performance analysis

    **Access:** Networks → [Select Network] → Diagnostics

    [:octicons-arrow-right-24: Network Diagnostics Guide](/product-guide/networks/network-diagnostics)

-   :fontawesome-solid-server:{ .lg .middle } __Node Diagnostics__

    ---

    Hardware and system-level troubleshooting

    **Access:** Nodes → [Select Node] → Diagnostics

    [:octicons-arrow-right-24: Node Diagnostics Guide](/product-guide/system/node-diagnostics)

-   :fontawesome-solid-database:{ .lg .middle } __vSAN Diagnostics__

    ---

    Storage system analysis and troubleshooting

    **Access:** System → vSAN Diagnostics

    [:octicons-arrow-right-24: vSAN Diagnostics Guide](/product-guide/storage/vsan-diagnostics)

-   :fontawesome-solid-folder-open:{ .lg .middle } __NAS Diagnostics__

    ---

    Network Attached Storage service troubleshooting

    **Access:** NAS → [Select NAS Service] → Diagnostics

    [:octicons-arrow-right-24: NAS Diagnostics Guide](/product-guide/nas/nas-diagnostics)

</div>

## System-Wide Tools

<div class="grid cards" markdown>

-   :fontawesome-solid-stethoscope:{ .lg .middle } __System Diagnostics__

    ---

    Comprehensive system-wide diagnostic data collection with direct support integration

    **Access:** System → System Diagnostics

    [:octicons-arrow-right-24: System Diagnostics Documentation](/product-guide/system/diagnostics)

-   :fontawesome-solid-bell:{ .lg .middle } __Subscriptions & Alerts__

    ---

    Proactive monitoring and automated notifications

    **Access:** System → Subscriptions

    [:octicons-arrow-right-24: Subscriptions Overview](/product-guide/system/subscriptions-overview)

-   :fontawesome-solid-chart-line:{ .lg .middle } __Prometheus Exporter__

    ---

    Integration with external monitoring systems (Grafana, AlertManager)

    **Access:** System → Prometheus Exporter

    [:octicons-arrow-right-24: Prometheus Exporter](/product-guide/tools-integrations/prometheus-exporter)

</div>

## Best Practices

**Systematic Approach:**

1. Define the problem scope and timeline
2. Start with targeted component diagnostics
3. Use System Diagnostics for complex issues
4. Document findings and escalate when needed

**Proactive Monitoring:**

- Set up Subscriptions for ongoing health monitoring
- Use Prometheus integration for long-term trend analysis
- Establish performance baselines with diagnostic tools

---

!!! tip "Need Help?"
    For complex issues or performance optimization, contact [VergeOS Support](/support) with System Diagnostics data and detailed issue descriptions.
