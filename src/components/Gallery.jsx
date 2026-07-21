import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { gallery } from '../data.js'
import Reveal from './Reveal.jsx'

const CATS = ['all', 'living', 'dining', 'bedroom', 'bath', 'common']

export default function Gallery() {
  const { t } = useLang()
  const [cat, setCat] = useState('all')
  const [lightIndex, setLightIndex] = useState(null)

  const items = useMemo(
    () => (cat === 'all' ? gallery : gallery.filter((g) => g.cat === cat)),
    [cat]
  )

  const close = () => setLightIndex(null)
  const prev = () => setLightIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setLightIndex((i) => (i + 1) % items.length)

  useEffect(() => {
    if (lightIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightIndex, items.length])

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="res__top">
          <Reveal className="section-head">
            <span className="eyebrow"><b className="chap">03</b>{t('gallery.eyebrow')}</span>
            <h2 className="section-title">{t('gallery.title')}</h2>
            <p className="lede" style={{ fontSize: '1.15rem', marginTop: '1.2rem' }}>
              {t('gallery.intro')}
            </p>
          </Reveal>

          <Reveal className="filters" delay={100}>
            {CATS.map((c) => (
              <button
                key={c}
                className={`filter ${cat === c ? 'filter--active' : ''}`}
                onClick={() => setCat(c)}
                style={
                  cat === c
                    ? { background: 'var(--gold)', color: 'var(--ink)', borderColor: 'var(--gold)' }
                    : { color: 'var(--stone)', borderColor: 'var(--line-ink)' }
                }
              >
                {t(`gallery.filters.${c}`)}
              </button>
            ))}
          </Reveal>
        </div>

      </div>

      <div className="strip" role="list">
        <div className="strip__track">
          {items.map((g, i) => (
            <figure
              className="strip__item"
              role="listitem"
              key={g.src}
              onClick={() => setLightIndex(i)}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' ? setLightIndex(i) : null)}
            >
              <img src={g.src} alt="" loading="lazy" />
              <figcaption>
                <span className="si__n">{String(i + 1).padStart(2, '0')}</span>
                {g.palette} · {t(`gallery.filters.${g.cat}`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="container strip__hint" aria-hidden="true">
        {t('gallery.drag')} <span className="arw">&#8594;</span>
      </div>

      {lightIndex !== null && (
        <div className="lightbox" onClick={close}>
          <button className="lb-btn lb-close" aria-label={t('gallery.close')} onClick={close}>
            &#10005;
          </button>
          <button
            className="lb-btn lb-prev"
            aria-label={t('gallery.prev')}
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            &#8592;
          </button>
          <img src={items[lightIndex].src} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            className="lb-btn lb-next"
            aria-label={t('gallery.next')}
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            &#8594;
          </button>
          <span className="lb-count">
            {lightIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </section>
  )
}
