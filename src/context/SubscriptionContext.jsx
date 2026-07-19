import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { load, save, remove, todayKey } from '../lib/storage'
import { hasQuota, remaining } from '../lib/limits'
import { PROVIDER_PRESETS } from '../lib/aiClient'

const SubscriptionContext = createContext(null)

const DEFAULT_SETTINGS = {
  aiMode: 'mock', // 'mock' | 'provider' | 'arena'
  provider: 'openai',
  apiKey: '',
  baseUrl: PROVIDER_PRESETS[0].baseUrl,
  model: PROVIDER_PRESETS[0].model,
}

function loadUsage() {
  const u = load('usage')
  if (!u || u.date !== todayKey()) {
    return { date: todayKey(), count: 0 }
  }
  return u
}

export function SubscriptionProvider({ children }) {
  const [user, setUser] = useState(() => load('user'))
  const [usage, setUsage] = useState(loadUsage)
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS, ...load('settings') }))

  useEffect(() => {
    if (user) save('user', user)
    else remove('user')
  }, [user])

  useEffect(() => save('usage', usage), [usage])
  useEffect(() => save('settings', settings), [settings])

  const plan = user?.plan || 'free'

  const login = useCallback(({ name, email }) => {
    const existing = load('user')
    const next = existing && existing.email === email
      ? existing
      : { name: name || email.split('@')[0], email, plan: 'free', createdAt: Date.now() }
    setUser(next)
    return next
  }, [])

  const signup = useCallback(({ name, email }) => {
    const next = { name: name || email.split('@')[0], email, plan: 'free', createdAt: Date.now() }
    setUser(next)
    return next
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const setPlan = useCallback((planId) => {
    setUser((u) => (u ? { ...u, plan: planId } : u))
  }, [])

  const canSend = useCallback(() => hasQuota(plan, usage.count), [plan, usage.count])

  const recordUsage = useCallback(() => {
    setUsage((u) => {
      const base = u.date === todayKey() ? u : { date: todayKey(), count: 0 }
      return { ...base, count: base.count + 1 }
    })
  }, [])

  const remainingToday = remaining(plan, usage.count)

  const updateSettings = useCallback((patch) => {
    setSettings((s) => ({ ...s, ...patch }))
  }, [])

  return (
    <SubscriptionContext.Provider
      value={{
        user,
        plan,
        usage,
        settings,
        login,
        signup,
        logout,
        setPlan,
        canSend,
        recordUsage,
        remainingToday,
        updateSettings,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider')
  return ctx
}
