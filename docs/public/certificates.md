---
title: SSL Certificates
description: SSL Certificate Types
published: true
date: 2023-01-27T21:49:36.972Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:56:35.603Z
---

## Self Signed
During the initial installation of VergeOS a self signed certificate is created automatically for the "root" level of the system. Upon [tenant](/docs/public/tenants) creation a new self signed certificate is also automatically created for the instance.

## Let's Encrypt
Using the built in functionality of [Let's Encrypt](https://letsencrypt.org/) an administrator is able to create a trusted SSL certificate on a per VDC basis providing the setting is enabled. This method is "set and forget" since once the certificate is created all renewals are handled automatically by the software every 60 days.
> To use this functionality one of the following conditions must be met
{.is-warning}
1. Ports 80 and 443 must be reachable from the internet
1. A URL is provided to an internal ACME server during configuration

## Manual
A manual certificate generated from a trusted authority may also be used. The required format for a manual SSL certificate is **.PEM**. This format should include a public key, a private key, and a chain key that will be entered into the designated fields during configuration.
<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>