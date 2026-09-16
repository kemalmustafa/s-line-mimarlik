import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './styles.css'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'S-Line Mimarlık | Tasarım ve Uygulama',
  description:
    'S-Line Mimarlık: mimari tasarım, iç mekân ve uygulama projeleri.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <SiteHeader />

        {children}

        <footer className="bg-[#142233] text-[#f4f2ed]">
  <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-16">
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.28em] text-[#aebdcb]">
          S-LINE DEKORASYON
        </p>

        <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-tight md:text-5xl">
          Mekânınıza değer katan
          <br />
          detaylar.
        </h2>

        <a
          href="https://www.instagram.com/slinedekorasyon/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 border-b border-[#aebdcb]/60 pb-2 text-sm text-white transition-colors hover:border-white hover:text-white"
        >
          Instagram&apos;da takip edin
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#aebdcb]">
            İLETİŞİM
          </p>

          <div className="mt-5 flex flex-col gap-4 text-sm">
  <a
    href="tel:+905415888538"
    className="flex items-center gap-3 text-white transition-colors hover:text-[#aebdcb]"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8.01 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.9Z" />
    </svg>
    +90 541 588 85 38
  </a>

  <a
    href="mailto:slinedekorasyon@gmail.com"
    className="flex items-center gap-3 text-white transition-colors hover:text-[#aebdcb]"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
    slinedekorasyon@gmail.com
  </a>

  <a
    href="https://www.instagram.com/slinedekorasyon/"
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 text-white transition-colors hover:text-[#aebdcb]"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
    @slinedekorasyon
  </a>
</div>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#aebdcb]">
            HIZLI ERİŞİM
          </p>

          <nav
            aria-label="Footer menüsü"
            className="mt-5 flex flex-col gap-3 text-sm"
          >
            <a href="/hizmetler" className="text-white hover:text-[#aebdcb]">
              Hizmetlerimiz
            </a>
            <a href="/projeler" className="text-white hover:text-[#aebdcb]">
              Projelerimiz
            </a>
            <a href="/iletisim" className="text-white hover:text-[#aebdcb]">
              İletişim
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-[#aebdcb] sm:flex-row">
      <span>© {new Date().getFullYear()} S-Line Dekorasyon</span>
      <span>Tasarım. Detay. Uygulama.</span>
    </div>
  </div>
</footer>
      </body>
    </html>
  )
}