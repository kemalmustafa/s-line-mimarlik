'use client'

import { useListQuery, useSelection } from '@payloadcms/ui'
import { useRef, useState } from 'react'

type DeleteResponse = {
  errors?: { message?: string }[]
}

export default function DeleteUnusedMedia() {
  const { selectedIDs, selectAll } = useSelection()
  const { query, refineListData } = useListQuery()

  const running = useRef(false)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState('')
  const [result, setResult] = useState('')
  const [details, setDetails] = useState<string[]>([])

  const allResultsSelected = selectAll === 'allAvailable'

  async function deleteUnused() {
    if (running.current || allResultsSelected || !selectedIDs.length) return

    const ids = [...selectedIDs]

    const confirmed = window.confirm(
      `${ids.length} görsel kontrol edilecek. Kullanılanlar korunacak, ` +
        'kullanılmayanlar kalıcı olarak silinecek. Devam edilsin mi?',
    )

    if (!confirmed) return

    running.current = true
    setBusy(true)
    setResult('')
    setDetails([])

    let deleted = 0
    let protectedCount = 0
    let failed = 0
    const notes: string[] = []

    try {
      // Ayrı isteklerle işlenir. Bir hata diğer silmeleri durdurmaz.
      for (const [index, id] of ids.entries()) {
        setProgress(`${index + 1} / ${ids.length} kontrol ediliyor…`)

        try {
          const response = await fetch(
            `/api/media/${encodeURIComponent(String(id))}`,
            {
              method: 'DELETE',
              credentials: 'same-origin',
              headers: {
                Accept: 'application/json',
              },
            },
          )

          if (response.ok) {
            deleted += 1
            continue
          }

          const body: DeleteResponse = await response
            .json()
            .catch(() => ({ errors: [] }))

          const protectedMessage = body.errors?.find((error) =>
            error.message?.startsWith('Görsel korunuyor:'),
          )?.message

          if (response.status === 409 && protectedMessage) {
            protectedCount += 1
            notes.push(`#${id} — ${protectedMessage}`)
          } else {
            failed += 1
            notes.push(
              `#${id} — İşlem tamamlanamadı (HTTP ${response.status}).`,
            )
          }
        } catch {
          failed += 1
          notes.push(
            `#${id} — Bağlantı kesildi; silinme durumu doğrulanamadı.`,
          )
        }
      }

      setResult(
        `${deleted} görsel silindi, ${protectedCount} görsel korundu.` +
          (failed ? ` ${failed} işlem kontrol edilmeli.` : ''),
      )

      try {
        await refineListData({ ...query })
      } catch {
        notes.push('Liste yenilenemedi. Sayfayı yenileyerek kontrol edin.')
      }

      setDetails(notes)
    } finally {
      setProgress('')
      setBusy(false)
      running.current = false
    }
  }

  return (
    <section
      aria-label="Kullanılmayan görselleri temizle"
      style={{
        marginBottom: 24,
        padding: 20,
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 8,
        background: 'var(--theme-elevation-50)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <strong style={{ fontSize: 16 }}>Görselleri düzenle</strong>

          <p style={{ margin: '8px 0 0', opacity: 0.75 }}>
            Listeden görselleri seç. Kullanılanlar korunur,
            kullanılmayanlar silinir.
          </p>
        </div>

        <button
          type="button"
          onClick={deleteUnused}
          disabled={busy || !selectedIDs.length || allResultsSelected}
          style={{
            padding: '12px 18px',
            border: 0,
            borderRadius: 6,
            background: 'var(--theme-elevation-800)',
            color: 'var(--theme-elevation-0)',
            font: 'inherit',
            fontWeight: 600,
            cursor:
              busy || !selectedIDs.length || allResultsSelected
                ? 'not-allowed'
                : 'pointer',
            opacity:
              busy || !selectedIDs.length || allResultsSelected ? 0.5 : 1,
          }}
        >
          {busy
            ? 'Kontrol ediliyor…'
            : `Kullanılmayanları sil (${selectedIDs.length})`}
        </button>
      </div>

      {allResultsSelected && (
        <p>
          Bu işlem için tüm sonuçlar yerine yalnızca mevcut sayfadaki
          görselleri seçin.
        </p>
      )}

      <div role="status" aria-live="polite">
        {progress && <p>{progress}</p>}
        {result && <p>{result}</p>}
      </div>

      {details.length > 0 && (
        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: 'pointer' }}>İşlem ayrıntıları</summary>

          <ul style={{ paddingLeft: 20 }}>
            {details.map((detail, index) => (
              <li key={index} style={{ marginTop: 8 }}>
                {detail}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}