import { Navigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth.utils'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const token = isTokenValid()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
