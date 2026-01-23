// pages/index.tsx (or wherever you want to preview)
import BlogCard from '@/components/post-card'
import loading from './loading'
import { getPosts } from '@/collections/Posts/fetchers'
import NotFound from '@/components/404'
import { Media } from '@/payload-types'

/* 
function mediaIsObject(media: string | Media): media is Media {
  return typeof media !== 'string'
} 
  */

function relationshipIsObject<T>(relationship: string | T): relationship is T {
  return typeof relationship !== 'string'
}

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
        {/* 

        <BlogCard
          coverImage="https://picsum.photos/600/400?random=1"
          title="Exploring the Future of Web Development"
          excerpt="Discover the latest trends in frontend frameworks, tooling, and developer workflows..."
          publishedDate="Jan 23, 2026"
          readTime="6 min"
          author="Jane Doe"
          slug="exploring-the-future-of-web-development"
        />

        <BlogCard
          coverImage="https://picsum.photos/600/400?random=2"
          title="Payload CMS Tips & Tricks"
          excerpt="A collection of practical tips to make the most out of Payload CMS in your projects..."
          publishedDate="Jan 20, 2026"
          readTime="4 min"
          author="John Smith"
          slug="payload-cms-tips-tricks"
        />

        <BlogCard
          coverImage="https://picsum.photos/600/400?random=3"
          title="Tailwind CSS Dark Mode Essentials"
          excerpt="Learn how to implement dark mode seamlessly in your Tailwind-powered applications..."
          publishedDate="Jan 18, 2026"
          readTime="5 min"
          author="Alex Johnson"
          slug="tailwind-css-dark-mode-essentials"
        /> */}
      </div>
    </div>
  )
}
