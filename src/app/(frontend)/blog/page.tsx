// pages/index.tsx (or wherever you want to preview)
import BlogCard from '@/components/post-card'
import loading from './loading'
import { getPosts } from '@/collections/Posts/fetchers'
import NotFound from '@/components/404'
import { relationshipIsObject } from '@/scripts/seed/seeders/lib/helper/relationship-to-object'

export default async function BlogPage() {
  const posts = await getPosts()

  if (!posts.length) {
    return <NotFound />
  }

  return (
    <div className="container">
      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          if (!relationshipIsObject(post.coverImage)) return null
          if (!relationshipIsObject(post.author)) return null

          return (
            <BlogCard
              key={post.id}
              coverImage={post.coverImage}
              title={post.title}
              excerpt={post.excerpt}
              publishedDate={new Date(post.publishedAt ?? new Date()).toLocaleDateString()}
              readTime={`${post.readTimeInMins ?? 0} min`}
              author={post.author.name}
              slug={post.slug}
            />
          )
        })}
      </div>
    </div>
  )
}
