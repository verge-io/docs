# AI Configuration

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v25.2**

## Using AI - general steps

1. [Define a Model] (included curated or any .gguf). Common mod
2. [Configure an Assistant](#ai-assistant-management) (based on the defined model), tailoring settings for the particular use case or task.
3. Engage with the Assistant:
  * programmatically connect to the assistant via the OpenAI router (most typical)
  * interactive communication with the assistant by starting a chat session in the VergeOS UI (helpful for testing)
  * programmatically connect to the assistant via the VergeOS API
  


## AI Settings Configuration

### General AI Settings

1. From the Main Dashboard, navigate to **AI** on the top menu
2. Click **AI Settings** to configure default AI parameters

The AI Settings page allows you to configure system-wide defaults for AI components:

* **Default AI Cluster**: specifies the default compute cluster for AI workloads. New AI models will deploy to this cluster by default. 

* **Default AI Network**: sets the default network for AI services. New AI models will use this network unless selection is overridden.

---



## AI Model Management

AI models provide the underlying intelligence for your AI assistants and applications.  VergeOS supports a wide range of publicly-available AI models in *.gguf format, allowing users to download and run any compatible file. Several curated models are presented, along with default settings, that can be readily installed from the AI Dashboard.


### Install an AI Model

!!! tip "Curated Models"
    pre-configured models to automatically download, default settings for this particular model
    The system includes several pre-configured AI models for various use cases with adjustable settings. 

1. Navigate to **AI** > **Models**. 
2. Browse the available models
3. To install one of the available curated models, Click **Click to Install** on the desired model; to install a different model, click *New Model* on the left menu. 
4. Configure all desired settings: 
* **Model (General)**

  * **Make the Model Selection** - **Model**: Choose from the list of curated base models (e.g., Llama-3.2, Phi-4-Instruct) and select a **Variant**: Select model size variant (e.g., Small 1GB). Available size selections will vary depending on model selected. **-OR-** Select **Model**: --Custom-- and enter a URL to download the appropriate *.gguf model file.

  * **Name**: Enter a descriptive name for your model.
  * **Description** (optional): Additional details can be entered to describe the model's configuration, purpose, etc.

* **Resources Configuration**

* **Cores**: number of cores to allocate to the model (default: 8). When GPU devices used, the number of cores allocated can be 1, not really important.
Otherwise number of cores can affect how fast the responses will be?  
* **RAM**: memory to allocate to the model (default: 2GB), will depend on the model selected.  Getting the right amount of RAM for a model can involve some trial and error.  As a general rule of thumb, most models will work if you can allocate a small amount more RAM than the size of the model (for ex: a tiny 2GB model may need 3GB; a 12GB model would need 15GB RAM). However, there is not a one-size-fits-all rule for model RAM allocation; requirements can differ significantly across various models.  A good strategy may be to start with a high RAM setting, then start the model and check its dashboard to see how much RAM is used.  The amount of RAM used is simply for running the model, a larger amount of RAM does not make it run faster. 
* **Cluster**: select the VergeOS cluster in which to run the model (default is the cluster defined in overall AI settings)
* **GPU Resource Group Allocation**: Select a GPU resource group (select ***--CPU Only--*** if CPUs will be used for ..... If you select a gpu resource group will it use cpu cores at all?  link to the resource group explanation on passthrough page. 
* **Allow CPU Fallback if GPU resources are unavailable**: If you are using a gpu resource group and it is not available, it will use the cpus you assign?  If this is the case, would you want to assign extra cpus to use when/if gpu resource group is not available?? how much slower is cpu than gpu for this?
* **Enable Memory Mapping**
review this content from copilot and clarify how it can reduce the latency of memory paging and file i/o?
Memory mapping in AI—especially for large language models and inference engines—is a clever technique that lets you load massive model files without stuffing them entirely into RAM. Instead of copying the whole file into memory, memory mapping (mmap) creates a virtual link between the file on disk and the process’s address space. This means only the parts of the model that are actively used get loaded into RAM, on demand.

🧠 Why Memory Mapping Matters in AI
- Efficiency: A 7B parameter model might require 14GB if fully loaded. With memory mapping, only ~20–30% of that might be actively used at any moment.
- Speed: Reduces latency by avoiding unnecessary memory paging and file I/O.
- Scalability: Enables running large models on machines with limited RAM—especially useful for .gguf models in apps like Ollama or llama.cpp.

⚙️ How It Works
- The OS maps the model file into virtual memory.
- When the AI model accesses a specific part (e.g. weights for a token), only that portion is loaded into physical RAM.
- This avoids loading unused layers or parameters, which is ideal for quantized models or sparse inference.
evaluate the tip in the UI: Enabling this will allow the model to dynamically load the model into RAM which may consume less memory; however, idle models may take longer to load queries... why would it matter about being idle?

* **Settings Configuration**

* **Preferred Tier**: where to store the model? how big are these models?  considerations for selecting tier...is it less important for a model that will be fully loaded into memory and always running?
* **Context Size**: maximum number of tokens the model can process in a single input.  A token might be a word, subword, or even a character depending on the tokenizer. Think of it as the model's attention span: how much information it can "see" and reason over at once.  For example:
- A model with a 4K token context window can handle roughly 8 pages of text.
- A model with 128K tokens can process entire books, transcripts, or codebases in one go.
- Coherence: Longer context allows the model to maintain continuity across long conversations or documents.
- Accuracy: With more context, the model can make better decisions by referencing earlier parts of the input.
- Use Cases: Summarizing legal contracts, analyzing full code repositories, or handling multi-turn customer support all benefit from large context windows.

⚙️ Trade-Offs and Constraints
- Memory & Compute: Larger context windows require more VRAM and compute power. Processing 32K tokens is exponentially more demanding than 2K.
- Latency: Bigger context can slow down inference unless optimized (e.g., with sliding windows or sparse attention).
- Model Design: Some architectures (like transformers) struggle to scale context size efficiently, though newer models like Claude 4, GPT-4o, and Llama 3.1 are pushing boundaries

context length defines how many tokens the model can process at once(including the user prompt, the system prompt, the response) Bigger windows allow richer reasoning, but they're computationaly expensive.
Attention scales quadratically with token count
transformers usually struggle with long contexts
"lost in the middle"


- will depend on what you are using the model for?
- if you have a larger context size, longer to get answers? will some models not do well with large context sizes? 
- every model has a maximum context size, separate from our max constraints. 

Typical context sizes for GGUF models:
- 4K tokens: Common for older LLaMA and Alpaca variants.
- 8K–32K tokens: Supported by newer models like LLaMA 3.1 and Mistral.
- 128K+ tokens: Emerging in long-context models like Claude or GPT-4o, though GGUF support varies.
most support 64-128, we default to 8 because expensive
 
* **Parallel**: sessions?  how different from workers? an example of different paralallel sessions in comparison to different workers?
* **Min Workers**: different containers? will show as a different workload/machine on the node? spawn instances of model to handle load - do you have control within your api calls to tell it which worker to hit? are the different workers separated to keep tasks separate at all?  or will they bounce around just based on load balancing? does the min workers determine how many are started up automatically when you start a model?
* **Max Workers**: do these actually work yet?  min/max workers?  
* **Insert Think Tag**: Some recent models treat the think tag as a non-output token, or suppress the tag to optimize latency.  Use this option to include an alternative think tag in order to distinguish chain-of-thought reasoning from the final answer.
---- put in an issue for grammar mistake on the tooltip for this (enable instead of check and missing the word "to")
* **Strip Think Tag From History**: Enable this option when using a model's think feature but you wish to exclude the chain-of-thought content from the response, so that only the final answer is returned. 
5. Click **Submit** to download and configure the specified model. 
After saving the new model, the *New Assistant* form is presented where you can create an assistant based on the new model configuration.  AI assistant configuration is detailed below.

## AI Assistant Management

### Overview

AI assistants are configured AI models that provide specific capabilities and behavior with your AI functionality. They can be customized with specific prompts and settings to tailor performance and types of responses.


!!! Upon creation of a new model, the new assistant is automatically created with default settings, or those selected on the *Assistant* tab. A new assistant can also be created by navigating to AI > New Assistant. 

* **Assistant (General)**

 
  * **Name**: Enter a descriptive name for your model.
  !!! tip "When a new assistant is created automatically because you just created a model, the name will default to the same name as the model."

  * **Description** (optional): Additional details can be entered to describe the model's configuration, purpose, etc.
  * **Model**: Choose from available base models (e.g., Llama-3.2, Phi-4-Instruct). 
  !!! tip "When an assistant was auto-created along with a new model creation, this field is automatically set to the assocatied model and cannot be edited."


* **Settings Configuration**

* **Chat History**: Configure conversation retention (interactive chat sessions only)
  * ***Default On*** - chat history is automatically enabled at the start of a session, but can be disabled
  * ***Default Off** - chat history is automatically disabled at the start of a session, but can be enabled
  * ***Always On*** - chat history is always enabled; cannot be disabled
  * ***Always Off** - chat history is always disabled; cannot be enabled

!!! tip "You can select to disable chat history per session upon starting a new chat session."


- **Disable Think**: some models support think, some do not; whether to disable this will often be use case dependent; the think process has been shown to improve accuracy of results; tradeoff is that it will use more resources and make results take longer 
multi-step reasoning, can be useful for complex math or logic problems, debugging code, strategy planning
can disable this option to get quicker responses, use less resources
the ai model "shows its work"

**System Prompt**
- **System Prompt**: allows you to define the assistant's personality, capabilities, and behavior guidelines
- **Note**: This instruction is given to the model for every chat interaction
- tradeoffs on system prompt length: the longer this prompt, the more focused/accurate/better results are possible, but longer prompts will eat up more resources (memory, consumption of context window, etc.)
remember that the entire system prompt is submitted and processed with each query; so it does consume part of the context size (maximum number of tokens model can process in a single input sequence)

- **Temperature**: Controls response creativity and randomness of generated responses. (0.0 = deterministic, 1.0 = creative)
General Guidance: 
  * Low temperatures (e.g., 0.0–0.3) - deterministic, focused, and repeatable answers; ideal for uses such as technical documentation compliance guidance, customer support
  * High Temperatures (e.g., 0.7–1.0) - creative, exploratory, less predictable responses; ideal for brainstorming, design ideation, audience-specific phrasing
  * Medium temperatures (e.g., 0.4–0.6) - responses balance structure with some variation, less formal and robotic than lower temperatures; great for scenario planning, UI/UX analysis, or infrastructure trade-offs

ex: 0.2 tight, consistent phrasing
0.7 metaphor, humor, unexpected angles


- **Max Tokens**: Set maximum response length (0 = no limit) tokens are chunks of text - like words, sub-words, or characters that the model understands. 
Tokens vary across different ai models, but in general a token equates to .7 words.

* **Advanced**: Field reserved for future enhanced configuration options.  Contact support if you need additional AI settings beyond those provided within the UI.


2. Click **Submit** to create/save the assistant configuration.
3. Click **Cancel** to discard changes
4. The assistant will be deployed and become available for use


upload/manage context files to provide a knowledge base to the assistant ("Workspace Files")
---

## Resource Management

### CPU and Memory Allocation

AI workloads require careful resource management to ensure optimal performance:

#### CPU Allocation
- **Cores**: Allocate sufficient CPU cores based on model requirements
- **Performance**: More cores enable faster inference and parallel processing
- **Scalability**: Consider future scaling when allocating resources

#### Memory Allocation
- **RAM**: Ensure adequate memory for model loading and inference
- **Requirements**: Larger models require more memory
- **Efficiency**: Proper memory allocation prevents performance bottlenecks

### GPU Configuration

For enhanced AI performance, GPU resources can be allocated:

#### GPU Resource Groups
- **CPU Only**: Use CPU-only processing (default)
- **GPU Acceleration**: Utilize GPU hardware for faster inference
- **Hybrid**: Allow CPU fallback when GPU resources are unavailable

#### GPU Settings
- **Memory Mapping**: Enable dynamic GPU memory allocation
- **Fallback Options**: Configure CPU fallback behavior
- **Resource Sharing**: Manage GPU resource sharing between workloads

### Storage Considerations

AI models require storage for:

#### Model Files
- **Storage Tiers**: Select appropriate storage tier based on performance needs
- **Capacity**: Ensure sufficient space for model files
- **Performance**: Faster storage improves model loading times

#### Context and History
- **Chat History**: Configure conversation history retention
- **Context Size**: Set appropriate context window size for model capabilities
- **Persistence**: Determine data persistence requirements

---

## Security and Privacy

### Local Processing

The VergeOS AI feature provides complete data privacy by processing all AI operations locally:

#### Data Security
- **Local Processing**: All AI inference occurs within your VergeOS environment
- **No External Calls**: No data sent to external AI services
- **Privacy Protection**: Sensitive data remains within your control

#### Network Isolation
- **Private Networks**: AI services can operate on isolated networks
- **Access Control**: Implement network-level access controls
- **Compliance**: Maintain compliance with data protection regulations

### Access Management

Control access to AI features through VergeOS's built-in security:

#### User Permissions
- **Role-Based Access**: Control who can create and manage AI components
- **Resource Limits**: Set resource allocation limits per user or group
- **Audit Trails**: Monitor AI resource usage and access

#### API Security
- **Authentication**: Secure API access to AI services
- **Authorization**: Control API endpoint access
- **Rate Limiting**: Implement usage controls and quotas

---



## Best Practices

### Model Selection

Choose appropriate models based on your requirements:

#### Performance Considerations
- **Resource Availability**: Select models that fit your hardware constraints
- **Response Time**: Balance model capability with inference speed
- **Concurrent Users**: Consider multi-user access patterns

#### Use Case Matching
- **General Purpose**: Use Llama models for broad language tasks
- **Code Generation**: Use Phi-4 for programming and mathematical tasks
- **Specialized Tasks**: Select models optimized for specific domains

### Resource Optimization

Optimize resource allocation for efficiency:

#### Scaling Strategy
- **Start Small**: Begin with minimal resources and scale as needed
- **Monitor Usage**: Track resource utilization and adjust accordingly
- **Peak Planning**: Plan for peak usage scenarios

#### Cost Management
- **Right-Sizing**: Allocate appropriate resources without over-provisioning
- **Scheduling**: Consider workload scheduling for resource optimization
- **Monitoring**: Implement resource monitoring and alerting

### Maintenance and Updates

Keep your AI infrastructure current:

#### Model Updates
- **Version Management**: Track model versions and updates
- **Testing**: Test model updates in development environments
- **Rollback Plans**: Maintain rollback capabilities for model updates

#### Performance Monitoring
- **Response Times**: Monitor AI response performance
- **Resource Usage**: Track CPU, memory, and GPU utilization
- **Error Rates**: Monitor for AI service errors and failures

---

## Troubleshooting

### Common Issues

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

## Version Information

This guide covers the AI features available in VergeOS version 25.2.0.dev-161-gfb00558 and later. Features and functionality may vary in different versions.


