import type { Metadata } from 'next'
import { cache } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

const getService = cache(async (slug: string) => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'services',
    overrideAccess: false,
    depth: 1,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
  })

  return docs[0] || null
})

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) notFound()

  return {
    title: `${service.title} | S-Line Dekorasyon`,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) notFound()

  const cover =
    typeof service.cover === 'object' && service.cover !== null
      ? service.cover
      : null

  const coverURL = cover?.sizes?.large?.url || cover?.url

  const gallery = (service.gallery || []).flatMap((item) => {
    const image =
      typeof item.image === 'object' && item.image !== null
        ? item.image
        : null

    if (!image) return []

    const url = image.sizes?.large?.url || image.url

    if (!url) return []

    return [{
      id: item.id || `${image.id}`,
      url,
      alt: image.alt || `${service.title} uygulaması`,
      width: image.sizes?.large?.width || image.width || 1200,
      height: image.sizes?.large?.height || image.height || 800,
      caption: item.caption,
    }]
  })

  return (
    <main className="min-h-screen bg-[#f4f2ed] px-6 py-10 text-[#202b33] md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Sayfa yolu"
          className="mb-12 flex flex-wrap gap-3 text-sm text-[#756b5b]"
        >
          <Link href="/">Anasayfa</Link>
          <span aria-hidden="true">/</span>
          <Link href="/hizmetler">Hizmetlerimiz</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.title}</span>
        </nav>

        <header className="mb-10">
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[#817767]">
            {service.category || 'S-LINE DEKORASYON'}
          </p>
          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-7xl">
            {service.title}
          </h1>
        </header>

        {coverURL && (
  <div className="overflow-hidden rounded-[3px] border border-[#d8d0c2] bg-[#e8e4dc]">
    <Image
      src={coverURL}
      alt={cover?.alt || service.title}
      width={cover?.sizes?.large?.width || cover?.width || 1600}
      height={cover?.sizes?.large?.height || cover?.height || 900}
      loading="eager"
      sizes="(max-width: 1152px) 100vw, 1152px"
      className="h-auto max-h-[600px] w-full object-contain"
    />
  </div>
)}

        <section
          aria-labelledby="service-description"
          className="grid gap-8 py-12 md:grid-cols-[1fr_2fr] md:py-16"
        >
          <h2
            id="service-description"
            className="font-serif text-3xl"
          >
            Hizmet hakkında
          </h2>

          <div className="project-description">
            <RichText data={service.description} />
          </div>
        </section>

        {gallery.length > 0 && (
          <section aria-labelledby="gallery-heading" className="pb-16">
            <div className="mb-8 flex items-center gap-5">
              <h2
                id="gallery-heading"
                className="font-serif text-3xl md:text-4xl"
              >
                Uygulama galerisi
              </h2>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-[#d8d0c2]"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {gallery.map((photo) => (
    <figure key={photo.id}>
      <a
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${photo.alt} — büyük görseli yeni sekmede aç`}
        className="group relative block aspect-[4/3] overflow-hidden rounded-[3px] border border-[#d8d0c2] bg-[#e8e4dc]"
      >
        <Image
          src={photo.url}
          alt={photo.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain p-2"
        />

        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#142233]/85 text-white transition-colors group-hover:bg-[#142233]"
        >
          ↗
        </span>
      </a>

      {photo.caption && (
        <figcaption className="mt-3 text-sm leading-6 text-[#756b5b]">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  ))}
</div>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#d8d0c2] pt-8">
          <Link href="/hizmetler" className="text-sm">
            ← Tüm hizmetler
          </Link>

          <Link
            href="/iletisim"
            className="inline-flex items-center gap-8 rounded-[3px] bg-[#142233] px-6 py-4 text-sm text-white hover:bg-[#30415b] hover:text-white"
          >
            Bu hizmet hakkında konuşalım
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}