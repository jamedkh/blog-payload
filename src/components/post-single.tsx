// components/PostSingle.tsx

interface PostSingleProps {
  coverImage: string
  title: string
  content: string
  publishedDate: string
  readTime: string
  author: string
}

export default function PostSingle({
  coverImage,
  title,
  content,
  publishedDate,
  readTime,
  author,
}: PostSingleProps) {
  return (
    <article className="p-6 w-full">
      {/* Cover Image */}
      <div className="relative w-full h-96 mb-6">
        <img src={coverImage} alt={title} className="object-cover rounded-md w-full h-full" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>{publishedDate}</span>
        <span>{readTime} read</span>
        <span>By {author}</span>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">{content}</div>
    </article>
  )
}
