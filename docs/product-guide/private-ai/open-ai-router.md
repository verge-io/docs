# VergeOS OpenAI-Compatible Router

## Overview

VergeOS includes an integrated OpenAI-compatible router that enables seamless access to multiple large language models (LLMs) through a unified API interface. This functionality allows you to deploy AI assistants within your VergeOS environment and route requests to various LLM providers using the standardized OpenAI API format.

The router acts as a middleware layer that translates requests between VergeOS and external LLM services, providing a consistent interface regardless of the underlying model provider.

## Key Features

- **OpenAI API Compatibility**: Uses the standard OpenAI API format for requests and responses
- **Multi-Model Support**: Connect to various LLM providers through a single interface
- **Workspace-Level Configuration**: Configure router settings at the workspace level for isolated AI services
- **Assistant Management**: Create and manage AI assistants with customizable models and parameters
- **Flexible Routing**: Direct requests to different models based on your configuration

## Architecture

The OpenAI-compatible router operates at the workspace level in VergeOS:

1. **Generic OpenAI Settings**: Configure the router endpoint and API authentication at the workspace level
2. **Assistant Configuration**: Create individual assistants that use specific models and parameters
3. **API Routing**: Requests are routed through the VergeOS endpoint to the configured LLM provider

## How It Works

### Request Flow

1. **Client Request**: Applications make standard OpenAI API calls to your VergeOS endpoint
2. **Router Processing**: The VergeOS router receives the request and applies workspace-level settings
3. **Model Selection**: The router identifies the target model based on the assistant configuration
4. **Provider Communication**: The request is forwarded to the appropriate LLM provider
5. **Response Handling**: The provider's response is returned through the router to the client

### Configuration Components

#### Workspace-Level Settings

Configure the OpenAI router at the workspace level through the **Generic OpenAI Settings** dialog:

- **Base URL**: The API endpoint for your VergeOS instance (e.g., `https://your-system-url/v1`)
- **API Key**: Authentication key for securing access to the router
- **Token Context Window**: Maximum number of tokens the model can process in a single request (e.g., 40% or 4096 tokens)
- **Max Tokens**: Maximum number of tokens the model can generate in a response (e.g., 1024 tokens)

#### Assistant Configuration

Create AI assistants through the **AI → Assistants** interface:

- **Name**: Identifier for the assistant (e.g., `qwen3-coder-14B`)
- **Description**: Optional description of the assistant's purpose
- **Model Selection**: Choose from available models (dropdown shows compatible models)
- **System Prompt**: Define the assistant's behavior and role
- **Chat History**: Configure whether chat context is maintained across conversations
- **Temperature**: Control response randomness (0.8 = creative, 0.0 = deterministic)
- **Quality Score**: Minimum score threshold for response quality (0-100)
- **Max Tokens**: Per-assistant token limit override

## Using the OpenAI Router

### Basic Usage

Applications interact with the VergeOS OpenAI router using standard OpenAI client libraries:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://your-vergeos-instance.com/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="qwen3-coder-14B",  # Assistant name
    messages=[
        {"role": "user", "content": "Your question here"}
    ]
)
```

### Configuration Steps

1. **Configure Workspace Settings**:
   - Navigate to your workspace dashboard
   - Access the Generic OpenAI Settings
   - Set the Base URL to your VergeOS endpoint
   - Generate and configure an API key
   - Set token limits appropriate for your models

2. **Create Assistants**:
   - Go to **AI → Assistants**
   - Click **New** or edit an existing assistant
   - Configure the assistant name, model, and parameters
   - Define the system prompt for the assistant's behavior
   - Save the configuration

3. **Connect Applications**:
   - Use the workspace Base URL as your OpenAI endpoint
   - Authenticate with the configured API key
   - Reference assistants by name in the `model` parameter

## Model Selection

The router supports various LLM models through the dropdown interface. Available models may include:

- **Qwen3-coder-14B**: Code-focused model variants
- **Ollama models**: Models served through Ollama
- **DeepSeek models**: DeepSeek AI model series
- **Custom models**: Any OpenAI-compatible model endpoint

Select the appropriate model based on your use case:
- Code generation and technical tasks → Code-specialized models
- General conversation → General-purpose models
- Domain-specific tasks → Fine-tuned or specialized models

## Chat History and Context

The **Chat History** setting determines how the router handles conversation context:

- **Default On**: Maintains chat history across requests, enabling multi-turn conversations
- **Disable Think**: Alternative mode for different context handling
- **Off**: Each request is treated independently without retained context

Context is managed automatically by the router when chat history is enabled, allowing for coherent multi-turn interactions.

## Token Management

Token limits control the size of requests and responses:

- **Token Context Window**: Maximum input size (prompt + history)
- **Max Tokens**: Maximum output size (response generation)

These settings prevent runaway costs and ensure predictable model behavior. Configure limits based on:
- Model capabilities and context window size
- Application requirements for response length
- Cost management for token-based billing

## Integration Patterns

### Direct API Integration

Use standard OpenAI client libraries in any language:
- Python: `openai` package
- JavaScript: `openai` npm package
- Go: OpenAI Go client
- Other languages: Any HTTP client with JSON support

### Application Integration

The router enables AI functionality in existing applications:
- Development tools and IDEs
- Custom applications requiring LLM capabilities
- Workflow automation and processing pipelines
- Interactive chat interfaces

### Multi-Tenant Deployment

Workspace-level configuration supports multi-tenant scenarios:
- Separate API keys per workspace
- Isolated assistant configurations
- Independent model access and limits
- Tenant-specific customization

## Best Practices

### Security

- Rotate API keys regularly
- Use workspace-level isolation for different teams or projects
- Implement rate limiting at the application level
- Monitor API usage through VergeOS logs

### Performance

- Configure appropriate token limits for your use cases
- Use chat history selectively (disable for stateless operations)
- Select models matched to task complexity
- Monitor response times and adjust as needed

### Cost Management

- Set conservative max token limits initially
- Monitor usage patterns through logs
- Adjust temperature and quality scores to balance cost and quality
- Consider using smaller models for simpler tasks

## Monitoring and Troubleshooting

### Logs

Access logs through the VergeOS interface to monitor:
- API request patterns and volume
- Model performance and response times
- Error conditions and failed requests
- Authentication and access patterns

### Common Issues

**Authentication Failures**:
- Verify API key configuration in workspace settings
- Check that client is using correct Base URL
- Ensure API key has appropriate permissions

**Model Not Found**:
- Confirm assistant name matches exactly (case-sensitive)
- Verify assistant is configured in the correct workspace
- Check that model is available and running

**Token Limit Errors**:
- Reduce input prompt length
- Increase Token Context Window in settings
- Check Max Tokens setting for response generation
- Review chat history length if enabled

**Response Quality Issues**:
- Adjust Quality Score threshold
- Modify Temperature setting for desired creativity level
- Review and refine System Prompt
- Consider switching to a different model variant

---

**Version Compatibility**: This functionality is available in VergeOS 26.0 and later.
