import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { useMeta } from '../lib/useMeta'
import { useSessions } from '../lib/useSessions'
import { streamMockReply } from '../lib/mockAI'
import { streamProviderReply } from '../lib/aiClient'
import { streamArenaReply } from '../lib/arenaClient'
import { Message } from '../components/Message'
import { ChatInput } from '../components/ChatInput'
import { SessionList } from '../components/SessionList'
import { Icon } from '../components/Icon'

export default function Chat() {
  const { t, language, meta } = useLanguage()
  const { settings, canSend, recordUsage, remainingToday } = useSubscription()
  const cm = meta('chat')
  useMeta({ title: cm.title, description: cm.description, canonical: 'https://sahabat-ai.example.com/chat' })

  const {
    sessions, active, activeId, setActiveId,
    createSession, deleteSession, renameSession, setMessages,
  } = useSessions(language === 'id' ? 'Percakapan 1' : 'Conversation 1')

  const [streaming, setStreaming] = useState(false)
  const [notice, setNotice] = useState('')
  const abortRef = useRef(null)
  const stopMockRef = useRef(null)
  const scrollRef = useRef(null)

  const messages = active?.messages || []

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, streaming])

  const appendAssistantToken = (token) => {
    setMessages((msgs) => {
      const next = [...msgs]
      const last = next[next.length - 1]
      if (last && last.role === 'assistant') {
        next[next.length - 1] = { ...last, content: last.content + token }
      }
      return next
    })
  }

  const runMock = (prompt) => {
    stopMockRef.current = streamMockReply(prompt, language, appendAssistantToken, () => setStreaming(false))
  }

  const finish = () => setStreaming(false)

  const send = async (text) => {
    if (!canSend()) return
    setNotice('')

    const history = [...messages, { role: 'user', content: text }]
    setMessages(history)
    setMessages((m) => [...m, { role: 'assistant', content: '' }])
    recordUsage()
    setStreaming(true)

    const mode = settings.aiMode

    try {
      if (mode === 'mock') {
        runMock(text)
        return
      }

      if (mode === 'provider') {
        abortRef.current = new AbortController()
        try {
          await streamProviderReply(history, settings, appendAssistantToken, abortRef.current.signal)
          finish()
        } catch (e) {
          if (e.name === 'AbortError') return finish()
          setNotice(t('chat.providerFailed'))
          runMock(text)
        }
        return
      }

      if (mode === 'arena') {
        abortRef.current = new AbortController()
        try {
          await streamArenaReply(history, appendAssistantToken, abortRef.current.signal)
          finish()
        } catch (e) {
          if (e.name === 'AbortError') return finish()
          setNotice(t('chat.arenaFailed'))
          runMock(text)
        }
        return
      }
    } catch {
      runMock(text)
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    stopMockRef.current?.()
    setStreaming(false)
  }

  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUser) return
    // remove trailing assistant if empty/last
    setMessages((m) => {
      const next = [...m]
      if (next[next.length - 1]?.role === 'assistant') next.pop()
      return next
    })
    send(lastUser.content)
  }

  const exportChat = () => {
    const text = messages
      .map((m) => `${m.role === 'user' ? t('chat.you') : t('chat.ai')}: ${m.content}`)
      .join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${active?.name || 'chat'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const overLimit = !canSend()

  return (
    <div className="flex h-[calc(100vh-61px)]">
      <div className="hidden md:block">
        <SessionList
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={() => createSession((language === 'id' ? 'Percakapan ' : 'Conversation ') + (sessions.length + 1))}
          onRename={renameSession}
          onDelete={deleteSession}
          onExport={exportChat}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h1 className="font-semibold">{t('chat.title')}</h1>
          <span className="text-xs text-slate-400">
            {t('chat.remaining')} {remainingToday === Infinity ? '∞' : remainingToday}
          </span>
        </div>

        {notice && (
          <div className="bg-amber-50 px-4 py-2 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
            {notice}
          </div>
        )}

        <div ref={scrollRef} className="scroll-thin flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="gradient-bg mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                  <Icon name="spark" className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold">{t('chat.emptyTitle')}</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">{t('chat.emptyDesc')}</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <Message
                  key={i}
                  role={m.role}
                  content={m.content}
                  streaming={streaming && i === messages.length - 1 && m.role === 'assistant'}
                />
              ))
            )}

            {!streaming && messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
              <div className="flex justify-center">
                <button
                  onClick={retry}
                  className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm hover:border-brand-400 hover:text-brand-500 dark:border-slate-700"
                >
                  {t('chat.retry')}
                </button>
              </div>
            )}
          </div>
        </div>

        {overLimit ? (
          <div className="border-t border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t('chat.limitReached')}</p>
            <Link to="/pricing" className="gradient-bg mt-3 inline-block rounded-lg px-5 py-2 text-sm font-semibold text-white">
              {t('chat.upgrade')}
            </Link>
          </div>
        ) : (
          <ChatInput onSend={send} onStop={stop} streaming={streaming} disabled={overLimit} />
        )}
      </div>
    </div>
  )
}
