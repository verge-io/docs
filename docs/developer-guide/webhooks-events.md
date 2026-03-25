# Webhooks & Events

## Overview

Webhooks allow you to build integrations that react to events happening inside your VergeOS environment. When a resource changes — a VM powers on, a snapshot completes, a node goes offline — VergeOS can send an HTTP callback to your application so it can take action automatically.

This is useful for a wide range of automation scenarios:

- **ChatOps notifications** — Post alerts to Slack or Microsoft Teams when critical events occur
- **Orchestration pipelines** — Trigger CI/CD jobs or runbooks in response to infrastructure changes
- **Audit and compliance** — Stream events to an external logging or SIEM platform
- **Self-healing workflows** — Automatically remediate issues when specific conditions are detected

## Configuring Webhooks

VergeOS provides built-in webhook support that you can configure directly from the UI. For step-by-step instructions on setting up webhook endpoints and subscriptions, see the [Webhooks](../product-guide/automation/webhooks.md) page in the Product Guide.

!!! info "Coming Soon"
    Developer-focused documentation is on the way, including:

    - **Event catalog** — A complete list of subscribable event types and their payloads
    - **Payload schemas** — JSON schema definitions for each event type
    - **Verification & security** — How to validate incoming webhook signatures
    - **Retry behavior** — How VergeOS handles delivery failures and retries
    - **Example receivers** — Sample webhook handler code in Python, Go, and Node.js
