import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-medium transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700"
      aria-label="Toggle language"
      title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <Icon name="globe" className="h-4 w-4" />
      <span className="uppercase">{language}</span>
    </button>
  )
}
