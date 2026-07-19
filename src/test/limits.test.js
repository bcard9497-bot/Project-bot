import { describe, it, expect } from 'vitest'
import { PLANS, getPlan, hasQuota, remaining, formatPrice } from '../lib/limits'

describe('limits', () => {
  it('free plan allows 10 messages/day', () => {
    expect(PLANS.free.dailyLimit).toBe(10)
    expect(hasQuota('free', 9)).toBe(true)
    expect(hasQuota('free', 10)).toBe(false)
  })

  it('enterprise is unlimited', () => {
    expect(hasQuota('enterprise', 99999)).toBe(true)
    expect(remaining('enterprise', 500)).toBe(Infinity)
  })

  it('remaining computes correctly for pro', () => {
    expect(remaining('pro', 100)).toBe(400)
    expect(remaining('pro', 500)).toBe(0)
  })

  it('unknown plan falls back to free', () => {
    expect(getPlan('nope').dailyLimit).toBe(10)
  })

  it('formats price by language', () => {
    expect(formatPrice('free', 'id')).toBe('Rp0')
    expect(formatPrice('free', 'en')).toBe('$0')
    expect(formatPrice('pro', 'en')).toBe('$9')
    expect(formatPrice('pro', 'id')).toContain('Rp')
  })
})
