This is really just another facet of auth sources to cover.  prob should not be in a separate section of it's own.
figure out how to work it into auth sources section

VergeOS Authentication/authorization

Base VergeOS authentication on a single vergeos system by setting up a verge system to be your OIDC server. Verge as an auth source. Centralized authentication Can simplify user/permission administration in larger VergeOS ecosystems where there are multiple physical environments and/or tenant systems.

OIDC -authentication, while oauth authorization?
"OpenID Connect (OIDC) is an identity authentication protocol that is an extension of open authorization (OAuth) 2.0 to standardize the process for authenticating and authorizing users when they sign in to access digital services. OIDC provides authentication, which means verifying that users are who they say they are."


compatible with any oauth external source  instead of setting up permissioning on each system, we can just control groups allowed on each system.

The system can be a passthru (piggyback) to an external oauth server, such as Google, Azure, etc. or can simply use native VergeOS authentication.

This includes tenants as well as additional physical environments
Ability to restrict each system or tenant to particular groups

examples:

MSP with many tenants, maybe multiple physical environments too?

Large corporate with various departments running across physical environments and tenant systems


Can you have one-offs on individual tenants/systems as well - where you can add users with permissions that only pertain to that system?









