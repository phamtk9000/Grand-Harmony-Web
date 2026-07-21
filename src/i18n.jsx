import { createContext, useContext, useEffect, useState } from 'react'
import { en } from './content/en.js'
import { vi } from './content/vi.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'tgh-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'vi'
    return window.localStorage.getItem(STORAGE_KEY) || 'vi'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'vi' ? 'en' : 'vi'))
  const t = (path) => resolve(translations[lang], path) ?? resolve(translations.en, path) ?? path

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

export const translations = { en, vi }
