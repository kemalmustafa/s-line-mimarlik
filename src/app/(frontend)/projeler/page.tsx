import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Projelerimiz | S-Line Mimarlık',
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const { page: pageParam } = await searchParams
  const requestedPage = Number(pageParam || 1)
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    depth: 1,
    limit: 12,
    page,
    sort: '-createdAt',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-[#f4f2ed] px-6 py-8 text-[#202b33] md:px-12">
      <Link href="/" className="text-sm">
        ← Anasayfa
      </Link>

      <header className="py-14 md:py-20">
        <p className="mb-5 text-xs tracking-[0.24em] text-[#596454]">
          S-LINE DEKORASYON / PORTFOLYO
        </p>
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.035em] md:text-6xl">
          Projelerimiz
        </h1>
        <p className="mt-6 max-w-xl leading-7 text-[#596454]">
          Farklı mekânlar, ihtiyaçlara özel çözümler.
          Tasarım ve uygulama çalışmalarımızı keşfedin.
        </p>
      </header>

      {result.docs.length === 0 ? (
        <div className="border-y border-[#d9ddd5] py-12">
          <p>Bu sayfada gösterilecek proje bulunmuyor.</p>
          {page > 1 && (
            <Link
              href="/projeler"
              className="mt-4 inline-block underline"
            >
              İlk sayfaya dön
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {result.docs.map((project, index) => {
            const cover =
              typeof project.cover === 'object' && project.cover !== null
                ? project.cover
                : null

            const imageURL = cover?.sizes?.large?.url || cover?.url

            return (
              <Link
                key={project.id}
                href={`/projeler/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e2e5dd]">
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      alt={cover?.alt || project.title}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#596454]">
                      Görsel hazırlanıyor
                    </div>
                  )}
                </div>

                <div className="mt-5 flex justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl leading-tight tracking-tight">
  {project.title}
</h2>
                    {(project.location || project.year) && (
                      <p className="mt-2 text-sm text-[#596454]">
                        {[project.location, project.year]
                          .filter(Boolean)
                          .join(' / ')}
                      </p>
                    )}
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {result.totalPages > 1 && (
        <nav
          aria-label="Proje sayfaları"
          className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[#d9ddd5] pt-6 text-sm"
        >
          <div>
            {result.hasPrevPage && result.prevPage && (
              <Link href={`/projeler?page=${result.prevPage}`}>
                ← Önceki
              </Link>
            )}
          </div>

          <span>
            Sayfa {result.page} / {result.totalPages}
          </span>

          <div>
            {result.hasNextPage && result.nextPage && (
              <Link href={`/projeler?page=${result.nextPage}`}>
                Sonraki →
              </Link>
            )}
          </div>
        </nav>
      )}

      <footer className="mt-16 border-t border-[#d9ddd5] py-8 text-xs text-[#596454]">
      </footer>
    </main>
  )
}