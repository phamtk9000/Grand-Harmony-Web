import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'
import BridgeDivider from './BridgeDivider.jsx'

const MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=Berzenczey+utca+9,+1094+Budapest,+Hungary'
const MAPS_EMBED =
  'https://www.google.com/maps?q=Berzenczey+utca+9,+1094+Budapest,+Hungary&output=embed'

export default function Overview() {
  const { t } = useLang()
  const times = t('overview.times')
  const facts = t('overview.facts')
  const nearby = t('location.nearby')

  return (
    <section className="section section--cream building" id="overview">
      <div className="container">
        <div className="overview__grid">
          <Reveal className="section-head">
            <span className="eyebrow">
              <b className="chap">02</b>
              {t('overview.eyebrow')}
            </span>
            <h2 className="section-title">{t('overview.title')}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="overview__body">{t('overview.body')}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="building__panel" delay={80}>
        <div
          className="building__img"
          style={{ backgroundImage: 'url(./images/d-exterior.jpeg)' }}
          role="img"
          aria-label="Berzenczey utca 9 street elevation"
        />
        <div className="building__plate">
          <span className="bp__addr">Berzenczey utca 9</span>
          <span className="bp__sub">1094 Budapest · Ferencv&aacute;ros</span>
        </div>
      </Reveal>

      <div className="container">
        {/* project fact sheet */}
        <Reveal className="facts" delay={60}>
          <h3 className="facts__title">{t('overview.factsTitle')}</h3>
          <dl className="facts__grid">
            {facts.map((f) => (
              <div className="fact" key={f.l}>
                <dt>{f.l}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* location narrative + travel times */}
        <div className="locintro">
          <Reveal className="locintro__text" delay={60}>
            <h3 className="locintro__title">{t('overview.locTitle')}</h3>
            <p>{t('overview.locIntro')}</p>
            <div className="locintro__mark">
              <BridgeDivider tone="ink" />
            </div>
          </Reveal>

          <Reveal className="locintro__times" delay={160}>
            {times.map((x, i) => (
              <div className="ti" key={i}>
                <div className="ti__num">
                  <span className="ti__n">{x.n}</span>
                  <span className="ti__u">{t('overview.minutes')}</span>
                </div>
                <span className="ti__l">{x.l}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* map + neighbourhood (merged from Location) */}
        <div className="locmap">
          <Reveal className="locmap__aside" delay={60}>
            <div className="loc__meta">
              <div className="m-row">
                <div className="m-label">{t('location.addressLabel')}</div>
                <div className="m-value">{t('location.address')}</div>
              </div>
              <div className="m-row">
                <div className="m-label">{t('location.districtLabel')}</div>
                <div className="m-value">{t('location.district')}</div>
              </div>
            </div>
            <div className="loc__nearby">
              <div className="n-label">{t('location.nearbyLabel')}</div>
              <ul>
                {nearby.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="loc__map" delay={140}>
            <iframe
              title="The Grand Harmony — Berzenczey utca 9, Budapest"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="loc__map-card">
              <div className="mc-place">The Grand Harmony</div>
              <div className="mc-addr">{t('location.address')}</div>
              <a className="mc-link" href={MAPS_LINK} target="_blank" rel="noreferrer">
                {t('location.map')} <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
