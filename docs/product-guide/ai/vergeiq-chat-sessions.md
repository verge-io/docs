# VergeIQ Interactive Chat Sessions

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v26**

This page provides a guide for conducting interactive chat sessions with an AI assistant in the VergeOS UI.

!!! tip "A VergeIQ chat session requires a configured model and assistant; see the [AI Configuration Guide](/product-guide/ai/ai-configuration) for setup instructions."

## Accessing a New Chat Session

* Navigate to the assistant: **AI > click to select the desired assistant**.
* Click **New Chat Session** on the left menu **-OR-** click the  **'+ New'** button. 
* A Confirmation dialog is presented. 
    * (Optional) *Delete current session* can be selected to remove chat history for the present session, if there is one.
    * Select **Yes** to confirm starting a new chat session. 
* **send prompts**, using the message entry box, to interact with the session.

## Attaching Files to a Prompt

!!! note "Attached file contents are merged into the prompt and affect total context size."

* One or more files can be attached, to provide additional context for your prompt. 
* **To attach file(s):** click the **paperclip icon** to the left of the prompt entry field, **browse and select** the desired file(s), click the **Open** button. 
* The number of attached files is indicated directly to the right of the paperclip button. You can click on this number to view/modify a list the attached files.
* Attached files remain for each subsequent session prompt; remove files that are no longer relevant to avoid unnecessary usage of context size. 


## Interaction Metrics

Token usage metrics can be accessed per prompt/response iteration: simply hover over the information icon :material-information-variant: below a response. 


## Chat History

### Saving Chat History

Assistant settings allow controlling chat history default settings across sessions. See [AI Assistant Management](/product-guide/ai/vergeiq-configuration/ai-assistant-management).  Additionally, an option for deleting a session history is presented upon initiation of a new session. 

 

### Accessing History from a Previous Session

To view history of a previous chat session: click the *History* button near the top left of the chat window and select the desired session.  (A chat session is named based on the first prompt text from the session.)

---

## Troubleshooting Chat Sessions

* **AI does not seem to be responding to a prompt**
    - A blue blinking dot indicates that the assistant is currently working on a response. 
    - An assistant with suboptimal processing units allocated, may take several minutes or more to respond; this is especially likely in the case of CPU vs GPU usage.  Allow several more minutes for the response and consider allotting more processing resources cores to the used model.  
    
* **Message:** ***Error Sending Query***
    - Start a new chat session.
    - If the error still appears in a new chat session, stop/start the model.

* **Long response Times**
    - Slow response turnaround is often due to inadequate processing resources. Consider allocating additional cores or more GPU capacity (e.g. higher vGPU profile, additional GPUs, etc.)

* **Incomplete Results**
    - Responses that appear to be truncated, for example, an answer that seems to cut off mid-sentence
    - The configured *Max Tokens* ([AI Configuration: Assistant settings](/product-guide/ai/vergeiq-configuration)) may be too low to allow for full response.  

* **Cannot submit a prompt** (nothing seems to happen when I type my prompt and hit *Send*)
    - The assistant is likely still processing the previous prompt. A blue blinking dot indicates that the assistant is currently working on a response; a new prompt cannot be submitted until the previous has completed. Wait for the previous response to complete before submitting the new prompt.  See previous sections to address long response times.  

