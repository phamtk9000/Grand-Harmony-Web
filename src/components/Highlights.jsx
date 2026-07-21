import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'
import BuildingDrawing from './BuildingDrawing.jsx'

export default function Highlights() {
  const { t } = useLang()
  const items = t('highlights.items')

  return (
    <section className="section std" id="standard">
      <div className="container">
        <div className="std__grid">
          <Reveal className="section-head std__head">
            <span className="eyebrow">
              <b className="chap">&mdash;</b>
              {t('highlights.eyebrow')}
            </span>
            <h2 className="section-title">{t('highlights.title')}</h2>
            <div className="std__building">
              <BuildingDrawing tone="gold" />
              <span className="std__building-cap">Berzenczey utca 9 &middot; Budapest IX</span>
            </div>
          </Reveal>

          <div className="std__list">
            {items.map((it, i) => (
              <Reveal className="std__row" key={i} delay={(i % 3) * 80}>
                <span className="std__idx">{String(i + 1).padStart(2, '0')}</span>
                <div className="std__body">
                  <h3 className="std__title">{it.t}</h3>
                  <p className="std__desc">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
