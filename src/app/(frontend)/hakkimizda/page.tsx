import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Hakkımızda | S-Line Dekorasyon',
  description:
    'S-Line Dekorasyon’un tasarım, yenileme ve uygulama yaklaşımını keşfedin.',
}

const principles = [
  {
    number: '01',
    title: 'Mekânı anlamak',
    text:
      'Her projeyi kendi ihtiyaçları doğrultusunda ele alıyoruz. Kullanım amacını, günlük alışkanlıkları ve estetik beklentileri değerlendirerek mekânın karakterine uygun çözümler geliştiriyoruz.',
  },
  {
    number: '02',
    title: 'Bütünü tasarlamak',
    text:
      'Tasarım, malzeme ve uygulamayı birbirinden ayrı düşünmüyoruz. Evlerden ofislere, mağazalardan ticari alanlara kadar her projede işlevselliği ve görsel uyumu birlikte gözetiyoruz.',
  },
  {
    number: '03',
    title: 'Detaylara özen göstermek',
    text:
      'Malzeme seçiminden yüzey hazırlığına, uygulamadan son dokunuşlara kadar işçilik kalitesini ön planda tutuyoruz. Uzun ömürlü ve kullanışlı mekânlar oluşturmayı amaçlıyoruz.',
  },
]

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'media',
    overrideAccess: false,
    depth: 0,
    limit: 1,
    pagination: false,
    where: { filename: { equals: 'hakkimizda.jpeg' } },
    select: { filename: true, updatedAt: true },
  })
  const logo = docs[0]
  // The version changes only when this media record is updated.
  const logoSrc = logo?.filename
    ? `/api/media/file/${encodeURIComponent(logo.filename)}?v=${encodeURIComponent(logo.updatedAt)}`
    : '/api/media/file/hakkimizda.jpeg'

  return (
    <main className="bg-[#f4f2ed] text-[#202b33]">
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="mb-7 text-[11px] tracking-[0.24em] text-[#817767]">
            HAKKIMIZDA / S-LINE DEKORASYON
          </p>

          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl">
            Mekânlara değer,
            <br />
            <span className="italic text-[#756b5b]">
              yaşama dokunuş.
            </span>
          </h1>

          <div className="mt-8 space-y-5 text-base leading-8 text-[#69665f]">
            <p>
              S-Line Dekorasyon olarak yaşam ve çalışma
               alanlarını estetik, fonksiyonel ve kaliteli
               mekânlara dönüştürüyoruz.
            </p>

            <p>
              Dekorasyon, yenileme, iç mimari ve anahtar
              teslim uygulama süreçlerinde; tasarım
              anlayışımızı kaliteli malzeme ve titiz
              işçilikle bir araya getiriyoruz.
            </p>

            <p>
              Evlerden ofislere, mağazalardan ticari alanlara
              kadar her projeyi kendi ihtiyaçları doğrultusunda
              ele alıyor, mekânın karakterine uygun çözümler
              geliştiriyoruz.
            </p>
            <p>
              Amacımız yalnızca bir alanı yenilemek değil;
              kullanışlı, modern ve size ait hissettiren
              yaşam alanları oluşturmak.
            </p>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[3px] bg-[#ded9cf] p-8">
  <Image
    src={logoSrc}
    alt="S-Line Dekorasyon logosu"
    fill
    loading="eager"
    sizes="280px"
    className="object-contain"
  />
</div>
      </section>

      <section
        aria-labelledby="purpose-title"
        className="bg-[#142233] px-6 py-14 text-white md:px-12 md:py-20"
      >
        <div className="mx-auto grid max-w-[1344px] gap-8 lg:grid-cols-2 lg:gap-16">
          <h2
            id="purpose-title"
            className="font-serif text-4xl leading-tight md:text-5xl"
          >
            Yalnızca yenilemek değil,
            <br />
            <span className="italic text-[#cbbb9e]">
              size ait hissettirmek.
            </span>
          </h2>

          <p className="self-center text-base leading-8 text-white/80">
            Amacımız; doğru tasarım, kaliteli malzeme ve titiz
            işçiliği bir araya getirerek ihtiyaçlarınıza uygun,
            uzun ömürlü çözümler sunmak. Kullanışlı, modern ve
            içinde kendinizi iyi hissettiğiniz yaşam alanları
            oluşturmak.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="approach-title"
        className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20"
      >
        <p className="mb-5 text-[11px] tracking-[0.24em] text-[#817767]">
          ÇALIŞMA YAKLAŞIMIMIZ
        </p>

        <h2
          id="approach-title"
          className="font-serif text-4xl tracking-tight md:text-5xl"
        >
          Kalite, detaylarda başlar.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.number}
              className="border-t border-[#d8d0c2] pt-6"
            >
              <span className="font-serif text-2xl italic text-[#a79679]">
                / {item.number}
              </span>

              <h3 className="mb-4 mt-6 font-serif text-2xl">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-[#69665f]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-[#d8d0c2] pt-8">
          <p className="font-serif text-2xl">
            Mekânınızın yeni hâlini birlikte düşünelim.
          </p>

          <Link
            href="/iletisim"
            className="inline-flex items-center gap-8 rounded-[3px] bg-[#142233] px-6 py-4 text-sm text-white hover:bg-[#30415b] hover:text-white"
          >
            İletişime geçin <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
