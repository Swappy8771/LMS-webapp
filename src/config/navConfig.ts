// config/navConfig.ts

import type { IconType } from 'react-icons';
import {
  FaBook,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaCog,

} from 'react-icons/fa';

//
// ---------- Types ----------
//

/** Available roles in the system */
export type UserRole = 'student' | 'instructor' | 'admin';

/** Sidebar menu item structure */
export type NavItem = {
  label: string;
  path: string;
  icon: IconType;
};

/** Header menu item values (can be rendered as icons or buttons) */
export type HeaderItem = 'Notifications' | 'Profile' | 'Create' | 'Language';

/** Role-based structure for sidebar and header */
export type RoleNavConfig = {
  sidebar: NavItem[];
  header: HeaderItem[];
};

//
// ---------- Config ----------
//

/** Central config object containing nav items per user role */
export const navConfig: Record<UserRole, RoleNavConfig> = {
  student: {
    sidebar: [
      { label: 'Dashboard', path: '/dashboard', icon: FaBook },
      { label: 'My Courses', path: '/courses', icon: FaBook },
      { label: 'Profile', path: '/profile', icon: FaUser },
    ],
    header: ['Notifications', 'Profile'],
  },

  instructor: {
    sidebar: [
      { label: 'Dashboard', path: '/dashboard', icon: FaBook },
      { label: 'Create Course', path: '/courses/create', icon: FaChalkboardTeacher },
      { label: 'My Courses', path: '/courses', icon: FaBook },
      { label: 'Profile', path: '/profile', icon: FaUser },
    ],
    header: ['Notifications', 'Create', 'Profile'],
  },

  admin: {
    sidebar: [
      { label: 'Dashboard', path: '/dashboard', icon: FaBook },
      { label: 'Manage Users', path: '/admin/users', icon: FaUsers },
      { label: 'Settings', path: '/admin/settings', icon: FaCog },
    ],
    header: ['Notifications', 'Language', 'Profile'],
  },
};
