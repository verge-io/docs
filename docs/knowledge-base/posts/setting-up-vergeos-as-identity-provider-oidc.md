---
title: Setting Up VergeOS as an Identity Provider with OIDC
slug: setting-up-vergeos-as-identity-provider-oidc
description: Guide on configuring VergeOS as an OpenID Connect (OIDC) identity provider for centralized authentication across multiple systems
draft: false
date: 2025-01-22T15:41:14.296Z
tags:
  - oidc
  - authentication
  - identity provider
  - sso
  - single sign-on
  - oauth
  - auth
categories:
  - Authentication
  - System Administration
editor: markdown
dateCreated: 2025-01-22T19:08:58.594Z
---

# Setting Up VergeOS as an Identity Provider with OIDC

## Overview

!!! info "Key Points"
    - Create an OIDC application to establish VergeOS as an identity provider
    - Enable single sign-on for other VergeOS systems and tenants
    - Configure centralized authentication with third-party providers
    - Support multiple client systems with a single OIDC setup

This guide walks you through the process of configuring VergeOS as an identity provider using OpenID Connect (OIDC), allowing centralized authentication for multiple VergeOS systems and tenants.

## Prerequisites

- Administrative access to the VergeOS system
- Valid SSL certificate installed on the VergeOS system
- Basic understanding of OIDC concepts
- URLs of client systems that will use this authentication

## Steps to Create an OIDC Application

1. **Access OIDC Settings**
   - Navigate to **System** > **OIDC Applications** from the top menu
   - Click **New**

2. **Configure Basic Settings**
   - Enter a descriptive **Name** for the application
   - Check the **Enabled** box
   - Add an optional **Description**

3. **Set Up Redirect URIs**
   - Enter the callback URL(s) where users will be redirected after authentication
   - Format: `https://your-system-name.example.com`
   - Multiple URIs can be added for different client systems
   
!!! tip "Using Wildcards"
       You can use wildcards in redirect URIs:
       - For multiple systems: `https://examplecorp-site*.example.com`
       - For multiple subdomains: `https://vergesystem.*.example.com`

4. **Configure Authentication Options**
   - **Force Authorization Source**: Optionally select a third-party provider
   - **Map User**: Choose if all verified users should map to a specific account
   - Set **Scope Settings** (Profile, Email, Groups)
   - **Allowed Users / Allowed Groups**: Optionally specify which users or groups are permitted to authenticate through this application
   - Configure access restrictions if needed

5. **Save Configuration**
   - Click **Submit** to create the OIDC application
   - The system will generate a Client ID and Secret

## Retrieving Client Credentials

1. **Access Application Dashboard**
   - Navigate to **System > OIDC Applications**
   - Double-click your OIDC application

2. **Copy Required Information**
   - **Client ID**: Copy using the displayed value or copy icon
   - **Client Secret**: Use the copy icon (value is hidden)
   - **Well Known Configuration URL**: Copy the displayed URL

## Best Practices

- Create separate OIDC applications for different client groups
- Regularly review and update access restrictions
- Use specific redirect URIs instead of wildcards when possible
- Document which systems are using each OIDC application

## Troubleshooting

!!! warning "Common Issues"
      - **Authentication Fails**
         - Verify SSL certificate is valid and not expired
         - Check redirect URI matches exactly
         - Ensure client ID and secret are correctly copied
    
      - **Scope Access Denied**
         - Verify required scopes are enabled
         - Check user permissions in restriction settings
    
      - **Redirect Problems**
         - Confirm URL format matches redirect URI
         - Verify wildcard patterns if used
         - Check for SSL certificate issues

## Additional Resources

- [Configuring VergeOS as an OIDC Client](/knowledge-base/configuring-vergeos-as-oidc-client/)
- [Third-Party Authorization Sources](/product-guide/auth/auth-sources-overview/)
- [SSL Certificate Management](/product-guide/system/certificates/)

## Feedback

!!! question "Need Help?"
    If you encounter any issues while setting up OIDC or have questions about this process, please don't hesitate to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - VergeOS Version: 4.12 and later
    
