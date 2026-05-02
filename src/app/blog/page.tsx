import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getBlogList, getHomepageContent } from '@/lib/site-content'

function formatDate(date?: string | null) {
  if (!date) return null

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export default async function BlogPage() {
  const [posts, content] = await Promise.all([getBlogList(), getHomepageContent()])

  return (
    <>
      <Navbar
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
      />
      <main className="bg-cream min-h-screen pt-24 pb-16">
        <section className="bg-linear-to-r from-brand-900 to-brand-800 py-14 text-center text-white">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-300">
            Artikel & Edukasi
          </p>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Blog BERUBAT</h1>
          <p className="mt-3 text-lg text-white/75">
            Tips, edukasi, dan informasi kesehatan untuk mendukung pemulihan Anda.
          </p>
        </section>

        <div className="container-wide px-4 pt-10 md:px-8">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center text-gray-400">
              Belum ada artikel yang dipublikasikan.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-52 bg-brand-100">
                    {post.featuredImageUrl ? (
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    {post.publishedAt ? (
                      <p className="mb-3 text-sm font-medium text-brand-700">
                        {formatDate(post.publishedAt)}
                      </p>
                    ) : null}
                    <h2 className="font-display mb-3 line-clamp-2 text-2xl font-bold text-gray-900">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 text-[15px] leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        footerDescription={content.settings.footerDescription}
        stptLabel={content.settings.stptLabel}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
        addressTitle={content.settings.addressTitle}
        addressLine={content.settings.addressLine}
        operatingHours={content.settings.operatingHours}
      />
    </>
  )
}
