# AI Interactive Chat Sessions

This page provides a guide for using the VergeOS UI to conduct interactive chat sessions with an AI assistant.

!!! tip "A VergeIQ chat session requires a configured model and assistant; see the [AI Configuration Guide](/product-guide/ai/ai-configuration) for setup instructions."

# Accessing a new chat session
* Navigate to the assistant (AI > Assistants > select desired assistant)
* Click **New Chat Session** on the left menu **-OR-**click the quick action (plus sign).
* Click **Yes** to confirm starting a new chat. 


## Attaching files to a prompt

!!! note "Attached file contents are merged into the prompt and affect total context size."

One or more files can be attached, to provide additional context for your prompt. To attach file(s) to add context to the current prompt:
* Click the paperclip icon to the left of the prompt entry field
* Browse and select the desired file(s) and click the **Open** button. 
* The number of attached files is indicated directly to the right of the paperclip button. You can click on this number to view/modify a list the attached files.



<!-- ## thumbs up/thumbs down -->


## Resubmitting a prompt

## Interaction Metrics
per individual response or for the entire session?



## Chat history

### assistant settings -can be configured to always be off or on.
Can also be configured with a off/on default that can be changed per session

### To change the history setting for the current session: 

### accessing history from a previous session

---

## Troubleshooting Chat Sessions

* **AI does not seem to be responding to a prompt**

- may take a while
- especially if cpus used rather than gpus (especially if there are are not many cores allocated)
- blue(?) blinking dot indicates it is currently working on a response


* **Message:** ***Error Sending Query***

- try to start a new chat session?
- may need to stop/start the model?

* **Long response Times**

* **Incomplete Results**
  * for example, the answer seems to be clipped/cut off mid-sentence

* **Cannot submit my prompt** (nothing seems to happen when I type my prompt and hit** ***Send***)
  * the assistant is currently working on the previous prompt, the previous query/prompt displays a blinking blue dot and the question does not display a response. 

?s
<!-- when you delete an assistant, is the chat history deleted too? is there any way to save it? -->
what is the delete current session option supposed to do? 
when do you want to start a new session as opposed to continue an existing one?