import { describe, it, expect } from 'vitest'
import { translations } from '../i18n/translations'

describe('i18n', () => {
  it('has both languages', () => {
    expect(translations.id).toBeDefined()
    expect(translations.en).toBeDefined()
  })

  it('id and en have the same keys', () => {
    const idKeys = Object.keys(translations.id).sort()
    const enKeys = Object.keys(translations.en).sort()
    expect(idKeys).toEqual(enKeys)
  })

  it('no empty values', () => {
    for (const lang of ['id', 'en']) {
      for (const [key, val] of Object.entries(translations[lang])) {
        expect(val, `${lang}.${key}`).toBeTruthy()
      }
    }
  })
})
