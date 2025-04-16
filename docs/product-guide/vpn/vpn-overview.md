# VPN

VPN provides a secure communications tunnel over a public network for remote user access and site-to-site connections (e.g. branch offices that need to collaborate and share resources) VergeOS software provides WireGuard and IPsec functionality for VPN functionality.

## VergeOS Site-to-Site VPN 
A secure tunnel connection can be established between VergeOS sites or from a VergeOS site to a third-party WireGuard peer; reference the site-to-site instructions on: [**WireGuard**](/product-guide/vpn/wireguard-config). Example Site-to-Site WireGuard configurations can be viewed at [**WireGuard Configuration Examples**](/product-guide/vpn/wireguard-examples).

## VPN for Secure Remote User Access to a VergeOS Site
To configure a secure tunnel for remote users to access a VergeOS system, consult the WireGuard Configuration page: [**WireGuard**](/product-guide/vpn/wireguard-config) and the [**WireGuard Configuration Examples**](/product-guide/vpn/wireguard-examples) for sample remote access configurations.

## IPsec Site-to-Site with Third-party (for specific IPsec requirement)

IPsec functionality is provided for scenarios where VergeOS needs to interface with an IPsec device at another site (e.g. Cisco, pfSense, etc.)
Information on creating a VPN tunnel to a third-party IPsec peer can be found at: [**IPsec Configuration**](/product-guide/vpn/ipsec)