import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Services() {
  const { t } = useLang()
  const essential = t('services.essential')
  const groups = t('services.groups')
  const groupImg = ['./images/svc-towels.jpg', './images/fixing.png', './images/svc-tea.jpg']

  return (
    <section className="section svc" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <b className="chap">04</b>
            {t('services.eyebrow')}
          </span>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="lede">{t('services.intro')}</p>
        </Reveal>

        {/* editorial lead — lifestyle collage + note */}
        <div className="svc__lead">
          <Reveal className="svc__hero">
            <img src="./images/svc-stairs.jpg" alt="" loading="lazy" />
          </Reveal>
          <div className="svc__leadside">
            <Reveal className="svc__note" delay={120}>
              <p>{t('services.note')}</p>
              <span className="svc__by">True Estate Kft · Grand Harmony</span>
            </Reveal>
            <Reveal className="svc__minis" delay={200}>
              <img src="./images/svc-champagne.jpg" alt="" loading="lazy" />
              <img src="./images/svc-flowers.jpg" alt="" loading="lazy" />
            </Reveal>
          </div>
        </div>

        {/* essential services — wide two-column card with porter image */}
        <Reveal className="svc__essential" delay={80}>
          <div className="svc__eimg">
            <img src="./images/svc-porter.jpg" alt="" loading="lazy" />
          </div>
          <div className="svc__ebody">
            <h3 className="svc__gtitle">{t('services.essentialTitle')}</h3>
            <ul className="svc__list svc__list--2col">
              {essential.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* on-request groups */}
        <Reveal delay={60}>
          <h3 className="svc__ontitle">{t('services.onRequestTitle')}</h3>
        </Reveal>
        <div className="svc__groups">
          {groups.map((g, i) => (
            <Reveal className="svc__group" key={g.t} delay={i * 100}>
              {groupImg[i] && (
                <div className="svc__gimg">
                  <img src={groupImg[i]} alt="" loading="lazy" />
                </div>
              )}
              <h4 className="svc__gtitle">{g.t}</h4>
              <ul className="svc__list">
                {g.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
