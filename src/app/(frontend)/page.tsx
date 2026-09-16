import Image from 'next/image'
import Link from 'next/link'

const heroImage =
  '/api/media/file/anasayfa-kapak.png'

export default function HomePage() {
  return (
    <main className="home-page">
      <section
        aria-labelledby="hero-title"
        className="home-hero home-hero--editorial"
      >
        <div className="home-hero__visual">
          <Image
            src={heroImage}
            alt="S-Line Dekorasyon iç mekân uygulaması"
            fill
            priority
            quality={92}
            sizes="(max-width: 767px) 100vw, 58vw"
            className="home-hero__image"
          />
        </div>

        <div className="home-hero__panel">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">
              S-LINE DEKORASYON
            </p>

            <h1 id="hero-title">
              Yeni bir
              <br />
              dekorasyon!
              <br />
              <span>Yeni bir yaşam.</span>
            </h1>

            <p className="home-hero__description">
              Yaşam alanlarınıza estetik, konfor ve işlevsellik
              katıyoruz. Tasarımdan tadilata, her detayda özenli
              uygulamalar.
            </p>

            <div className="home-hero__actions">
              <Link
                href="/iletisim"
                className="home-hero__primary"
              >
                Projenizi konuşalım <span aria-hidden="true">↗</span>
              </Link>

              <Link
                href="/projeler"
                className="home-hero__secondary"
              >
                Projelerimizi inceleyin
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
  className="home-stats"
  aria-label="S-Line Dekorasyon deneyim ve proje bilgileri"
>
  <div className="home-stats__inner">
    <article className="home-stats__item">
      <strong>8+</strong>
      <span>Yıl deneyim</span>
    </article>

    <article className="home-stats__item">
      <strong>100+</strong>
      <span>Proje teslimi</span>
    </article>

    <article className="home-stats__item">
      <strong>%100</strong>
      <span>Müşteri memnuniyeti</span>
    </article>
  </div>
</section>
    </main>
  )
}