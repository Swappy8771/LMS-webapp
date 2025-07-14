import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
// import Dashboard from '@/pages/Dashboard'; // future
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Future: <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
