import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { PLANS, formatPrice } from '../lib/limits'
import { Icon } from './Icon'

function featuresFor(planId, t) {
  const plan = PLANS[planId]
  const msgLine =
    plan.dailyLimit === Infinity
      ? t('pricing.feature.unlimited')
      : `${plan.dailyLimit} ${t('pricing.feature.messages')}`
  if (planId === 'free') return [msgLine, t('pricing.feature.basic'), t('pricing.feature.sessions')]
  if (planId === 'pro') return [msgLine, t('pricing.feature.allModels'), t('pricing.feature.sessions')]
  return [msgLine, t('pricing.feature.allModels'), t('pricing.feature.sessions'), t('pricing.feature.priority')]
}

export function PricingCards({ onChoose }) {
  const { t, language } = useLanguage()
  const { user, plan: currentPlan } = useSubscription()

  const cards = [
    { id: 'free', popular: false },
    { id: 'pro', popular: true },
    { id: 'enterprise', popular: false },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map(({ id, popular }) => {
        const isCurrent = user && currentPlan === id
        return (
          <div
            key={id}
            className={`relative flex flex-col rounded-2xl border p-6 transition ${
              popular
                ? 'border-brand-400 bg-white shadow-xl dark:bg-slate-900 md:-translate-y-2 glow'
                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            {popular && (
              <span className="gradient-bg absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white">
                {t('pricing.popular')}
              </span>
            )}
            <h3 className="text-lg font-bold">{t(`pricing.${id}.name`)}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t(`pricing.${id}.tagline`)}</p>
            <div className="my-4">
              <span className="text-4xl font-extrabold">{formatPrice(id, language)}</span>
              {id !== 'free' && <span className="text-slate-500">{t('pricing.perMonth')}</span>}
            </div>
            <ul className="mb-6 flex-1 space-y-3 text-sm">
              {featuresFor(id, t).map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-brand-500"><Icon name="check" className="h-4 w-4" /></span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={isCurrent}
              onClick={() => onChoose?.(id)}
              className={`rounded-lg py-2.5 font-semibold transition ${
                isCurrent
                  ? 'cursor-default bg-slate-100 text-slate-400 dark:bg-slate-800'
                  : popular
                    ? 'gradient-bg text-white hover:opacity-90'
                    : 'border border-slate-300 hover:border-brand-400 hover:text-brand-500 dark:border-slate-700'
              }`}
            >
              {isCurrent ? t('pricing.current') : t('pricing.choose')}
            </button>
          </div>
        )
      })}
    </div>
  )
}
