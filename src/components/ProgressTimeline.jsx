import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function ProgressTimeline() {
  const { t } = useLang()
  const steps = t('progress.steps')

  return (
    <section className="section prog" id="progress">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <b className="chap">07</b>
            {t('progress.eyebrow')}
          </span>
          <h2 className="section-title">{t('progress.title')}</h2>
        </Reveal>

        <div className="prog__wrap" role="list">
          <div className="prog__axis" aria-hidden="true" />
          {steps.map((st, i) => (
            <Reveal
              className={`prog__item ${i % 2 === 0 ? 'prog__item--below' : 'prog__item--above'}`}
              role="listitem"
              key={st.n}
              delay={i * 140}
            >
              <span className="prog__dot" aria-hidden="true" />
              <div className="prog__card">
                <h3 className="prog__t">
                  <span className="prog__n">{st.n}</span> | {st.t}
                </h3>
                <span className="prog__s">{st.s}</span>
                <p className="prog__d">{st.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
