import React from 'react'

function Icon({ name }) {
  switch (name.toLowerCase()) {
    case 'github':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.39 7.87 10.91.576.106.785-.25.785-.556 0-.275-.01-1.005-.016-1.976-3.2.695-3.876-1.543-3.876-1.543-.523-1.33-1.277-1.684-1.277-1.684-1.044-.713.08-.699.08-.699 1.154.08 1.76 1.185 1.76 1.185 1.026 1.757 2.693 1.25 3.347.956.104-.743.402-1.25.732-1.538-2.555-.291-5.243-1.277-5.243-5.684 0-1.255.448-2.28 1.183-3.084-.119-.293-.512-1.47.113-3.064 0 0 .965-.31 3.163 1.18a11.02 11.02 0 012.878-.387c.976.004 1.96.132 2.878.387 2.197-1.49 3.16-1.18 3.16-1.18.628 1.596.235 2.771.116 3.064.737.804 1.183 1.83 1.183 3.084 0 4.42-2.693 5.389-5.255 5.673.413.356.78 1.056.78 2.128 0 1.538-.014 2.776-.014 3.154 0 .31.205.668.79.555C20.71 21.386 24 17.084 24 12c0-6.352-5.148-11.5-12-11.5z" fill="currentColor"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M20.452 20.452h-3.555v-5.568c0-1.329-.026-3.039-1.854-3.039-1.857 0-2.14 1.45-2.14 2.947v5.66H9.332V9h3.414v1.56h.049c.476-.9 1.637-1.854 3.37-1.854 3.606 0 4.272 2.373 4.272 5.456v6.29zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.995 20.452H3.679V9h3.316v11.452z" fill="currentColor"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.8a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zM18.5 6.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" fill="currentColor"/>
        </svg>
      )
    case 'email':
    case 'gmail':
      // a simple, non-branded Gmail-style envelope icon (generic)
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" opacity="0.12" />
          <path d="M3 7.5l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 16.5V7.5l8.5 6 8.5-6v9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )
    default:
      return null
  }
}

export default function SocialLinks({ links = {} }) {
  const items = Object.entries(links).filter(([, url]) => url)
  if (!items.length) return null

  return (
    <nav className="social-links" aria-label="Social links">
      {items.map(([key, url]) => {
        const k = key.toLowerCase()
        let href = url

        // For email/gmail keys, prefer opening Gmail web compose in a new tab.
        // Users can keep `site.social.email` as a plain address (me@example.com).
        if (k === 'email' || k === 'gmail') {
          const address = href.replace(/^mailto:/i, '')
          const params = new URLSearchParams({ view: 'cm', fs: '1', to: address })
          href = `https://mail.google.com/mail/?${params.toString()}`
        }

        const target = k === 'email' || k === 'gmail' ? '_blank' : '_blank'
        const rel = 'noopener noreferrer'

        return (
          <a
            key={key}
            href={href}
            target={target}
            rel={rel}
            className={`social-${k}`}
            aria-label={k === 'email' ? 'Email' : key}
          >
            <span className="sr-only">{key}</span>
            <Icon name={key} />
          </a>
        )
      })}
    </nav>
  )
}
