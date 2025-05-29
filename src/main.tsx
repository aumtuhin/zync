import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import GetStarted from './components/GetStarted.tsx'
import CompleteProfile from './pages/CompleteProfile.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import NotFoundPage from './pages/NotFound.tsx'
import Oops from './pages/Oops.tsx'
import DeviceGuard from './components/MobileRedirectWrapper.tsx'
import ErrorBoundary from './pages/ErrorBoundary.tsx'
import MobileLanding from './pages/MobileLanding.tsx'

const queryClient = new QueryClient()
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStarted />
  },
  {
    path: '/complete-profile',
    element: (
      <ProtectedRoute>
        <CompleteProfile />
      </ProtectedRoute>
    )
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    )
  },
  {
    path: '/mobile-landing',
    element: <MobileLanding />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/oops',
    element: <Oops />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DeviceGuard>
        <ErrorBoundary>
          <RouterProvider
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            router={router}
          />
        </ErrorBoundary>{' '}
      </DeviceGuard>
    </QueryClientProvider>
  </StrictMode>
)
