import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router-dom';

const LMSLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const UserRole = user?.role ?? 'student';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 w-full z-40">
        <Header />
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden md:block w-64 bg-white shadow-md h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LMSLayout;
