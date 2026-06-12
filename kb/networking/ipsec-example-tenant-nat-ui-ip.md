---
description: "IPsec tunnel configuration example within a VergeOS tenant using the dedicated UI IP address with NAT rules for directing tunnel traffic."
---

# IPsec Example - Tenant/NAT UI Address

The following example configures an IPsec peer within a VergeOS tenant. In this example, the dedicated IP address used for accessing the tenant UI is also used for the IPsec tunnel, with NAT rules in place to direct tunnel traffic appropriately.

{% hint style="info" %}
**This example pertains to a tenant using a dedicated IP address; tenants using a shared address (via proxy/PAT rules) will require different configuration.**
{% endhint %}

{% hint style="info" %}
**IPsec is a complex framework that supports a vast array of configuration combinations with many ways to achieve the same goal, making it impossible to provide one-size-fits-all instructions.  Sample configurations are given for reference and should be tailored to meet the particular environment and requirements.**
{% endhint %}

{% hint style="success" %}
**Consult the [IPsec Product Guide Page](https://docs.verge.io/product-guide/vpn/ipsec/) for step-by-step general instructions on creating an IPsec tunnel.**
{% endhint %}

## Host Configuration
Assigning the UI address to a tenant automatically creates rules on the host system (external and tenant networks) to channel traffic appropriately. No further configuration should be needed on the host.

{% hint style="info" %}
****All configuration outlined below is done within the tenant system.****
{% endhint %}

## VPN Network Configuration

![VPN Network Configuration](../.gitbook/assets/tenant-ipsec-networkconfig.png)

## Phase 1

![Phase 1 Configuration](../.gitbook/assets/tenant-ipsec-phase1.png)

## Phase 2

![Phase 2 Configuration](../.gitbook/assets/tenant-ipsec-phase2.png)

## Default VPN Network Rules

**Default Firewall Rules** -
The following necessary firewall rules are **created automatically** when a VPN network is created:

* **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**
* **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**
* **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**
* **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**

![Review Rules](../.gitbook/assets/ipsec-defaultrules.png)

{% hint style="success" %}
**These rules can be modified to restrict to specific source addresses, where appropriate.**
{% endhint %}

## Additional VPN Network Rules

Additional rules need to be created on our new VPN network:

**VPN NAT Rule:**
![VPN NAT Rule](../.gitbook/assets/tenant-ipsec-vpn-rule-translate.png)

{% hint style="success" %}
**The incoming NAT rule must be moved to the top, before the *Accept* Rules. Instructions for changing the order of rules can be found in the Product Guide: [Network Rules - Change the Order of Rules](https://docs.verge.io/product-guide/networks/network-rules/#change-the-order-of-rules)**
{% endhint %}

**Default Route Rule:**
![VPN Default Route Rule](../.gitbook/assets/tenant-ipsec-vpn-rule-default-route.png)

**VPN SNAT Rule:**
![VPN Nat Rule](../.gitbook/assets/tenant-ipsec-vpn-rule-outgoing-snat.png)

## External Network Rules

Translate rules are necessary on the tenant's external network, to send IPsec traffic to the VPN network:

**External UDP NAT Rule:**
![VPN Nat Rule](../.gitbook/assets/tenant-ipsec-external-udp-rule.png)

**External ESP NAT Rule:**
![VPN Nat Rule](../.gitbook/assets/tenant-ipsec-external-ESP-rule.png)

**External AH NAT Rule:**
![VPN Nat Rule](../.gitbook/assets/tenant-ipsec-external-AH-rule.png)

## Connecting Internal Networks to the VPN

Routing can be configured between the VPN network and other internal networks to provide tunnel access to those networks; see [How to Configure Routing Between Networks](routing-between-internal-vergeio-networks.md).

{% hint style="success" %}
**New rules must be applied on each network to put them into effect.**
{% endhint %}
