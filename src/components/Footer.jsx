import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo Sahabat AI" className="h-8 w-8" />
            <span className="text-lg font-extrabold">Sahabat<span className="gradient-text"> AI</span></span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t('footer.tagline')}</p>
          <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">
            {t('footer.demoBadge')}
          </span>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('footer.product')}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/chat" className="text-slate-600 hover:text-brand-500 dark:text-slate-300">{t('nav.chat')}</Link></li>
            <li><Link to="/pricing" className="text-slate-600 hover:text-brand-500 dark:text-slate-300">{t('nav.pricing')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('footer.company')}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-slate-600 hover:text-brand-500 dark:text-slate-300">{t('nav.home')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-400 dark:border-slate-800">
        © {year} Sahabat AI. {t('footer.rights')}
      </div>
    </footer>
  )
}
