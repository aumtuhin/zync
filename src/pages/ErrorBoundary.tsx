// ErrorBoundary.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/oops" />
    }

    return this.props.children
  }
}

export default ErrorBoundary
