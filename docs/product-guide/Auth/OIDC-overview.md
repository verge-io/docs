# OIDC Applications Overview

## OIDC Application Benefits

*OIDC (OpenID Connect) functionality allows centralized management and streamlined auth across multiple physical VergeOS systems and tenants.
*Ability to establish a VergeOS system as an identity provider (with or without an upstream provider such as Google, Azure, etc.)
* A vergeOS OIDC application can be selected as an auth source on other verge systems
* Can provide single sign-on (SSO) capabilities across VergeOS systems 
* Providers/MSPs can have central login linked back to their environment for all tenants
* Same app/token in an upstream auth provider can be used for multiple physical environments and tenants rather than creating a separate one for each.
* More secure with standardized protocol with wide industry support and built-in security features
* and less administrative burden for user management across multiple VergeOS systems and tenants

## General Flow
*User attempts to login to a VergeOS system
*the VergeOs system redirects to the VergeOS provider system
*When there is a third-party provider configured, the system redirects upstream as needed (ex: Google Auth)
*Tokens containing user information is sent back to the initial VergeOS system
* Tokens are verified and a user session is created

## High Level Steps
  * [Create an OIDC application on the VergeOS Provider system](/product-guide/OIDC-Create-app)
  * (If applicable) [Create upstream Auth Source(s), (Google, Azure, Okta, etc.)](/product-guide/AuthSources-General)  on the VergeOS Provider
  * [Create a new *Verge.io* Auth Source](/product-guide/OIDC-VergeAuth) on each Identity consumer system/tenant
