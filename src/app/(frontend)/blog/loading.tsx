import PostCardSkeleton from '@/components/post-card-skeleton'

export default function PostCardLoading() {
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  )
}
