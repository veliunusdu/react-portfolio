import React from 'react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="theme-toggle">
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
