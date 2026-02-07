# VergeOS OIDC Applications Overview

VergeOS provides OIDC functionality to allow centralized identity management for multiple VergeOS systems and or tenants.

## VergeOS OIDC Application Benefits

* Ability to establish a VergeOS system as an identity provider (with or without an upstream provider such as Google, Azure, etc.)
* Same app/token in an upstream authorization provider can be used for multiple physical environments and tenants rather than creating a separate one for each.
* Provides single sign-on (SSO) capabilities across VergeOS systems
* MSPs/providers can have central login linked back to their environment for all tenants
* OIDC delivers a standardized, widely-supported protocol with built-in security features
* Less administrative burden for user/group management across VergeOS systems/tenants

## General Operational Flow

* User attempts to log in to a VergeOS system
* The request is redirected to the VergeOS identity provider system
* When there is a third-party provider configured, the request is redirected upstream as needed (e.g. Google Auth)
* Tokens containing user information are sent back to the initial VergeOS system
* Tokens are verified and a user session is created

## Access Control

When editing an OIDC application, you can specify **Allowed Users** and **Allowed Groups** to control which accounts are permitted to authenticate through the application. This provides granular access control, allowing administrators to restrict OIDC application usage to specific users or group memberships rather than allowing all authenticated users.

## Configuration Steps

Configuring a central VergeOS identity provider involves the following steps:

1. Create any upstream authorization sources (like Google, Azure, Okta) on the system that will act as the VergeOS Identity Provider.

2. [Setting Up VergeOS as an OIDC Provider](/knowledge-base/setting-up-vergeos-as-identity-provider-oidc/)

!!! tip "Multiple OIDC applications can be created on the same system to accommodate different configurations."

3. [Configuring VergeOS as an OIDC Client](/knowledge-base/configuring-vergeos-as-oidc-client/)

For detailed implementation guidance and troubleshooting, refer to the linked knowledge base articles above.