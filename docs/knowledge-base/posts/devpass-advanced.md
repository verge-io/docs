# Device Passthrough - Advanced Usage

Resource rules can also be manually created.
from the main dashboard, click Resources.
Click **Rules** (ui card or on the left menu).
Click **New** on the left menu.
Provide a **Name** for the Rule; it is recommended to use a descriptive name can be helpful in future administration.
Select the **Resource Group** to which the resource rule will apply.
Select a specific **Node** or select *--None--* to apply the rule to all nodes.
Select the **Type** (PCI, USB, SR-IOV, or NVIDIA vGPU).
Leave the default value set to **--None--** in the field labeled *Automatically created based on PCI Device.*
Configure device filters as desired; filter fields will vary depending on the device type selected.
!!! note "Advanced Entry allows you to manually enter the filter syntax text rather than using the filter entry fields.  Typically, it is preferable to allow system-generated syntax based on your filter field selections"
