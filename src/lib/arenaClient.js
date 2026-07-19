// EXPERIMENTAL: attempt to chat via LMArena's web endpoints directly from the browser.
//
// ⚠️  IMPORTANT / RISKS:
//  - LMArena has NO official public chat API with an API key.
//  - The site is protected by Cloudflare, captcha and ReCAPTCHA enterprise.
//  - Browser CORS will almost always block a direct cross-origin call.
//  - This may violate LMArena's Terms of Service. Provided AS-IS, experimental.
//
// The exact endpoint/payload must be captured from lmarena.ai DevTools Network tab
// (send a prompt in Text Arena, inspect the POST /api/... request) and updated below.
// Until then, this client will fail fast and the caller should fall back to mock/provider.

const ARENA_ENDPOINT = 'https://lmarena.ai/api/stream/create-evaluation' // placeholder — verify & update

export async function streamArenaReply(messages, onToken, signal) {
  const prompt = messages[messages.length - 1]?.content || ''

  let res
  try {
    res = await fetch(ARENA_ENDPOINT, {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json' },
      // NOTE: real payload shape must be reverse-engineered from the site.
      body: JSON.stringify({ prompt }),
    })
  } catch (e) {
    // Typical: CORS / Cloudflare block / network error
    throw new Error('arena_blocked')
  }

  if (!res.ok) throw new Error(`arena_http_${res.status}`)

  // Best-effort streaming read; response shape unknown/variable.
  try {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      onToken(decoder.decode(value, { stream: true }))
    }
  } catch {
    throw new Error('arena_parse_failed')
  }
}
