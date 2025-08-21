// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../SideBar/masterLayout.jsx';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="md:ml-64 pt-20 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;