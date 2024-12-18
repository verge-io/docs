# OIDC Applications Overview

VergeOS provides OIDC functionality to allow centralized identity management for providers and enterprises supporting multiple VergeOS systems and or tenants.

## VergeOS OIDC Application Benefits

*Ability to establish a VergeOS system as an identity provider (with or without an upstream provider such as Google, Azure, etc.)
* Provides single sign-on (SSO) capabilities across VergeOS systems 
* MSPs can have central login linked back to their environment for all tenants
* Same app/token in an upstream auth provider can be used for multiple physical environments and tenants rather than creating a separate one for each.
* OIDC provides a standardized, widely-supported protocol with built-in security features
* Less administrative burden for user/group management across various VergeOS systems and tenants

## General Operational Flow

* User attempts to log in to a VergeOS system
* the request is redirected to the VergeOS provider system
* When there is a third-party provider configured, the system redirects upstream as needed (e.g. Google Auth)
* Tokens containing user information are sent back to the initial VergeOS system
* Tokens are verified and a user session is created

## Configuration

 Configuring a central VergeOS identity provider involves the following activities:

* (Optional) [Create upstream Auth Source(s), (Google, Azure, Okta, etc.)](/product-guide/AuthSources-General) on the VergeOS Provider.
* [Create an OIDC application on the VergeOS Provider system](/product-guide/OIDC-Create-app)
!!! tip "Multiple OIDC applications can be created on the same system to accommodate different configurations"
* [Create a new *Verge.io* Auth Source](/product-guide/OIDC-VergeAuth) on each Identity consumer system/tenant
