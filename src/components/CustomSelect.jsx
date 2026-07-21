import { useState, useRef, useEffect } from 'react'

/**
 * Custom, brand-styled select. Keyboard-accessible, closes on outside click / Esc.
 * options: [{ value, label }]
 */
export default function CustomSelect({ id, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const current = options.find((o) => o.value === value)

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (open) {
      const i = options.findIndex((o) => o.value === value)
      setActive(i < 0 ? 0 : i)
    }
  }, [open, value, options])

  const choose = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) return setOpen(true)
      setActive((a) => Math.min(a + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) choose(options[active].value)
      else setOpen(true)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className={`cselect ${open ? 'is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="cselect__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className={`cselect__value ${current ? '' : 'is-placeholder'}`}>
          {current ? current.label : placeholder}
        </span>
        <span className="cselect__chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="cselect__menu" role="listbox" tabIndex={-1}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`cselect__opt ${o.value === value ? 'is-selected' : ''} ${
                i === active ? 'is-active' : ''
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                choose(o.value)
              }}
            >
              <span className="cselect__dot" aria-hidden="true" />
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
