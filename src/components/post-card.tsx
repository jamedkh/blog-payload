import { Media } from '@/payload-types'
import Image from 'next/image'

// components/PostCard.tsx
interface PostCardProps {
  coverImage: Media
  title: string
  excerpt: string
  publishedDate: string
  readTime: string
  author: string
  slug: string
}

export default function PostCard({
  coverImage,
  title,
  excerpt,
  publishedDate,
  readTime,
  author,
  slug,
}: PostCardProps) {
  return (
    <article className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition hover:shadow-xl">
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image src={coverImage.url ?? ''} alt={title} fill className="object-cover w-full h-full" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
          {title}
        </h2>

        {/* Author */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          By <span className="font-medium">{author}</span>
        </p>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{excerpt}</p>

        {/* CTA */}
        <a
          href={`/blog/${slug}`}
          className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Read more
        </a>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{publishedDate}</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </article>
  )
}
