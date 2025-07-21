# VergeAI Overview

!!! note "The VergeAI feature is available starting in VergeOS version 25.2.0"

VergeAI is a dynamic, leading-edge component providing integrated artificial intelligence capabilities directly within your VergeOS environments.  This feature allows you to deploy and manage AI models and assistants locally, providing secure, private AI functionality without relying on external cloud services.


### Key Features

- **Local AI Model Deployment**: Run AI models directly on your VergeOS infrastructure
- **AI Assistant Management**: Configure custom AI assistants to leverage local AI models
- **Resource Management**: Flexible allocation of CPU, GPU, and memory resources for AI workloads
- **Security & Privacy**: Keep your AI processing and data completely within your private environment
- **Integration**: Seamlessly integrate AI capabilities with your existing VergeOS workloads
cost savings, sovereignty, control, full data control, flexibility and 

contrast with today's typical implementations

## Example Use Cases - Practical Applications

* **[HIPAA-Compliant Healthcare AI]()**: A medical research university processing PHI and clinical data ensures highly sensitive data compliance, with zero external data exposure, while leveraging AI to accelerate research

* **[Proprietary Financial AI Domain Expert]()**: A Private equity creates domain-specific expertise, securely harnessing its own proprietary data to AI, delivering faster investment decisions while safeguarding institutional knowledge.  

* **[High-Frequency Trading AI]()**: A Quantitative trading firm empowers sub-millisecond AI responses for high volume operations, maintaining ultra-low-latency, consistent performance with on-premises infrastructure

* **[Cost-Predictable Enterprise AI](): A Fortune 500 manufacturing company utilizes AI power to automate and streamline cross-functional operations while maintaining lower and more predictable costs by eliminating the need for cloud AI services.

- organization working with highly-sensitive data, compliance reasons to keep on-prem
- organizations that want to create an AI domain expert with their own proprietary data, without security vulnerability of public cloud
- Large volume AI users that want to control costs and secure cost predictability
- High-performance needs - avoid latency concerns and provide consistent performance
- 


Regulatory Compliance & Sovereignty
- Meet strict data residency requirements by keeping everything local.
- Easier to audit and enforce security policies.
- Useful for government, legal, or enterprise environments with tight controls.

Bonus: Intellectual Property Protection
- Keep model weights, training data, and fine-tuning logic private.
- Avoid vendor lock-in or exposure to cloud-based model leaks.

Predictable Long-Term Costs
- Avoid variable cloud fees (e.g., GPU hourly rates, data egress charges).
- Capital expenditure (CAPEX) model allows amortization and tax benefits.
- Especially cost-effective for sustained workloads or large-scale inference.

Performance Consistency
- No noisy neighbors or shared resource bottlenecks.
- Real-time inference benefits from low network latency and dedicated compute.
- Ideal for edge AI, industrial automation, or high-frequency decision systems.

Full Data Control & Privacy
- Keep sensitive or proprietary data entirely within your infrastructure.
- Avoid sharing data with third-party cloud providers — critical for compliance with HIPAA, GDPR, or internal governance.
- Ideal for industries like finance, healthcare, and defense.

Customization & Optimization
- Tailor hardware and software to your specific workloads (e.g., hugepages, NUMA-aware scheduling, GPU affinity).
- Optimize for low-latency inference or high-throughput training without cloud-imposed constraints.
- Build native RAG pipelines with custom embeddings and retrieval logic.



## VergeAI Terminology

* Models

* Assistants

* Workers

* Chat Sessions

## VergeIQ


[Configure and Use VergeAI in Your Environment →](/product-guide/ai/ai-configuration)

## AI Settings Configuration

   * 

### Accessing AI Settings

1. From the Main Dashboard, navigate to **AI** in the left menu
2. Click **Settings** to configure default AI parameters

### Default Settings Configuration

The AI Settings page allows you to configure system-wide defaults for AI components:

#### Default AI Assistant
- **Purpose**: Sets the default assistant for new AI operations
- **Configuration**: Select from available AI assistants (e.g., VergelQ)
- **Usage**: This assistant will be used unless specifically overridden

#### Default AI Cluster
- **Purpose**: Specifies the default compute cluster for AI workloads
- **Configuration**: Select from available clusters (e.g., "compute")
- **Usage**: AI models and assistants will deploy to this cluster by default

#### Default AI Network
- **Purpose**: Sets the default network configuration for AI services
- **Configuration**: Select from available networks (e.g., "ai")
- **Usage**: AI components will use this network unless overridden

### Saving Configuration Changes

1. Configure the desired default settings
2. Click **Submit** to save changes
3. Click **Cancel** to discard changes

---

## AI Model Management

### Overview

AI models in VergeOS provide the underlying intelligence for your AI assistants and applications. The system supports various model types including language models, conversational AI, and specialized task models.

### Available Models

The system includes several pre-configured AI models:

#### VergelQ
- **Type**: Custom VergeOS AI model
- **Resources**: 1.48GB size, 4 CPU cores, 8GB RAM
- **Status**: Available for installation
- **Use Case**: General-purpose AI assistant optimized for VergeOS environments

#### Llama-3.2
- **Type**: Meta's language model
- **Resources**: 1GB-3GB size, 8 CPU cores, 2GB-5GB RAM
- **Capabilities**: Meta, Text Generation, Conversational
- **Languages**: 8 languages supported
- **Use Case**: Advanced language understanding and generation

#### Llama-3.1
- **Type**: Meta's language model
- **Resources**: 5GB-8GB size, 8 CPU cores, 7GB-10GB RAM
- **Capabilities**: Meta, Text Generation, Conversational
- **Languages**: 8 languages supported
- **Use Case**: High-performance language processing

#### Llama-4-Scout
- **Type**: Advanced language model
- **Resources**: 58GB-103GB size, 8 CPU cores, 73GB-129GB RAM
- **Capabilities**: Transformers, Image Text To Text, Meta, Conversational
- **Languages**: 12 languages supported
- **Use Case**: Premium AI capabilities with multimodal support

#### Gemma-3
- **Type**: Google's language model
- **Resources**: 2GB-30GB size, 8 CPU cores, 3GB-38GB RAM
- **Capabilities**: English, Transformers, Image Text To Text, Google, Conversational
- **Use Case**: Google-optimized AI processing

#### Phi-4
- **Type**: Microsoft's language model
- **Resources**: 2GB-17GB size, 8 CPU cores, 3GB-21GB RAM
- **Capabilities**: English, Transformers, Text Generation, Math, Code, Conversational
- **Use Case**: Code generation and mathematical reasoning

### Installing AI Models

1. Navigate to **AI** > **Models** in the left menu
2. Browse the available models
3. Click **Click to Install** on the desired model
4. The system will download and configure the model
5. Monitor the installation progress in the system dashboard

### Model Resource Requirements

Each model has specific resource requirements:

- **CPU Cores**: Processing power needed for inference
- **RAM**: Memory required to load and run the model
- **Storage**: Disk space needed for model files
- **GPU**: Optional hardware acceleration (if available)

---

## Creating AI Models

### Overview

You can create custom AI models tailored to your specific requirements. This process involves configuring model parameters, resource allocation, and deployment settings.

### Creating a New Model

1. Navigate to **AI** > **Models** in the left menu
2. Click **New Model** tab
3. Configure the following sections:

#### Model Configuration

**Model Selection**
- **Model**: Choose from available base models (e.g., Llama-3.2)
- **Variant**: Select model size variant (e.g., Small 1GB)
- **Name**: Enter a descriptive name for your custom model

**Description**
- Provide details about the model's purpose and configuration

#### Resource Configuration

**Compute Resources**
- **Cores**: Number of CPU cores to allocate (default: 8)
- **RAM**: Memory allocation in GB (default: 2GB)
- **Cluster**: Select deployment cluster (default: AI Settings Default)

**GPU Resources**
- **GPU Resource Group Allocation**: Choose GPU configuration (default: CPU Only)
- **Allow CPU fallback**: Enable CPU processing if GPU unavailable
- **Enable Memory Mapping**: Allow dynamic memory allocation

#### Settings Configuration

**Performance Settings**
- **Preferred Tier**: Select storage tier (default: Tier 3)
- **Context Size**: Set context window size (default: 8192)
- **Parallel**: Configure parallel processing (default: 4)

**Worker Configuration**
- **Min Workers**: Minimum number of worker processes (default: 0)
- **Max Workers**: Maximum number of worker processes (default: 1)

**Advanced Options**
- **Insert Think Tag**: Enable structured thinking process
- **Strip Think Tag From History**: Remove think tags from conversation history

### Submitting Model Configuration

1. Review all configuration settings
2. Click **Submit** to create the model
3. Click **Cancel** to discard changes
4. Monitor model deployment in the system dashboard

---

## AI Assistant Management

### Overview

AI assistants are configured AI models that provide specific capabilities and interfaces for interacting with your AI functionality. They can be customized with specific prompts, settings, and behaviors.

### Viewing AI Assistants

1. Navigate to **AI** > **Assistants** in the left menu
2. View available assistants and their status
3. Each assistant displays:
   - Name and description
   - Resource allocation (CPU cores, RAM)
   - Current status (Online/Offline)

### Creating a New Assistant

1. Click **New Assistant** tab
2. Configure the assistant settings:

#### Assistant Configuration

**Basic Settings**
- **Name**: Enter a descriptive name for the assistant
- **Description**: Provide details about the assistant's purpose
- **Model**: Select the underlying AI model (e.g., VergelQ)

#### Assistant Settings

**Chat Configuration**
- **Chat History**: Configure conversation retention (default: Always On)
- **Disable Think**: Toggle structured thinking processes

**System Prompt**
- **System Prompt**: Define the assistant's personality, capabilities, and behavior guidelines
- **Note**: This instruction is given to the model for every chat interaction

**Performance Settings**
- **Temperature**: Control response creativity (0.0 = deterministic, 1.0 = creative)
- **Max Tokens**: Set maximum response length (0 = no limit)

#### Advanced Options

Access advanced configuration options by clicking the **Advanced** dropdown:

**Advanced Options**
- Additional configuration parameters for fine-tuning assistant behavior
- Custom integration settings
- Advanced prompt engineering options

### Submitting Assistant Configuration

1. Configure all desired settings
2. Click **Submit** to create the assistant
3. Click **Cancel** to discard changes
4. The assistant will be deployed and become available for use

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

For the most current information and updates, please refer to the official VergeOS documentation and support resources.

