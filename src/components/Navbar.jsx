import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import { PlanBadge } from './PlanBadge'
import { SignupModal } from './SignupModal'
import { Icon } from './Icon'

export function Navbar() {
  const { t } = useLanguage()
  const { user, plan, logout } = useSubscription()
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition hover:text-brand-500 ${
      isActive ? 'text-brand-500' : 'text-slate-600 dark:text-slate-300'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo Sahabat AI" className="h-8 w-8" />
          <span className="text-lg font-extrabold">
            Sahabat<span className="gradient-text"> AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/chat" className={linkClass}>{t('nav.chat')}</NavLink>
          <NavLink to="/pricing" className={linkClass}>{t('nav.pricing')}</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>{t('nav.dashboard')}</NavLink>}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Icon name="user" className="h-4 w-4" />
                <PlanBadge plan={plan} />
              </Link>
              <button onClick={logout} className="rounded-lg p-2 text-slate-500 hover:text-brand-500" aria-label={t('nav.logout')}>
                <Icon name="logout" className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setModalOpen(true)} className="px-3 py-2 text-sm font-medium hover:text-brand-500">
                {t('nav.login')}
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="gradient-bg rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {t('nav.getStarted')}
              </button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          <Icon name={mobileOpen ? 'x' : 'menu'} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>{t('nav.home')}</NavLink>
            <NavLink to="/chat" className={linkClass} onClick={() => setMobileOpen(false)}>{t('nav.chat')}</NavLink>
            <NavLink to="/pricing" className={linkClass} onClick={() => setMobileOpen(false)}>{t('nav.pricing')}</NavLink>
            {user && <NavLink to="/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>{t('nav.dashboard')}</NavLink>}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false) }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700">
                {t('nav.logout')}
              </button>
            ) : (
              <button
                onClick={() => { setModalOpen(true); setMobileOpen(false) }}
                className="gradient-bg rounded-lg px-4 py-2 text-sm font-semibold text-white"
              >
                {t('nav.getStarted')}
              </button>
            )}
          </div>
        </div>
      )}

      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => navigate('/chat')} />
    </header>
  )
}
