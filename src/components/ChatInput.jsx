import { useState, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'

export function ChatInput({ onSend, onStop, streaming, disabled }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const submit = () => {
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const autoGrow = (e) => {
    setValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={autoGrow}
          onKeyDown={handleKey}
          rows={1}
          disabled={disabled}
          placeholder={t('chat.placeholder')}
          className="max-h-40 flex-1 resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-400 disabled:opacity-50 dark:border-slate-700"
        />
        {streaming ? (
          <button
            onClick={onStop}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600"
            aria-label={t('chat.stop')}
          >
            <Icon name="stop" className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={disabled || !value.trim()}
            className="gradient-bg flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:opacity-90 disabled:opacity-40"
            aria-label={t('chat.send')}
          >
            <Icon name="send" className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
