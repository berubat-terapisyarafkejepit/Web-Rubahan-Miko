import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getBlogPostBySlug, getHomepageContent } from '@/lib/site-content'

function formatDate(date?: string | null) {
  if (!date) return null

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, content] = await Promise.all([getBlogPostBySlug(slug), getHomepageContent()])

  if (!post) notFound()

  return (
    <>
      <Navbar
        siteName={content.settings.siteName}
        logoUrl={content.settings.logoUrl}
        navigation={content.settings.navigation}
        whatsAppNumber={content.settings.whatsAppNumber}
      />
      <main className="bg-cream min-h-screen pt-24 pb-16">
        <article className="container-wide px-4 md:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
            {post.publishedAt ? (
              <p className="mb-4 text-sm font-medium text-brand-700">{formatDate(post.publishedAt)}</p>
            ) : null}
            <h1 className="font-display mb-5 text-4xl font-bold text-gray-900">{post.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>

            {post.featuredImageUrl ? (
              <div className="relative mb-8 h-72 overflow-hidden rounded-3xl bg-brand-100 md:h-[420px]">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title || 'Cover artikel'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}

            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-700"
              dangerouslySetInnerHTML={{ __html: post.contentHTML }}
            />
          </div>
        </article>
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
