// NotFoundPage.tsx
import { AlertTriangle } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-6">
      <AlertTriangle className="text-yellow-500 dark:text-yellow-400 mb-6" size={48} />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go to Home
      </a>
    </div>
  )
}

export default NotFoundPage
