'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export type GalleryPhoto = {
  id: string
  url: string
  alt: string
}

export function ServiceGallery({
  heading,
  photos,
}: {
  heading: string
  photos: GalleryPhoto[]
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selected =
    selectedIndex === null ? null : photos[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((index) =>
          index === null ? null : (index + 1) % photos.length,
        )
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((index) =>
          index === null
            ? null
            : (index - 1 + photos.length) % photos.length,
        )
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [photos.length, selectedIndex])

  if (photos.length === 0) {
    return (
      <p className="mt-5 text-sm text-[#756b5b]">
        Bu bölümün fotoğrafları yakında eklenecek.
      </p>
    )
  }

  return (
    <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[3px] border border-[#d8d0c2] bg-[#e8e4dc] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#647b96]"
            aria-label={`${photo.alt} görselini büyüt`}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#142233]/85 text-xl text-white transition-colors group-hover:bg-[#142233]"
            >
              +
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${heading} görseli`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111923]/95 p-5"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-2xl text-white"
            aria-label="Büyük görseli kapat"
          >
            ×
          </button>

          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected.url}
              alt={selected.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}