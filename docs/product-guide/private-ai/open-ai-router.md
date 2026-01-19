# VergeOS OpenAI-Compatible API

## Overview

VergeOS provides an OpenAI-compatible API endpoint that enables applications to interact with locally-hosted large language models (LLMs) using the standard OpenAI API format. This allows you to use familiar tools and libraries while running models entirely within your VergeOS environment.

The API automatically routes requests to your configured assistants and their underlying models, providing a unified interface for AI interactions.

## Prerequisites

Before using the OpenAI-compatible API, ensure the following components are running:

1. **AI-Helper Worker**: This worker handles API requests and must be running. It starts automatically when the AI service is enabled.

2. **At least one assistant with an Online model**: An assistant must be configured and its underlying model must be in the "Online" state.

To verify these prerequisites:

1. Navigate to **AI → View Workers** to confirm the AI-Helper Worker is running
2. Navigate to **AI → Assistants** to confirm at least one assistant shows "Online" status

## API Endpoints

The OpenAI-compatible API is available at:

```
https://<your-vergeos-url>/v1
```

### Supported Endpoints

| Endpoint | Description |
|----------|-------------|
| `/v1/models` | List available models (returns configured assistants) |
| `/v1/chat/completions` | Generate chat completions |

## Authentication

API requests require authentication using a Bearer token:

```
Authorization: Bearer <your-api-key>
```

### Creating an API Key

1. Navigate to **System → Users**
2. Select the user that will own the API key (or create a new user)
3. Click **New API Key** on the left menu
4. Configure the key settings:
   - **Name**: A descriptive name for the key (e.g., `my-app-key`)
   - **Description** (optional): Additional details about the key's purpose
   - **Expiration Type**: Choose "Set Date" or "Never"
   - **Expires**: If using Set Date, select the expiration date/time
5. Save the key and copy the generated token

!!! warning "Security"
    The API key is only displayed once when created. Store it securely as it cannot be retrieved later.

API keys inherit the permissions of their associated user. For production use, consider creating a dedicated API user with appropriate permissions.

## Basic Usage

### Python Example

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://your-vergeos-instance.com/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="qwen3-coder-14B",  # Use the assistant name
    messages=[
        {"role": "user", "content": "Write a hello world function in Python"}
    ],
    max_tokens=1024,
    temperature=0.7
)

print(response.choices[0].message.content)
```

### cURL Example

```bash
curl https://your-vergeos-instance.com/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-coder-14B",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 100
  }'
```

### List Available Models

```bash
curl https://your-vergeos-instance.com/v1/models \
  -H "Authorization: Bearer your-api-key"
```

!!! note "Model Names"
    In API requests, use the **assistant name** (e.g., `qwen3-coder-14B`) as the `model` parameter, not the underlying model name (e.g., `Qwen3-14B-Q6_K`).

## Response Format

Responses follow the standard OpenAI format with additional timing information:

```json
{
  "id": "unique-completion-id",
  "object": "chat.completion",
  "created": 1768822431,
  "model": "assistant-name",
  "system_fingerprint": "assistant-name",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Response content here"
      }
    }
  ],
  "usage": {
    "prompt_tokens": 32,
    "completion_tokens": 100,
    "total_tokens": 132
  },
  "timings": {
    "prompt_n": 12,
    "prompt_ms": 365.388,
    "prompt_per_token_ms": 30.449,
    "prompt_per_second": 32.84,
    "predicted_n": 100,
    "predicted_ms": 1620.788,
    "predicted_per_token_ms": 16.21,
    "predicted_per_second": 61.70
  }
}
```

The `timings` field provides performance metrics not available in the standard OpenAI API.

## Configuring Assistants

Assistants define how the API interacts with underlying models. The assistant **Name** is used as the `model` parameter in API requests.

For detailed instructions on creating and configuring assistants, see the [AI Configuration Guide](/product-guide/private-ai/configuration/#ai-assistant-management).

!!! tip "Key Settings for API Usage"
    - **Name**: This becomes the `model` parameter in API calls
    - **Disable think**: Enable this for models with thinking capabilities to return content via API
    - **System Prompt**: Applied to every API request automatically

## Workers

The AI system uses two types of workers:

- **AI-Helper Worker**: Processes API requests and routes them to models. Starts automatically and is required for the API to function.
- **Model Workers**: Handle inference for each running model. Created automatically when a model starts.

View worker status at **AI → View Workers**.

## Multi-Turn Conversations

The API supports multi-turn conversations by including message history:

```python
response = client.chat.completions.create(
    model="qwen3-coder-14B",
    messages=[
        {"role": "user", "content": "What is Python?"},
        {"role": "assistant", "content": "Python is a programming language..."},
        {"role": "user", "content": "Show me a simple example"}
    ]
)
```

When **Chat History** is enabled on the assistant, the system can also maintain context across separate API calls within a session.

## Working with Thinking Models

Some models (like Qwen3) have "thinking" capabilities where they reason through problems internally before responding.

If you're using such a model via the API and receiving empty responses, the model may be outputting thinking tokens that are filtered from the response. To get the actual response content:

1. Navigate to **AI → Assistants**
2. Click on your assistant
3. Click **Edit Assistant**
4. Enable the **Disable think** toggle
5. Click **Submit**

This suppresses the thinking process and returns only the final response.

## Integration Examples

### IDE Integration

Many IDEs support custom OpenAI-compatible endpoints. Configure your IDE with:

- **API Base URL**: `https://your-vergeos-instance.com/v1`
- **API Key**: Your VergeOS API key
- **Model**: Your assistant name (e.g., `qwen3-coder-14B`)

### Application Integration

Use any OpenAI client library:

=== "Python"
    ```python
    from openai import OpenAI
    client = OpenAI(base_url="https://your-vergeos-instance.com/v1", api_key="your-key")
    ```

=== "JavaScript"
    ```javascript
    import OpenAI from 'openai';
    const client = new OpenAI({
      baseURL: 'https://your-vergeos-instance.com/v1',
      apiKey: 'your-key'
    });
    ```

=== "cURL"
    ```bash
    curl https://your-vergeos-instance.com/v1/chat/completions \
      -H "Authorization: Bearer your-key" \
      -H "Content-Type: application/json" \
      -d '{"model": "assistant-name", "messages": [...]}'
    ```

## Troubleshooting

### Login Required Error

```json
{"err":"Login required"}
```

**Cause**: Missing or invalid API key.

**Solution**: Include a valid API key in the Authorization header.

### Empty Response Content

**Cause**: Model is using thinking tokens that are filtered from output.

**Solution**: Enable "Disable think" in the assistant settings.

### Model Not Found

**Cause**: The specified model name doesn't match any assistant.

**Solution**:

- Use the exact assistant name (case-sensitive)
- Verify the assistant exists at **AI → Assistants**
- Ensure the assistant's model is Online

### Connection Refused

**Cause**: AI-Helper Worker is not running.

**Solution**:

- Check **AI → View Workers** to verify AI-Helper Worker status
- Restart the AI service if needed

### Slow Responses

**Cause**: Model is loading or under heavy load.

**Solution**:

- Check worker resource usage at **AI → View Workers**
- Consider allocating more CPU cores or RAM to the model
- Use a smaller model for faster responses

---

**Version Compatibility**: This functionality is available in VergeOS 26.0 and later.
