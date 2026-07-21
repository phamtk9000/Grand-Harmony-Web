import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

const CHAPTERS = [
  { id: 'vision', n: '01' },
  { id: 'overview', n: '02' },
  { id: 'palettes', n: '03' },
  { id: 'services', n: '04' },
  { id: 'residences', n: '05' },
  { id: 'plans', n: '06' },
  { id: 'progress', n: '07' },
  { id: 'contact', n: '08' },
]

export default function ChapterRail() {
  const { t } = useLang()
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="rail" aria-label="Chapters">
      {CHAPTERS.map(({ id, n }) => (
        <a key={id} href={`#${id}`} className={`rail__item ${active === id ? 'is-active' : ''}`}>
          <span className="rail__n">{n}</span>
          <span className="rail__label">{t(`rail.${id}`)}</span>
        </a>
      ))}
    </nav>
  )
}
