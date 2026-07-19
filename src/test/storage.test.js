import { describe, it, expect } from 'vitest'
import { save, load, remove, todayKey } from '../lib/storage'

describe('storage', () => {
  it('saves and loads JSON', () => {
    save('foo', { a: 1 })
    expect(load('foo')).toEqual({ a: 1 })
  })

  it('returns fallback for missing key', () => {
    expect(load('missing', 'default')).toBe('default')
  })

  it('removes keys', () => {
    save('bar', 123)
    remove('bar')
    expect(load('bar')).toBeNull()
  })

  it('todayKey is YYYY-MM-DD', () => {
    expect(todayKey()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
