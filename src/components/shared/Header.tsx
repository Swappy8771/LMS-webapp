import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // or useContext if you're using Context
const Header = () => {
  const { user } = useSelector((state) => state.auth); 

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      );
    }

    switch (user.role) {
      case 'student':
        return (
          <>
            <Link to="/">Home</Link>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/courses">Explore</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </>
        );
      case 'instructor':
        return (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/instructor/courses">My Courses</Link>
            <Link to="/course/create">Create Course</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/admin">Admin Panel</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/courses">Courses</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/logout">Logout</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">LMS</h1>
      <nav className="flex gap-4">{renderLinks()}</nav>
    </header>
  );
};

export default Header;
