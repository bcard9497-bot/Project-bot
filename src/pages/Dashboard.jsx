import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { useMeta } from '../lib/useMeta'
import { SettingsPanel } from '../components/SettingsPanel'
import { PlanBadge } from '../components/PlanBadge'
import { SignupModal } from '../components/SignupModal'
import { getPlan } from '../lib/limits'
import { Icon } from '../components/Icon'

export default function Dashboard() {
  const { t, meta } = useLanguage()
  const { user, plan, usage, remainingToday, logout } = useSubscription()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const md = meta('dashboard')
  useMeta({ title: md.title, description: md.description, canonical: 'https://sahabat-ai.example.com/dashboard' })

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">{t('dash.notLoggedIn')}</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="gradient-bg mt-6 rounded-xl px-6 py-3 font-semibold text-white"
        >
          {t('nav.getStarted')}
        </button>
        <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => navigate('/dashboard')} />
      </div>
    )
  }

  const limit = getPlan(plan).dailyLimit
  const limitLabel = limit === Infinity ? '∞' : limit

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-extrabold">{t('dash.title')}</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-slate-500">
            <Icon name="user" className="h-4 w-4" />
            <span className="text-sm">{t('dash.account')}</span>
          </div>
          <p className="mt-2 truncate font-semibold">{user.name}</p>
          <p className="truncate text-sm text-slate-400">{user.email}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm text-slate-500">{t('dash.plan')}</span>
          <div className="mt-2"><PlanBadge plan={plan} /></div>
          <Link to="/pricing" className="mt-3 inline-block text-sm text-brand-500 hover:underline">
            {t('dash.upgrade')}
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm text-slate-500">{t('dash.usage')}</span>
          <p className="mt-2 text-2xl font-bold">
            {usage.count}<span className="text-base font-normal text-slate-400"> / {limitLabel}</span>
          </p>
          <p className="text-sm text-slate-400">
            {t('chat.remaining')} {remainingToday === Infinity ? '∞' : remainingToday}
          </p>
        </div>
      </div>

      <SettingsPanel />

      <div className="mt-6 flex gap-3">
        <Link to="/chat" className="gradient-bg rounded-lg px-5 py-2.5 font-semibold text-white">
          {t('nav.chat')}
        </Link>
        <button
          onClick={logout}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold hover:border-red-400 hover:text-red-500 dark:border-slate-700"
        >
          {t('nav.logout')}
        </button>
      </div>
    </div>
  )
}
