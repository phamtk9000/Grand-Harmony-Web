import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'
import BridgeDivider from './BridgeDivider.jsx'

export default function Manifesto() {
  const { t } = useLang()

  return (
    <section className="section manifesto2" id="vision">
      <div className="container">
        <Reveal>
          <span className="eyebrow">
            <b className="chap">01</b>
            {t('manifesto.letterEyebrow')}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="manifesto2__statement">
            <span className="l1">{t('manifesto.line1')}</span>
            <span className="l2">{t('manifesto.line2')}</span>
          </h2>
        </Reveal>

        <div className="manifesto2__grid">
          <Reveal className="manifesto2__letter" delay={140}>
            <span className="manifesto2__quote" aria-hidden="true">&ldquo;</span>
            <p>{t('manifesto.letter1')}</p>
            <p>{t('manifesto.letter2')}</p>
            <p className="manifesto2__close">{t('manifesto.letter3')}</p>
            <div className="manifesto2__sig">
              <span className="sig__name">{t('manifesto.signature')}</span>
              <span className="sig__sub">Budapest · District IX</span>
            </div>
            <div className="manifesto2__mark">
              <BridgeDivider tone="gold" />
            </div>
          </Reveal>

          <Reveal className="manifesto2__fig" delay={220}>
            <img src="./images/svc-evening.jpg" alt="" loading="lazy" />
            <figcaption>{t('manifesto.caption1')}</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
