import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

const SECTIONS = ['overview', 'services', 'residences', 'gallery', 'plans', 'enquire']

export default function Header() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const targetOf = (s) => (s === 'enquire' ? '#contact' : `#${s}`)

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <a href="#top" className="header__logo" aria-label="The Grand Harmony">
          <img src="./brand/logo-gold.png" alt="The Grand Harmony Budapest" />
        </a>

        <nav className="header__nav" aria-label="Primary">
          {SECTIONS.map((s) => (
            <a key={s} href={targetOf(s)}>
              {t(`nav.${s}`)}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <a href="#contact" className="header__cta">{t('hero.cta2')}</a>
          <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
            <span className={lang === 'vi' ? 'on' : 'off'}>VI</span>
            <span className="sep">/</span>
            <span className={lang === 'en' ? 'on' : 'off'}>EN</span>
          </button>
          <button
            className="header__menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {SECTIONS.map((s) => (
          <a key={s} href={targetOf(s)} onClick={() => setMenuOpen(false)}>
            {t(`nav.${s}`)}
          </a>
        ))}
      </div>
    </>
  )
}
