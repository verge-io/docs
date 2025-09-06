# Sovereign AI (VergeIQ)

!!! info "New Feature"  
    This page documents functionality added in VergeOS v25.2.

VergeIQ introduces integrated artificial intelligence capabilities directly within your VergeOS environment, enabling organizations to instantly deploy and manage AI models and assistants locally. By eliminating reliance on external cloud services, VergeIQ provides secure, private AI functionality, making sovereign AI implementations accessible from a price, simplicity, and scalability standpoint.

## Key Features and Benefits

* **Data Privacy & Sovereignty:** Keep all AI processing and data entirely within your private environment. This is crucial for complying with data regulations (like HIPAA) and avoiding proprietary information leaks, especially for edge or air-gapped systems.

* **Rapid & Simple Deployment:** VergeIQ is a native component of VergeOS, so there are no extra purchases or complex installations. You can deploy multiple, serverless Inference providers in minutes. 

* **Optimized Performance & Consistency:** By running AI locally, you eliminate network variability like latency and packet loss. This ensures consistently fast, predictable performance, which is vital for time-sensitive applications. Offline availability also guarantees uninterrupted service in remote or secure locations.

* **Customization & Integration:** Easily fine-tune models to match your specific hardware and use cases. VergeIQ enables seamless integration with your local data stores and existing workloads.

* **Predictable Cost Control:** Avoid the unpredictable and often complex expenses of per-token or subscription fees associated with cloud AI services. Local hosting provides a predictable CapEx model, offering a more economical solution over time for high-volume AI workloads.

## Practical Applications

VergeIQ's on-premises approach to AI is ideal for organizations handling sensitive or high-volume data.

  * **HIPAA-Compliant Healthcare AI:** A medical research university can process Protected Health Information (PHI) and clinical data securely, leveraging AI to accelerate research without any external data exposure.

  * **Proprietary Financial AI:** A private equity firm can create a domain-specific AI expert by training it on its own proprietary data, leading to faster, more secure investment decisions while safeguarding institutional knowledge.

  * **High-Frequency Trading:** A quantitative trading firm can achieve sub-millisecond AI responses, maintaining the ultra-low latency and consistent performance required for high-volume operations with on-premises infrastructure.

  * **Cost-Predictable Enterprise AI:** A Fortune 500 manufacturing company can automate and streamline cross-functional operations while maintaining predictable costs by eliminating the need for expensive, uncertain cloud AI services.

## AI Elements

* **Models:** The core intelligence behind your AI assistants and applications. VergeIQ includes several common models and supports a vast array of publicly available open-source models that you can download and implement within your VergeOS environment.

* **Assistants:** Configured AI models with specific capabilities and "personalities". You can create multiple assistants, each with its own prompts, settings, and behaviors, to handle different tasks in your environment.

* **Worker:** A dedicated process that loads an AI model and handles incoming requests for inference. You can spin up multiple workers to handle concurrent requests, isolate workloads, and improve fault tolerance.

* **Chat Session:** A continuous flow of exchanged messages between a user/application and an AI model. A chat session maintains a defined context, typically with a start and end, and can be driven through the VergeOS UI or via an API for seamless integration with other applications.

[Configure and Use VergeIQ in Your Environment →](/product-guide/ai/ai-configuration)

