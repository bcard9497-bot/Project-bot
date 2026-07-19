import { useLanguage } from '../i18n/LanguageContext'
import { TESTIMONIALS, STATS } from '../lib/testimonials'

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  const { t, language } = useLanguage()

  return (
    <section className="bg-slate-100/60 py-16 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t('testi.title')}</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">{t('testi.subtitle')}</p>
        </div>

        {/* Stats bar */}
        <div className="mb-12 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="gradient-text text-3xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label[language]}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
            >
              <Stars rating={item.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                “{item.quote[language]}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold text-white`}
                  aria-hidden="true"
                >
                  {initials(item.name)}
                </div>
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role[language]} · {item.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
