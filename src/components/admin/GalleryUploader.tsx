'use client'

import { useRef, useState } from 'react'
import { useForm } from '@payloadcms/ui'

export default function GalleryUploader({
  collectionSlug = 'projects',
}: {
  collectionSlug?: 'projects' | 'services'
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadingRef = useRef(false)
  const [busy, setBusy] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const { addFieldRow, getData, setModified, disabled } = useForm()

  async function uploadFiles(files: File[]) {
    if (uploadingRef.current || disabled || files.length === 0) return

    uploadingRef.current = true
    setBusy(true)
    setErrors([])

    const failures: string[] = []
    let uploaded = 0

    try {
      const title = String(getData()?.title || 'Proje')

      for (const [index, file] of files.entries()) {
        setMessage(`${index + 1} / ${files.length} fotoğraf yükleniyor…`)

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          failures.push(`${file.name}: JPEG, PNG veya WebP seçin.`)
          continue
        }

        if (file.size > 5 * 1024 * 1024) {
          failures.push(`${file.name}: 5 MB sınırını aşıyor.`)
          continue
        }

        try {
          const formData = new FormData()
          formData.append('file', file)
          formData.append(
            '_payload',
            JSON.stringify({
  alt: `${title} — uygulama fotoğrafı`,
}),
          )

          const response = await fetch('/api/media', {
            method: 'POST',
            credentials: 'same-origin',
            body: formData,
          })

          const result = await response.json()

          if (!response.ok || !result.doc?.id) {
            throw new Error(
              result.errors?.[0]?.message || 'Yükleme tamamlanamadı.',
            )
          }

          const imageID = result.doc.id

          addFieldRow({
            path: 'gallery',
            schemaPath: `${collectionSlug}.gallery`,
            subFieldState: {
              image: {
                initialValue: imageID,
                value: imageID,
                valid: true,
              },
              caption: {
                initialValue: '',
                value: '',
                valid: true,
              },
            },
          })

          setModified(true)
          uploaded += 1
        } catch (error) {
          failures.push(
            `${file.name}: ${
              error instanceof Error ? error.message : 'Yüklenemedi.'
            }`,
          )
        }
      }

      setMessage(
        uploaded > 0
          ? `${uploaded} fotoğraf eklendi. Galeriyi kaydetmek için projeyi kaydedin.`
          : 'Fotoğraf eklenemedi.',
      )
      setErrors(failures)
    } finally {
      uploadingRef.current = false
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="sline-uploader">
      <div
        className={`sline-uploader__dropzone ${
          dragging ? 'sline-uploader__dropzone--active' : ''
        }`}
        aria-busy={busy}
        onDragOver={(event) => {
          event.preventDefault()
          if (!busy && !disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          void uploadFiles(Array.from(event.dataTransfer.files))
        }}
      >
        <strong>Galeri fotoğraflarını buraya bırakın</strong>
        <p>Birden fazla fotoğraf ekleyebilirsiniz. JPEG, PNG, WebP · En fazla 5 MB/dosya</p>

        <button
          type="button"
          className="sline-action"
          disabled={busy || disabled}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Yükleniyor…' : 'Bilgisayardan seç'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          disabled={busy || disabled}
          onChange={(event) => {
            void uploadFiles(Array.from(event.target.files || []))
          }}
        />
      </div>

      <p role="status">{message}</p>

      {errors.length > 0 && (
        <ul role="alert">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}