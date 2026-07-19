// Subscription tier definitions. Prices in both currencies; limit = messages/day.
export const PLANS = {
  free: {
    id: 'free',
    dailyLimit: 10,
    price: { usd: 0, idr: 0 },
  },
  pro: {
    id: 'pro',
    dailyLimit: 500,
    price: { usd: 9, idr: 149000 },
  },
  enterprise: {
    id: 'enterprise',
    dailyLimit: Infinity,
    price: { usd: 29, idr: 449000 },
  },
}

export const PLAN_ORDER = ['free', 'pro', 'enterprise']

export function getPlan(planId) {
  return PLANS[planId] || PLANS.free
}

// Returns true if user still has quota left today.
export function hasQuota(planId, usedToday) {
  const plan = getPlan(planId)
  return usedToday < plan.dailyLimit
}

export function remaining(planId, usedToday) {
  const plan = getPlan(planId)
  if (plan.dailyLimit === Infinity) return Infinity
  return Math.max(0, plan.dailyLimit - usedToday)
}

// Format price according to language.
export function formatPrice(planId, language) {
  const plan = getPlan(planId)
  if (language === 'id') {
    if (plan.price.idr === 0) return 'Rp0'
    return 'Rp' + plan.price.idr.toLocaleString('id-ID')
  }
  if (plan.price.usd === 0) return '$0'
  return '$' + plan.price.usd
}
