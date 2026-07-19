import { useCallback, useEffect, useState } from 'react'
import { load, save } from '../lib/storage'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function newSession(name) {
  const now = Date.now()
  return { id: uid(), name, messages: [], createdAt: now, updatedAt: now }
}

// Manages multiple named chat sessions persisted to localStorage.
export function useSessions(defaultName) {
  const [sessions, setSessions] = useState(() => {
    const stored = load('sessions')
    if (Array.isArray(stored) && stored.length) return stored
    return [newSession(defaultName)]
  })
  const [activeId, setActiveId] = useState(() => {
    const stored = load('sessions')
    return Array.isArray(stored) && stored.length ? stored[0].id : null
  })

  useEffect(() => {
    save('sessions', sessions)
    if (!sessions.find((s) => s.id === activeId) && sessions[0]) {
      setActiveId(sessions[0].id)
    }
  }, [sessions, activeId])

  const active = sessions.find((s) => s.id === activeId) || sessions[0]

  const createSession = useCallback((name) => {
    const s = newSession(name)
    setSessions((prev) => [s, ...prev])
    setActiveId(s.id)
    return s
  }, [])

  const deleteSession = useCallback((id) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id)
      return next.length ? next : [newSession(defaultName)]
    })
  }, [defaultName])

  const renameSession = useCallback((id, name) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)))
  }, [])

  const setMessages = useCallback((updater) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeId) return s
        const messages = typeof updater === 'function' ? updater(s.messages) : updater
        return { ...s, messages, updatedAt: Date.now() }
      })
    )
  }, [activeId])

  return {
    sessions,
    active,
    activeId,
    setActiveId,
    createSession,
    deleteSession,
    renameSession,
    setMessages,
  }
}
