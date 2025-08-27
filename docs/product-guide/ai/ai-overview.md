# On-Premises AI (VergeIQ)

!!! info "**New Feature**"  
    This page documents functionality added in **VergeOS v25.2**

VergeIQ offers integrated artificial intelligence capabilities directly within your VergeOS environment, allowing you to instantly deploy and manage AI models and assistants locally, providing secure, private AI functionality without relying on external cloud services.  something about how this is a game-changer for so many organizations because it makes sovereign AI implementations accessible (from a price standpoint, simplicity of deployment, low barrier to entry and scalability)


### Key Features

**Privacy and Data Sovereignty**: 

- Keep your AI processing and data completely within your private environment
- Avoid cloud-leaks and other vulnerabilities to your proprietary information
- Particularly useful for edge deployments and air-gapped systems
- Easier compliance alignment without relying on third-party assurances

**Rapid Deployment**: 

- Leverage VergeIQ immediately as part of VergeOS without extra purchases or installations
- Easily deploy multiple, secure, generative AI environments without complex configurations

**Performance Optimization and Consistency**:

- Eliminate network variability (latency, packet loss concerns, and reliance on internet bandwidth) 
- Avoid slowdowns due to congestion, outages, or routing issues
- Crucial for time-sensitive use cases
- Offline Availability ensures uninterrupted service in remote or secure locations
- Leverage GPUs and other specialized hardware without cloud abstraction layers

**Customization and Integration**: 

- Fine-tune models to match your hardware and use cases
- Easily integrate models with your local data stores and workloads

**Cost Control**:

- No expensive per-token or subscription fees
- CapEx vs. OpEx: If you already own the hardware, local hosting can be more economical over time, especially for high-volume workloads.
- Avoid unpredictable and often complex cloud-service pricing models


## Example Use Cases - Practical Applications

* **[HIPAA-Compliant Healthcare AI]()**: A medical research university processing PHI and clinical data ensures highly sensitive data compliance, with zero external data exposure, while leveraging AI to accelerate research

* **[Proprietary Financial AI Domain Expert]()**: A Private equity creates domain-specific expertise, securely harnessing its own proprietary data to AI, delivering faster investment decisions while safeguarding institutional knowledge.  

* **[High-Frequency Trading AI]()**: A Quantitative trading firm empowers sub-millisecond AI responses for high volume operations, maintaining ultra-low-latency, consistent performance with on-premises infrastructure

* **[Cost-Predictable Enterprise AI]()**: A Fortune 500 manufacturing company utilizes AI power to automate and streamline cross-functional operations while maintaining lower and more predictable costs by eliminating the need for cloud AI services.



## VergeAI Concepts

* **Models**: provides the underlying intelligence for your AI assistants and applications. The system supports various model types including language models, conversational AI, and specialized task models. something about how vergeai includes several common free models and can work with a vast array of free open source models that are publicly available. mention that you can download and implement multiple models within your vergeos environment.

* **Assistants**: are configured AI models that provides specific capabilities and interfaces for interacting with your AI functionality. Each assistant  be customized with specific prompts, settings, and behaviors. something about how you can create multiple assistants to handle different tasks and processing in your environment

* **Worker**: a dedicated process that loads an AI model and handles incoming requests for inference. 
Multiple workers can be spun up to:

  * Handle concurrent requests
  * Isolate workloads
  *  Improve fault tolerance
  * Example: In a service pipeline, each worker might serve a different version of a model or run on a separate GPU.

* **Chat Session**: a continuous flow of exchanged messages between application/user and the AI model. (also note how a chat session would typically pertain to same context, usually with a start and end, whether defined by time/user action/system limits?)

Examples: 
   *  **UI-based session** - A user chats with the AI via the VergeOS interface
   *  **API-driven session** - An application sends structured messages to the AI model and receives responses, often maintaining context via session IDs or message history.

[Configure and Use VergeAI in Your Environment →](/product-guide/ai/ai-configuration)

