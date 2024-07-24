## Main Items
- [ ] Site Survey completed and approved by VergeIO
- [ ] ISO downloaded and installed on a USB drive
- [ ] Encryption Key USB installed and ready (if enabling at-rest encryption)
- [ ] Nodes powered up with ISO booted to VergeIO Install screen
- [ ] Crash cart ready if applicable
- [ ] Remote screen share capability or remote IPMI access (WAN or VPN)

## Hardware
- [ ] Hardware burn-in complete
- [ ] All Drives setup for JBOD, **NO RAID**
- [ ] BIOS set to proper boot settings (Legacy / Dual / UEFI) **UEFI is required if all drives are NVMe**
- [ ] BIOS clocks set correctly
- [ ] Redundant Power supplies setup and connected (recommended)
- [ ] IPMI ports patched and configured
- [ ] IPMI setup / configured / tested
- [ ] Latest IPMI firmware (recommended)
- [ ] Test IPMI remote console capability (in case of incorrect licensing)

## Network
- [ ] All switches online and tested
- [ ] All cables patched
- [ ] All VLANs configured (core - required, external - optional)
- [ ] Each Core switch should be on a dedicated VLAN (ex 101 for core 1, 102 for core 2)
- [ ] All switch ports configured (core and external)
- [ ] External Bond ports setup correctly if bonding external (do not bond Core)
- [ ] 2 NICs per node minimum and separate switches
- [ ] Correct Supported SFP modules (if applicable)
- [ ] Correct IPs validated and available
- [ ] Correct Gateway IP tested/pingable

<br>
[Request Trial](https://www.verge.io/test-drive){ .md-button .md-button--primary }