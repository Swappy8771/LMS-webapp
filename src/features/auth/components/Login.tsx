// src/pages/Login.tsx
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { loginUser } from '../authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthSlider from './AuthSlider';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error('All fields required');
    }

  const resultAction = await dispatch(loginUser(formData));

if (loginUser.fulfilled.match(resultAction)) {
  toast.success('Login successful');

  const user = resultAction.payload;

  if (user?.role === 'admin') {
    navigate('/admin/dashboard');
  } else if (user?.role === 'instructor') {
    navigate('/instructor/dashboard');
  } else {
    navigate('/student/dashboard'); // default fallback
  }
} else {
  toast.error(resultAction.payload as string);
}
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hey yo, 👋</h1>
            <h2 className="text-xl font-semibold text-gray-600">Welcome back!</h2>
            <p className="text-sm text-gray-500 mt-2">Login to Best LMS Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-sm text-gray-500 flex justify-between items-center">
            <span>I forgot my password 🥲</span>
            <Link to="/register" className="text-teal-600 hover:underline">
              Don't have an account?
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Image Slider */}
      <div className="hidden md:block">
        <AuthSlider />
      </div>
    </div>
  );
};

export default Login;