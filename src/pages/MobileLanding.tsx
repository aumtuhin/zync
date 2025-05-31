import { isMobile } from 'react-device-detect'
import { Navigate } from 'react-router-dom'

const MobileLanding = () => {
  if (!isMobile) {
    return <Navigate to="/" replace />
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Mobile Not Supported</h1>
      <p className="text-gray-700 mb-6">
        Please use this app on a desktop browser or download the mobile app from your app store.
      </p>
      <div className="space-x-4">
        <a href="https://play.google.com" className="text-blue-600 underline">
          Android App
        </a>
        <a href="https://www.apple.com/app-store/" className="text-blue-600 underline">
          iOS App
        </a>
      </div>
    </div>
  )
}

export default MobileLanding
