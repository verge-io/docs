---
title: Configuring VergeOS as an OIDC Client
slug: configuring-vergeos-as-oidc-client
description: Step-by-step guide on setting up a VergeOS system or tenant to use OIDC authentication with another VergeOS identity provider
draft: false
date: 2025-01-22T15:41:14.296Z
tags:
  - oidc
  - client
  - authentication
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

# Configuring VergeOS as an OIDC Client

## Overview

!!! info "Key Points"
    - Configure VergeOS to use OIDC authentication
    - Connect to a VergeOS OIDC identity provider
    - Enable automatic user creation and synchronization
    - Customize login appearance and behavior

This guide explains how to configure a VergeOS system or tenant to authenticate using another VergeOS system as an OIDC identity provider.

## Prerequisites

- Access to the VergeOS OIDC provider system
- Well Known Configuration URL from the provider
- Client ID and Client Secret from the provider
- Administrative access to the client VergeOS system
- Full URL of the client VergeOS system

## Steps

### 1. Access Authorization Settings
- Click **System** in the top menu
- Select **Auth Sources**
- Click **New**

### 2. Configure Basic Settings
- **Name**: Enter an identifier for this auth source (appears on login button)
- **Driver**: Select **OpenID (Well Known Config)**
- **Base URL**: Enter the Well Known Configuration URL
- **Redirect URI**: Enter the full URL of this VergeOS system
- **Client ID**: Paste the client ID from the provider
- **Client Secret**: Paste the client secret from the provider

### 3. Configure Authentication Parameters
Default values typically work best for these settings:
- **Token hint parameter**: Leave as `post_logout_redirect_uri`
- **Redirect parameter**: Leave as `post_logout_redirect_uri`
- **Scope**: Leave as `openid profile email groups`
- **Group Scope**: Leave as `groups`

### 4. Enable Recommended Options
Check these boxes for optimal functionality:
- **Decode ID Token**
- **Update Remote User**
- **Update User Email Address**
- **Update User Display Name**
- **Update Group Membership**

### 5. Configure User Creation
Choose your preferred user creation method:
- **Auto-Create Users**: Enter `.*` to create all users automatically
- **Auto-Create Users in Group**: Specify groups for restricted auto-creation

### 6. Customize Login Appearance
Optionally configure:
- Button background color
- Button text color
- Custom Font Awesome icon
- Icon color (using HEX codes)

### 7. Save Configuration
- Click **Submit** to create the authorization source

## Best Practices

- Test authentication with a test user before rolling out widely
- Keep debug mode disabled unless troubleshooting
- Document your configuration choices for future reference
- Regular verify user synchronization is working as expected

## Troubleshooting

!!! warning "Common Issues"
      - **Authentication Fails**
        - Verify Client ID and Secret are correct
        - Check Well Known Configuration URL
        - Ensure Redirect URI matches exactly
  
      - **User Sync Issues**
        - Verify Group Scope is enabled
        - Check group membership settings
        - Enable Debug Mode temporarily
  
      - **Login Button Missing**
        - Verify authorization source is enabled
        - Check login styling settings
        - Clear browser cache

## Additional Resources

- [Font Awesome Icon Reference](https://fontawesome.com/v4.7.0/cheatsheet/)
- [Setting Up VergeOS as an OIDC Provider](/knowledge-base/setting-up-vergeos-as-identity-provider-oidc/)

## Feedback

!!! question "Need Help?"
    If you encounter any issues while configuring OIDC client settings or have questions about this process, please don't hesitate to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2024-01-22
    - VergeOS Version: 4.12 and later
    