import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  navConfig,
  type UserRole,
  type HeaderItem,
} from '../../config/navConfig';

import {
  FaBell,
  FaUserCircle,
  FaPlusCircle,
  FaGlobe,
} from 'react-icons/fa';

const Header: React.FC = () => {
  // 🧠 Get user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);

  // ✅ Fallback to 'student' if role not found
  const role: UserRole = user?.role ?? 'student';

  // 🎯 Get header items based on role
  const headerItems: HeaderItem[] = navConfig[role]?.header ?? [];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-30">
      {/* 🌟 Title / Welcome */}
      <div className="text-lg font-semibold text-gray-800 capitalize">
        Welcome, {user?.name || role}
      </div>

      {/* 🎯 Header actions */}
      <div className="flex items-center gap-5 text-gray-600 text-xl">

        {/* 🔔 Notifications */}
        {headerItems.includes('Notifications') && (
          <button title="Notifications">
            <FaBell className="hover:text-indigo-600 transition duration-200 cursor-pointer" />
          </button>
        )}

        {/* ➕ Create */}
        {headerItems.includes('Create') && (
          <button title="Create">
            <FaPlusCircle className="hover:text-indigo-600 transition duration-200 cursor-pointer" />
          </button>
        )}

        {/* 🌐 Language */}
        {headerItems.includes('Language') && (
          <button title="Change Language">
            <FaGlobe className="hover:text-indigo-600 transition duration-200 cursor-pointer" />
          </button>
        )}

        {/* 👤 Profile */}
        {headerItems.includes('Profile') && (
          <button title="Profile">
            <FaUserCircle className="text-2xl hover:text-indigo-600 transition duration-200 cursor-pointer" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
