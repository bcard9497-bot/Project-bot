import { useLanguage } from '../i18n/LanguageContext'
import { LOGOS } from '../lib/logos'

function LogoRow({ ariaHidden }) {
  return (
    <ul
      className="marquee-track flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={ariaHidden || undefined}
    >
      {LOGOS.map((logo, i) => (
        <li
          key={i}
          className="flex items-center text-slate-400 grayscale transition duration-300 hover:text-brand-500 hover:grayscale-0 dark:text-slate-500"
        >
          {logo.svg}
        </li>
      ))}
    </ul>
  )
}

export function LogoMarquee() {
  const { t } = useLanguage()
  return (
    <section className="border-y border-slate-200/60 bg-white py-10 dark:border-slate-800/60 dark:bg-slate-950">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
        {t('logos.title')}
      </p>

      {/* Fade edges + moving track */}
      <div className="marquee group relative overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <LogoRow />
          {/* duplicate for seamless loop */}
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  )
}
