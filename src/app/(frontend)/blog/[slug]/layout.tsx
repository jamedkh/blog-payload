import Link from 'next/link'
import { RiArrowLeftLine } from '@remixicon/react'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-20">
      <Link href="/blog">
        <RiArrowLeftLine className="w-6 h-6" />
        Back to Posts
      </Link>

      {children}
    </div>
  )
}
