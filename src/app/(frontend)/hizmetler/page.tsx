import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Hizmetlerimiz | S-Line Dekorasyon',
  description:
    'İç mimari tasarım, dekorasyon ve uygulama hizmetlerimizi keşfedin.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    overrideAccess: false,
    depth: 1,
    limit: 100,
    sort: ['sortOrder', 'title'],
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return (
    <main className="min-h-screen bg-[#f4f2ed] px-6 py-14 text-[#202b33] md:px-12 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-12 md:mb-16">
          <div className="mb-6 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[#a79679]"
            />
            <p className="text-[11px] tracking-[0.22em] text-[#817767]">
              S-LINE DEKORASYON
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-tight tracking-[-0.035em] md:text-6xl">
                Hizmetlerimiz
              </h1>
              <p className="mt-4 font-serif text-2xl italic text-[#756b5b]">
                Mekânınıza değer katan detaylar.
              </p>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#69665f]">
              Tasarımdan uygulamaya, yaşam alanınızı bir bütün
              olarak ele alıyoruz. Hizmet alanımızı keşfedin.
            </p>
          </div>
        </header>

        {result.docs.length === 0 ? (
          <div className="border-y border-[#d8d0c2] py-10">
            <p>Bu sayfada gösterilecek hizmet bulunmuyor.</p>
          </div>
        ) : (
          <section
            aria-label="Sunduğumuz hizmetler"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {result.docs.map((service, index) => {
              const number = index + 1
              const sectionCount = service.serviceSections?.length || 0

              const cover =
                typeof service.cover === 'object' &&
                service.cover !== null
                  ? service.cover
                  : null

              const imageURL =
                cover?.sizes?.large?.url || cover?.url

              return (
                <Link
                  key={service.id}
                  href={`/hizmetler/${service.slug}`}
                  aria-label={`${service.title} detaylarını inceleyin`}
                  className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-[#ded9cf] bg-[#fffefa] text-[#202b33] shadow-[0_8px_28px_rgba(32,43,51,0.05)] transition-all duration-500 hover:-translate-y-1 hover:text-[#202b33] hover:shadow-[0_18px_45px_rgba(32,43,51,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ded9cf]">
                    {imageURL ? (
                      <Image
                        src={imageURL}
                        alt={cover?.alt || service.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#e7e2d9] text-xs tracking-[0.12em] text-[#817767]">
                        S-LINE DEKORASYON
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                    />

                    <span className="absolute left-5 top-5 border border-white/50 bg-black/25 px-3 py-2 text-[10px] tracking-[0.18em] text-white backdrop-blur-sm">
                      {String(number).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <span
                      aria-hidden="true"
                      className="mb-6 block h-px w-10 bg-[#a79679] transition-[width] duration-500 group-hover:w-20"
                    />

                    <div className="mt-auto flex items-end justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.03em]">
                          {service.title}
                        </h2>

                        <p className="mt-4 text-xs tracking-[0.08em] text-[#756b5b]">
                          {sectionCount > 0
                            ? `${sectionCount} ALT BAŞLIK`
                            : 'DETAYLARI KEŞFET'}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8d0c2] text-xl transition-colors duration-300 group-hover:border-[#142233] group-hover:bg-[#142233] group-hover:text-white"
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </section>
        )}

        <section className="mt-16 border-t border-[#d8d0c2] pt-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                Birlikte başlayalım.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#69665f]">
                Mekânınızı ve ihtiyaçlarınızı bizimle paylaşın.
              </p>
            </div>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-8 self-start rounded-[3px] bg-[#142233] px-6 py-4 text-sm text-white hover:bg-[#30415b] hover:text-white"
            >
              İletişime geçin <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}