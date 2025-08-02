import { Formik, Form, Field, ErrorMessage } from 'formik';
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

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole,
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const resultAction = await dispatch(registerUser(values));
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

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="role"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </Field>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>

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
