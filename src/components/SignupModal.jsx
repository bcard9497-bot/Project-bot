import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { Icon } from './Icon'

export function SignupModal({ open, onClose, initialMode = 'signup', onSuccess }) {
  const { t } = useLanguage()
  const { login, signup } = useSubscription()
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    if (mode === 'signup') signup({ name, email })
    else login({ name, email })
    onSuccess?.()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {mode === 'signup' ? t('auth.signupTitle') : t('auth.loginTitle')}
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <Icon name="x" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm font-medium">{t('auth.name')}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-400 dark:border-slate-700"
                placeholder="Budi"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">{t('auth.email')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-400 dark:border-slate-700"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-400 dark:border-slate-700"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="gradient-bg w-full rounded-lg py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            {mode === 'signup' ? t('auth.signupBtn') : t('auth.loginBtn')}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          className="mt-3 w-full text-center text-sm text-brand-500 hover:underline"
        >
          {mode === 'signup' ? t('auth.toLogin') : t('auth.toSignup')}
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">{t('auth.demoNote')}</p>
      </div>
    </div>
  )
}
