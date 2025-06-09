# Recipes

Recipes empower you to streamline and expedite your tenant and VM deployments. A recipe consists of a pre-built golden image and defined customizable options that simplify new implementations while reinforcing adherence to compliance standards, or other policies and protocols.

## Getting Started

New to VergeOS recipes? Start here:

1. **[Explore the Recipe Marketplace](/product-guide/automation/vm-recipes#included-vm-recipes)** - Browse ready-to-use VM recipes
2. **[Create your first VM recipe](/product-guide/automation/vm-recipes)** - Build a custom template from an existing VM
3. **[Organize with catalogs](/product-guide/automation/recipes-organization)** - Set up repositories for recipe management

## Key Features

* **Out-of-the-box Samples:** The [**Recipe Marketplace**](/product-guide/automation/vm-recipes#included-vm-recipes) is automatically available with ready-to-use recipes that can also be cloned and fine-tuned to fit your specific requirements.
* **Recipe Exchange:** [**Share Recipes**](/product-guide/automation/recipes-organization#sharing-recipes) with tenants and between VergeOS systems. 
* **Organization/Access control:** Effortlessly organize recipes into unlimited catalogs, each with configurable access settings.
* **Expansive Options:** Questions added to a recipe allow you to collect all types of input (boolean, text, dropdown lists, IP addresses, network selections, etc.) that can be used to tailor each tenant/VM instance.
* **Guest OS Customizations:** [**Cloud-Init and Cloudbase-init Integration**](/product-guide/automation/vm-recipes#advanced-usage) enable you to use open-source and/or custom scripts to automate configuration within a guest operating system from variable inputs (set username/password, install applications, configure static IP or DHCP settings, specify hostname, etc.)

## Recipe Types

### VM Recipes
Create standardized virtual machine templates with customizable parameters for rapid deployment of consistent workloads.

**Common use cases:**
- **Development environments** - Standardized dev/test platforms
- **Application servers** - Pre-configured web, database, or application stacks
- **Desktop templates** - Consistent VDI deployments
- **Security appliances** - Hardened systems with compliance baselines

### Tenant Recipes
Deploy complete virtual data centers with predefined networks, VMs, and configurations.

**Common use cases:**
- **Customer onboarding** - Rapid provisioning for new clients
- **Department provisioning** - Standardized environments for business units
- **Project environments** - Temporary, isolated workspaces
- **Compliance templates** - Pre-configured environments meeting regulatory requirements

## Benefits & Use Cases

### For Service Providers
- **Rapid customer onboarding** with standardized, proven configurations
- **Consistent service delivery** across all customer deployments
- **Reduced deployment time** from hours to minutes
- **Built-in compliance** through standardized templates

### For Enterprises
- **Standardized deployments** across departments and locations
- **Reduced configuration errors** through automated provisioning
- **Faster time-to-production** for new projects and initiatives
- **Policy enforcement** through template-based deployments

### For Development Teams
- **Consistent development environments** across team members
- **Rapid environment provisioning** for testing and staging
- **Version-controlled infrastructure** through recipe management
- **Self-service deployment** reducing IT bottlenecks

## Advanced Capabilities

### Automation Integration
- **Cloud-Init/Cloudbase-Init** support for guest OS customization
- **Variable substitution** for dynamic configuration
- **Conditional logic** for complex deployment scenarios
- **Pre and post-deployment** scripting capabilities

### Management Features
- **Recipe versioning** for change tracking and rollback
- **Access controls** for security and compliance
- **Cross-system sharing** for distributed environments
- **Template inheritance** for efficient recipe management

## Related Documentation

### Getting Started
- [Recipe Organization (Repositories/Catalogs)](/product-guide/automation/recipes-organization)
- [VM Recipes](/product-guide/automation/vm-recipes)
- [Tenant Recipes](/product-guide/automation/tenant-recipes)

### Advanced Topics
- [Cloud-Init Integration](/product-guide/automation/vm-recipes#advanced-usage)
- [Recipe Sharing Between Systems](/product-guide/automation/recipes-organization#sharing-recipes)
- [Recipe Marketplace](/product-guide/automation/vm-recipes#included-vm-recipes)