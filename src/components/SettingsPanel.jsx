import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useSubscription } from '../context/SubscriptionContext'
import { PROVIDER_PRESETS } from '../lib/aiClient'

export function SettingsPanel() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { settings, updateSettings } = useSubscription()
  const [saved, setSaved] = useState(false)

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const onPresetChange = (presetId) => {
    const preset = PROVIDER_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    updateSettings({
      provider: presetId,
      baseUrl: preset.id === 'custom' ? settings.baseUrl : preset.baseUrl,
      model: preset.id === 'custom' ? settings.model : preset.model,
    })
  }

  const field = 'w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-brand-400 dark:border-slate-700'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-xl font-bold">{t('dash.settings')}</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t('dash.language')}</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className={field}>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t('dash.theme')}</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className={field}>
            <option value="dark">{t('dash.themeDark')}</option>
            <option value="light">{t('dash.themeLight')}</option>
          </select>
        </div>
      </div>

      <hr className="my-6 border-slate-200 dark:border-slate-800" />

      <div>
        <label className="mb-1 block text-sm font-medium">{t('dash.aiMode')}</label>
        <select
          value={settings.aiMode}
          onChange={(e) => updateSettings({ aiMode: e.target.value })}
          className={field}
        >
          <option value="mock">{t('dash.aiMode.mock')}</option>
          <option value="provider">{t('dash.aiMode.provider')}</option>
          <option value="arena">{t('dash.aiMode.arena')}</option>
        </select>
      </div>

      {settings.aiMode === 'provider' && (
        <div className="mt-4 space-y-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div>
            <label className="mb-1 block text-sm font-medium">{t('dash.provider')}</label>
            <select value={settings.provider} onChange={(e) => onPresetChange(e.target.value)} className={field}>
              {PROVIDER_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t('dash.apiKey')}</label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              className={field}
              placeholder="sk-..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">{t('dash.baseUrl')}</label>
              <input
                value={settings.baseUrl}
                onChange={(e) => updateSettings({ baseUrl: e.target.value })}
                className={field}
                placeholder="https://api.openai.com/v1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{t('dash.model')}</label>
              <input
                value={settings.model}
                onChange={(e) => updateSettings({ model: e.target.value })}
                className={field}
                placeholder="gpt-4o-mini"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400">{t('dash.apiKeyNote')}</p>
        </div>
      )}

      {settings.aiMode === 'arena' && (
        <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
          {t('chat.arenaWarning')}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={showSaved}
          className="gradient-bg rounded-lg px-5 py-2 font-semibold text-white transition hover:opacity-90"
        >
          {t('dash.save')}
        </button>
        {saved && <span className="text-sm font-medium text-emerald-500">{t('dash.saved')}</span>}
      </div>

      <p className="mt-5 text-xs text-slate-400">{t('dash.securityNote')}</p>
    </div>
  )
}
