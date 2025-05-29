import { isMobile } from 'react-device-detect'
import { Navigate, useNavigate } from 'react-router-dom'

const DeviceGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  if (isMobile) {
    return <Navigate to="/mobile-landing" replace />
  }

  if (window.innerWidth < 768) {
    navigate('/mobile-landing')
  }

  return <>{children}</>
}

export default DeviceGuard
