// OpenAI-compatible chat client (works with OpenAI, OpenRouter, Groq, custom).
// Streams tokens via the SSE `data:` protocol used by /chat/completions.

export const PROVIDER_PRESETS = [
  { id: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
  { id: 'openrouter', name: 'OpenRouter', baseUrl: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4o-mini' },
  { id: 'groq', name: 'Groq', baseUrl: 'https://api.groq.com/openai/v1', model: 'llama-3.1-8b-instant' },
  { id: 'custom', name: 'Custom', baseUrl: '', model: '' },
]

// messages: [{role, content}]
// settings: {apiKey, baseUrl, model}
// onToken(chunk), signal: AbortSignal
export async function streamProviderReply(messages, settings, onToken, signal) {
  const { apiKey, baseUrl, model } = settings
  if (!apiKey) throw new Error('missing_api_key')
  if (!baseUrl) throw new Error('missing_base_url')
  if (!model) throw new Error('missing_model')

  const url = baseUrl.replace(/\/$/, '') + '/chat/completions'

  const res = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`http_${res.status}: ${text.slice(0, 200)}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') return
      try {
        const json = JSON.parse(data)
        const delta = json.choices?.[0]?.delta?.content
        if (delta) onToken(delta)
      } catch {
        /* ignore partial/keepalive lines */
      }
    }
  }
}
