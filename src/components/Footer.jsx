import { useLang } from '../i18n.jsx'

const EXPLORE = [
  { id: 'vision', key: 'rail.vision' },
  { id: 'overview', key: 'rail.overview' },
  { id: 'palettes', key: 'rail.palettes' },
  { id: 'services', key: 'nav.services' },
  { id: 'residences', key: 'rail.residences' },
  { id: 'plans', key: 'rail.plans' },
]

export default function Footer() {
  const { t } = useLang()
  const proj = t('footer.projectFacts')
  const year = new Date().getFullYear()

  return (
    <footer className="footer2">
      <div className="container">
        <h2 className="footer2__statement">{t('footer.statement')}</h2>

        <div className="footer2__grid">
          <div className="footer2__brand">
            <figure className="footer2__fig">
              <img src="./images/d-exterior.jpeg" alt="" loading="lazy" />
            </figure>
            <a href="#contact" className="btn footer2__cta">
              {t('hero.cta2')} <span className="arw">&#8594;</span>
            </a>
          </div>

          <div className="footer2__cols">
            <div className="fcol">
              <div className="fcol__label">{t('footer.colExplore')}</div>
              <ul>
                {EXPLORE.map((x) => (
                  <li key={x.id}>
                    <a href={`#${x.id}`}>{t(x.key)}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fcol">
              <div className="fcol__label">{t('footer.colProject')}</div>
              <ul>
                {proj.map((p) => (
                  <li key={p.l}>
                    <span className="fcol__k">{p.l}</span>
                    {p.v}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fcol">
              <div className="fcol__label">{t('footer.colContact')}</div>
              <ul>
                <li><a href="mailto:sales@thegrandharmony.com">sales@thegrandharmony.com</a></li>
                <li><a href="tel:+84925943688">+36 20 324 7964</a></li>
                <li><a href="tel:+36203664873">+36 20 366 4873</a></li>
                <li>
                  <a href="https://trueestate.com.vn" target="_blank" rel="noreferrer">
                    trueestate.com.vn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer2__legal">
          <p className="footer2__disclaimer">{t('footer.disclaimer')}</p>
          <p className="footer2__rights">
            &copy; {year} The Grand Harmony · {t('footer.marketed')} · {t('footer.rights')}
          </p>
        </div>
      </div>

      <div className="footer2__wordmark" aria-hidden="true">
        Grand&nbsp;Harmony
      </div>
    </footer>
  )
}
