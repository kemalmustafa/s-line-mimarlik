import type { Metadata } from 'next'
import { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import {
  ServiceGallery,
  type GalleryPhoto,
} from '@/components/ServiceGallery'

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

function getGalleryPhotos(
  images: unknown,
  fallbackAlt: string,
): GalleryPhoto[] {
  if (!Array.isArray(images)) return []

  return images.flatMap((image) => {
    if (
      typeof image !== 'object' ||
      image === null ||
      !('url' in image)
    ) {
      return []
    }

    const media = image as {
      id: number | string
      url?: string | null
      alt?: string | null
      sizes?: {
        large?: {
          url?: string | null
        }
      }
    }

    const url = media.sizes?.large?.url || media.url

    if (!url) return []

    return [
      {
        id: String(media.id),
        url,
        alt: media.alt || fallbackAlt,
      },
    ]
  })
}

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) notFound()

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

        <header className="border-b border-[#d8d0c2] pb-12 md:pb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[#817767]">
            {service.category || 'S-LINE DEKORASYON'}
          </p>

          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-7xl">
            {service.title}
          </h1>

          {service.description && (
            <div className="project-description mt-7 max-w-2xl text-[#69665f]">
              <RichText data={service.description} />
            </div>
          )}
        </header>

        <div className="divide-y divide-[#d8d0c2]">
          {(service.serviceSections || []).map((section, index) => {
            const photos = getGalleryPhotos(
              section.images,
              `${service.title} — ${section.title}`,
            )

            return (
              <section
                key={section.id || index}
                aria-labelledby={`section-${section.id || index}`}
                className="py-12 md:py-16"
              >
                <div className="flex items-start gap-5">
                  <span className="pt-2 text-xs tracking-[0.18em] text-[#a79679]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2
                      id={`section-${section.id || index}`}
                      className="font-serif text-3xl tracking-tight md:text-4xl"
                    >
                      {section.title}
                    </h2>

                    <ServiceGallery
                      heading={section.title}
                      photos={photos}
                    />
                  </div>
                </div>
              </section>
            )
          })}
        </div>

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