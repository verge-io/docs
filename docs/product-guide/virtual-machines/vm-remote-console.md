# Using the Virtual Machine Remote Console

The remote console provides direct interaction (mouse/keyboard) with Virtual Machines.

![vdi-console.png](/product-guide/screenshots/vdi-console.png)

## Console Toolbar
All toolbar options, except the *Exit* button, work as a toggle, switching between on/open or off/closed. For example: clicking the chat button opens the chat window, and clicking the button again closes the chat window. A button is orange when on/open; white when off/closed.

#### ![exiticon.png](/product-guide/screenshots/exiticon.png) Exit
Exits the console and returns to the previous screen.

####  ![expandconsole-icon.png](/product-guide/screenshots/expandconsole-icon.png) Expand console
Activates/deactivates the console's full-screen option (expand to entire browser tab)

#### ![virtkeyboard-icon.png](/product-guide/screenshots/virtkeyboard-icon.png) Virtual Keyboard
Provides a virtual keyboard on devices that do not have a physical keyboard (cellphones, tables, etc.)

#### ![dragview-icon.png](/product-guide/screenshots/dragview-icon.png) Drag view port
Alows moving the viewable portion of the console when the guest system screen exceeds the viewable area.

#### ![browserfullscreen-icon.png](/product-guide/screenshots/browserfullscreen-icon.png) Toggle Browser Full Screen
Activates/deactivates the browser's full-screen option.

#### ![eject-icon.png](/product-guide/screenshots/eject-icon.png) Change/Eject CD-ROM
Toggles the view of the CD-ROM selection form, where an \*.iso file is selected.

#### ![clipboard-icon.png](/product-guide/screenshots/clipboard-icon.png) Clipboard
Opens the clipboard window where text can be placed to insert into the Virtual Machine.
   - The **Close** button will close the Clipboard window (can also be closed by clicking the Clipboard button again).
   - The **Clear** button clears current contents from the Clipboard.
   - The **Paste in Console** button pastes the Clipboard contents into the console at the current cursor position. 

!!! note
    Wait until all contents have successfully pasted into the console before performing any other clipboard operations, typing, or moving cursor within the VM.
    
#### ![power-icon.png](/product-guide/screenshots/power-icon.png) Power
Opens/closes the power buttons window:
   - **\[Reset\]** - restarts the VM operating system; does not power down the virtual hardware.
   - **\[ACPI\]** - Power down (graceful)
   - **\[Kill\]** - Power down (ungraceful) - use as a last resort when guest OS is locked and graceful shutdown is not an option.
    
#### ![extrakeys-icon.png](/product-guide/screenshots/extrakeys-icon.png) Extra Keys
opens/closes the extra keys window, which allows simulating keyboard operations to the machine, such as:
 - **\[Ctrl-Alt-Del\]**
 - **\[Ctrl\]\***
 - **\[Alt\]\***
 - **\[Tab\]\***
 - **\[Esc\]\***
 
\* **Toggles on/off** (When the button is orange simulates holding down the key.)

!!! tip
    A full virtual keyboard option is also visible when using a mobile device, such as a cell phone or tablet

#### ![chat-icon.png](/product-guide/screenshots/chat-icon.png) Chat
opens/closes the chat window where all users that are consoled into the virtual machine can share messages with each other.
