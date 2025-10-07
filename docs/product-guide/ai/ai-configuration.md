# AI Configuration

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v25.2**

## Using VergeIQ - General Steps

1. [Define a Model](#ai-model-management) by selecting from the included curated selection or uploading a supported .gguf format model
2. [Configure an Assistant](#ai-assistant-management) based on the defined model, with tailored settings for the particular use case or task
3. [Upload Content to the Workspace](#upload-files-to-workspace) providing files to the assistant with relevant content
4. Engage:  
    * [OpenAI Router (common method)](product-guide/ai/open-ai-router): programmatically connect to the assistant via the built-in engine
    * [Interactive Chat Session](product-guide/ai/chat-sessions): communicate with the assistant within the VergeOS UI (helpful for testing)
    * **VergeOS API**: access the assistant using standard VergeOS API commands 
  



## General AI Settings

1. From the Main Dashboard, navigate to **AI** on the top menu
2. Click **AI Settings** to configure default AI parameters

The AI Settings page allows you to configure system-wide defaults for AI components:

* **Default AI Cluster**: Specifies the default compute cluster for AI workloads. New AI models will deploy to this cluster by default. 

* **Default AI Network**: Sets the default network for AI services. New AI models will use this network unless selection is overridden.

---



## AI Model Management

AI models provide the underlying intelligence for your AI assistants and applications.  VergeOS supports a wide range of AI models, by supporting the standard *.gguf format, allowing users to download and run any compatible file. Several curated models are presented, along with default settings, that can be readily installed from the AI Dashboard.


### Install an AI Model

!!! tip "Curated Models"
    - The system includes several pre-configured models, configured with default settings, available to automatically download

1. Navigate to **AI** > **Models**. 
2. To install one of the available curated models, Click **Click to Install** on the desired model.  Alternatively, click *New Model* on the left menu. 
4. Configure all desired settings: 

* **Model Selection**: Choose from a curated list of base models (e.g., Llama-3.2, Phi-4-Instruct) and select a size **Variant** (e.g., Small – 1GB).
Alternatively, select --Custom-- and provide a **URL** to download a .gguf model file

* **Name**: Enter a descriptive name for your model.

* **Description** (optional): Add details about the model’s purpose, configuration, or intended use. 

* **Cores**(default: 8): max number of cores to allocate to each model instance. 
    * GPU-enabled models: Core allocation has minimal impact.
    * CPU-only or fallback mode: Core allocation is critical for startup and performance.
    * Over-provisioning cores does not improve performance; unused cores remain idle.


* **RAM** (default: 2GB): Memory allocated per model instance:
    * A baseline amount of RAM is required to load and run the model. Actual requirements vary by model type and size. 
    * A general guideline for the foundational amount of RAM needed : allocate slightly more RAM than the model’s file size (e.g., a 2GB model may need 3GB RAM).
    * Additional RAM may be needed to support concurrent requests (i.e. parallel setting) and larger context windows. 
    * Start with a generous allocation, then monitor actual usage via the model dashboard.  If observed consumption is significantly lower than the allocated amount, scale back to optimize resource efficiency.


* **Cluster**: Select the VergeOS cluster where the model will run. Defaults to the cluster defined in global AI settings.

* **GPU Resource Group Allocation**: - Choose a GPU resource group to assign GPU devices, or select *--CPU Only--* to run exclusively on CPUs.

!!! info "GPU devices are distributed from pools called [Resource Groups](/product-guide/system/device-pass-overview#resource-groups)."

* **Allow CPU fallback if GPU resources are unavailable**: Enable this option to use CPU resources if GPU devices are unavailable. When using this option, ensure sufficient CPU cores are allocated for fallback scenarios.

* **Enable Memory Mapping**
    * Recommended for GPU-based models to conserve RAM (model loads into GPU memory)
    * Typically, not recommended when using CPU only, as it will be much slower
    * Sufficient RAM is still required to load the model initially

* **Preferred Tier**: Select the storage tier for hosting the model.
* **Context Size** (default 8192): - Maximum number of tokens the model can process in an active session. This includes:
    * User input
    * AI output
    * System prompt
    * Conversation history
  
??? tip "Tokens"
    * 1 token ≈ 4 characters (average for English)
    * 1 word ≈ 1.33 tokens
    * 8192 tokens ≈ 2,000–4,000 words or ~12–20 pages of text


??? note "Context Size Considerations"
    * Coherence: Longer context improves continuity across conversations or documents
    * Accuracy: More context enables better decision-making
    * Performance: Larger context sizes require more RAM and compute resources

 
* **Parallel**: Number of concurrent requests each model instance can handle
* **Min Workers**: Minimum number of model instances launched when the model starts. 
* **Max Workers**: Maximum number of model instances that can be launched to meet demand.

!!! tip "The number of running model instances (workers) for a model will be reflected on the model dashboard, with each instance represented as a running worker."

* **Insert Think Tag**:- Adds a custom tag to distinguish chain-of-thought reasoning from final output. Some models suppress or treat this tag as non-output to reduce latency.

* **Strip Think Tag From History**: Enable this to exclude chain-of-thought content from the response history, returning only the final answer.   

5. Click **Submit** to download and configure the specified model. 

!!! tip "The model may take several minutes or more to download.  The model dashboard (Click *Models* on the left menu and double-click the model) will indicate a "Downloading" status and progress while the model is actively transferring.  *Status* will change to "Online" when the model is fully downloaded, initialized and ready for use." 

!!! tip "New Assistant"
    When you create a new model, a new assistant is also created by default. The *New Assistant* form will appear allowing customization of the new assistant's default settings.

## AI Assistant Management

### Overview

AI assistants are configured AI models that provide specific capabilities and behavior with your AI functionality. They can be customized with specific prompts and settings to tailor performance and types of responses.


### Create an Assistant

1. **Initiate a new assistant:** Upon creation of a new model, a new assistant is automatically created with default settings, or those selected on the *Assistant* tab. A new assistant can also be created by navigating to AI > New Assistant.


* **Name**: Enter a descriptive name for the assistant. 
!!! tip "When a new assistant is created automatically because you just created a model, the name will default to the same name as the model."

* **Description** (optional): Additional details can be entered to describe the model's configuration, purpose, etc.
* **Model**: Choose from available base models (e.g., Llama-3.2, Phi-4-Instruct). When an assistant was auto-created along with a new model creation, this field is automatically set to the associated model and cannot be edited.


* **Settings Configuration**

* **Chat History**: Configure conversation retention (interactive chat sessions only)
  * ***Default On*** - chat history is automatically enabled at the start of a session, but can be disabled
  * ***Default Off*** - chat history is automatically disabled at the start of a session, but can be enabled
  * ***Always On*** - chat history is always enabled; cannot be disabled
  * ***Always Off** - chat history is always disabled; cannot be enabled

!!! tip "You can select to delete chat history per session upon starting a new chat session."


* **Disable Think**: Enables or disables multistep reasoning. When active, the AI “shows its work” to improve accuracy; this is especially useful for complex logic, math, debugging, or strategic planning. Disabling think yields faster responses and lower resource usage, but may reduce precision. 

!!! note "Availability of the *Think* feature depends on model support."

* **System Prompt**: Sets foundational instructions for the AI’s behavior, tone, and task orientation. This prompt influences how the model interprets context and generates responses. Precision matters; ambiguous or overloaded prompts can degrade output quality. The system prompt instruction is given to the model for every chat interaction. 

!!! note "System Prompt Considerations"
    * Longer prompts can improve response accuracy and task alignment, but they also increase resource usage.
    * The full system prompt is reprocessed with every query and contributes to the model’s total input token count (context length), which may limit available space for user input and prior conversation.

* **Temperature**: Controls response creativity and randomness of generated responses. (0.0 = deterministic, 1.0 = creative), ex: 0.2 tight, consistent phrasing; 0.75 metaphor, humor, unexpected angles
General Guidance: 
  * Low temperatures (e.g., 0.0–0.3) - deterministic, focused, and repeatable answers; ideal for uses such as technical documentation compliance guidance, customer support
  * High Temperatures (e.g., 0.7–1.0) - creative, exploratory, less predictable responses; ideal for brainstorming, design ideation, audience-specific phrasing
  * Medium temperatures (e.g., 0.4–0.6) - responses balance structure with some variation, less formal and robotic than lower temperatures; great for scenario planning, UI/UX analysis, or infrastructure trade-offs


* **Context Score**: (default 65) Level to determine how the model will evaluate how relevant, useful or salient a piece of information is within a given context window.  This value sets the minimum score required for a given piece of context to be considered applicable.  It helps to decide what to focus on, what to ignore or compress, what to retain across turns, etc. s
- optimum context score will depend on 1) model used 2) context information (e.g. documents uploaded to the assistant workspace) 3) use case
0 will match anything, 100 means it must match perfectly. 
????- deals with text within the conversation (prompts/answers), info within the text db, info in workspace documents?


* **Max Tokens**: (default: 0 = no limit) Set maximum system response length in tokens 
Tokens vary across different ai models, but in general a token equates to .7 words.
- when setting a max token, it should be set to less than model's context size
- for many use cases, it is preferrable to set a max token to limit the response (and keep from being too verbose)
- models vary in their standard or default responses with some models tending to give very long-winded responses and others tend to give more short and succinct answers by default.

* **Advanced**: Field reserved for future enhanced configuration options.  Contact support if you need additional AI settings beyond those provided within the UI.


2. Click **Submit** to create/save the assistant configuration.
3. Click **Cancel** to discard changes
4. The assistant will be deployed and become available for use

---

## Manage AI File Content 
The Assistant Workspace allows you to upload and manage files to provide a proprietary context knowledge base to the assistant.  

**To access Workspace files**:

* Navigate to the assistant dashboard.
* Click **View workspace** on the left menu.

## Add Files to the Workspace

* Click **Upload** on the left menu and click the "Choose Files" button.
* **Navigate and select** the desired file(s).
* Click **Open** to add the selected files to the upload queue.  
* Optionally, a description and Preferred Tier can be configured per file.
* Click **Start** to begin the upload process.
!!! note " Do NOT reload or close the browser window"
    A popup message will display the upload queue, file sizes and upload progress per individual file.  Refrain from reloading or closing the browser page until the uploads have all completed to ensure full transfer of the files. 


## Modify Workspace Files

Select a file in the list and click **Edit** on the left menu to modify name, description or preferred tier.

### Remove Workspace Files

* Select the desired file(s) and click **Delete** on the left menu. 
* Click **Yes** to confirm the delete operation.


---


## Troubleshooting

### Common Issues

chat session error: "Error creating chat session"
* make sure the model has been successfully downloaded and ?loaded into memory?initialized?
* the model dashboard should show a status of "Online"

chat session: takes a while for answer, blinking blue dot indicates "starting"
* the model is loading for the first time and may take a few minutes or more, depending on the model size 

chat session: not responding to last prompt, no blinking blue dot

try to resubmit the prompt.

#### Model Installation Failures
- **Insufficient Resources**: Ensure adequate CPU, RAM, and storage
- **Network Connectivity**: Verify network access for model downloads
- **Permission Issues**: Check user permissions for model management

#### Performance Issues
- **Slow Responses**: Increase CPU allocation or enable GPU acceleration
- **Memory Errors**: Increase RAM allocation or enable memory mapping
- **Resource Contention**: Monitor resource usage and adjust allocation

#### Assistant Configuration Problems
- **Model Selection**: Ensure the selected model is properly installed
- **Network Configuration**: Verify network settings and connectivity
- **Prompt Issues**: Review system prompt configuration and syntax

### Diagnostic Steps

1. **Check System Resources**: Verify available CPU, RAM, and storage
2. **Review Logs**: Examine system logs for error messages
3. **Network Connectivity**: Test network access and configuration
4. **Permission Verification**: Confirm user permissions and access rights
5. **Model Status**: Check model installation and deployment status

### Support Resources

- **Product Guide**: Comprehensive documentation and configuration guides
- **Support Portal**: Submit tickets for technical assistance
- **Community Forums**: Connect with other VergeOS users
- **Knowledge Base**: Search for solutions to common issues

---



