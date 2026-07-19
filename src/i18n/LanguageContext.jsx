import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations, META } from './translations'
import { load, save } from '../lib/storage'

const LanguageContext = createContext(null)

function detectDefault() {
  const saved = load('language')
  if (saved === 'id' || saved === 'en') return saved
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('en')) return 'en'
  return 'id'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectDefault)

  useEffect(() => {
    save('language', language)
    if (typeof document !== 'undefined') document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.en[key] ?? key,
    [language]
  )

  const toggleLanguage = useCallback(
    () => setLanguage((l) => (l === 'id' ? 'en' : 'id')),
    []
  )

  const meta = useCallback((page) => META[language]?.[page] ?? META.en[page], [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, meta }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
