import { useLang } from '../i18n.jsx'
import BridgeDivider from './BridgeDivider.jsx'
import Reveal from './Reveal.jsx'

export default function Thanks() {
  const { t } = useLang()
  return (
    <section className="section thanks" aria-label="Thank you">
      <div className="container">
        <Reveal>
          <h2 className="thanks__title">{t('thanks.title')}</h2>
          <p className="thanks__sub">{t('thanks.sub')}</p>
          <div className="thanks__mark">
            <BridgeDivider tone="gold" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
