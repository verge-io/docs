---
title: Auth Sources
description: Supported Auth Sources
published: true
date: 2023-04-19T13:42:03.943Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:55:16.082Z
---

## OAuth
Currently VergeIO supports the following auth sources based on the OAuth 2.0 protocol.

- Azure AD
- Google
- Okta
- Gitlab (OpenID)
- OpenID
- OpenID (Well-Known-Config)
- VergeIO Native
## Local Authentication With or Without Two Factor Email
Two-factor authentication is an option that provides an added layer of security for user logins. When two-factor authentication is enabled login requires authorization via the user's email address in addition to valid username and password. The first time a user initiates login from a new device, a security code is emailed to the user's email address. This code then must be entered to complete the login process. Optionally, the user can select to store the security code on the local device, for automatic retrieval on subsequent login actions from the same local device. (This function is intended for personal devices, such as a user's home computer, personal laptop, cellphone, etc.)

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>