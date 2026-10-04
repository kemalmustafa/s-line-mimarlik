'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const slides = [
  {
    image: '/api/media/file/anasayfa-kapak-1.png',
    alt: 'S-Line Dekorasyon iç mekân uygulaması',
    title: 'Yeni bir dekorasyon!',
    accent: 'Yeni bir yaşam.',
    description:
      'Yaşam alanlarınıza estetik, konfor ve işlevsellik katıyoruz. Tasarımdan uygulamaya, her detayda özen.',
  },
  {
    image: '/api/media/file/anasayfa-kapak-4.png',
    alt: 'S-Line Dekorasyon uygulama örneği',
    title: 'Size özel mekânlar.',
    accent: 'İncelikle düşünülmüş.',
    description:
      'Tarzınızı ve ihtiyaçlarınızı dinliyor, kendinizi ait hissedeceğiniz yaşam alanları tasarlıyoruz.',
  },
  {
    image: '/api/media/file/anasayfa-kapak-3.png?v=2',
    alt: 'S-Line Dekorasyon proje detayları',
    title: 'Her detayda özen.',
    accent: 'Her dokunuşta fark.',
    description:
      'Malzeme seçiminden son rötuşa kadar, estetiği titiz işçilikle buluşturuyoruz.',
  },
  
]

export default function HomeSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || focused || reducedMotion) return

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActive((current) => (current + 1) % slides.length)
      }
    }, 6000)

    return () => window.clearInterval(timer)
  }, [active, paused, focused, reducedMotion])

  const slide = slides[active]



  return (
    <section
      className="home-hero home-hero--slideshow"
      aria-label="S-Line Dekorasyon tanıtımı"
      aria-roledescription="slayt gösterisi"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      }}
    >
      <div className="hero-slider__images" aria-hidden="true">
        {slides.map((item, index) => (
          <div
            key={item.image}
            className={`hero-slider__image-layer ${
              index === active ? 'is-active' : ''
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? undefined : 'eager'}
              quality={92}
              className={`hero-slider__image hero-slider__image--${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="hero-slider__shade" />

      <div className="hero-slider__inner">
        <div className="hero-slider__content">
          <p className="hero-slider__eyebrow">S-LINE DEKORASYON</p>

          <div
            key={active}
            className="hero-slider__copy"
            role="group"
            aria-roledescription="slayt"
            aria-label={`${active + 1} / ${slides.length}`}
            aria-live="off"
          >
            <h1>
              {slide.title}
              <span>{slide.accent}</span>
            </h1>

            <p className="hero-slider__description">
              {slide.description}
            </p>
          </div>

          <div className="hero-slider__actions">
            <Link href="/iletisim" className="hero-slider__primary">
              Projenizi konuşalım <span aria-hidden="true">↗</span>
            </Link>

            <Link href="/projeler" className="hero-slider__secondary">
              Projelerimizi inceleyin <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-slider__navigation">
        <div className="hero-slider__dots">
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={index === active ? 'is-active' : ''}
              aria-label={`${index + 1}. görsel: ${item.title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span />
            </button>
          ))}
        </div>

        <div className="hero-slider__controls">
  {!reducedMotion && (
    <button
      type="button"
      className="hero-slider__pause"
      onClick={() => setPaused(!paused)}
      aria-label={
        paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi durdur'
      }
      title={paused ? 'Başlat' : 'Duraklat'}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        {paused ? (
          <path d="M4 2.5v11L13 8z" />
        ) : (
          <>
            <rect x="4" y="3" width="3" height="10" rx="0.5" />
            <rect x="9" y="3" width="3" height="10" rx="0.5" />
          </>
        )}
      </svg>
    </button>
  )}
</div>
      </div>
    </section>
  )
}