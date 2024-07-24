

# Uploading to the vSAN (Media Images)

The Media Images section allows for uploading files to the VergeIO vSAN allowing \*.iso files, drive images, VM definition files, etc. to be easily accessible for creating/installing/importing VMs. Optionally, files that are uploaded to vSAN media images can be shared via a public link.

<br>

## To Upload a File from the Local computer

1.  From the Main Dashboard, select **Media Images**.
2.  Select **Upload**.
3.  Click the **Choose Files** button
4.  The File Browser Dialog appears. Browse to the desired folder and select the desired file(s). Holding down the ctrl or shift key allows for multi-selection.
5.  Click the **Open** button
    -   Selected Files, along with size and type are displayed.
6.  Click the **Upload** button.

> IMPORTANT NOTE: Reloading the browser window or leaving the page will interfere with the file upload. {.is-warning}

7.  An Upload Progress popup window will appear showing the upload progress. From this window, the upload can be canceled or paused, if needed. When the upload operation is complete, the file(s) will display in green in the Upload Progress popup.

<br>

## To Upload a File from a web link (URL)

1.  From the Main Dashboard, select **Media Images**.
2.  Select **Upload from URL**
3.  Enter a valid URL (for example: https:/[]()/fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)
4.  Enter desired **Name** for the file.
5.  Optionally, a ***File Description*** can be entered to provide additional information.
6.  The ***Allow insecure SSL links to be used*** option will permit the file download from a site without a valid CA-signed certificate (e.g. missing, invalid, expired, or self-signed certs). **This option is provided primarily for downloads within a private network in which self-signed certificates are used; downloading from a public URL without secure SSL can be risky.**
7.  Click the **Submit** button
8.  The file will appear in the Media Images listing.

<br>
<br>


## To Create a Download Link for a Media Images File

1.  From the Main Dashboard, click **Media Images** on the left menu.
2.  Click **Add Public Link** on the left menu.
3.  Select the desired ***File*** in the dropdown list (the list includes all the files in Media Images).
4.  Select a ***Link Format***
    -   **Anonymous(uuid)** - creates a public download link using a GUID(128-bit number) *ex: https:/[]()/verge.example.com/273b5d6a--b205-1e1b-6ae6-01cfa7ed1233*
    -   **Custom** - creates a public download link using the name entered *ex: https:/[]()/verge.example.com/customname*
    -   **Use File Name (recommended)** - creates a public download link using the original filename *ex: https:/[]()/verge.example.com/virtio-win-1.9.6.iso*
5.  Select ***Expiration Type***
    -   ***Never Expire (default)*** to make the download link perpetual. (Public Link can be manually edited or deleted later if needed.)
    -   ***Set Date*** to select a specific date/time to cease the download link.
6.  Click **Submit** to save the link.



![](/public/userguide-sshots/mediaimages-link-copy.png)

The Media Images list appears. Download options appear on the far right of the given file:
   -   Click ***Link*** to directly download the file from the page.
   -   Click the **copy icon** to copy the download address to the clipboard.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}



<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }