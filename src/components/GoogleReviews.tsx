import 'server-only'
import Image from 'next/image'
import ReviewText from './ReviewText'
import ReviewAvatar from './ReviewAvatar'
import ReviewCarousel from './ReviewCarousel'

type Review = {
  name: string
  rating?: number
  originalText?: { text: string }
  text?: { text: string }
  relativePublishTimeDescription?: string
  googleMapsUri?: string
  authorAttribution: {
    displayName: string
    uri?: string
    photoUri?: string
  }
}

type Place = {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: Review[]
}

async function getReviews(): Promise<Place | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!key || !placeId) return null

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=tr`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask':
            'rating,userRatingCount,googleMapsUri,reviews',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      },
    )

    if (!response.ok) {
      console.error('Google yorumları alınamadı:', response.status)
      return null
    }

    return (await response.json()) as Place
  } catch {
    console.error('Google yorum bağlantısı tamamlanamadı.')
    return null
  }
}

export default async function GoogleReviews() {
  const place = await getReviews()

  if (!place?.reviews?.length) return null

  return (
    <section className="google-reviews" aria-labelledby="reviews-title">
      <div className="google-reviews__inner">
        <div className="google-reviews__heading">
          <div>
            <p className="google-reviews__eyebrow">MÜŞTERİ DENEYİMLERİ</p>
            <h2 id="reviews-title">
              Birlikte güzelleşen <em>mekânlar.</em>
            </h2>
          </div>

          <div className="google-reviews__summary">
            <span className="google-reviews__source" translate="no">
              Google Maps
            </span>
            {typeof place.rating === 'number' && (
              <p>
                <strong>
                  {place.rating.toLocaleString('tr-TR', {
                    maximumFractionDigits: 1,
                  })}
                </strong>
                <span> / 5</span>
              </p>
            )}
            <span>{place.userRatingCount ?? 0} değerlendirme</span>
          </div>
        </div>

        <ReviewCarousel>
          {place.reviews.map((review) => {
            const author = review.authorAttribution
            const reviewText = review.originalText?.text ?? review.text?.text
            const authorContent = (
              <>
                <ReviewAvatar src={author.photoUri} />
                <span>{author.displayName}</span>
              </>
            )

            return (
              <article className="google-reviews__card" key={review.name}>
                <div className="google-reviews__card-top">
                  {author.uri ? (
                    <a
                      href={author.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-reviews__author"
                    >
                      {authorContent}
                    </a>
                  ) : (
                    <div className="google-reviews__author">
                      {authorContent}
                    </div>
                  )}

                  {typeof review.rating === 'number' && (
                    <span
                      className="google-reviews__stars"
                      aria-label={`5 üzerinden ${review.rating} yıldız`}
                    >
                      <span aria-hidden="true">
                        {'★'.repeat(Math.round(review.rating))}
                        {'☆'.repeat(5 - Math.round(review.rating))}
                      </span>
                    </span>
                  )}
                </div>

                {reviewText ? (
                  <ReviewText text={reviewText} />
                ) : (
                  <p className="google-reviews__no-text">
                    Bu değerlendirmede yorum metni bulunmuyor.
                  </p>
                )}

                <div className="google-reviews__card-bottom">
                  <span>{review.relativePublishTimeDescription}</span>
                  {review.googleMapsUri && (
                    <a
                      href={review.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Yorumu gör ↗
                    </a>
                  )}
                </div>
              </article>
            )
            })}
        </ReviewCarousel>

        <div className="google-reviews__bottom">
          <p>
            Google’ın alaka düzeyine göre sıraladığı en fazla 5 yorum gösterilir.
          </p>
          {place.googleMapsUri && (
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google’da tüm yorumları gör ↗
            </a>
          )}
        </div>
      </div>
    </section>
  )
}