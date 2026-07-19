// Minimal, safe-ish markdown -> HTML for chat messages.
// Escapes HTML first, then applies a small subset (code blocks, inline code,
// bold, italic, links, lists, line breaks). Not a full parser.

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderMarkdown(text) {
  if (!text) return ''
  let html = escapeHtml(text)

  // Fenced code blocks ```lang\n...```
  html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, _lang, code) => {
    return `<pre><code>${code.replace(/\n$/, '')}</code></pre>`
  })

  // Inline code `code`
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>')

  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  // Italic *text*
  html = html.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')

  // Links [text](url)
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Simple bullet lists
  html = html.replace(/(?:^|\n)((?:- .*(?:\n|$))+)/g, (_, block) => {
    const items = block
      .trim()
      .split('\n')
      .map((l) => l.replace(/^-\s+/, ''))
      .map((l) => `<li>${l}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  })

  // Paragraph line breaks (avoid inside <pre>)
  html = html
    .split(/\n{2,}/)
    .map((chunk) => (chunk.startsWith('<pre>') || chunk.startsWith('<ul>') ? chunk : `<p>${chunk.replace(/\n/g, '<br/>')}</p>`))
    .join('')

  return html
}
