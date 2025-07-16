import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import LMSLayout from './layouts/LMSLayout';
import StudentDashboard from './pages/Student/StudentDashboard';
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout and Routes */}
        <Route path="/student/*" element={<LMSLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        <Route path="/instructor/*" element={<LMSLayout />}>
          <Route path="dashboard" element={<InstructorDashboard />} />
        </Route>

        <Route path="/admin/*" element={<LMSLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
