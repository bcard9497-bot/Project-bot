import { useLanguage } from '../i18n/LanguageContext'
import { LOGOS_ROW_1, LOGOS_ROW_2 } from '../lib/logos'

function LogoRow({ logos, ariaHidden }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo, i) => (
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

// A single infinite-scrolling track. direction: 'left' | 'right'
function MarqueeTrack({ logos, direction }) {
  const animClass = direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'
  return (
    <div className="marquee group relative overflow-hidden">
      <div className={`flex w-max ${animClass} group-hover:[animation-play-state:paused]`}>
        <LogoRow logos={logos} />
        {/* duplicate for seamless loop */}
        <LogoRow logos={logos} ariaHidden />
      </div>
    </div>
  )
}

export function LogoMarquee() {
  const { t } = useLanguage()
  return (
    <section className="border-y border-slate-200/60 bg-white py-10 dark:border-slate-800/60 dark:bg-slate-950">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
        {t('logos.title')}
      </p>

      <div className="flex flex-col gap-6">
        {/* Row 1 moves left, Row 2 moves right */}
        <MarqueeTrack logos={LOGOS_ROW_1} direction="left" />
        <MarqueeTrack logos={LOGOS_ROW_2} direction="right" />
      </div>
    </section>
  )
}
