import React from 'react';

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  return (
    <div className="flex h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="w-[30%] min-w-[300px] max-w-[420px] border-r border-gray-300 dark:border-gray-700 h-full">
        {sidebar}
      </div>
      <div className="flex-1 h-full">
        {content}
      </div>
    </div>
  );
};

export default Layout;