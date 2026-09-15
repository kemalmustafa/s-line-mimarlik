export const metadata = {
  title: 'İletişim | S-Line Dekorasyon',
  description:
    'Dekorasyon, yenileme ve anahtar teslim uygulama ihtiyaçlarınız için S-Line Dekorasyon ile iletişime geçin. Atakum, Samsun.',
}

const contactItems = [
  {
    number: '01',
    label: 'Bizi arayın',
    value: '0540 220 00 80',
    description: 'Projeniz hakkında konuşalım.',
    href: 'tel:+905402200080',
    external: false,
  },
  {
    number: '02',
    label: 'E-posta gönderin',
    value: 'slinedekorasyon@gmail.com',
    description: 'Planlarınızı ve sorularınızı paylaşın.',
    href: 'mailto:slinedekorasyon@gmail.com',
    external: false,
  },
  {
    number: '03',
    label: 'Bizi takip edin',
    value: '@slinedekorasyon',
    description: 'Uygulamalarımızı Instagram’da inceleyin.',
    href: 'https://www.instagram.com/slinedekorasyon/',
    external: true,
  },
  {
    number: '04',
    label: 'Konum',
    value: 'Atakum / Samsun',
    description: 'Atakum bölgesini haritada görüntüleyin.',
    href: 'https://www.google.com/maps/search/?api=1&query=Atakum%2C%20Samsun',
    external: true,
  },
]

function ContactIcon({ number }: { number: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {number === '01' && (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
      )}

      {number === '02' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}

      {number === '03' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.8"
            fill="currentColor"
            stroke="none"
          />
        </>
      )}

      {number === '04' && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}
    </svg>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-[75vh] bg-[#f4f2ed] text-[#202b33]">
      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:px-12 md:pb-20 md:pt-20">
        <div className="mb-10 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#a79679]"
          />

          <p className="text-[11px] tracking-[0.24em] text-[#817767]">
            İLETİŞİM / S-LINE DEKORASYON
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h1 className="font-serif text-5xl leading-[1.08] tracking-[-0.035em] md:text-7xl">
              Yeni bir mekân,
              <br />
              <span className="italic text-[#756b5b]">
                bir konuşmayla
                <br />
                başlar.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-8 text-[#69665f]">
              Evinizi yenilemek, çalışma alanınızı dönüştürmek
              veya yeni bir başlangıç yapmak istiyorsanız
              sizi dinlemek için buradayız.
            </p>

            <div className="mt-10 max-w-lg border-l-2 border-[#b4a386] pl-6">
              <p className="font-serif text-2xl leading-relaxed">
                Siz mekânınızı anlatın,
                <br />
                birlikte neler yapabileceğimizi konuşalım.
              </p>
            </div>
          </div>

          <div
            aria-label="İletişim bilgileri"
            className="self-start overflow-hidden rounded-[4px] border border-[#ded9cf] bg-[#fffefa] shadow-[0_12px_40px_rgba(32,43,51,0.05)]"
          >
            {contactItems.map((item) => (
              <a
                key={item.number}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-3 border-b border-[#e8e3d9] px-4 py-7 text-[#202b33] transition-colors last:border-b-0 hover:bg-[#eeebe3] hover:text-[#202b33] sm:gap-4 sm:px-6 md:px-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8d0c2] bg-[#f4f2ed] text-[#142233] transition-colors group-hover:border-[#142233] group-hover:bg-[#142233] group-hover:text-white">
                  <ContactIcon number={item.number} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#817767]">
                    {item.label}
                  </p>

                  <p className="mt-3 break-words text-base tracking-tight sm:text-lg md:text-xl">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#69665f]">
                    {item.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8d0c2] transition-colors group-hover:border-[#142233] group-hover:bg-[#142233] group-hover:text-white"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}