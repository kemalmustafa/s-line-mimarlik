'use client'

import { useId, useRef } from 'react'
import type { ReactNode } from 'react'

export default function ReviewCarousel({
  children,
}: {
  children: ReactNode
}) {
  const track = useRef<HTMLDivElement>(null)
  const id = useId()

  function slide(direction: number) {
    const element = track.current
    if (!element) return

    const card = element.firstElementChild as HTMLElement | null
    if (!card) return

    const gap = parseFloat(getComputedStyle(element).columnGap) || 0
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduceMotion ? 'instant' : 'smooth',
    })
  }

  return (
    <div className="review-carousel">
      <div className="review-carousel__controls">
        <button
          type="button"
          aria-label="Önceki yorum"
          aria-controls={id}
          onClick={() => slide(-1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Sonraki yorum"
          aria-controls={id}
          onClick={() => slide(1)}
        >
          →
        </button>
      </div>

      <div
        id={id}
        ref={track}
        className="google-reviews__grid review-carousel__track"
        role="region"
        aria-label="Müşteri yorumları"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  )
}