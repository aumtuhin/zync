import { isMobile } from 'react-device-detect'
import { Navigate } from 'react-router-dom'

const DeviceGuard = ({ children }: { children: React.ReactNode }) => {
  if (isMobile) {
    return <Navigate to="/mobile-landing" replace />
  }

  return <>{children}</>
}

export default DeviceGuard
