// components/PostSingleSkeleton.tsx
export default function PostSingleSkeleton() {
  return (
    <div className="p-6 bg-white animate-pulse">
      <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 mb-6 rounded-md"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="flex gap-4 mb-6">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/6"></div>
      </div>
    </div>
  )
}
