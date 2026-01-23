// components/BlogCardSkeleton.tsx
export default function BlogCardSkeleton() {
  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900 animate-pulse">
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  )
}
