import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { renderMarkdown } from '../lib/markdown'
import { Icon } from './Icon'

export function Message({ role, content, streaming }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const isUser = role === 'user'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white ${
          isUser ? 'bg-slate-500' : 'gradient-bg'
        }`}
      >
        <Icon name={isUser ? 'user' : 'spark'} className="h-4 w-4" />
      </div>

      <div className={`group max-w-[80%] ${isUser ? 'items-end text-right' : ''}`}>
        <div className="mb-1 text-xs font-medium text-slate-400">
          {isUser ? t('chat.you') : t('chat.ai')}
        </div>
        <div
          className={`rounded-2xl px-4 py-2.5 text-left ${
            isUser
              ? 'bg-brand-500 text-white'
              : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          {content ? (
            <div
              className="msg-content text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          ) : streaming ? (
            <div className="flex gap-1 py-1">
              <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
              <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
              <span className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
            </div>
          ) : null}
        </div>

        {!isUser && content && (
          <button
            onClick={copy}
            className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400 opacity-0 transition hover:text-brand-500 group-hover:opacity-100"
          >
            <Icon name={copied ? 'check' : 'copy'} className="h-3.5 w-3.5" />
            {copied ? t('chat.copied') : t('chat.copy')}
          </button>
        )}
      </div>
    </div>
  )
}
