// components/PostSingle.tsx

import { RichText } from '@/components/richtext'
import Image from 'next/image'
import { getPost } from '@/collections/Posts/fetchers'
import { relationshipIsObject } from '@/scripts/seed/seeders/lib/helper/relationship-to-object'
import NotFound from '@/components/404'

export default async function PostSingle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getPost(slug)
  if (!article) return <NotFound />
  if (!relationshipIsObject(article.coverImage)) return null

  return (
    <article className="py-6 w-full">
      {/* Cover Image */}
      <div className="relative w-full h-96 mb-6">
        <Image
          src={article.coverImage.url ?? ''}
          alt={article.title}
          placeholder="blur"
          blurDataURL={article.coverImage.blurDataUrl}
          fill
          className="object-cover rounded-md w-full h-full"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>{article.publishedAt}</span>
        <span>{article.readTimeInMins} min read</span>
        <span>By {relationshipIsObject(article.author) ? article.author.name : ''}</span>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <RichText lexicalData={article.content} />
      </div>
    </article>
  )
}
