import { useLanguage } from '../i18n/LanguageContext'

const STYLES = {
  free: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  pro: 'gradient-bg text-white',
  enterprise: 'bg-amber-500 text-white',
}

export function PlanBadge({ plan }) {
  const { t } = useLanguage()
  const label = t(`pricing.${plan}.name`)
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STYLES[plan] || STYLES.free}`}>
      {label}
    </span>
  )
}
