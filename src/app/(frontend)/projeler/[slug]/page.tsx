import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const projectTypes: Record<string, string> = {
  residential: 'Konut',
  office: 'Ofis',
  commercial: 'Ticari',
  other: 'Diğer',
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
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

  const project = docs[0]

  if (!project) notFound()

  const cover =
    typeof project.cover === 'object' && project.cover !== null
      ? project.cover
      : null

  const coverURL = cover?.sizes?.large?.url || cover?.url

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-12">
      <nav
        aria-label="Sayfa yolu"
        className="flex flex-wrap gap-3 border-b border-[#d9ddd5] pb-6 text-sm"
      >
        <Link href="/">Anasayfa</Link>
        <span aria-hidden="true">/</span>
        <Link href="/projeler">Projelerimiz</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className="py-12 md:py-20">
        <p className="mb-5 text-xs tracking-[0.24em] text-[#596454]">
          S-LINE MİMARLIK / PROJELER
        </p>

        <h1 className="text-4xl leading-tight tracking-[-0.04em] md:text-7xl">
          {project.title}
        </h1>

        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
          {project.location && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#596454]">
                Konum
              </dt>
              <dd className="mt-2">{project.location}</dd>
            </div>
          )}

          {project.year && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#596454]">
                Yıl
              </dt>
              <dd className="mt-2">{project.year}</dd>
            </div>
          )}

          {project.projectType && (
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#596454]">
                Proje türü
              </dt>
              <dd className="mt-2">
                {projectTypes[project.projectType] || project.projectType}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {coverURL && (
        <div className="relative aspect-[4/3] bg-[#e2e5dd] md:aspect-[16/9]">
          <Image
  src={coverURL}
  alt={cover?.alt || project.title}
  fill
  loading="eager"
  sizes="(max-width: 1440px) 100vw, 1344px"
  className="object-cover"
/>
        </div>
      )}

      <section className="grid gap-8 py-14 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-3xl tracking-tight">Proje hakkında</h2>

        <div className="project-description max-w-3xl text-[#596454]">
          <RichText data={project.description} />
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="pb-16">
          <h2 id="gallery-title" className="mb-8 text-3xl tracking-tight">
            Projeden detaylar
          </h2>

          <div className="grid items-start gap-8 md:grid-cols-2">
            {project.gallery.map((item, index) => {
              const image =
                typeof item.image === 'object' && item.image !== null
                  ? item.image
                  : null

              const imageURL = image?.sizes?.large?.url || image?.url

              if (!imageURL) return null

              return (
                <figure key={item.id || index}>
                  <Image
                    src={imageURL}
                    alt={image?.alt || `${project.title} — detay ${index + 1}`}
                    width={image?.sizes?.large?.width || image?.width || 1200}
                    height={image?.sizes?.large?.height || image?.height || 800}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="h-auto w-full"
                  />

                  {item.caption && (
                    <figcaption className="mt-3 text-sm text-[#596454]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </section>
      )}

      <footer className="border-t border-[#d9ddd5] py-8">
        <Link href="/" className="text-sm">
          ← Anasayfaya dön
        </Link>
      </footer>
    </main>
  )
}