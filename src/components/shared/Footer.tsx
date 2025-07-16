import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const role = user?.role ?? 'student';

  const commonLinks = [
    { label: 'Privacy & Policy', path: '/privacy' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const studentLinks = [
    { label: 'My Courses', path: '/courses' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Help Center', path: '/help' },
  ];

  const instructorLinks = [
    { label: 'Create Course', path: '/courses/create' },
    { label: 'Earnings', path: '/earnings' },
    { label: 'Help Center', path: '/help' },
  ];

  const adminLinks = [
    { label: 'Manage Users', path: '/admin/users' },
    { label: 'Site Settings', path: '/admin/settings' },
    { label: 'System Logs', path: '/admin/logs' },
  ];

  const dynamicLinks =
    role === 'instructor'
      ? instructorLinks
      : role === 'admin'
      ? adminLinks
      : studentLinks;

  return (
    <footer className="bg-white shadow-lg mt-16 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">LMS Platform</h2>
          <p className="text-gray-600 mt-2">
            Learn. Teach. Manage. All in one place.
          </p>
        </div>

        {/* Role-based Links */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4 capitalize">{role} Links</h3>
          <ul className="space-y-2">
            {dynamicLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-indigo-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Links */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {commonLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-indigo-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className=" mt-8 py-4 px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          {commonLinks.map((link) => (
            <Link key={link.label} to={link.path} className="hover:text-indigo-600">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
