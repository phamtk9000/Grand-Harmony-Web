import { useLang } from '../i18n.jsx'
import { plans } from '../data.js'
import Reveal from './Reveal.jsx'

export default function FloorPlans() {
  const { t } = useLang()
  const items = t('plans.items')

  return (
    <section className="section section--cream" id="plans">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow"><b className="chap">06</b>{t('plans.eyebrow')}</span>
          <h2 className="section-title">{t('plans.title')}</h2>
        </Reveal>

        <div className="plans__grid">
          {plans.map((p, i) => (
            <Reveal className="plan" key={p.key} delay={i * 120}>
              <a className="plan__figure" href={p.pdf || p.img} target="_blank" rel="noreferrer">
                <img src={p.img} alt={items[i].t} loading="lazy" />
              </a>
              <div className="plan__meta">
                <span className="p-sub">{items[i].s}</span>
                <h3 className="p-title">{items[i].t}</h3>
                <p className="p-desc">{items[i].d}</p>
                <a className="p-view" href={p.pdf || p.img} target="_blank" rel="noreferrer">
                  {t(p.pdf ? 'plans.viewPdf' : 'plans.view')} <span className="arw">&#8594;</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="plans__note">{t('plans.note')}</p>
        </Reveal>
      </div>
    </section>
  )
}
