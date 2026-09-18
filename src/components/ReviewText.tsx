'use client'

import { useId, useState } from 'react'

export default function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()

  return (
    <div className="review-text">
      <blockquote
        id={id}
        className={expanded ? 'review-text__body is-expanded' : 'review-text__body'}
      >
        {text}
      </blockquote>

      <button
        type="button"
        className="review-text__toggle"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Daha az göster' : 'Devamını oku'}
      </button>
    </div>
  )
}