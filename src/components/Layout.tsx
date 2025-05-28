import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface LayoutProps {
  sidebar: React.ReactNode
  content: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <button
        className="lg:hidden fixed top-3 right-2 z-50 p-2 dark:bg-gray-800 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed lg:relative w-[85%] sm:w-[40%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-full transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 z-40`}
      >
        {sidebar}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 h-full relative">{content}</div>
    </div>
  )
}

export default Layout
