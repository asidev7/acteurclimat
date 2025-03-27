import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;