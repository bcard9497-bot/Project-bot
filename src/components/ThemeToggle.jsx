import { useTheme } from '../context/ThemeContext'
import { Icon } from './Icon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-slate-300 p-2 transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700"
      aria-label="Toggle theme"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
    </button>
  )
}
