import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

const SPREADS = [
  { letter: 'A', main: './images/a-living.jpg', side: './images/a-dining.jpg' },
  { letter: 'B', main: './images/b-05.jpg', side: './images/b-01.jpg' },
  { letter: 'C', main: './images/c-01.jpg', side: './images/c-04.jpg' },
]

export default function Palettes() {
  const { t } = useLang()
  const items = t('palettes.items')

  return (
    <section className="section palettes" id="palettes">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <b className="chap">03</b>
            {t('palettes.eyebrow')}
          </span>
          <h2 className="section-title">{t('palettes.title')}</h2>
          <p className="lede">{t('palettes.intro')}</p>
        </Reveal>
      </div>

      <div className="palettes__spreads">
        {SPREADS.map((s, i) => {
          const it = items[i]
          return (
            <div className={`spread ${i % 2 === 1 ? 'spread--flip' : ''}`} key={s.letter}>
              <Reveal className="spread__main">
                <img src={s.main} alt={it.name} loading="lazy" />
              </Reveal>

              <div className="spread__side">
                <Reveal className="spread__text" delay={120}>
                  <span className="spread__letter" aria-hidden="true">
                    {s.letter}
                  </span>
                  <h3 className="spread__name">{it.name}</h3>
                  <p className="spread__desc">{it.desc}</p>
                  <ul className="spread__materials">
                    {it.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <a className="spread__link" href="#gallery">
                    {t('palettes.viewGallery')} <span className="arw">&#8594;</span>
                  </a>
                </Reveal>
                <Reveal className="spread__img2" delay={200}>
                  <img src={s.side} alt="" loading="lazy" />
                </Reveal>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
