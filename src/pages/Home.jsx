import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { useMeta } from '../lib/useMeta'
import { PricingCards } from '../components/PricingCards'
import { SignupModal } from '../components/SignupModal'
import { Icon } from '../components/Icon'

const FEATURE_ICONS = ['bolt', 'layers', 'chat', 'globe', 'spark', 'moon']
const FEATURE_KEYS = ['instant', 'multimodel', 'sessions', 'bilingual', 'billing', 'darkmode']

export default function Home() {
  const { t, meta } = useLanguage()
  const { user } = useSubscription()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const m = meta('home')
  useMeta({ title: m.title, description: m.description, canonical: 'https://sahabat-ai.example.com/' })

  const startFree = () => {
    if (user) navigate('/chat')
    else setModalOpen(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <span className="inline-block rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
            {t('hero.badge')}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
            {t('hero.h1')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {t('hero.sub')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={startFree}
              className="gradient-bg flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              <Icon name="chat" className="h-5 w-5" />
              {t('hero.ctaPrimary')}
            </button>
            <Link
              to="/pricing"
              className="rounded-xl border border-slate-300 px-7 py-3.5 font-semibold transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t('features.title')}</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">{t('features.subtitle')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_KEYS.map((key, i) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="gradient-bg mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white">
                <Icon name={FEATURE_ICONS[i]} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{t(`features.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t(`features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-100/60 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t('how.title')}</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">{t('how.subtitle')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {['step1', 'step2', 'step3'].map((step) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-950">
                <h3 className="gradient-text text-xl font-bold">{t(`how.${step}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t(`how.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t('pricing.title')}</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">{t('pricing.subtitle')}</p>
        </div>
        <PricingCards onChoose={() => navigate('/pricing')} />
      </section>

      {/* FAQ */}
      <section className="bg-slate-100/60 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">{t('faq.title')}</h2>
          <div className="space-y-3">
            {['1', '2', '3', '4', '5'].map((n) => (
              <details key={n} className="group rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between">
                    {t(`faq.q${n}`)}
                    <span className="text-brand-500 transition group-open:rotate-45"><Icon name="plus" className="h-5 w-5" /></span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t(`faq.a${n}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="gradient-bg relative overflow-hidden rounded-3xl px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">{t('cta.subtitle')}</p>
          <button
            onClick={startFree}
            className="mt-8 rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-600 transition hover:bg-slate-100"
          >
            {t('cta.button')}
          </button>
        </div>
      </section>

      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => navigate('/chat')} />
    </div>
  )
}
