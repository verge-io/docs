import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://docs.verge.io',
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: 'img-svg' }]],
  },
  integrations: [
    starlight({
      title: 'VergeOS Docs',
      description:
        'Comprehensive technical documentation for VergeOS hyperconverged infrastructure (HCI) platform.',
      favicon: '/favicon.svg',
      logo: {
        dark: './src/assets/vergeosfulllogowhite.svg',
        light: './src/assets/vergeosfulllogoblack.svg',
        replacesTitle: true,
      },
      editLink: {
        baseUrl: 'https://github.com/verge-io/docs/edit/main/astro-site/src/content/docs/',
      },
      social: [
        { icon: 'x.com', label: 'X (Twitter)', href: 'https://x.com/VergeUCI' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/verge-io/' },
        { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCnFu28s0GBVi18j7Ez3MXRg' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/verge-io/docs' },
        { icon: 'email', label: 'Support', href: 'mailto:support@verge.io' },
      ],
      head: [
        {
          tag: 'script',
          content: `document.addEventListener('DOMContentLoaded', () => {
            // Social links: open in new tab
            document.querySelectorAll('.social-icons a, header a[rel="me"]').forEach(a => {
              if (a.href && !a.href.startsWith(location.origin)) {
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'noopener noreferrer');
              }
            });
          });`,
        },
      ],
      customCss: ['./src/styles/custom.css'],
      plugins: [
        starlightSidebarTopics(
          [
            {
              label: 'Implementation Guide',
              link: '/implementation-guide/intro/',
              icon: 'rocket',
              id: 'implementation',
              items: [
            { label: 'Intro', slug: 'implementation-guide/intro' },
            { label: 'Core Concepts', slug: 'implementation-guide/concepts' },
            { label: 'Node Sizing', slug: 'implementation-guide/sizing' },
            { label: 'Network Design', slug: 'implementation-guide/network-design' },
            { label: 'Switch Config Guide', slug: 'implementation-guide/switch-configuration' },
            {
              label: 'Installation',
              items: [
                { label: 'Pre-Installation', slug: 'implementation-guide/pre-installation' },
                { label: 'Bootable Media', slug: 'implementation-guide/install-media' },
                { label: 'Installation', slug: 'implementation-guide/installation-guide' },
                { label: 'Post-Installation', slug: 'implementation-guide/post-installation' },
              ],
            },
            {
              label: 'Install Additional Nodes',
              items: [
                { label: 'Scale Out Nodes', slug: 'implementation-guide/scale-out-nodes' },
                { label: 'Compute Nodes', slug: 'implementation-guide/compute-nodes' },
                { label: 'Storage Nodes', slug: 'implementation-guide/storage-nodes' },
              ],
            },
            {
              label: 'Reference Architecture',
              items: [
                { label: 'Edge / ROBO', slug: 'reference-architecture/edge' },
                { label: 'Cloud Providers', slug: 'reference-architecture/csp' },
                { label: 'Life / Data Science', slug: 'reference-architecture/data-science' },
                { label: 'Homelab', slug: 'reference-architecture/homelab' },
              ],
            },
          ],
        },
            {
              label: 'Product Guide',
              link: '/product-guide/intro/what-is-vergeos/',
              icon: 'open-book',
              id: 'product',
              items: [
            {
              label: 'Introduction',
              items: [
                { label: 'What is VergeOS?', slug: 'product-guide/intro/what-is-vergeos' },
                { label: 'Platform Capabilities', slug: 'product-guide/intro/platform-capabilities' },
                { label: 'Transitioning from VMware', slug: 'product-guide/intro/transition-from-vmware' },
                { label: 'UI Overview', slug: 'product-guide/ui-overview' },
                { label: 'New System Configuration', slug: 'product-guide/intro/new-system-configuration' },
              ],
            },
            {
              label: 'Storage',
              items: [
                { label: 'Overview', slug: 'product-guide/storage/overview' },
                { label: 'vSAN Architecture', slug: 'product-guide/storage/vsan-architecture' },
                { label: 'vSAN Redundancy Levels', slug: 'product-guide/storage/vsan-redundancy-levels' },
                { label: 'Storage Tiers', slug: 'product-guide/storage/storage-tiers' },
                { label: 'Preferred Tier', slug: 'product-guide/storage/preferred-tiers' },
                { label: 'External Storage Integration', slug: 'product-guide/storage/external-storage-integration' },
                { label: 'Fibre Channel', slug: 'product-guide/storage/fibre-channel' },
                { label: 'vSAN Deletion Process', slug: 'product-guide/storage/vsan-deletion-process' },
                { label: 'vSAN Diagnostics', slug: 'product-guide/storage/vsan-diagnostics' },
              ],
            },
            {
              label: 'Backup & DR',
              items: [
                { label: 'Overview', slug: 'product-guide/backup-dr/overview' },
                {
                  label: 'Snapshots',
                  items: [
                    { label: 'Overview', slug: 'product-guide/backup-dr/snapshots-overview' },
                    { label: 'System Snapshots', slug: 'product-guide/backup-dr/system-snapshots' },
                    { label: 'Restores from System Snapshots', slug: 'product-guide/backup-dr/system-snapshot-restores' },
                    { label: 'Snapshot Profiles', slug: 'product-guide/backup-dr/snapshot-profiles' },
                    { label: 'Immutable Snapshots', slug: 'product-guide/backup-dr/immutable-snapshots' },
                    { label: 'VM Snapshots and Restores', slug: 'product-guide/backup-dr/vm-snapshots-restores' },
                    { label: 'Tenant Snapshots', slug: 'product-guide/tenants/tenant-snapshots' },
                    { label: 'NAS Volume Snapshots and Restores', slug: 'product-guide/nas/volume-snapshots-restores' },
                  ],
                },
                {
                  label: 'Site Syncs',
                  items: [
                    { label: 'Overview', slug: 'product-guide/backup-dr/syncs-overview' },
                    { label: 'Configuration', slug: 'product-guide/backup-dr/sync-configuration' },
                    { label: 'Monitoring', slug: 'product-guide/backup-dr/monitoring-site-syncs' },
                    { label: 'Sync Back', slug: 'product-guide/backup-dr/sync-back' },
                    { label: 'Manual Sync', slug: 'product-guide/backup-dr/manual-site-syncs' },
                    { label: 'Repair Server', slug: 'product-guide/backup-dr/repair-server' },
                  ],
                },
              ],
            },
            {
              label: 'System Configuration',
              items: [
                { label: 'SMTP', slug: 'product-guide/system/smtp' },
                {
                  label: 'Authentication',
                  items: [
                    { label: 'Overview', slug: 'product-guide/auth/auth-sources-overview' },
                    { label: 'Entra ID / Azure AD', slug: 'product-guide/auth/azure-auth' },
                    { label: 'Google', slug: 'product-guide/auth/google-auth' },
                    { label: 'Multi-Factor Authentication', slug: 'product-guide/auth/multifactor-auth' },
                    { label: 'OIDC Applications Overview', slug: 'product-guide/auth/oidc-apps-overview' },
                  ],
                },
                { label: 'Certificates', slug: 'product-guide/system/certificates' },
                {
                  label: 'Clusters',
                  items: [
                    { label: 'Overview', slug: 'product-guide/system/clusters-overview' },
                    { label: 'Configuration Options', slug: 'product-guide/system/cluster-settings' },
                  ],
                },
                {
                  label: 'Access Control',
                  items: [
                    { label: 'Users and Groups', slug: 'product-guide/system/users-groups' },
                    { label: 'Permissions', slug: 'product-guide/system/permissions' },
                    { label: 'API Keys', slug: 'product-guide/system/api-keys' },
                  ],
                },
                {
                  label: 'Nodes',
                  items: [
                    { label: 'Overview', slug: 'product-guide/system/nodes-overview' },
                    { label: 'Core Fabric Status', slug: 'product-guide/system/core-fabric-status' },
                    { label: 'IPMI', slug: 'product-guide/system/ipmi' },
                    { label: 'System Event Log (SEL)', slug: 'product-guide/system/sel' },
                    { label: 'Node Diagnostics', slug: 'product-guide/system/node-diagnostics' },
                  ],
                },
                {
                  label: 'Sites Dashboard',
                  items: [
                    { label: 'Overview', slug: 'product-guide/system/sites-overview' },
                    { label: 'Adding Sites', slug: 'product-guide/system/site-dashboard-add-sites' },
                  ],
                },
                {
                  label: 'Tasks / Events',
                  items: [
                    { label: 'Create Automated Tasks', slug: 'product-guide/automation/create-tasks' },
                  ],
                },
                { label: 'Service Containers', slug: 'product-guide/system/service-containers' },
                {
                  label: 'System Settings',
                  items: [
                    { label: 'Overview', slug: 'product-guide/system/settings-overview' },
                    { label: 'Licensing Overview', slug: 'product-guide/system/licensing-overview' },
                    { label: 'Licensing and Updates', slug: 'product-guide/system/licensing-and-updates' },
                    { label: 'Advanced Settings', slug: 'product-guide/system/advanced-system-settings' },
                  ],
                },
                { label: 'Tags', slug: 'product-guide/system/tags' },
                { label: 'Themes', slug: 'product-guide/system/themes' },
              ],
            },
            {
              label: 'Virtual Machines',
              items: [
                { label: 'Overview', slug: 'product-guide/virtual-machines/overview' },
                {
                  label: 'Quick Start',
                  items: [
                    { label: 'Best Practices', slug: 'product-guide/virtual-machines/vm-best-practices' },
                    { label: 'Uploading Media Images', slug: 'product-guide/storage/uploading-files-to-vsan' },
                    { label: 'Creating Virtual Machines', slug: 'product-guide/virtual-machines/creating-vms' },
                    { label: 'Virtual Machine Drives', slug: 'product-guide/virtual-machines/vm-drives' },
                    { label: 'Virtual Machine Network Interfaces', slug: 'product-guide/virtual-machines/vm-nics' },
                    { label: 'Virtual Machine Fields', slug: 'product-guide/virtual-machines/vm-field-descriptions' },
                    { label: 'VM Guest Agent', slug: 'product-guide/virtual-machines/vm-guest-agent' },
                  ],
                },
                {
                  label: 'Migrating VMs to VergeOS',
                  items: [
                    { label: 'Overview', slug: 'product-guide/virtual-machines/vm-migration-overview' },
                    { label: 'From Media Images', slug: 'product-guide/virtual-machines/import-from-upload' },
                    { label: 'From VMware Backup', slug: 'product-guide/virtual-machines/import-from-vmware' },
                    { label: 'From NAS Volume', slug: 'product-guide/virtual-machines/import-from-nas' },
                    { label: 'Viewing Import Jobs', slug: 'product-guide/virtual-machines/view-import-jobs' },
                  ],
                },
                {
                  label: 'VM Operations',
                  items: [
                    { label: 'Working With VMs', slug: 'product-guide/virtual-machines/working-with-vms' },
                    { label: 'Live Migrations', slug: 'product-guide/virtual-machines/live-migrations' },
                  ],
                },
                {
                  label: 'VDI',
                  items: [
                    { label: 'VDI Administrator', slug: 'product-guide/virtual-machines/vdi-administrator' },
                    { label: 'VDI User', slug: 'product-guide/virtual-machines/vdi-user' },
                    { label: 'Virtual Machine Remote Console', slug: 'product-guide/virtual-machines/vm-remote-console' },
                  ],
                },
                { label: 'Guest OS Compatibility', slug: 'product-guide/virtual-machines/guest-os-compatibility' },
              ],
            },
            {
              label: 'Tenants',
              items: [
                { label: 'Overview', slug: 'product-guide/tenants/overview' },
                { label: 'Creating Tenants', slug: 'product-guide/tenants/create-tenants' },
                { label: 'Layer 2 Networks', slug: 'product-guide/tenants/layer-2-networks' },
                { label: 'Assigning External IP Addresses', slug: 'product-guide/tenants/assign-ip-to-tenant' },
                { label: 'Increasing Resources', slug: 'product-guide/tenants/add-tenant-resources' },
                { label: 'Modifying Tenants', slug: 'product-guide/tenants/tenant-modifications' },
                { label: 'Monitoring Tenants', slug: 'product-guide/tenants/tenant-monitoring' },
                { label: 'Reducing Resources', slug: 'product-guide/tenants/reduce-tenant-resources' },
                { label: 'Sharing Files', slug: 'product-guide/tenants/provide-files-to-tenant' },
                { label: 'Sharing VMs', slug: 'product-guide/tenants/share-vm-snapshot' },
                { label: 'Tenant Snapshots', slug: 'product-guide/tenants/tenant-snapshots' },
                { label: 'Tenant Restores', slug: 'product-guide/tenants/tenant-restores' },
                { label: 'Usage Reports', slug: 'product-guide/tenants/tenant-usagereports' },
              ],
            },
            {
              label: 'NAS',
              items: [
                { label: 'Overview', slug: 'product-guide/nas/overview' },
                { label: 'Add a NAS Service', slug: 'product-guide/nas/nas-service' },
                { label: 'NAS Diagnostics', slug: 'product-guide/nas/nas-diagnostics' },
                {
                  label: 'Configuration',
                  items: [
                    { label: 'Local Volumes', slug: 'product-guide/nas/nas-local-volumes' },
                    { label: 'Remote Volumes', slug: 'product-guide/nas/nas-remote-volumes' },
                    { label: 'Shares', slug: 'product-guide/nas/nas-shares' },
                    { label: 'VM Export', slug: 'product-guide/virtual-machines/vm-export-volume' },
                    { label: 'Volume Syncs', slug: 'product-guide/nas/volume-syncs' },
                    { label: 'Join NAS to AD', slug: 'product-guide/nas/nas-join-ad-domain' },
                  ],
                },
              ],
            },
            {
              label: 'Networking',
              items: [
                { label: 'Overview', slug: 'product-guide/networks/network-overview' },
                { label: 'Concepts', slug: 'product-guide/networks/network-concepts' },
                {
                  label: 'Quick-Start Tasks',
                  items: [
                    { label: 'Connect to an Existing LAN/WAN', slug: 'product-guide/networks/connect-lan-wan' },
                    { label: 'Create an Internal Network with External Access', slug: 'product-guide/networks/internal-external-access' },
                    { label: 'Creating an Internal Layer2 Network', slug: 'product-guide/networks/internal-layer2' },
                    { label: 'Create a Layer 3 Internal Network', slug: 'product-guide/networks/internal-layer3' },
                    { label: 'Create a DHCP Static Entry', slug: 'product-guide/networks/dhcp-static-lease' },
                    { label: 'Assign an External IP to an Internal network', slug: 'product-guide/networks/assign-external-ip' },
                    { label: 'Create a 1:1 NAT', slug: 'product-guide/networks/nat-1to1' },
                  ],
                },
                {
                  label: 'Configuration',
                  items: [
                    { label: 'Creating an Internal Network', slug: 'product-guide/networks/internal-networks' },
                    { label: 'Using Aliases', slug: 'product-guide/networks/aliases' },
                    { label: 'Network Rules', slug: 'product-guide/networks/network-rules' },
                    { label: 'VLANs', slug: 'product-guide/networks/create-vlan' },
                    { label: 'Bonded VLANs', slug: 'product-guide/networks/bonded-vlans' },
                  ],
                },
                {
                  label: 'Monitoring',
                  items: [
                    { label: 'Network Dashboards', slug: 'product-guide/networks/network-dashboards' },
                    { label: 'Tracking Network Statistics', slug: 'product-guide/networks/tracking-net-statistics' },
                    { label: 'Port Mirroring', slug: 'product-guide/networks/port-mirroring' },
                    { label: 'Network Diagnostics', slug: 'product-guide/networks/network-diagnostics' },
                  ],
                },
                {
                  label: 'VPN',
                  items: [
                    { label: 'Overview', slug: 'product-guide/vpn/vpn-overview' },
                    { label: 'IPSec', slug: 'product-guide/vpn/ipsec' },
                    { label: 'WireGuard', slug: 'product-guide/vpn/wireguard-config' },
                    { label: 'WireGuard Examples', slug: 'product-guide/vpn/wireguard-examples' },
                  ],
                },
                { label: 'Authoritative DNS', slug: 'product-guide/networks/authoritative-dns' },
                {
                  label: 'Troubleshooting',
                  items: [
                    { label: 'Network Troubleshooting', slug: 'product-guide/networks/net-troubleshooting' },
                  ],
                },
              ],
            },
            {
              label: 'Private AI',
              items: [
                { label: 'Overview', slug: 'product-guide/private-ai/overview' },
                { label: 'Configuration', slug: 'product-guide/private-ai/configuration' },
                { label: 'Open AI Router', slug: 'product-guide/private-ai/open-ai-router' },
                { label: 'Chat Sessions', slug: 'product-guide/private-ai/chat-sessions' },
              ],
            },
            {
              label: 'Automation',
              items: [
                { label: 'Scripts', slug: 'product-guide/automation/scripts' },
                { label: 'Webhooks', slug: 'product-guide/automation/webhooks' },
                {
                  label: 'Recipes',
                  items: [
                    { label: 'Overview', slug: 'product-guide/automation/recipes-overview' },
                    { label: 'Organizing Recipes', slug: 'product-guide/automation/recipes-organization' },
                    { label: 'VM Recipes', slug: 'product-guide/automation/vm-recipes' },
                    { label: 'Tenant Recipes', slug: 'product-guide/automation/tenant-recipes' },
                    { label: 'Marketplace VM Recipes', slug: 'product-guide/automation/marketplace-vm-recipes' },
                  ],
                },
                {
                  label: 'Task Engine',
                  items: [
                    { label: 'Overview', slug: 'product-guide/automation/task-engine' },
                    { label: 'Create Tasks', slug: 'product-guide/automation/create-tasks' },
                    { label: 'Schedules', slug: 'product-guide/automation/schedules' },
                  ],
                },
              ],
            },
            {
              label: 'GPU & Device Passthrough',
              items: [
                { label: 'Overview', slug: 'product-guide/system/device-pass-overview' },
                { label: 'NVIDIA GPU Virtualization', slug: 'product-guide/tools-integrations/nvidia-gpu-virtualization' },
                { label: 'NVIDIA vGPU Configuration', slug: 'product-guide/system/nvidia-vgpu' },
                { label: 'SR-IOV NIC', slug: 'product-guide/system/sriov-nics' },
                { label: 'USB Passthrough', slug: 'product-guide/system/usb-passthrough' },
                { label: 'One-to-One PCI Passthrough', slug: 'product-guide/system/generic-pci-passthrough' },
              ],
            },
            {
              label: 'Maintenance & Monitoring',
              items: [
                { label: 'Diagnostics Overview', slug: 'product-guide/maintenance-monitoring/diagnostics-overview' },
                {
                  label: 'Subscriptions/Alerts',
                  items: [
                    { label: 'Creating Subscriptions', slug: 'product-guide/system/subscriptions-overview' },
                    { label: 'Subscription Profiles', slug: 'product-guide/system/subscription-profiles' },
                    { label: 'Accessing Subscriptions', slug: 'product-guide/system/subscriptions-accessing' },
                  ],
                },
                { label: 'System Diagnostics', slug: 'product-guide/system/diagnostics' },
                { label: 'Alarms', slug: 'product-guide/operations/alarms' },
                { label: 'Prometheus Exporter', slug: 'product-guide/tools-integrations/prometheus-exporter' },
              ],
            },
            {
              label: 'Operations',
              items: [
                { label: 'Drive Replacement', slug: 'product-guide/operations/drive-replacement' },
                { label: 'Maintenance Mode', slug: 'product-guide/operations/maintenance-mode' },
                {
                  label: 'Standard Operating Procedures',
                  items: [
                    { label: 'Overview', slug: 'product-guide/operations/sop-overview' },
                    { label: 'Scale Out Nodes', slug: 'product-guide/operations/sop-scale-out' },
                    { label: 'System Updates', slug: 'product-guide/operations/sop-update' },
                    { label: 'Installation Procedures', slug: 'product-guide/operations/sop-verge-install' },
                    { label: 'vSAN Scale Up', slug: 'product-guide/operations/vsan-scale-up-sop' },
                  ],
                },
              ],
            },
            {
              label: 'Tools and Integrations',
              items: [
                {
                  label: 'Automation & API',
                  items: [
                    { label: 'Terraform Provider', slug: 'product-guide/tools-integrations/terraform-provider' },
                    { label: 'PowerShell Module', slug: 'product-guide/tools-integrations/powershell-module' },
                    { label: 'Python SDK', slug: 'product-guide/tools-integrations/python-sdk' },
                    { label: 'Go SDK', slug: 'product-guide/tools-integrations/go-sdk' },
                  ],
                },
                {
                  label: 'Backup & Migration',
                  items: [
                    { label: 'Storware Backup and Recovery', slug: 'product-guide/tools-integrations/storware-backup-recovery' },
                    { label: 'Cirrus Data Migration', slug: 'product-guide/tools-integrations/cirrus-data' },
                  ],
                },
                {
                  label: 'VDI & Desktop Delivery',
                  items: [
                    { label: 'Inuvika Virtual Apps and Desktops', slug: 'product-guide/tools-integrations/inuvika' },
                  ],
                },
              ],
            },
          ],
        },
            {
              label: 'Knowledge Base',
              link: '/knowledge-base/',
              icon: 'information',
              id: 'kb',
              items: [],
            },
            {
              label: 'Developer Guide',
              link: '/developer-guide/overview/',
              icon: 'seti:code-search',
              badge: 'New',
              id: 'developer',
              items: [
            { label: 'Overview', slug: 'developer-guide/overview' },
            { label: 'Getting Started', slug: 'developer-guide/getting-started' },
            {
              label: 'API Reference',
              items: [
                { label: 'Overview', slug: 'developer-guide/api-reference/overview' },
                { label: 'API Tables', slug: 'developer-guide/api-reference/api-tables' },
                { label: 'Helper Script', slug: 'developer-guide/api-reference/helper-script' },
                { label: 'NAS Volume Browser', slug: 'developer-guide/api-reference/nas-volume-browser' },
                { label: 'VM Creation', slug: 'developer-guide/api-reference/vm-creation' },
                { label: 'VM Configuration', slug: 'developer-guide/api-reference/vm-configuration' },
                { label: 'VM Power Management', slug: 'developer-guide/api-reference/vm-power-management' },
                { label: 'VM Lifecycle Management', slug: 'developer-guide/api-reference/vm-lifecycle-management' },
                { label: 'VM Advanced Operations', slug: 'developer-guide/api-reference/vm-advanced-operations' },
              ],
            },
            {
              label: 'SDKs',
              items: [
                { label: 'Python SDK', slug: 'developer-guide/sdks/python-sdk' },
                { label: 'Go SDK', slug: 'developer-guide/sdks/go-sdk' },
                { label: 'PowerShell Module', slug: 'developer-guide/sdks/powershell-module' },
              ],
            },
            {
              label: 'Infrastructure as Code',
              items: [
                { label: 'Terraform Provider', slug: 'developer-guide/iac/terraform-provider' },
                { label: 'Ansible Collection', slug: 'developer-guide/iac/ansible-collection' },
                { label: 'Packer Plugin', slug: 'developer-guide/iac/packer-plugin' },
              ],
            },
            {
              label: 'Kubernetes',
              items: [
                { label: 'Kubernetes Integration', slug: 'developer-guide/kubernetes/kubernetes-integration' },
                { label: 'Rancher Integration', slug: 'developer-guide/kubernetes/rancher-integration' },
              ],
            },
            { label: 'CLI (vrg)', slug: 'developer-guide/cli/vrg' },
            { label: 'Webhooks & Events', slug: 'developer-guide/webhooks-events' },
            { label: 'Code Examples', slug: 'developer-guide/code-examples' },
            { label: 'Monitoring (Prometheus)', slug: 'developer-guide/monitoring/prometheus-exporter' },
          ],
        },
            {
              label: 'Release Notes',
              link: '/release-notes/release-notes-overview/',
              icon: 'list-format',
              id: 'release-notes',
              items: [
            { label: 'Overview', slug: 'release-notes/release-notes-overview' },
            { label: '26.1 (latest)', slug: 'release-notes/26-1-release-notes' },
            { label: '26.0', slug: 'release-notes/26-0-release-notes' },
            { label: '4.13', slug: 'release-notes/4-13-release-notes' },
            { label: '4.12', slug: 'release-notes/4-12-release-notes' },
            { label: '4.11', slug: 'release-notes/4-11-release-notes' },
            { label: '4.10', slug: 'release-notes/4-10-release-notes' },
                { label: '4.9', slug: 'release-notes/4-9-release-notes' },
              ],
            },
            {
              label: 'Glossary',
              link: '/glossary/',
              icon: 'open-book',
              id: 'glossary',
            },
          ],
          {
            exclude: ['/', '/support/'],
            topics: {
              kb: ['/knowledge-base/**'],
            },
          },
        ),
      ],
    }),
  ],
});
