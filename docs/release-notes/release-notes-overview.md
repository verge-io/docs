# Release Notes

Welcome to the VergeOS Release Notes. This section provides information about each release version of VergeOS. Click on any version number to view the detailed release notes for that version.

!!! note "Recommendations"
    - Verge.io recommends always updating to the latest patch and/or hotfix version within your current minor release version
    - Verge.io recommends always updating to the latest minor release version
    - For access to the latest features and functionality documented in this guide, please ensure you are running the latest version of VergeOS

## Release Version Overview

| Release | Initial Release | Latest Version | Status | End-of-Life |
|--------|----------------|----------------|---------|-------------|
| [26.0](release-notes.md) | October 2025 | 26.0.1.2 (October 2025) | Latest | TBD |
| [4.13](4-13-release-notes.md) | November 2024 | 4.13.4.2 (August 2025) | Supported | TBD |
| [4.12](4-12-release-notes.md) | February 2024 | 4.12.6 (July 2024) | Supported | TBD |
| [4.11](4-11-release-notes.md) | February 2023 | 4.11.4.3 (January 2024) | Deprecated | December 2024 |
| [4.10](4-10-release-notes.md) | June 2022 | 4.10.3.1 (January 2023) | Deprecated | June 2024 |
| [4.9](4-9-release-notes.md) | October 2021 | 4.9.2 (February 2022) | Deprecated | February 2023 |

## Version Numbering and Updates

VergeOS uses semantic versioning with two different formats:

- **Legacy Format**: Major.Minor.Patch.Hotfix (e.g., 4.13.4.2)
- **New Format** (26.0+): YearQuarter.Minor.Patch (e.g., 26.0.1)
    - First two digits represent the year (25 = 2025, 26 = 2026)
    - Third digit represents the quarter development started (0-3)
    - Remaining digits represent minor and patch versions

!!! tip "Update Process"
    - **Minor**, **Patch**, and **Hotfix** updates support live system updates with no impact to running workloads
    - **Major** version updates *may* require a system reboot to complete the update process
    - Updates should always be performed sequentially within a major version (e.g., 4.13.2 → 4.13.3 → 4.13.4)
    - When upgrading from 4.13.x to 26.0.x, follow the upgrade path through 4.13.4.2 first

!!! note "Version Archive"
    Release notes for versions prior to 4.9 have been archived and are not available in this documentation
