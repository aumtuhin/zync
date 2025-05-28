import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Oops = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const errorState = location.state as { fromError?: boolean; message?: string }

  useEffect(() => {
    if (!errorState?.fromError) {
      navigate('/')
    }
  }, [errorState, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-6">
      <div className="flex items-center justify-center mb-6">
        <AlertCircle className="text-red-500 dark:text-red-400" size={48} />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
        The server might be down or there was an unexpected error.
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  )
}

export default Oops
