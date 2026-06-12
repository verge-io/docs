---
description: "Step-by-step instructions for increasing the size of a virtual disk drive in VergeOS, including notes on hot-plug support and guest OS requirements."
---

# How to Resize a Virtual Disk Drive

{% hint style="info" %}
**Note**

Drives can only be increased in size; they cannot be reduced. Verify whether your guest OS supports resizing without a power cycle, particularly for Virtio-SCSI drives.
{% endhint %}

To resize a virtual disk drive within a VM, follow these steps:

1. From the **VM Dashboard**, click **Drives** in the left menu.
2. Select the drive to be modified.
3. Click **Edit** in the left menu.
4. Modify the drive size as desired.
5. Click **Submit**.

## Important Notes

{% hint style="info" %}
**Note**

If the VM configuration allows hot-plugging, the disk interface is set to **Virtio-SCSI**, and the guest Operating System (OS) supports it, the drive size can typically be increased without power cycling the VM.
{% endhint %}

{% hint style="danger" %}
**Warning**

Drives cannot be reduced in size. While partitions may be resized inside the guest OS, the disk drive itself cannot be shrunk.
{% endhint %}

{% hint style="danger" %}
**Warning**

Modifications to drive size will most likely require corresponding changes within the guest Operating System to utilize the newly added space.
{% endhint %}

---

{% hint style="info" %}
**Document Information**

- Last Updated: 2024-08-29
- vergeOS Version: 4.12.6
{% endhint %}
