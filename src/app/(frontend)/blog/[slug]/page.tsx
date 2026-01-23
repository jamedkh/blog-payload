'use client'
import { useState, useEffect } from 'react'
import PostSingle from '@/components/post-single'
import PostSingleSkeleton from '@/components/post-single-skeleton'

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    // Simulate fetching from Payload CMS
    setTimeout(() => {
      setBlog({
        coverImage: 'https://picsum.photos/800/400?random=10',
        title: 'Exploring Payload CMS',
        content: 'Payload CMS is a powerful headless CMS built with TypeScript...',
        publishedDate: 'Jan 23, 2026',
        readTime: '7 min',
        author: 'Jane Doe',
      })
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) return <PostSingleSkeleton />
  return <PostSingle {...blog} />
}
