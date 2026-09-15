import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Image
      src="/s-line-logo.jpeg"
      alt="S-Line Dekorasyon"
      width={180}
      height={180}
      unoptimized
      className="sline-login-logo"
    />
  )
}

export function Welcome() {
  return (
    <section className="sline-welcome" aria-labelledby="sline-welcome-title">
      <div className="sline-welcome__heading">
        <Image
          src="/s-line-logo.jpeg"
          alt="S-Line Dekorasyon"
          width={96}
          height={96}
          unoptimized
          className="sline-welcome__logo"
        />

        <div>
          <p className="sline-welcome__eyebrow">S-LINE DEKORASYON</p>
          <h2 id="sline-welcome-title">Hoş geldiniz.</h2>
          <p>
            Projelerinizi düzenleyin, fotoğraflarınızı ekleyin
            ve çalışmalarınızı paylaşın.
          </p>
        </div>
      </div>

      <div className="sline-welcome__actions">
        <Link
          href="/admin/collections/projects/create"
          className="sline-action sline-action--primary"
        >
          Yeni proje ekle <span aria-hidden="true">＋</span>
        </Link>

        <Link
          href="/admin/collections/media"
          className="sline-action"
        >
          Görselleri yönet <span aria-hidden="true">↗</span>
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="sline-action"
        >
          Siteyi görüntüle <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
export function AdminHomeLink() {
  return (
    <Link href="/admin" className="sline-admin-home">
      <span aria-hidden="true">←</span>
      Yönetim anasayfası
    </Link>
  )
}