import { useLang } from '../i18n.jsx'

export default function Hero() {
  const { t } = useLang()
  const facts = t('hero.facts')

  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ backgroundImage: 'url(./images/hero.png)' }} />
      <div className="hero__scrim" />

      <div className="hero__inner container">
        <span className="hero__place rise r-1">{t('hero.place')}</span>
        <h1 className="hero__title">
          <span className="hero__line rise r-2">The Grand</span>
          <span className="hero__line hero__line--em rise r-3">Harmony</span>
        </h1>
        <p className="hero__lede rise r-4">{t('hero.lead')}</p>
        <div className="hero__cta rise r-5">
          <a href="#residences" className="btn">
            {t('hero.cta1')} <span className="arw">&#8594;</span>
          </a>
          <a href="#contact" className="btn btn--ghost">
            {t('hero.cta2')}
          </a>
        </div>
      </div>

      <div className="hero__plate">
        {facts.map((f, i) => (
          <div className="hp rise" style={{ animationDelay: `${1.15 + i * 0.3}s` }} key={i}>
            <span className="hp__v">{f.v}</span>
            <span className="hp__l">{f.l}</span>
          </div>
        ))}
        <div
          className="hero__scroll rise"
          style={{ animationDelay: `${1.15 + facts.length * 0.3}s` }}
          aria-hidden="true"
        >
          {t('hero.scroll')}
          <span className="line" />
        </div>
      </div>
    </section>
  )
}
