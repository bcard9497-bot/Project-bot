import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { useSubscription } from '../context/SubscriptionContext'
import { useMeta } from '../lib/useMeta'
import { PricingCards } from '../components/PricingCards'
import { SignupModal } from '../components/SignupModal'

export default function Pricing() {
  const { t, meta } = useLanguage()
  const { user, setPlan } = useSubscription()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingPlan, setPendingPlan] = useState(null)
  const m = meta('pricing')
  useMeta({ title: m.title, description: m.description, canonical: 'https://sahabat-ai.example.com/pricing' })

  const handleChoose = (planId) => {
    if (!user) {
      setPendingPlan(planId)
      setModalOpen(true)
      return
    }
    setPlan(planId)
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">{t('pricing.title')}</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">{t('pricing.subtitle')}</p>
      </div>

      <PricingCards onChoose={handleChoose} />

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-400">
        {t('dash.securityNote')}
      </p>

      <SignupModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          if (pendingPlan) setPlan(pendingPlan)
          navigate('/dashboard')
        }}
      />
    </div>
  )
}
