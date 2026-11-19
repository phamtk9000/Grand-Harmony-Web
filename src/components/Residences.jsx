import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { units, layoutLabel } from '../data.js'
import Reveal from './Reveal.jsx'

const FILTERS = [
  { key: 'all', match: () => true },
  { key: 'studio', match: (u) => u.type !== 'retail' && u.bed === 0 },
  { key: 'b1', match: (u) => u.type !== 'retail' && u.bed === 1 },
  { key: 'b2', match: (u) => u.type !== 'retail' && u.bed === 2 },
  { key: 'b3', match: (u) => u.type !== 'retail' && u.bed === 3 },
  { key: 'retail', match: (u) => u.type === 'retail' },
]

// order + labels for floor groups
const floorOrder = ['G', 1, 2, 3, 4]

// hover / expanded backdrop for each floor row
const FLOOR_IMG = {
  G: '/images/common-1.png',
  1: '/images/a-living-2.jpg',
  2: '/images/b-04.jpg',
  3: '/images/c-01.jpg',
  4: '/images/c-18.jpg',
}

export default function Residences() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(() => new Set())

  const bedWord = lang === 'vi' ? 'PN' : 'Bed'
  const bathWord = lang === 'vi' ? 'WC' : 'Bath'
  const retailWord = lang === 'vi' ? 'Thương mại' : 'Retail'

  const active = FILTERS.find((f) => f.key === filter) || FILTERS[0]

  const grouped = useMemo(() => {
    const filtered = units.filter(active.match)
    const map = new Map()
    for (const u of filtered) {
      if (!map.has(u.floor)) map.set(u.floor, [])
      map.get(u.floor).push(u)
    }
    return floorOrder.filter((f) => map.has(f)).map((f) => ({ floor: f, list: map.get(f) }))
  }, [active])

  // When a specific filter is chosen, open the floors that match so results are visible.
  useEffect(() => {
    if (filter === 'all') setOpen(new Set())
    else setOpen(new Set(grouped.map((g) => String(g.floor))))
  }, [filter, grouped])

  const toggle = (f) =>
    setOpen((prev) => {
      const nxt = new Set(prev)
      const k = String(f)
      nxt.has(k) ? nxt.delete(k) : nxt.add(k)
      return nxt
    })

  const floorName = (f) => {
    if (f === 'G') return t('residences.ground')
    return `${t('residences.floorLabel')} ${f}`
  }
  const floorTag = (f) => (f === 4 ? 'Duplex Penthouse' : f === 'G' ? 'Ground' : '')

  // "2 left" / "Sold out"; nothing when every unit on the floor is still free
  const availability = (list) => {
    const free = list.filter((u) => u.status === 'available').length
    if (free === list.length) return null
    if (free > 0) return t('residences.left')(free)
    return list.every((u) => u.status === 'sold') ? t('residences.soldOut') : t('residences.noneLeft')
  }

  const cols = t('residences.cols')
  const isEmpty = grouped.length === 0

  return (
    <section className="section section--cream" id="residences">
      <div className="container">
        <div className="res__top">
          <Reveal className="section-head">
            <span className="eyebrow"><b className="chap">05</b>{t('residences.eyebrow')}</span>
            <h2 className="section-title">{t('residences.title')}</h2>
            <p className="lede" style={{ fontSize: '1.15rem', marginTop: '1.2rem' }}>
              {t('residences.intro')}
            </p>
          </Reveal>

          <Reveal className="filters" delay={100}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter ${filter === f.key ? 'filter--active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {t(`residences.filters.${f.key}`)}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="res__wrap facc">
          {isEmpty && <p className="res__empty">{t('residences.empty')}</p>}

          {grouped.map(({ floor, list }, idx) => {
            const isOpen = open.has(String(floor))
            const panelId = `floor-panel-${floor}`
            return (
              <Reveal key={String(floor)}>
                <div className={`facc__item ${isOpen ? 'facc__item--open' : ''}`}>
                  <button
                    type="button"
                    className="facc__row"
                    onClick={() => toggle(floor)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className="facc__bg"
                      style={{ backgroundImage: `url('${FLOOR_IMG[floor] || ''}')` }}
                      aria-hidden="true"
                    />
                    <span className="facc__idx">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="facc__main">
                      <span className="facc__name">{floorName(floor)}</span>
                      <span className="facc__meta">
                        {t('residences.count')(list.length)}
                        {availability(list) && <span className="facc__left">{availability(list)}</span>}
                        {floorTag(floor) && <em className="facc__tag">{floorTag(floor)}</em>}
                      </span>
                    </span>
                    <span className="facc__arrow" aria-hidden="true">→</span>
                  </button>

                  <div id={panelId} className="facc__panel" hidden={!isOpen}>
                    <div className="facc__panel-inner">
                      <table className="res-table">
                        <thead>
                          <tr>
                            <th>{cols.code}</th>
                            <th>{cols.layout}</th>
                            <th>{cols.bed}</th>
                            <th>{cols.bath}</th>
                            <th style={{ textAlign: 'right' }}>{cols.area}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((u) => (
                            <tr key={u.code} className={u.status !== 'available' ? `res-row--${u.status}` : undefined}>
                              <td>
                                <span className="c-code">{u.name || u.code}</span>
                                {u.type === 'duplex' && (
                                  <span className="badge-duplex">Duplex</span>
                                )}
                                {u.status !== 'available' && (
                                  <span className={`badge-status badge-status--${u.status}`}>
                                    {t(`residences.status.${u.status}`)}
                                  </span>
                                )}
                                <span className="c-type">
                                  {u.type === 'retail'
                                    ? retailWord
                                    : u.type === 'duplex'
                                    ? 'Penthouse'
                                    : 'Residence'}
                                </span>
                              </td>
                              <td>{layoutLabel(u, bedWord, bathWord, retailWord)}</td>
                              <td>{u.type === 'retail' ? <span className="dash">&mdash;</span> : u.bed}</td>
                              <td>
                                {u.type === 'retail' ? (
                                  <span className="dash">&mdash;</span>
                                ) : Number.isInteger(u.bath) ? (
                                  u.bath
                                ) : (
                                  u.bath.toFixed(1)
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {u.area == null ? (
                                  <span className="dash">&mdash;</span>
                                ) : (
                                  <span className="c-area">
                                    {u.area}
                                    <span className="u">m&sup2;</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}

          {!isEmpty && <p className="res__price-note">{t('residences.priceNote')}</p>}
        </div>
      </div>
    </section>
  )
}
