import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ssr-theme'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return stored === 'dark'
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light') } catch {}
  }, [dark])

  return { dark, toggle: () => setDark(d => !d) }
}
