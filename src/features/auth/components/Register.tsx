import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { registerUser } from '../authSlice';
import toast from 'react-hot-toast';
import AuthSlider from './AuthSlider';
import type { UserRole } from '../authTypes';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'role' ? (value as UserRole) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return toast.error('All fields are required');
    }

    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('Registration successful');
      navigate('/login');
    } else {
      toast.error(resultAction.payload as string);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Registration Form */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Get Started 🎉</h1>
            <h2 className="text-xl font-semibold text-gray-600">Create your account</h2>
            <p className="text-sm text-gray-500 mt-2">
              Register to manage your tasks smartly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 hover:underline">
              Login
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

export default Register;
