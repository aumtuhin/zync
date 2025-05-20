import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import GetStarted from './components/GetStarted.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

const queryClient = new QueryClient()
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetStarted />
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </QueryClientProvider>
  </StrictMode>
)
