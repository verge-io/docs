

# Port Mirroring

Port mirroring replicates a network's traffic to a VM NIC, allowing packet analysis for monitoring or diagnostics.

<br>

## To Configure Port Mirroring

1.  Enable ***Port Mirroring*** in the network settings.

  ![portmirrordropdown.png](/public/userguide-sshots/portmirrordropdown.png)
 - Select ***North/South*** - to copy packets that traverse the network router.
 - Select ***East/West\**** - to copy packets that traverse the router *AND* all intra-network packets.
 
 > **\*** East/West port mirroring is typically only recommended as a temporary setting for diagnostics purposes; using it for long durations can impact performance as it replicates all network traffic. {.is-warning}
 
<br>

2.  Click **Submit** to save the change.
3.  Click **Restart** on the left menu to boot the network.
4.  Create **a VM that will be used for port analysis** (or use an existing VM).
5.  [**Add a NIC to the VM**](/public/ProductGuide/VMNics):
    -   In the ***Network*** field, select: *NETWORKNAME*\_mirror.
    -   Click **Submit** (bottom of page) to save.
6.  **(Re)boot the VM**.
7.  Operating system/application software of choice can be used in the VM for **packet analysis**.

<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>