import { useLanguage } from '../i18n/LanguageContext'
import { Icon } from './Icon'

export function SessionList({
  sessions,
  activeId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
  onExport,
}) {
  const { t } = useLanguage()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="p-3">
        <button
          onClick={onCreate}
          className="gradient-bg flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Icon name="plus" className="h-4 w-4" />
          {t('chat.newSession')}
        </button>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-2">
        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {t('chat.sessions')}
        </p>
        {sessions.map((s) => (
          <div
            key={s.id}
            className={`group mb-1 flex items-center justify-between rounded-lg px-2 py-2 text-sm transition ${
              s.id === activeId
                ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                : 'hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <button onClick={() => onSelect(s.id)} className="flex flex-1 items-center gap-2 truncate text-left">
              <Icon name="chat" className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{s.name}</span>
            </button>
            <div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => {
                  const name = prompt(t('chat.rename'), s.name)
                  if (name) onRename(s.id, name)
                }}
                className="rounded p-1 text-slate-400 hover:text-brand-500"
                aria-label={t('chat.rename')}
              >
                <Icon name="edit" className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(s.id)}
                className="rounded p-1 text-slate-400 hover:text-red-500"
                aria-label={t('chat.delete')}
              >
                <Icon name="trash" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={onExport}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700"
        >
          <Icon name="download" className="h-4 w-4" />
          {t('chat.export')}
        </button>
      </div>
    </aside>
  )
}
