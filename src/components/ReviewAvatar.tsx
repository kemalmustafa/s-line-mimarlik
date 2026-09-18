'use client'

import { useState } from 'react'

export default function ReviewAvatar({ src }: { src?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  return (
    <span className="review-avatar" aria-hidden="true">
      {src && failedSrc !== src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={36}
          height={36}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
        </svg>
      )}
    </span>
  )
}