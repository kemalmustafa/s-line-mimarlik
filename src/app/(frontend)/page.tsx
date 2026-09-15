import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

const heroImage =
  '/api/media/file/WhatsApp%20Image%202026-09-05%20at%2018.42.12.jpeg'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    depth: 1,
    limit: 3,
    sort: '-createdAt',
    where: {
  and: [
    {
      status: {
        equals: 'published',
      },
    },
    {
      featured: {
        equals: true,
      },
    },
  ],
},
  })
  return (
    <>
      <main className="home-page">
        <section
  aria-labelledby="hero-title"
  className="home-hero"
>
  <Image
    src={heroImage}
    
    alt="Duvar çıtaları ve ahşap zemin kullanılan S-Line iç mekân uygulaması"
    fill
    loading="eager"
    sizes="100vw"
    className="home-hero__image"
  />

  <div
    aria-hidden="true"
    className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/10"
  />

  <div className="home-hero__content">
    <p className="mb-7 text-xs tracking-[0.25em] text-white/85">
      S-LINE DEKORASYON
    </p>

    <h1
      id="hero-title"
      className="font-serif text-5xl leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
    >
      Yeni bir
      <br />
      dekorasyon!
      <br />
      <span className="font-normal italic">Yeni bir yaşam.</span>
    </h1>

    <p className="mt-7 max-w-md text-base leading-7 text-white/90">
      Yaşam alanlarınıza estetik, konfor ve işlevsellik katıyoruz.
      Tasarımdan tadilata, her detayda özenli uygulamalar.
    </p>

    <div className="mt-9 flex flex-wrap gap-4">
      <Link
        href="/iletisim"
        className="inline-flex items-center gap-7 rounded-sm border border-[#102033] bg-[#102033] px-6 py-4 text-sm text-white hover:bg-[#263d56] hover:text-white"
      >
        Projenizi konuşalım <span aria-hidden="true">↗</span>
      </Link>

      <Link
        href="/projeler"
        className="inline-flex items-center gap-7 rounded-sm border border-white/60 bg-black/10 px-6 py-4 text-sm text-white hover:bg-white/15 hover:text-white"
      >
        Projelerimizi inceleyin <span aria-hidden="true">↗</span>
      </Link>
    </div>
  </div>

  
</section>
<section
  aria-label="Çalışma yaklaşımımız"
  className="grid grid-cols-2 border-b border-[#ded9cf] bg-[#f0eee8] lg:grid-cols-4"
>
  {[
    ['', 'Mekâna özel tasarım', 'İhtiyaçlarınıza uygun çözümler.'],
    ['', 'Özenli uygulama', 'Malzemeden son dokunuşa kadar.'],
    ['', 'Anahtar teslim', 'Planlamadan uygulamaya bir bütün.'],
    ['', 'Birlikte şekillenen', 'Beklentilerinizi dinleyen yaklaşım.'],
  ].map(([number, title, description], index) => (
    <div
      key={number}
      className={[
        'px-5 py-6 md:px-8 md:py-8',
        index < 2 ? 'border-b border-[#ded9cf] lg:border-b-0' : '',
        index % 2 === 0 ? 'border-r border-[#ded9cf]' : '',
        index === 1 ? 'lg:border-r lg:border-[#ded9cf]' : '',
      ].join(' ')}
    >
      <span className="mb-3 block text-[10px] tracking-[0.18em] text-[#817767]">
        {number}
      </span>

      <h2 className="text-sm font-semibold leading-5 text-[#142233]">
        {title}
      </h2>

      <p className="mt-2 text-xs leading-5 text-[#69665f]">
        {description}
      </p>
    </div>
  ))}
</section>
        <section
  aria-labelledby="projects-title"
  className="px-6 py-14 md:px-12 md:py-20"
>
  <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
    <div>
      <p className="mb-4 text-xs tracking-[0.24em] text-[#596454]">
        TASARIMDAN UYGULAMAYA
      </p>
      <h2
        id="projects-title"
        className="font-serif text-4xl tracking-tight md:text-5xl"
      >
        Öne çıkan projeler
      </h2>
    </div>

    <Link
      href="/projeler"
      className="border-b border-[#28352b] pb-2 text-sm"
    >
      Tüm projeler ↗
    </Link>
  </div>

  {projects.length === 0 ? (
    <p className="text-[#596454]">
      Projelerimiz yakında burada.
    </p>
  ) : (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
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
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#596454]">
                  Görsel hazırlanıyor
                </div>
              )}
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl">{project.title}</h3>
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
</section>
      </main>

      
    </>
  )
}