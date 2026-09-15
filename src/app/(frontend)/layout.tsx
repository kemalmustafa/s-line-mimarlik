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

        <footer className="border-t border-[#d9ddd5]">
          <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 px-6 py-8 text-xs text-[#596454] md:px-12">
            <span>
              © {new Date().getFullYear()} S-Line Dekorasyon
            </span>
            <span>Tasarım. Detay. Uygulama.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}