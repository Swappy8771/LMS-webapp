import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { UserRole } from '../../features/auth/authTypes';
import { navConfig,type NavItem} from '../../config/navConfig'

const Sidebar: React.FC = () => {
  // Retrieve user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);

  // Define role with a fallback to 'student'
  const role: UserRole = user?.role ?? 'student';
  // Get the menu configuration based on role
  const menu: NavItem[] = navConfig[role].sidebar;

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white shadow-md z-40">
      {/* Logo / Branding Section */}
      <div className="p-6 text-indigo-600 text-xl font-bold">
        LMS Panel
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 space-y-1 px-2">
        {menu.map((item: NavItem, idx: number) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium 
               ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`
            }
          >
            {/* Icon Component */}
            <item.icon className="w-5 h-5" />
            {/* Label */}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
