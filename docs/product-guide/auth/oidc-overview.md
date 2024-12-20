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

## Configuration Steps

 Configuring a central VergeOS identity provider involves the following steps:

1. **(Optional)** [Create Upstream Authorizatin Source(s), (Google, Azure, Okta, etc.](/product-guide/auth/auth-sources-general) on the system that will act as the VergeOS Identity Provider.
2. [**Create an OIDC application**](/product-guide/auth/oidc-create-application) on the VergeOS Provider System
!!! tip "Multiple OIDC applications can be created on the same system to accommodate different configurations."
3. [**Create a New Auth Source**](/product-guide/auth/oidc-vergeos-relying-party) on each identity client system/tenant.
