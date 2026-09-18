import { Suspense } from 'react'
import HomeSlider from '../../components/HomeSlider'
import GoogleReviews from '../../components/GoogleReviews'

export default function HomePage() {
  return (
    <main className="home-page">
      <HomeSlider />

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

      <Suspense fallback={null}>
        <GoogleReviews />
      </Suspense>
    </main>
  )
}