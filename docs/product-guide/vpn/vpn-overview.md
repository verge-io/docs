# VPN

VPN provides a secure communications tunnel over a public network for remote user access and site-to-site connections (e.g. branch offices that need to collaborate and share resources) VergeOS software provides Wireguard and IPsec functionality for VPN functionality.

## VergeOS Site-to-Site VPN (connect multiple VergeOS sites)
To configure a secure tunnel connection between VergeOS sites, reference the site-to-site instructions on: [**Wireguard**](/product-guide/vpn/wireguard-config). Example Site-to-Site Wireguard configurations can be viewed at [**Wireguard Configuration Examples**](/product-guide/vpn/wireguard-examples).

## VPN for Secure Remote User Access to a VergeOS Site
To configure a secure tunnel connection for remote users to access a VergeOS system, consult the Wireguard Configuration page: [**Wireguard**](/product-guide/vpn/wireguard-config) and the [**Wireguard Configuration Examples**](/product-guide/vpn/wireguard-examples) for sample remote access configurations.

## Third-party Site-to-Site VPN (Connecting a VergeOS system with a 3rd-Party IPsec system)
IPsec functionality is provided for scenarios where VergeOS needs to interface with an IPsec device at another site (e.g. Cisco, PFSense, etc.)
Information regarding creating an IPsec peer for a VPN tunnel to a third-party IPsec peer can be found at: [**IPSEC Configuration**](/product-guide/vpn/ipsec)